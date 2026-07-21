/* scroll-reveal.js - IntersectionObserver for reveal animations on scroll */
export function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (!revealElements.length) return;
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once element is revealed to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null, // use viewport
    threshold: 0.1, // trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // offset trigger point slightly above bottom fold
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}
