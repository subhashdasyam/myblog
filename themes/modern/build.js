const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

// Input and output paths
const inputFile = path.join(__dirname, 'src', 'input.css');
const outputFile = path.join(__dirname, 'assets', 'css', 'theme.css');
const configFile = path.join(__dirname, 'tailwind.config.js');

// Ensure directories exist
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

// Default Tailwind CSS content
const defaultInputCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;

// Create input.css if it doesn't exist
if (!fs.existsSync(inputFile)) {
  if (!fs.existsSync(path.dirname(inputFile))) {
    fs.mkdirSync(path.dirname(inputFile), { recursive: true });
  }
  fs.writeFileSync(inputFile, defaultInputCss, 'utf8');
}

// Process CSS with Tailwind
async function buildCss() {
  try {
    const css = fs.readFileSync(inputFile, 'utf8');
    
    const result = await postcss([
      tailwindcss({
        config: configFile
      }),
      autoprefixer(),
    ]).process(css, {
      from: inputFile,
      to: outputFile,
    });

    fs.writeFileSync(outputFile, result.css, 'utf8');
    console.log(`✅ Successfully built ${path.relative(process.cwd(), outputFile)}`);
  } catch (error) {
    console.error('❌ Error building CSS:', error);
    process.exit(1);
  }
}

// Run the build
buildCss();
