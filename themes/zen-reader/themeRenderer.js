/**
 * Renders the index page with the given posts
 * @param {Object} config Site configuration
 * @param {Array} posts Array of post objects
 * @returns {String} HTML string of the rendered index page
 */
function renderIndexPage(config, posts) {
  const { siteName } = config;
  const currentYear = new Date().getFullYear();
  
  // Transform navigation links format
  const navLinks = (config.navigation || []).map(link => ({
    name: link.name,
    url: link.url
  }));
  
  // Format posts for the component
  const formattedPosts = posts.map(post => ({
    title: post.metadata.title,
    description: post.metadata.description || '',
    date: post.metadata.date instanceof Date ? post.metadata.date.toISOString() : new Date().toISOString(),
    formattedDate: post.metadata.date instanceof Date ? 
      post.metadata.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) :
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    url: `/${post.slug}.html`,
    thumbnail: post.thumbnailPath || (post.base64Image ? post.base64Image : null),
    readingTime: calculateReadingTime(post.content),
    tags: post.metadata.tags || []
  }));
  
  // Generate navigation HTML
  const navigationHtml = navLinks.map(link => 
    `<li><a href="${link.url}">${link.name}</a></li>`
  ).join('');
  
  // Generate posts HTML
  const postsHtml = formattedPosts.map(post => {
    const thumbnailHtml = post.thumbnail ? 
      `<div class="post-thumbnail">
        <a href="${post.url}">
          <img src="${post.thumbnail}" alt="Thumbnail for ${post.title}" loading="lazy">
        </a>
      </div>` : '';
      
    const tagsHtml = post.tags.length > 0 ? 
      `<div class="post-tags">
        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>` : '';
    
    return `
      <article class="post-item">
        <div class="post-content">
          <h2 class="post-title">
            <a href="${post.url}">${post.title}</a>
          </h2>
          <div class="post-meta">
            <time datetime="${post.date}">${post.formattedDate}</time>
            <span class="reading-time">${post.readingTime} min read</span>
          </div>
          ${tagsHtml}
          ${post.description ? `<p class="post-excerpt">${post.description}</p>` : ''}
          <a href="${post.url}" class="read-more">Read more →</a>
        </div>
        ${thumbnailHtml}
      </article>
    `;
  }).join('');
  
  // Create the complete HTML
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${siteName}</title>
        <link rel="stylesheet" href="/themes/zen-reader/theme.css">
        <link href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap" rel="stylesheet">
        <meta name="theme-color" content="#007acc"> 
        <link rel="icon" href="/themes/zen-reader/assets/favicon.ico">
      </head>
      <body>
        <div class="page-container">
          <!-- Sidebar -->
          <header>
            <div class="header-content">
              <h1 class="site-title"><a href="/">${siteName}</a></h1>
              <nav>
                <ul>
                  ${navigationHtml}
                </ul>
              </nav>
            </div>
            <button class="theme-toggle" id="theme-toggle">🌙</button>
            <!-- Footer moved to sidebar -->
            <div class="sidebar-footer">
              <p>&copy; ${currentYear} ${siteName}. All rights reserved.</p>
              <p>Built with <a href="https://github.com/subhashdasyam/git-pages-react">Git Pages React Framework</a></p>
            </div>
          </header>

          <div class="content-wrap">
            <!-- Main Content -->
            <main>
              <h1>Latest Posts</h1>
              <div class="posts-list">
                ${postsHtml}
              </div>
            </main>
          </div>
        </div>

        <!-- Theme Toggle Script -->
        <script>
          // Theme toggle functionality
          const themeToggle = document.getElementById('theme-toggle');
          const htmlElement = document.documentElement;
          
          // Check for saved theme preference or use default
          const savedTheme = localStorage.getItem('gpr-theme');
          if (savedTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
          }
          
          // Toggle theme when button is clicked
          themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
              htmlElement.removeAttribute('data-theme');
              localStorage.setItem('gpr-theme', 'default');
              themeToggle.textContent = '🌙';
            } else {
              htmlElement.setAttribute('data-theme', 'dark');
              localStorage.setItem('gpr-theme', 'dark');
              themeToggle.textContent = '☀️';
            }
          });
        </script>
      </body>
    </html>`;
}

/**
 * Renders a single post page
 * @param {Object} post Post object
 * @param {Object} config Site configuration
 * @returns {String} HTML string of the rendered post page
 */
function renderPostPage(post, config) {
  const { siteName } = config;
  const currentYear = new Date().getFullYear();
  
  // Transform navigation links format
  const navLinks = (config.navigation || []).map(link => ({
    name: link.name,
    url: link.url
  }));
  
  // Format post data
  const formattedDate = post.metadata.date instanceof Date ? 
    post.metadata.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) :
    new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
  const isoDate = post.metadata.date instanceof Date ? 
    post.metadata.date.toISOString() : 
    new Date().toISOString();
    
  const heroImage = post.thumbnailPath || (post.base64Image ? post.base64Image : null);
  const toc = generateTableOfContents(post.content);
  const readingTime = calculateReadingTime(post.content);
  const tags = post.metadata.tags || [];
  
  // Generate navigation HTML
  const navigationHtml = navLinks.map(link => 
    `<li><a href="${link.url}">${link.name}</a></li>`
  ).join('');
  
  // Hero image HTML
  const heroImageHtml = heroImage ? 
    `<div class="post-hero-image">
      <img src="${heroImage}" alt="${post.metadata.title}">
    </div>` : '';
  
  // Table of contents HTML
  const tocHtml = toc ? 
    `<aside class="post-toc">
      <h2>Table of Contents</h2>
      <nav>${toc}</nav>
    </aside>` : '';
    
  // Tags HTML
  const tagsHtml = tags.length > 0 ? 
    `<div class="post-tags">
      ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>` : '';
    
  // Social sharing buttons
  const encodedTitle = encodeURIComponent(post.metadata.title);
  const encodedUrl = encodeURIComponent(`${config.siteUrl || ''}/${post.slug}.html`);
  const sharingHtml = `
    <div class="social-sharing">
      <h3>Share this post</h3>
      <div class="share-buttons">
        <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" rel="noopener" aria-label="Share on Twitter" class="twitter-share">
          Twitter
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" target="_blank" rel="noopener" aria-label="Share on Facebook" class="facebook-share">
          Facebook
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener" aria-label="Share on LinkedIn" class="linkedin-share">
          LinkedIn
        </a>
      </div>
    </div>
  `;
  
  // Create the complete HTML
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${post.metadata.title} | ${siteName}</title>
        <meta name="description" content="${post.metadata.description || ''}">
        <meta property="og:title" content="${post.metadata.title}">
        <meta property="og:description" content="${post.metadata.description || ''}">
        ${heroImage ? `<meta property="og:image" content="${heroImage}">` : ''}
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <link rel="stylesheet" href="/themes/zen-reader/theme.css">
        <link href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap" rel="stylesheet">
        <meta name="theme-color" content="#007acc">
        <link rel="icon" href="/themes/zen-reader/assets/favicon.ico">
      </head>
      <body>
        <div class="page-container">
          <!-- Sidebar -->
          <header>
            <div class="header-content">
              <h1 class="site-title"><a href="/">${siteName}</a></h1>
              <nav>
                <ul>
                  ${navigationHtml}
                </ul>
              </nav>
            </div>
            <button class="theme-toggle" id="theme-toggle">🌙</button>
            <!-- Footer moved to sidebar -->
            <div class="sidebar-footer">
              <p>&copy; ${currentYear} ${siteName}. All rights reserved.</p>
              <p>Built with <a href="https://github.com/subhashdasyam/git-pages-react">Git Pages React Framework</a></p>
            </div>
          </header>

          <div class="content-wrap">
            <!-- Main Content -->
            <main class="post-page">
              ${heroImageHtml}
              
              <article class="post-content">
                <h1 class="post-title">${post.metadata.title}</h1>
                <div class="post-meta">
                  <time datetime="${isoDate}">${formattedDate}</time>
                  <span class="reading-time">${readingTime} min read</span>
                </div>
                
                ${tagsHtml}
                
                <div class="post-body">${post.content}</div>
                
                ${sharingHtml}
              </article>

              ${tocHtml}
            </main>
          </div>
        </div>

        <!-- Theme Toggle Script -->
        <script>
          // Theme toggle functionality
          const themeToggle = document.getElementById('theme-toggle');
          const htmlElement = document.documentElement;
          
          // Check for saved theme preference or use default
          const savedTheme = localStorage.getItem('gpr-theme');
          if (savedTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
          }
          
          // Toggle theme when button is clicked
          themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
              htmlElement.removeAttribute('data-theme');
              localStorage.setItem('gpr-theme', 'default');
              themeToggle.textContent = '🌙';
            } else {
              htmlElement.setAttribute('data-theme', 'dark');
              localStorage.setItem('gpr-theme', 'dark');
              themeToggle.textContent = '☀️';
            }
          });
        </script>
      </body>
    </html>`;
}

