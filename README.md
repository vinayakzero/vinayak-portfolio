# Vinayak Vallabh Rai — Professional Portfolio

A premium, modern, responsive portfolio showcasing professional work in **Documentary Video Editing**, **AI Creator Workflows**, **Front-End Development**, and **Graphic Design**. Built with a dark-theme, slate-blue glassmorphic aesthetic, custom-engineered animations, dynamic project filtering, and fully self-contained offline media streams.

## 🚀 Live Preview & Deployment
This portfolio is optimized for zero-dependency static hosting and is ready for instant deployment on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

## ✨ Core Skillsets
- **AI Skills**: AI UGC & Product Ads, AI Image & Video Generation, AI Animation, AI Documentary Creation, Strong Visual Storytelling.
- **Video Editing**: Filmora, Documentary Editing, Storytelling, Video Production.
- **Front-End Development**: HTML5, CSS3, basic WordPress layouts.
- **Graphic Design**: Adobe Photoshop, Adobe Illustrator, Figma, Canva.

## 🛠️ Key Features
- **AI Creator Showcase & Auto-Play on Hover**: Auto-playing video project previews with fallback poster images and immediate playback reset on mouse leave.
- **Interactive Custom Animated Cursor**: A premium dual-element cursor (dot + trailing outline) running at 60 FPS using linear interpolation (`lerp`) and hardware-accelerated `translate3d()`, with automatic touch-screen fallback.
- **Dynamic Projects Filtering & Search**: Client-side project index rendering search, filters (AI Creator, Video Editing, Web Development, Graphic & UI Design), and sorting instantly without page reloads.
- **Single Source of Truth Databases**: Organized modular database lists in JS (`projects.js`, `skills.js`, `experience.js`, `services.js`) feeding templates dynamically.
- **Dual-Theme Aesthetic Toggle**: Responsive theme switcher preserving user choices locally across sessions.

## 📂 Project Structure
```text
Portfolio/
├── index.html                   # Main Home Entry Point
├── about.html                   # About Page
├── skills.html                  # Skills Page & Roadmap
├── experience.html              # Work Experience Timeline
├── resume.html                  # Resume View
├── projects.html                # Project Hub (dynamic filtering)
├── video-portfolio.html         # Documentary category details
├── frontend-portfolio.html      # Frontend category details
├── services.html                # Offered services listing
├── contact.html                 # Contact form with validation
├── 404.html                     # Custom 404 Error page
├── assets/
│   ├── css/                     # Modulized styling sheets
│   │   ├── base/                # Reset, variables, typography, utilities
│   │   ├── components/          # Cards, buttons, navigation, custom cursor
│   │   └── pages/               # Specific page stylesheets
│   ├── js/                      # Page logic scripts
│   │   ├── data/                # Single source of truth databases
│   │   └── modules/             # Navigation, loader
│   ├── images/                  # Local portraits and project posters
│   └── videos/                  # Local optimized MP4 previews
└── README.md                    # Project documentation
```

## 💻 Running Locally
No build tools or framework compilations are required. You can preview the website locally using any of these simple options:

1. **Direct Preview**: Double-click **`index.html`** in your file explorer.
2. **VS Code Live Server**: If using VS Code, right-click `index.html` and select `Open with Live Server`.
3. **Python Server**: Run `python -m http.server 8000` inside this folder and open `http://localhost:8000`.

## 📄 License
This project is for personal showcase and portfolio presentation. All media assets are local royalty-free samples or custom compositions.
