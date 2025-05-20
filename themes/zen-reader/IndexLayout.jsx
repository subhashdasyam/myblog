const React = require('react');

/**
 * Index layout component for the zen-reader theme
 * Displays a list of posts with a left sidebar
 */
const IndexLayout = ({ siteTitle, navLinks, posts }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
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
        <main>
          <h1>Latest Posts</h1>
          <div className="posts-list">
            {posts.map((post, index) => (
              <article key={index} className="post-item">
                <div className="post-content">
                  <h2 className="post-title">
                    <a href={post.url}>{post.title}</a>
                  </h2>
                  <div className="post-meta">
                    <time dateTime={post.date}>{post.formattedDate}</time>
                  </div>
                  {post.description && (
                    <p className="post-excerpt">{post.description}</p>
                  )}
                  <a href={post.url} className="read-more">Read more →</a>
                </div>
                {post.thumbnail && (
                  <div className="post-thumbnail">
                    <a href={post.url}>
                      <img src={post.thumbnail} alt={`Thumbnail for ${post.title}`} loading="lazy" />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
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
module.exports = IndexLayout; 