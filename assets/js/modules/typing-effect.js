/* typing-effect.js - Renders a typewriter effect for hero subtitles */
export function initTypingEffect(elementSelector, wordsArray, speed = 100, delay = 2000) {
  const element = document.querySelector(elementSelector);
  if (!element) return;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let txt = '';
  
  function type() {
    const currentWord = wordsArray[wordIndex];
    
    if (isDeleting) {
      txt = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      txt = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    element.textContent = txt;
    
    let typeSpeed = speed;
    
    if (isDeleting) {
      typeSpeed /= 2; // delete faster
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = delay; // pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsArray.length;
      typeSpeed = 500; // brief pause before starting new word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}
