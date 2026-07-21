/* skills-renderer.js - Dynamically renders skills progress bars and learning roadmap */
import { skillCategories, learningRoadmap } from '../data/skills.js';

export function renderSkillsPage() {
  const categoriesContainer = document.getElementById('skills-categories-container');
  const roadmapContainer = document.getElementById('skills-roadmap-container');
  
  if (categoriesContainer) {
    categoriesContainer.innerHTML = skillCategories.map(cat => {
      const skillsHtml = cat.skills.map(skill => {
        // Only render progress bar if level is defined (e.g. not for soft skills)
        const hasLevel = typeof skill.level === 'number';
        const barHtml = hasLevel ? `
          <div class="skill-level-bar-container">
            <div class="skill-level-bar" data-width="${skill.level}%" style="width: 0%; transition: width 1.5s ease-out-in;"></div>
          </div>
        ` : '';
        const levelPercent = hasLevel ? `<span>${skill.level}%</span>` : '';
        
        return `
          <div class="skill-item mb-md">
            <div class="skill-info">
              <strong>${skill.name}</strong>
              ${levelPercent}
            </div>
            ${barHtml}
          </div>
        `;
      }).join('');
      
      return `
        <div class="card glass p-lg reveal">
          <h3 class="mb-lg text-gradient-accent">${cat.title}</h3>
          <div class="skills-list">
            ${skillsHtml}
          </div>
        </div>
      `;
    }).join('');
    
    // Animate progress bars when entering viewport
    const progressBars = categoriesContainer.querySelectorAll('.skill-level-bar');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute('data-width');
          barObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => barObserver.observe(bar));
  }
  
  if (roadmapContainer) {
    roadmapContainer.innerHTML = learningRoadmap.map(item => `
      <div class="roadmap-step reveal">
        <div class="flex justify-between align-center mb-xs">
          <h4>${item.goal}</h4>
          <span class="badge ${item.status === 'In Progress' ? 'badge-status-in-progress' : 'badge-status-completed'}">${item.status}</span>
        </div>
        <span class="caption">Target Frame: ${item.timeframe}</span>
      </div>
    `).join('');
  }
}
