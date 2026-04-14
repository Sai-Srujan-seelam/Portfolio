# ⚡ Srujan Seelam — Personal Portfolio

> **"I don't just write code — I forge systems that move people."**

A cosmic-themed personal portfolio showcasing my work in AI/ML, startups, research, and life beyond code.

🔗 **Live:** [srujanseelam.com](https://srujanseelam.com) *(deploy to your domain)*

---

## ✨ Features

- **Cosmic Particle Canvas** — Interactive star field with mouse-reactive particles and connection lines
- **Scroll-Triggered Animations** — Intersection Observer-based reveals with staggered timing
- **Text Cycling** — Typewriter effect in the hero section
- **3D Card Tilt** — Perspective-based hover effects on project cards
- **Animated Stats Counter** — Numbers count up when scrolled into view
- **Cursor Glow Trail** — Subtle radial gradient following the mouse
- **Scroll Progress Bar** — Gradient progress indicator at the top
- **Mobile-First Responsive** — Full responsive design with mobile menu
- **Noise Texture Overlay** — Subtle grain for depth and character
- **Performance Adaptive** — Automatically reduces particles on low-FPS devices

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Display Font** | Syne (800) |
| **Body Font** | Outfit (400/500) |
| **Mono Font** | JetBrains Mono |
| **Primary BG** | `#06060a` (Void Black) |
| **Purple Accent** | `#8b5cf6` (Nebula) |
| **Cyan Accent** | `#06b6d4` (Cosmic) |
| **Orange Accent** | `#f97316` (Forge) |

## 📁 Structure

```
portfolio/
├── index.html          # Complete HTML structure
├── styles.css          # Full CSS design system
├── script.js           # Animations & interactions
├── DOCUMENTATION.md    # Detailed project documentation
└── README.md           # This file
```

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/srujanseelam/portfolio.git
cd portfolio

# Open locally
open index.html
# or use a local server:
npx serve .
```

## 🌐 Deployment

### GitHub Pages
1. Push to a repo
2. Go to Settings → Pages
3. Select branch: `main`, folder: `/ (root)`
4. Your site will be at `username.github.io/portfolio`

### Vercel
```bash
npx vercel
```

### Netlify
Drag & drop the folder at [app.netlify.com/drop](https://app.netlify.com/drop)

## ✏️ Customization

### Update Content
All content is in `index.html` — edit text directly.

### Change Colors
Edit CSS variables at the top of `styles.css`:
```css
:root {
  --nebula: #8b5cf6;    /* Purple accent */
  --cosmic: #06b6d4;    /* Cyan accent */
  --forge: #f97316;     /* Orange accent */
}
```

### Add Projects
Copy a `.project-card` block in the work section and update content.

### Add Profile Photo
Replace the SVG icons in venture cards with an `<img>` tag, or add a photo to the hero section.

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No dependencies, no build step
- **Canvas API** — Particle system
- **Intersection Observer** — Scroll-triggered effects
- **Google Fonts** — Syne, Outfit, JetBrains Mono

**Zero dependencies. No frameworks. No build tools. Just open and go.**

## 📊 Sections

1. **Hero** — Animated intro with text cycling & availability status
2. **Manifesto** — Personal story + impact stats
3. **Ventures** — Disciplix AI & WonderAvenues
4. **Work** — 6 project cards (research, clients, AI)
5. **Arsenal** — Technical skills organized by category
6. **Life** — Fitness, rave culture, gaming, travel, philosophy
7. **Connect** — Email, LinkedIn, GitHub, links

## 📄 License

Personal portfolio — feel free to use as inspiration. Please don't copy content directly.

---

**Built by Srujan Seelam** · Richmond, VA · 2026
