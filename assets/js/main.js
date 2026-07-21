/* main.js - Central coordinator for the entire portfolio site (No ES6 module dependencies for local filesystem / CORS compatibility) */

/* 1. Loader Module */
function initLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (!loader) return;

  const fadeOut = () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      loader.addEventListener('transitionend', () => {
        loader.style.display = 'none';
      }, { once: true });
    }, 500);
  };

  if (document.readyState === 'complete') {
    fadeOut();
  } else {
    window.addEventListener('load', fadeOut);
  }
}

/* 2. Navigation Module */
function initNavigation() {
  const header = document.querySelector('.header');
  
  if (header) {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };
    
    checkScroll();
    window.addEventListener('scroll', checkScroll);
  }

  // Active Link Highlighting
  const currentPath = window.location.pathname;
  const page = currentPath.split('/').pop() || 'index.html';
  
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === page || (page === 'index.html' && linkHref === './') || (page === '' && linkHref === './')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* 2b. Theme Toggle Module */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
  });
}

/* 3. Mobile Menu Module */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (!toggleBtn || !mobileNav) return;
  
  const openMenu = () => {
    toggleBtn.classList.add('open');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  
  const closeMenu = () => {
    toggleBtn.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  toggleBtn.addEventListener('click', () => {
    if (toggleBtn.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* 4. Scroll Reveal Module */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!revealElements.length) return;
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => revealObserver.observe(element));
}

/* 5. Back to Top Module */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 6. Typing Effect Module */
function initTypingEffect(elementSelector, wordsArray, speed = 100, delay = 2000) {
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
    if (isDeleting) typeSpeed /= 2;
    
    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = delay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsArray.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

/* 7. Stats Counter Module */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;
  
  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;
    
    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        element.textContent = target + (element.getAttribute('data-suffix') || '');
        clearInterval(timer);
      } else {
        element.textContent = current + (element.getAttribute('data-suffix') || '');
      }
    }, stepTime);
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(num => observer.observe(num));
}

/* 8. Contact Form Module */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const feedback = document.getElementById('form-feedback');
  
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
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
    if (!nameInput.value.trim()) { showError(nameInput, 'Name is required.'); isValid = false; } else { showSuccess(nameInput); }
    if (!emailInput.value.trim()) { showError(emailInput, 'Email is required.'); isValid = false; } else if (!validateEmail(emailInput.value.trim())) { showError(emailInput, 'Please enter a valid email.'); isValid = false; } else { showSuccess(emailInput); }
    if (!subjectInput.value.trim()) { showError(subjectInput, 'Subject is required.'); isValid = false; } else { showSuccess(subjectInput); }
    if (!messageInput.value.trim()) { showError(messageInput, 'Message is required.'); isValid = false; } else { showSuccess(messageInput); }
    return isValid;
  };
  
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) checkInputs();
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkInputs()) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please correct form errors.';
      feedback.style.display = 'block';
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending...';
    
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      feedback.className = 'form-feedback success';
      feedback.textContent = 'Thank you! Your message has been sent successfully.';
      feedback.style.display = 'block';
      form.reset();
      [nameInput, emailInput, subjectInput, messageInput].forEach(inp => inp.classList.remove('is-valid'));
    }, 1500);
  });
}

