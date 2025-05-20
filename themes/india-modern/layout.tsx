import React from 'react';
import BaseLayout, { BaseLayoutProps } from '../../src/components/layout/BaseLayout';
import { ThemeProvider } from '../../src/core/themeContext';
import './theme.css';

const IndiaModernLayout: React.FC<BaseLayoutProps> = (props) => (
  <ThemeProvider initialTheme="india-modern">
    <BaseLayout
      {...props}
      bodyClass={`india-modern-theme ${props.bodyClass || ''}`}
      header={
        <div className="gpr-header-content india-modern-header">
          <div className="gradient-bar"></div>
          <h1 className="gpr-site-title">
            <a href="/">{props.siteName}</a>
          </h1>
          <nav className="gpr-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </nav>
        </div>
      }
      footer={
        <div className="gpr-footer-content india-modern-footer">
          <div className="footer-gradient-bar"></div>
          <p>&copy; {new Date().getFullYear()} {props.siteName}. All rights reserved.</p>
          <p>
            Built with <a href="https://github.com/git-pages-react-framework" target="_blank" rel="noopener noreferrer">
              Git Pages React Framework
            </a>
          </p>
        </div>
      }
    >
      <div className="hero">
        <span className="hero-text">Modern Tech, Modern India</span>
      </div>
      {props.children}
    </BaseLayout>
  </ThemeProvider>
);

export default IndiaModernLayout; 