/**
 * Calculates estimated reading time for content
 * @param {String} content HTML content
 * @returns {Number} Reading time in minutes
 */
function calculateReadingTime(content) {
  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  
  // Count words (roughly)
  const words = text.split(/\s+/).length;
  
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 225;
  
  // Calculate reading time and round up
  const readingTime = Math.ceil(words / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
}

/**
 * Generates a simple table of contents from HTML content
 * @param {String} htmlContent The HTML content to generate TOC from
 * @returns {String} HTML string of the table of contents
 */
function generateTableOfContents(htmlContent) {
  // Simple TOC generation
  // This is a basic implementation that looks for h2 and h3 tags
  const headings = [];
  const regex = /<h([2-3]).*?id="(.*?)".*?>(.*?)<\/h[2-3]>/g;
  let match;
  
  while ((match = regex.exec(htmlContent)) !== null) {
    headings.push({
      level: match[1],
      id: match[2],
      text: match[3].replace(/<.*?>/g, '') // Remove any HTML tags inside heading
    });
  }
  
  if (headings.length === 0) {
    return null; // No TOC if no headings
  }
  
  // Generate HTML for TOC
  const tocHtml = `
    <ul>
      ${headings.map(heading => `
        <li class="toc-level-${heading.level}">
          <a href="#${heading.id}">${heading.text}</a>
        </li>
      `).join('')}
    </ul>
  `;
  
  return tocHtml;
}

module.exports = {
  renderIndexPage,
  renderPostPage
}; 