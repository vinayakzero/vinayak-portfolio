/* video-portfolio-renderer.js - Dynamically renders the video cards */
import { projects } from '../data/projects.js';

export function renderVideoPortfolio() {
  const container = document.getElementById('video-portfolio-grid');
  if (!container) return;
  
  const videoProjects = projects.filter(p => p.category === 'video');
  
  container.innerHTML = videoProjects.map(proj => `
    <article class="card glass glass-hover reveal" data-id="${proj.id}">
      <div class="video-play-card" onclick="window.location.href='project-detail.html?slug=${proj.slug}'">
        <!-- Mock Video Poster -->
        <div style="background-color: var(--bg-secondary); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; aspect-ratio: 16/9;">
          <svg width="48" height="48" fill="var(--text-muted)" viewBox="0 0 24 24">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
          </svg>
          <div class="video-play-overlay">
            <div class="play-btn-circle">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style="margin-left: 2px;">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="flex justify-between align-center mb-xs">
          <span class="eyebrow">${proj.role}</span>
          <span class="badge badge-status-completed">${proj.timeline}</span>
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
