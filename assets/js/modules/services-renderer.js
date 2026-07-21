/* services-renderer.js - Dynamically renders services cards and handles FAQ interactions */
import { services, faqList } from '../data/services.js';

export function renderServicesPage() {
  const servicesContainer = document.getElementById('services-list-container');
  const faqContainer = document.getElementById('services-faq-container');
  
  if (servicesContainer) {
    servicesContainer.innerHTML = services.map(service => {
      const detailsHtml = service.details.map(det => `<li>${det}</li>`).join('');
      let cardAccent = '';
      if (service.id === 'frontend-development') cardAccent = 'style="--accent: var(--accent-secondary);"';
      else if (service.id === 'ai-creation-workflows') cardAccent = 'style="--accent: var(--success);"';
      
      return `
        <div class="card glass service-card-expanded card-accent-top reveal" ${cardAccent}>
          <div class="flex flex-col height-full">
            <span class="eyebrow">${service.subtitle}</span>
            <h2 class="mb-md">${service.title}</h2>
            <p class="body-md mb-lg text-secondary">${service.description}</p>
            <h4 class="mb-sm text-gradient-white">Key Deliverables</h4>
            <ul class="service-feature-list mb-xl">
              ${detailsHtml}
            </ul>
            <a href="contact.html?subject=Inquiry: ${encodeURIComponent(service.title)}" class="btn btn-secondary btn-sm mt-auto" style="width:100%;">
              Inquire About Service
            </a>
          </div>
        </div>
      `;
    }).join('');
  }
  
  if (faqContainer) {
    faqContainer.innerHTML = faqList.map((faq, idx) => `
      <div class="faq-item reveal">
        <div class="faq-question" data-idx="${idx}">
          <span>${faq.question}</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="transition: transform var(--transition-normal);">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
        <div class="faq-answer mt-xs" id="faq-ans-${idx}">
          <p class="body-md">${faq.answer}</p>
        </div>
      </div>
    `).join('');
    
    // Set up click listeners for FAQs accordion toggle
    const questions = faqContainer.querySelectorAll('.faq-question');
    questions.forEach(q => {
      q.addEventListener('click', () => {
        const idx = q.getAttribute('data-idx');
        const ans = document.getElementById(`faq-ans-${idx}`);
        const icon = q.querySelector('svg');
        const isVisible = ans.style.display === 'block';
        
        // Hide all answers
        faqContainer.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        faqContainer.querySelectorAll('.faq-question svg').forEach(svg => svg.style.transform = 'rotate(0deg)');
        
        // Toggle current answer
        if (!isVisible) {
          ans.style.display = 'block';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
}
