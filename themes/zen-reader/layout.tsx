import React from 'react';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  thumbnail?: string; // URL to the thumbnail image
  // Add other post properties as needed
}

interface ZenReaderLayoutProps {
  siteTitle: string;
  siteTagline?: string;
  navLinks: { href: string; label: string }[];
  posts?: Post[]; // For the index page
  children?: React.ReactNode; // For individual post pages or other content
  pageTitle?: string; // For individual pages like "About" or post titles
  isPostPage?: boolean;
  // Add other props like footer content, current path etc.
}

const ZenReaderLayout: React.FC<ZenReaderLayoutProps> = ({
  siteTitle,
  siteTagline,
  navLinks,
  posts,
  children,
  pageTitle,
  isPostPage = false,
}) => {
  return (
    <div className="zr-container">
      {/* Sidebar */}
      <aside className="zr-sidebar">
        <div className="zr-sidebar-header">
          <a href="/" className="zr-site-title">{siteTitle}</a>
          {siteTagline && <p className="zr-site-tagline">{siteTagline}</p>}
        </div>
        <nav className="zr-sidebar-nav">
          <ul>
            {navLinks.map(link => (
              <li key={link.href}>
                {/* Basic active link check, can be improved with router */}
                <a href={link.href} className={typeof window !== 'undefined' && window.location.pathname === link.href ? 'active' : ''}>
                  {link.label}
                </a>
              </li>
            ))}
            {/* Add RSS or other static links here if needed */}
          </ul>
        </nav>
        <div className="zr-sidebar-footer">
          <p>&copy; {new Date().getFullYear()} {siteTitle}.</p>
          {/* Add theme credits or other footer info here */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="zr-main-content">
        {/* Mobile Header (to be designed and implemented) */}
        {/* <header className="zr-mobile-header">...</header> */}

        {pageTitle && !isPostPage && !posts && <h1 className="zr-page-title">{pageTitle}</h1>}

        {/* If it's an index page with posts */}
        {posts && !isPostPage && (
          <>
            <h1 className="zr-page-title">{pageTitle || 'Latest Posts'}</h1>
            <div className="zr-posts-list">
              {posts.map(post => (
                <article key={post.slug} className="zr-post-card">
                  <div className="zr-post-card-content">
                    <h2 className="zr-post-card-title">
                      <a href={`/${post.slug}.html`}>{post.title}</a>
                    </h2>
                    <p className="zr-post-card-meta">
                      <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    </p>
                    {post.excerpt && <p className="zr-post-card-excerpt">{post.excerpt}</p>}
                    <a href={`/${post.slug}.html`} className="zr-post-card-read-more">Read more &rarr;</a>
                  </div>
                  {post.thumbnail && (
                    <a href={`/${post.slug}.html`} className="zr-post-card-image-link">
                      <img src={post.thumbnail} alt={`Thumbnail for ${post.title}`} className="zr-post-card-image" />
                    </a>
                  )}
                  {!post.thumbnail && (
                     <a href={`/${post.slug}.html`} className="zr-post-card-image-link">
                      <img src="/themes/zen-reader/assets/placeholder.png" alt="Placeholder image" className="zr-post-card-image" />
                    </a>
                  )} 
                </article>
              ))}
            </div>
          </>
        )}

        {/* If it's a single post page or other content */}
        {children && (
          <div className="zr-post-content-area">
             {/* For single post, title will be part of children or handled differently */}
            {children}
          </div>
        )}
      </main>
    </div>
  );
};

export default ZenReaderLayout; 