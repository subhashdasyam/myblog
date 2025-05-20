const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const { minify } = require('terser');
const cssnano = require('cssnano');

// Promisify fs methods
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const access = promisify(fs.access);

// Input and output paths
const paths = {
  css: {
    input: path.join(__dirname, 'src', 'input.css'),
    output: path.join(__dirname, 'static', 'css', 'main.css'),
    minOutput: path.join(__dirname, 'static', 'css', 'main.min.css')
  },
  js: {
    input: path.join(__dirname, 'static', 'js', 'main.js'),
    output: path.join(__dirname, 'static', 'js', 'main.min.js')
  },
  config: path.join(__dirname, 'tailwind.config.js')
};

// Default Tailwind CSS content
const defaultInputCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

// Ensure directories exist
async function ensureDirectories() {
  const dirs = [
    path.dirname(paths.css.output),
    path.dirname(paths.js.output)
  ];

  for (const dir of dirs) {
    try {
      await access(dir);
    } catch (err) {
      if (err.code === 'ENOENT') {
        await mkdir(dir, { recursive: true });
      } else {
        throw err;
      }
    }
  }
}

// Process CSS with PostCSS
async function processCss() {
  try {
    // Create input.css if it doesn't exist
    if (!fs.existsSync(paths.css.input)) {
      await mkdir(path.dirname(paths.css.input), { recursive: true });
      await writeFile(paths.css.input, defaultInputCss, 'utf8');
    }

    const css = await readFile(paths.css.input, 'utf8');
    
    // Process with Tailwind and Autoprefixer
    const result = await postcss([
      tailwindcss(paths.config),
      autoprefixer(),
      cssnano()
    ]).process(css, {
      from: paths.css.input,
      to: paths.css.output,
      map: { inline: false }
    });

    // Write the output file
    await writeFile(paths.css.output, result.css, 'utf8');
    
    // If source maps were generated, write them too
    if (result.map) {
      await writeFile(`${paths.css.output}.map`, result.map.toString(), 'utf8');
    }
    
    console.log(`✅ CSS built successfully: ${paths.css.output}`);
  } catch (error) {
    console.error('❌ Error processing CSS:', error);
    process.exit(1);
  }
}

// Process JavaScript
async function processJs() {
  try {
    if (!fs.existsSync(paths.js.input)) {
      console.log('ℹ️  No JavaScript file found at', paths.js.input);
      return false;
    }

    const js = await readFile(paths.js.input, 'utf8');
    const result = await minify(js);
    await writeFile(paths.js.output, result.code, 'utf8');
    console.log(`✅ JavaScript built successfully: ${paths.js.output}`);
    return true;
  } catch (error) {
    console.error('❌ Error processing JavaScript:', error);
    return false;
  }
}

// Main build function
async function build() {
  try {
    await ensureDirectories();
    await processCss();
    await processJs();
    console.log('✨ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Run the build
build().catch(console.error);