/* 9. Projects Hub Filter Module */
function initProjectFilter() {
  const grid = document.getElementById('projects-grid');
  if (!grid || !window.projects) return;
  
  const searchInput = document.getElementById('project-search');
  const sortSelect = document.getElementById('project-sort');
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('filter') || 'all';
  let searchQuery = '';
  let sortBy = 'newest';
  
  filterButtons.forEach(btn => {
    if (btn.getAttribute('data-filter') === activeCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  const renderProjects = () => {
    let filtered = window.projects.filter(proj => {
      const matchesCategory = activeCategory === 'all' || proj.category === activeCategory;
      const matchesSearch = proj.title.toLowerCase().includes(searchQuery) ||
                            proj.description.toLowerCase().includes(searchQuery) ||
                            proj.tools.some(t => t.toLowerCase().includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
    
    if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    if (!filtered.length) {
      grid.innerHTML = `<div class="no-results text-center py-2xl"><p class="lead">No matches found.</p></div>`;
      return;
    }
    
    grid.innerHTML = filtered.map(proj => {
      const isCompleted = proj.status === 'Completed';
      const statusBadge = isCompleted 
        ? `<span class="badge badge-status-completed">Completed</span>`
        : `<span class="badge badge-status-in-progress">In Progress</span>`;
      const projectIcon = proj.category === 'video' ? 'film' : (proj.category === 'frontend' ? 'code' : 'cpu');
      
      return `
        <article class="card glass glass-hover reveal reveal-inner">
          <div class="card-media" style="position: relative; aspect-ratio: 16/9; overflow: hidden; background-color: var(--bg-secondary);">
            ${proj.videoUrl 
              ? `
                  <video src="${proj.videoUrl}" poster="${proj.thumbnail}" loop muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover; display: block;"></video>
                  <div class="video-hover-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; transition: opacity var(--transition-normal); z-index: 1; pointer-events: none;">
                    <svg width="32" height="32" fill="#ffffff" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                `
              : `
                  <img src="${proj.thumbnail}" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                `
            }
            <div style="position: absolute; bottom: 8px; right: 8px; font-size: 0.75rem; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; z-index: 2;">
              ${proj.subtype}
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
            <a href="project-detail.html?slug=${proj.slug}" class="btn btn-secondary btn-sm mt-auto" style="width: 100%;">View Case Study</a>
          </div>
        </article>
      `;
    }).join('');
    
    const innerReveals = grid.querySelectorAll('.reveal-inner');
    const innerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed'); });
    }, { threshold: 0.05 });
    innerReveals.forEach(el => innerObserver.observe(el));

    // Bind video hover triggers to newly rendered cards
    initHoverVideoPlayback();
  };
  
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
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      renderProjects();
    });
  });
  
  renderProjects();
}

