/* project-filter.js - Filter, Search, and Sort portfolio grid cards */
import { projects } from '../data/projects.js';

export function initProjectFilter() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  const searchInput = document.getElementById('project-search');
  const sortSelect = document.getElementById('project-sort');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('filter') || 'all';
  let searchQuery = '';
  let sortBy = 'newest'; // newest, oldest, alphabetical
  
  // Align active buttons state with activeCategory
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-filter') === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  const renderProjects = () => {
    // 1. Filter by category & search query
    let filtered = projects.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery) ||
                            project.description.toLowerCase().includes(searchQuery) ||
                            project.tools.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
    
    // 2. Sort projects
    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'oldest') {
      // Mock timelines or date values to sort. Since timelines are strings, let's look at order in list or parsing timelines
      filtered.sort((a, b) => a.id.localeCompare(b.id)); 
    } else {
      // Default / newest: we keep the data array order (which is newest first)
      // No change or reverse a-b
    }
    
    // 3. Generate HTML
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results text-center py-2xl">
                          <p class="lead">No projects match your criteria.</p>
                          <button class="btn btn-secondary btn-sm mt-md" id="reset-filters">Reset Filters</button>
                        </div>`;
      const resetBtn = document.getElementById('reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (searchInput) searchInput.value = '';
          searchQuery = '';
          activeCategory = 'all';
          filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === 'all') btn.classList.add('active');
            else btn.classList.remove('active');
          });
          renderProjects();
        });
      }
      return;
    }
    
    grid.innerHTML = filtered.map(proj => {
      const isCompleted = proj.status === 'Completed';
      const statusBadge = isCompleted 
        ? `<span class="badge badge-status-completed">Completed</span>`
        : `<span class="badge badge-status-in-progress">In Progress</span>`;
        
      const detailLink = `project-detail.html?slug=${proj.slug}`;
      const projectIcon = proj.category === 'video' ? 'film' : (proj.category === 'frontend' ? 'code' : 'cpu');
      
      return `
        <article class="card glass glass-hover reveal reveal-inner" data-id="${proj.id}">
          <div class="card-media">
            <div style="background-color: var(--bg-secondary); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative;">
              <!-- Mock Thumbnail Image or SVG -->
              <svg width="48" height="48" fill="var(--text-muted)" viewBox="0 0 24 24">
                ${projectIcon === 'film' 
                  ? '<path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>'
                  : projectIcon === 'code'
                  ? '<path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>'
                  : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>'
                }
              </svg>
              <div style="position: absolute; bottom: 8px; right: 8px; font-size: 0.75rem; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px;">
                ${proj.subtype}
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="flex justify-between align-center mb-xs">
              <span class="eyebrow">${proj.role}</span>
              ${statusBadge}
            </div>
            <h3 class="card-title">${proj.title}</h3>
            <p class="card-text">${proj.description}</p>
            <div class="tag-container mb-md">
              ${proj.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
            </div>
            <a href="${detailLink}" class="btn btn-secondary btn-sm mt-auto" style="width: 100%;">View Case Study</a>
          </div>
        </article>
      `;
    }).join('');
    
    // Trigger scroll reveal observer on newly created grid elements
    const innerReveals = grid.querySelectorAll('.reveal-inner');
    const innerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.05 });
    innerReveals.forEach(el => innerObserver.observe(el));
  };
  
  // Set up listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProjects();
    });
  }
  
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderProjects();
    });
  }
  
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.getAttribute('data-filter');
      renderProjects();
    });
  });
  
  // Initial Render
  renderProjects();
}
