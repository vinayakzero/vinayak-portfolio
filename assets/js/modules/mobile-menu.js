/* mobile-menu.js - Mobile navigation menu toggle and overlay actions */
export function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!toggleBtn || !mobileNav) return;
  
  const toggleMenu = () => {
    const isOpen = toggleBtn.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };
  
  const openMenu = () => {
    toggleBtn.classList.add('open');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden'; // disable page scrolling while menu open
  };
  
  const closeMenu = () => {
    toggleBtn.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = ''; // restore scrolling
  };
  
  toggleBtn.addEventListener('click', toggleMenu);
  
  // Close menu when clicking mobile links
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  // Close menu if window is resized past mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}
