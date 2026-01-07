// Navigation and active link highlighting
document.addEventListener('DOMContentLoaded', function() {
  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath.endsWith(linkPath) || 
        (currentPath === '/' && linkPath === 'index.html') ||
        (currentPath.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Mobile menu toggle (if needed)
  const sidebar = document.getElementById('sidebar');
  // Add mobile menu toggle functionality here if needed
});

// Copy code button functionality
document.addEventListener('DOMContentLoaded', function() {
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block');
      const code = codeBlock.querySelector('pre code');
      const text = code.textContent;
      
      navigator.clipboard.writeText(text).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.background = '#05A861';
        this.style.color = '#FFFFFF';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.background = 'transparent';
          this.style.color = '#D4D4D4';
        }, 2000);
      });
    });
  });
});