/* 10. Project Details Template Module */
function initProjectDetail() {
  const container = document.getElementById('project-detail-container');
  if (!container || !window.projects) return;
  
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  if (!slug) {
    window.location.href = 'projects.html';
    return;
  }
  
  const project = window.projects.find(p => p.slug === slug);
  if (!project) {
    container.innerHTML = `
      <div class="text-center py-3xl container">
        <h1 class="mb-md">Case Study Not Found</h1>
        <a href="projects.html" class="btn btn-primary">Back to Portfolio</a>
      </div>
    `;
    return;
  }
  
  document.title = `${project.title} — Vinayak Vallabh Rai Case Study`;
  
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
        <svg width="64" height="64" fill="var(--text-muted)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/></svg>
      </div>
    `;
  }
  
  let linkButtons = '';
  if (project.githubUrl) {
    linkButtons += `
      <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub Repository</a>
    `;
  }
  if (project.liveUrl && project.liveUrl !== '#') {
    linkButtons += `
      <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">Launch Project</a>
    `;
  }
  
  const workflowHtml = project.workflow ? `
    <div class="mb-2xl">
      <h3 class="mb-lg">Creative Process & Workflow</h3>
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
        <a href="projects.html" class="btn btn-ghost btn-sm" style="padding-left:0;">← Back to Projects</a>
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
          <p class="body-lg mb-lg">${project.longDescription}</p>
          <div class="btn-group">${linkButtons}</div>
        </div>
        <div>
          <div class="glass p-lg" style="border-radius: var(--radius-lg); height: 100%;">
            <h4 class="mb-md">Project Info</h4>
            <ul class="flex flex-col gap-sm mb-lg">
              <li><strong>Client:</strong> ${project.client}</li>
              <li><strong>Category:</strong> ${project.category.toUpperCase()}</li>
            </ul>
            <h4 class="mb-sm">Tools Used</h4>
            <div class="tag-container">${project.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 grid-cols-md-2 gap-xl mb-2xl">
        <div class="glass p-lg" style="border-radius: var(--radius-lg);">
          <h3 class="mb-sm text-gradient-accent">The Challenge</h3>
          <p>${project.challenges}</p>
        </div>
        <div class="glass p-lg" style="border-radius: var(--radius-lg);">
          <h3 class="mb-sm" style="color: var(--accent-secondary);">The Solution</h3>
          <p>${project.solutions}</p>
        </div>
      </div>
      ${workflowHtml}
    </div>
  `;
}

/* 11. Skills Page Renderer */
function renderSkillsPage() {
  const categoriesContainer = document.getElementById('skills-categories-container');
  const roadmapContainer = document.getElementById('skills-roadmap-container');
  
  if (categoriesContainer && window.skillCategories) {
    categoriesContainer.innerHTML = window.skillCategories.map(cat => {
      const skillsHtml = cat.skills.map(skill => {
        const hasLevel = typeof skill.level === 'number';
        const barHtml = hasLevel ? `
          <div class="skill-level-bar-container">
            <div class="skill-level-bar" data-width="${skill.level}%" style="width: 0%; transition: width 1.5s ease-out;"></div>
          </div>
        ` : '';
        return `
          <div class="skill-item mb-md" style="display: flex; align-items: flex-start; gap: var(--space-sm);">
            <div class="skill-icon-wrapper" style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: var(--accent-primary); flex-shrink: 0; margin-top: 2px;">
              ${skill.icon || ''}
            </div>
            <div style="flex-grow: 1;">
              <div class="skill-info" style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-weight: 600;">${skill.name}</strong>
                ${hasLevel ? `<span style="color: var(--accent-primary); font-weight: 600;">${skill.level}%</span>` : ''}
              </div>
              ${barHtml}
            </div>
          </div>
        `;
      }).join('');
      
      return `
        <div class="card glass p-lg reveal">
          <h3 class="mb-lg text-gradient-accent">${cat.title}</h3>
          <div class="skills-list">${skillsHtml}</div>
        </div>
      `;
    }).join('');
    
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
  
  if (roadmapContainer && window.learningRoadmap) {
    roadmapContainer.innerHTML = window.learningRoadmap.map(item => `
      <div class="roadmap-step reveal" style="display: flex; align-items: flex-start; gap: var(--space-md); padding: var(--space-lg);">
        <div class="roadmap-icon-wrapper" style="width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--accent-primary); fill: currentColor; margin-top: 4px;">
          ${item.icon || ''}
        </div>
        <div style="flex-grow: 1;">
          <div class="flex justify-between align-center mb-xs flex-wrap gap-xs">
            <h4 style="margin: 0; font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">${item.goal}</h4>
            <span class="badge ${item.status === 'In Progress' ? 'badge-status-in-progress' : 'badge-status-completed'}" style="font-size: 0.75rem; padding: 2px 8px;">${item.status}</span>
          </div>
          <span class="caption" style="display: block; color: var(--text-muted); font-size: 0.85rem; margin-top: var(--space-xs);">Target: ${item.timeframe}</span>
        </div>
      </div>
    `).join('');
  }
}

/* 12. Experience Page Renderer */
function renderExperiencePage() {
  const workContainer = document.getElementById('experience-work-container');
  const eduContainer = document.getElementById('experience-education-container');
  
  if (workContainer && window.experiences) {
    workContainer.innerHTML = window.experiences.map(exp => `
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
  
  if (eduContainer && window.education) {
    eduContainer.innerHTML = window.education.map((edu, idx) => `
      <div class="timeline-item ${idx % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'} reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <span class="timeline-date">${edu.period}</span>
          <h3 class="timeline-title">${edu.degree}</h3>
          <h4 class="timeline-subtitle">${edu.institution}</h4>
          <p class="body-sm">${edu.description}</p>
        </div>
      </div>
    `).join('');
  }
}

/* 13. Video Portfolio Renderer */
function renderVideoPortfolio() {
  const container = document.getElementById('video-portfolio-grid');
  if (!container || !window.projects) return;
  
  const videoProjects = window.projects.filter(p => p.category === 'video');
  container.innerHTML = videoProjects.map(proj => `
    <article class="card glass glass-hover reveal" onclick="window.location.href='project-detail.html?slug=${proj.slug}'" style="cursor: pointer;">
      <div class="card-media" style="position: relative; aspect-ratio: 16/9; overflow: hidden; background-color: var(--bg-secondary);">
        <video src="${proj.videoUrl}" poster="${proj.thumbnail}" loop muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover; display: block;"></video>
        <div class="video-hover-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; transition: opacity var(--transition-normal); z-index: 1; pointer-events: none;">
          <div class="play-btn-circle" style="width: 48px; height: 48px; border-radius: var(--radius-full); background: var(--accent-gradient); display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-md); color: var(--text-primary);">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
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
        <div class="tag-container mb-md">${proj.tools.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <a href="project-detail.html?slug=${proj.slug}" class="btn btn-secondary btn-sm mt-auto" style="width:100%;">View Case Details</a>
      </div>
    </article>
  `).join('');
}

/* 14. Frontend Portfolio Renderer */
function renderFrontendPortfolio() {
  const container = document.getElementById('frontend-portfolio-grid');
  if (!container || !window.projects) return;
  
  const devProjects = window.projects.filter(p => p.category === 'frontend' || p.category === 'ai');
  container.innerHTML = devProjects.map(proj => `
    <article class="card glass glass-hover reveal">
      <div class="card-media" style="position: relative; aspect-ratio: 16/9; overflow: hidden; background-color: var(--bg-secondary);">
        ${proj.videoUrl 
          ? `
              <video src="${proj.videoUrl}" poster="${proj.thumbnail}" loop muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: cover; display: block;"></video>
              <div class="video-hover-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; transition: opacity var(--transition-normal); z-index: 1; pointer-events: none;">
                <svg width="32" height="32" fill="#ffffff" viewBox="0 0 24 24" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            `
          : `
              <img src="${proj.thumbnail}" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;">
            `
        }
        <span class="badge badge-status-completed" style="position: absolute; top: 12px; right: 12px; z-index: 2;">${proj.subtype}</span>
      </div>
      <div class="card-body">
        <div class="flex justify-between align-center mb-xs">
          <span class="eyebrow">${proj.role}</span>
          <span class="badge ${proj.status === 'Completed' ? 'badge-status-completed' : 'badge-status-in-progress'}">${proj.status}</span>
        </div>
        <h3 class="card-title">${proj.title}</h3>
        <p class="card-text">${proj.description}</p>
        <div class="tag-container mb-md">${proj.tools.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <a href="project-detail.html?slug=${proj.slug}" class="btn btn-secondary btn-sm mt-auto" style="width:100%;">View Case Details</a>
      </div>
    </article>
  `).join('');
}

/* 15. Services Page Renderer */
function renderServicesPage() {
  const servicesContainer = document.getElementById('services-list-container');
  const faqContainer = document.getElementById('services-faq-container');
  
  if (servicesContainer && window.services) {
    servicesContainer.innerHTML = window.services.map(service => {
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
            <ul class="service-feature-list mb-xl">${detailsHtml}</ul>
            <a href="contact.html?subject=Inquiry: ${encodeURIComponent(service.title)}" class="btn btn-secondary btn-sm mt-auto" style="width:100%;">Inquire About Service</a>
          </div>
        </div>
      `;
    }).join('');
  }
  
  if (faqContainer && window.faqList) {
    faqContainer.innerHTML = window.faqList.map((faq, idx) => `
      <div class="faq-item reveal">
        <div class="faq-question" data-idx="${idx}">
          <span>${faq.question}</span>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="transition: transform var(--transition-normal);"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
        </div>
        <div class="faq-answer mt-xs" id="faq-ans-${idx}">
          <p class="body-md">${faq.answer}</p>
        </div>
      </div>
    `).join('');
    
    const questions = faqContainer.querySelectorAll('.faq-question');
    questions.forEach(q => {
      q.addEventListener('click', () => {
        const idx = q.getAttribute('data-idx');
        const ans = document.getElementById(`faq-ans-${idx}`);
        const icon = q.querySelector('svg');
        const isVisible = ans.style.display === 'block';
        
        faqContainer.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
        faqContainer.querySelectorAll('.faq-question svg').forEach(svg => svg.style.transform = 'rotate(0deg)');
        
        if (!isVisible) {
          ans.style.display = 'block';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });
  }
}

/* Hover Video Playback Module */
function initHoverVideoPlayback() {
  const cards = document.querySelectorAll('.featured-card, .card');
  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;

    const playVideo = () => {
      video.play().catch(err => {
        console.log("Hover video playback blocked: ", err);
      });
    };

    const pauseVideo = () => {
      video.pause();
      video.currentTime = 0;
    };

    card.addEventListener('mouseenter', playVideo);
    card.addEventListener('mouseleave', pauseVideo);
  });
}

/* 19. Custom Animated Cursor */
function initCustomCursor() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const outline = document.createElement('div');
  outline.className = 'custom-cursor-outline';
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = 0;
  let mouseY = 0;
  let outlineX = 0;
  let outlineY = 0;
  let isVisible = false;
  const delay = 0.15;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;

    if (!isVisible) {
      dot.classList.add('custom-cursor-visible');
      outline.classList.add('custom-cursor-visible');
      isVisible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('custom-cursor-visible');
    outline.classList.remove('custom-cursor-visible');
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    dot.classList.add('custom-cursor-visible');
    outline.classList.add('custom-cursor-visible');
    isVisible = true;
  });

  window.addEventListener('mousedown', () => {
    dot.classList.add('custom-cursor-clicked');
    outline.classList.add('custom-cursor-clicked');
  });

  window.addEventListener('mouseup', () => {
    dot.classList.remove('custom-cursor-clicked');
    outline.classList.remove('custom-cursor-clicked');
  });

  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target && (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.btn') ||
      target.closest('.card') ||
      target.closest('.featured-card') ||
      target.closest('input') ||
      target.closest('select') ||
      target.closest('textarea') ||
      target.closest('[role="button"]')
    )) {
      dot.classList.add('custom-cursor-hovered');
      outline.classList.add('custom-cursor-hovered');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target && (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.btn') ||
      target.closest('.card') ||
      target.closest('.featured-card') ||
      target.closest('input') ||
      target.closest('select') ||
      target.closest('textarea') ||
      target.closest('[role="button"]')
    )) {
      const related = e.relatedTarget;
      if (!related || !related.closest('a, button, .btn, .card, .featured-card, input, select, textarea, [role="button"]')) {
        dot.classList.remove('custom-cursor-hovered');
        outline.classList.remove('custom-cursor-hovered');
      }
    }
  });

  const updateOutlinePosition = () => {
    outlineX += (mouseX - outlineX) * delay;
    outlineY += (mouseY - outlineY) * delay;
    outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate3d(-50%, -50%, 0)`;
    requestAnimationFrame(updateOutlinePosition);
  };
  requestAnimationFrame(updateOutlinePosition);
}

/* DOM Bootstrap Trigger */
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initLoader();
  initNavigation();
  initThemeToggle();
  initMobileMenu();
  initBackToTop();
  
  if (document.querySelector('.hero-typing')) {
    initTypingEffect(
      '.hero-typing', 
      ['Documentary Video Editor', 'Front-End Developer', 'AI Creator'], 
      100, 
      2000
    );
  }
  
  if (document.querySelectorAll('.stat-number').length > 0) {
    initStatsCounter();
  }
  
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
  
  if (document.getElementById('projects-grid')) {
    initProjectFilter();
  }
  
  if (document.getElementById('project-detail-container')) {
    initProjectDetail();
  }
  
  if (document.getElementById('skills-categories-container')) {
    renderSkillsPage();
  }
  
  if (document.getElementById('experience-work-container')) {
    renderExperiencePage();
  }
  
  if (document.getElementById('video-portfolio-grid')) {
    renderVideoPortfolio();
  }
  
  if (document.getElementById('frontend-portfolio-grid')) {
    renderFrontendPortfolio();
  }
  
  if (document.getElementById('services-list-container')) {
    renderServicesPage();
  }

  // Run scroll reveal and video play controllers after all dynamic elements are rendered in DOM
  initScrollReveal();
  initHoverVideoPlayback();
});
