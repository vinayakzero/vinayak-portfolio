/* experience-renderer.js - Dynamically renders professional and educational timelines */
import { experiences, education } from '../data/experience.js';

export function renderExperiencePage() {
  const workContainer = document.getElementById('experience-work-container');
  const eduContainer = document.getElementById('experience-education-container');
  
  if (workContainer) {
    workContainer.innerHTML = experiences.map(exp => `
      <div class="card glass p-lg reveal mb-xl">
        <div class="flex justify-between align-center flex-wrap gap-xs mb-md">
          <div>
            <h3 class="mb-xs">${exp.role}</h3>
            <span class="body-md text-gradient-accent"><strong>${exp.company}</strong> · ${exp.location}</span>
          </div>
          <span class="badge badge-status-completed">${exp.period}</span>
        </div>
        <p class="body-md mb-md text-secondary">${exp.description}</p>
        <ul class="role-achievement-list">
          ${exp.achievements.map(ach => `<li>${ach}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }
  
  if (eduContainer) {
    eduContainer.innerHTML = education.map((edu, idx) => `
      <div class="timeline-item ${idx % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'} reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-date">${edu.period}</span>
          <h3 class="timeline-title">${edu.degree}</h3>
          <h4 class="timeline-subtitle">${edu.institution} · ${edu.location}</h4>
          <p class="body-sm">${edu.description}</p>
        </div>
      </div>
    `).join('');
  }
}
