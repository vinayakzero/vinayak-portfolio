/* contact-form.js - Form validation and submission handlers */
export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const showError = (input, msg) => {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const errSpan = input.nextElementSibling;
    if (errSpan && errSpan.classList.contains('form-error-msg')) {
      errSpan.textContent = msg;
      errSpan.style.display = 'block';
    }
  };
  
  const showSuccess = (input) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const errSpan = input.nextElementSibling;
    if (errSpan && errSpan.classList.contains('form-error-msg')) {
      errSpan.style.display = 'none';
    }
  };
  
  const checkInputs = () => {
    let isValid = true;
    
    // Name Check
    if (!nameInput.value.trim()) {
      showError(nameInput, 'Name is required.');
      isValid = false;
    } else {
      showSuccess(nameInput);
    }
    
    // Email Check
    if (!emailInput.value.trim()) {
      showError(emailInput, 'Email is required.');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      showSuccess(emailInput);
    }
    
    // Subject Check
    if (!subjectInput.value.trim()) {
      showError(subjectInput, 'Subject is required.');
      isValid = false;
    } else {
      showSuccess(subjectInput);
    }
    
    // Message Check
    if (!messageInput.value.trim()) {
      showError(messageInput, 'Message content cannot be blank.');
      isValid = false;
    } else {
      showSuccess(messageInput);
    }
    
    return isValid;
  };
  
  // Realtime keyup validations
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) {
          checkInputs();
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!checkInputs()) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please correct the errors in the form before sending.';
      feedback.style.display = 'block';
      return;
    }
    
    // If validation succeeds, simulate submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    // Simulate API Delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Thank you! Your message has been sent successfully. Vinayak will get in touch soon.';
      feedback.style.display = 'block';
      
      // Reset form
      form.reset();
      [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
        input.classList.remove('is-valid');
      });
    }, 1500);
  });
}
