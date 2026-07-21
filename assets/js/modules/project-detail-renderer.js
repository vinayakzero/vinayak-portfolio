/* project-detail-renderer.js - Drives dynamic project details page */
import { projects } from '../data/projects.js';

export function initProjectDetail() {
  const container = document.getElementById('project-detail-container');
  if (!container) return;
  
  // Parse slug from URL parameters
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  if (!slug) {
    window.location.href = 'projects.html';
    return;
  }
  
  // Find project matching the slug
  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    container.innerHTML = `
      <div class="text-center py-3xl container">
        <h1 class="mb-md">Case Study Not Found</h1>
        <p class="lead mb-xl">The case study slug you requested doesn't exist.</p>
        <a href="projects.html" class="btn btn-primary">Back to Portfolio</a>
      </div>
    `;
    return;
  }
  
  // Dynamic page title update
  document.title = `${project.title} — Vinayak Vallabh Rai Case Study`;
  
  // Define video embed, GitHub/Live buttons based on category
  let mediaHtml = '';
  if (project.videoUrl) {
    const isPortraitAI = (project.slug === 'ai-ugc-campaign-ad' || project.slug === 'ai-product-ad-loop');
    const containerStyle = isPortraitAI 
      ? 'position: relative; overflow: hidden; border-radius: var(--radius-lg); aspect-ratio: 9/16; max-width: 380px; margin: 0 auto var(--space-2xl) auto;' 
      : 'position: relative; overflow: hidden; border-radius: var(--radius-lg); aspect-ratio: 16/9;';
    const mediaStyle = isPortraitAI
      ? 'width: 100%; height: 100%; object-fit: contain; background-color: #000; display: block;'
      : 'width: 100%; height: 100%; object-fit: cover; display: block;';
      
    mediaHtml = `
      <div class="video-container mb-2xl glass" style="${containerStyle}">
        <video style="${mediaStyle}" src="${project.videoUrl}" poster="${project.thumbnail}" controls autoplay loop muted playsinline preload="metadata"></video>
      </div>
    `;
  } else if (project.thumbnail) {
    mediaHtml = `
      <div class="video-container mb-2xl glass" style="position: relative; overflow: hidden; border-radius: var(--radius-lg); aspect-ratio: 16/9;">
        <img style="width: 100%; height: 100%; object-fit: cover; display: block;" src="${project.thumbnail}" alt="${project.title}">
      </div>
    `;
  } else {
    mediaHtml = `
      <div class="thumbnail-placeholder mb-2xl glass flex align-center justify-center" style="aspect-ratio: 16/9; border-radius: var(--radius-lg); background-color: var(--bg-secondary);">
        <svg width="64" height="64" fill="var(--text-muted)" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
        </svg>
      </div>
    `;
  }
  
  // Git and Live Link buttons for frontend/AI work
  let linkButtons = '';
  if (project.githubUrl) {
    linkButtons += `
      <a href="${project.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary">
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="margin-right: 6px;">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub Repository
      </a>
    `;
  }
  if (project.liveUrl && project.liveUrl !== '#') {
    linkButtons += `
      <a href="${project.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary">
        Launch Live Project
      </a>
    `;
  }
  
  // Render workflow step elements
  const workflowHtml = project.workflow ? `
    <div class="mb-2xl">
      <h3 class="mb-lg h3">Creative Process & Workflow</h3>
      <div class="timeline">
        ${project.workflow.map((item, idx) => `
          <div class="timeline-item ${idx % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
              <span class="timeline-date">Phase 0${idx + 1}</span>
              <h4 class="timeline-title">${item.step}</h4>
              <p class="body-sm">${item.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="py-xl">
      <div class="flex justify-between align-center mb-sm">
        <a href="projects.html" class="btn btn-ghost btn-sm" style="padding-left:0;">
          ← Back to Projects
        </a>
        <span class="badge badge-category">${project.subtype}</span>
      </div>
      
      <h1 class="mb-sm text-gradient-white">${project.title}</h1>
      
      <div class="flex flex-wrap gap-md align-center mb-xl">
        <span class="body-sm"><strong>Role:</strong> ${project.role}</span>
        <span class="body-sm">|</span>
        <span class="body-sm"><strong>Timeline:</strong> ${project.timeline}</span>
        <span class="body-sm">|</span>
        <span class="badge ${project.status === 'Completed' ? 'badge-status-completed' : 'badge-status-in-progress'}">${project.status}</span>
      </div>
      
      ${mediaHtml}
      
      <div class="grid grid-cols-1 grid-cols-md-2 gap-xl mb-2xl">
        <div>
          <h3 class="mb-md">Overview & Scope</h3>
          <p class="body-lg mb-lg" style="line-height:1.7;">${project.longDescription}</p>
          <div class="btn-group">
            ${linkButtons}
          </div>
        </div>
        <div>
          <div class="glass p-lg" style="border-radius: var(--radius-lg); height: 100%;">
            <h4 class="mb-md">Project Info</h4>
            <ul class="flex flex-col gap-sm mb-lg">
              <li><strong>Client/Context:</strong> ${project.client}</li>
              <li><strong>Category:</strong> ${project.category.toUpperCase()}</li>
              <li><strong>Project Type:</strong> ${project.subtype}</li>
            </ul>
            <h4 class="mb-sm">Key Technologies & Tools</h4>
            <div class="tag-container">
              ${project.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 grid-cols-md-2 gap-xl mb-2xl">
        <div class="glass p-lg" style="border-radius: var(--radius-lg);">
          <h3 class="mb-sm text-gradient-accent">The Challenge</h3>
          <p>${project.challenges}</p>
        </div>
        <div class="glass p-lg" style="border-radius: var(--radius-lg); border-color: rgba(0, 230, 184, 0.25);">
          <h3 class="mb-sm" style="color: var(--accent-secondary);">The Solution</h3>
          <p>${project.solutions}</p>
        </div>
      </div>
      
      ${workflowHtml}
    </div>
  `;
}
