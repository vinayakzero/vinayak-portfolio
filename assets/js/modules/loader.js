/* loader.js - Preloader controller */
export function initLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (!loader) return;

  const fadeOut = () => {
    // Add small delay to ensure loading bar finishes animation smoothly
    setTimeout(() => {
      loader.classList.add('fade-out');
      
      // Remove loader from DOM after transition completes
      loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
      }, { once: true });
    }, 500);
  };

  // If page is already loaded, fade out immediately
  if (document.readyState === 'complete') {
    fadeOut();
  } else {
    window.addEventListener('load', fadeOut);
  }
}
