/* frontend-portfolio-renderer.js - Dynamically renders frontend and web project cards */
import { projects } from '../data/projects.js';

export function renderFrontendPortfolio() {
  const container = document.getElementById('frontend-portfolio-grid');
  if (!container) return;
  
  const devProjects = projects.filter(p => p.category === 'frontend' || p.category === 'ai');
  
  container.innerHTML = devProjects.map(proj => `
    <article class="card glass glass-hover reveal" data-id="${proj.id}">
      <div class="card-media">
        <!-- Mock Thumbnail -->
        <div style="background-color: var(--bg-secondary); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; aspect-ratio: 16/9;">
          <svg width="48" height="48" fill="var(--text-muted)" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
          </svg>
          <span class="badge badge-status-completed" style="position: absolute; top: 12px; right: 12px;">${proj.subtype}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="flex justify-between align-center mb-xs">
          <span class="eyebrow">${proj.role}</span>
          <span class="badge ${proj.status === 'Completed' ? 'badge-status-completed' : 'badge-status-in-progress'}">${proj.status}</span>
        </div>
        <h3 class="card-title">${proj.title}</h3>
        <p class="card-text">${proj.description}</p>
        <div class="tag-container mb-md">
          ${proj.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
        </div>
        <a href="project-detail.html?slug=${proj.slug}" class="btn btn-secondary btn-sm mt-auto" style="width:100%;">View Case Details</a>
      </div>
    </article>
  `).join('');
}
