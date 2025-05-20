const React = require('react');

/**
 * Post layout component for the zen-reader theme
 * Displays a single post with a left sidebar and hero image
 */
const PostLayout = ({ siteTitle, navLinks, post }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{post.title} | {siteTitle}</title>
        <meta name="description" content={post.description} />
        <link rel="stylesheet" href="/themes/zen-reader/theme.css" />
        <link href="https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Sidebar */}
        <header>
          <div className="header-content">
            <h1 className="site-title"><a href="/">{siteTitle}</a></h1>
            <nav>
              <ul>
                {navLinks.map((link, index) => (
                  <li key={index}><a href={link.url}>{link.name}</a></li>
                ))}
              </ul>
            </nav>
          </div>
          <button className="theme-toggle" id="theme-toggle">🌙</button>
        </header>

        {/* Main Content */}
        <main className="post-page">
          {/* Hero Image */}
          {post.heroImage && (
            <div className="post-hero-image">
              <img src={post.heroImage} alt={post.title} />
            </div>
          )}
          
          <article className="post-content">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <time dateTime={post.date}>{post.formattedDate}</time>
            </div>
            
            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Optional Table of Contents */}
          {post.toc && (
            <aside className="post-toc">
              <h2>Table of Contents</h2>
              <nav dangerouslySetInnerHTML={{ __html: post.toc }} />
            </aside>
          )}
        </main>

        {/* Footer */}
        <footer>
          <p>&copy; {currentYear} {siteTitle}. All rights reserved.</p>
          <p>Built with <a href="https://github.com/subhashdasyam/git-pages-react">Git Pages React Framework</a></p>
        </footer>

        {/* Theme Toggle Script */}
        <script dangerouslySetInnerHTML={{ __html: `
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
        ` }} />
      </body>
    </html>
  );
};

// Export using CommonJS format
module.exports = PostLayout; 