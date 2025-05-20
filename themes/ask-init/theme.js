// Theme initialization and dark mode toggle
(function() {
  // Check for saved user preference, if any, on load and set the theme accordingly
  const savedTheme = localStorage.getItem('theme') || 'light';
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set the theme based on saved preference or system preference
  function setTheme(theme) {
    if (theme === 'dark' || (!theme && prefersDarkScheme.matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  // Set initial theme
  setTheme(savedTheme);

  // Listen for system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Toggle theme function
  window.toggleTheme = function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  // Mobile menu toggle
  window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
      menu.classList.toggle('block');
    }
  };

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const menuButton = document.querySelector('[aria-label="Toggle menu"]');
    
    if (menu && menuButton && !menu.contains(event.target) && !menuButton.contains(event.target)) {
      menu.classList.add('hidden');
      menu.classList.remove('block');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('block');
        }
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add active class to current navigation item
  document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.gpr-nav a');
    
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || 
          (linkPath === 'index.html' && currentPath === '') ||
          (linkPath === 'posts/' && currentPath.startsWith('post'))) {
        link.classList.add('active');
      }
    });
  });
})();
