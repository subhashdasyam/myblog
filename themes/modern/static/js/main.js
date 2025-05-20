document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const desktopThemeToggle = document.getElementById('desktop-theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply theme
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.classList.add('dark');
  }
  
  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('opacity-0');
      mobileMenu.classList.toggle('translate-y-0');
      mobileMenu.classList.toggle('-translate-y-2');
      
      // Toggle menu icon between hamburger and X
      const menuIcon = this.querySelector('svg');
      if (menuIcon) {
        menuIcon.classList.toggle('hidden');
        const closeIcon = this.querySelector('svg[aria-hidden="true"]');
        if (closeIcon) closeIcon.classList.toggle('hidden');
      }
      
      // Toggle body scroll
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });
  }
  
  // Theme toggle function
  function toggleTheme() {
    const isDark = html.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Dispatch event for other components
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { isDark } }));
  }
  
  // Theme toggle event listeners
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
  
  if (desktopThemeToggle) {
    desktopThemeToggle.addEventListener('click', toggleTheme);
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (mobileMenu && !mobileMenu.contains(event.target) && 
        mobileMenuButton && !mobileMenuButton.contains(event.target) &&
        !mobileMenu.classList.contains('hidden')) {
      mobileMenuButton.click();
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenuButton.click();
        }
        
        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without adding to history
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });
  
  // Handle back/forward navigation with smooth scroll
  window.addEventListener('popstate', function() {
    const hash = window.location.hash;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  
  // Initialize tooltips
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', showTooltip);
    trigger.addEventListener('mouseleave', hideTooltip);
    trigger.addEventListener('focus', showTooltip);
    trigger.addEventListener('blur', hideTooltip);
  });
  
  function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position tooltip above the element
    tooltip.style.position = 'fixed';
    tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
    tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
    tooltip.style.pointerEvents = 'none';
    
    // Add animation
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(10px)';
    tooltip.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    
    // Trigger reflow
    tooltip.offsetHeight;
    
    // Animate in
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
    
    // Store reference to remove later
    this._tooltip = tooltip;
  }
  
  function hideTooltip() {
    if (this._tooltip) {
      // Animate out
      this._tooltip.style.opacity = '0';
      this._tooltip.style.transform = 'translateY(10px)';
      
      // Remove after animation
      setTimeout(() => {
        if (this._tooltip && this._tooltip.parentNode) {
          this._tooltip.parentNode.removeChild(this._tooltip);
          this._tooltip = null;
        }
      }, 200);
    }
  }
  
  // Handle form submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // If it's a form with a submit handler, don't prevent default
      if (this.onsubmit) return;
      
      // Otherwise handle form submission
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const formAction = this.getAttribute('action');
      const formMethod = this.getAttribute('method') || 'POST';
      
      // You can add AJAX form submission here if needed
      console.log('Form submitted:', {
        action: formAction,
        method: formMethod,
        data: Object.fromEntries(formData.entries())
      });
      
      // Show success message if there's a message element
      const messageElement = this.querySelector('.form-message') || 
                           document.getElementById('form-message');
      
      if (messageElement) {
        messageElement.textContent = 'Thank you for your message!';
        messageElement.className = 'form-message text-green-600 dark:text-green-400 mt-2 text-sm';
        this.reset();
      }
    });
  });
  
  // Add focus styles for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
  });
  
  // Lazy load images
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    script.integrity = 'sha512-q583ppKrCRc7N5O0n2nUiJ+suUv7Et1JGels4bXOq++Q0RwhHk8dHwQpK8d1q4d3Z1fF8Cv2sQ1uY5HvF1w==';
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }
});

// Newsletter subscription handler
function subscribeNewsletter(form) {
  const email = form.querySelector('input[type="email"]').value;
  const messageElement = document.getElementById('newsletter-message');
  
  // Simple validation
  if (!email) {
    showMessage(messageElement, 'Please enter your email address', 'error');
    return;
  }
  
  // Here you would typically send the email to your server
  // For now, we'll just show a success message
  console.log('Subscribing email:', email);
  
  // Show success message
  showMessage(messageElement, 'Thank you for subscribing!', 'success');
  form.reset();
  
  // You would typically make an AJAX request here
  // fetch('/api/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   showMessage(messageElement, data.message || 'Subscription successful!', 'success');
  //   form.reset();
  // })
  // .catch(error => {
  //   console.error('Error:', error);
  //   showMessage(messageElement, 'An error occurred. Please try again.', 'error');
  // });
}

function showMessage(element, message, type) {
  if (!element) return;
  
  element.textContent = message;
  element.className = 'text-sm mt-2 ' + (
    type === 'error' ? 'text-red-600 dark:text-red-400' : 
    type === 'success' ? 'text-green-600 dark:text-green-400' : 
    'text-gray-600 dark:text-gray-400'
  );
  
  // Auto-hide message after 5 seconds
  setTimeout(() => {
    element.textContent = '';
    element.className = 'text-sm mt-2';
  }, 5000);
}
