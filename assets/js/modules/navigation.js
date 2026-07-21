/* navigation.js - Header and active link behaviors */
export function initNavigation() {
  const header = document.querySelector('.header');
  
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };
    
    // Initial run in case page is refreshed while scrolled
    checkScroll();
    window.addEventListener('scroll', checkScroll);
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname;
  // Fallback for home paths or root directory structures
  const page = currentPath.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === page || (page === 'index.html' && linkHref === './') || (page === '' && linkHref === './')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
