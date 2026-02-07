# Srujan Seelam — Personal Portfolio Website
## Project Documentation

---

## 1. BRAND IDENTITY & INFORMATION ARCHITECTURE

### Who is Srujan?
**Full Name:** Sai Srujan Seelam
**Goes by:** Srujan / Elon (nickname)
**Location:** Richmond, Virginia, USA
**Education:** M.S. Computer Science, Virginia Commonwealth University (VCU)
**Undergrad:** B.Tech, Amrita School of Engineering, India

### Three Brand Pillars:
1. **Builder** — Founder of Disciplix AI (AI-powered fitness platform) & WonderAvenues (web dev agency)
2. **Researcher** — NLP, Digital Forensics, Cross-script Code-Switching, Cybersecurity
3. **Athlete & Creative** — Fitness enthusiast (225lb bench PR), fragrance collector, rave music lover, gamer

### Professional Highlights:
- **Disciplix AI** — AI-powered fitness ecosystem helping trainers scale via automated food logging, wearable integration, client management. Targeting $96B fitness market.
- **WonderAvenues** — Web development & digital marketing agency. Clients: Oakton Foot & Ankle Center, Solo Levitated Fitness, and more.
- **NLP Research** — Morphologically-aware adapters for Hindi-English code-switched text. Achieved 94.21% accuracy. Cross-script attention mechanisms, custom tokenization.
- **Digital Forensics** — Telegram Desktop memory forensics on Linux. Custom Volatility 3 plugins. Under Dr. Irfan Ahmed at VCU's SAFE Lab.
- **Previous:** Analyst at PruTech Solutions (ML/NLP in pharma), AWS certified, Computer Vision (ice cap segmentation)

### Skills & Technologies:
- **Languages:** Python, JavaScript/TypeScript, Java, SQL, MATLAB
- **AI/ML:** TensorFlow, PyTorch, LangChain, LangGraph, Hugging Face, OpenAI API
- **Web:** React, Next.js, Node.js, Tailwind CSS, Framer
- **Cloud:** AWS (certified), GCP, Docker, Kubernetes
- **Data:** PostgreSQL, MongoDB, Redis, BigQuery
- **Tools:** Git, Figma, Notion, n8n automation, Volatility 3
- **Domains:** NLP, Computer Vision, Digital Forensics, Agentic AI

### Personal / Lifestyle:
- Bench press 225 lbs, trains 5-6x/week
- Fragrance collector (JPG Le Male, Sauvage)
- Valorant gamer
- Rave/EDM music enthusiast (goals: EDC, Ultra, Tomorrowland)
- Hiker with friends
- Goals: YC application, $50k revenue, attend major festivals

### 2026 Goals:
- Ship Disciplix MVP
- Apply to Y Combinator
- Hit $50k annual revenue
- Maintain 4.0 CGPA
- Bench 275 lbs
- Attend a major rave festival
- Travel to 3 new countries

---

## 2. DESIGN SYSTEM

### Theme: "COSMIC FORGE"
A blend of deep space aesthetics with the raw energy of fitness, the pulse of rave music, and the precision of code. Dark, immersive, personal.

### Color Palette:
- **Void Black:** #06060a (primary bg)
- **Deep Space:** #0c0c14 (secondary bg)
- **Nebula Purple:** #8b5cf6 (primary accent — AI/tech)
- **Cosmic Cyan:** #06b6d4 (secondary accent — research)
- **Forge Orange:** #f97316 (tertiary accent — fitness/energy)
- **Star White:** #f0f0f5 (primary text)
- **Dust Gray:** #6b7280 (secondary text)
- **Subtle Gray:** #1a1a2e (borders/dividers)

### Typography:
- **Display:** "Space Grotesk" → NO. Using "Syne" (bold, geometric, personality)
- **Headings:** "Clash Display" or "Syne" (900 weight)
- **Body:** "Outfit" (clean, modern, highly readable)
- **Code/Mono:** "JetBrains Mono" (developer cred)

### Animation Philosophy:
- Smooth scroll-triggered reveals
- Particle/star field background (CSS-only for performance)
- Subtle parallax on key sections
- Hover states that feel alive
- Page load staggered entrance
- Cursor trail effect (cosmic dust)

### Layout Strategy (inspired by references):
- Full-viewport hero with 3D cosmic particle animation
- Asymmetric text blocks (like Tim Quirino)
- Card-based project showcase (like Claudio Guglieri)
- Scrollable sections with clear visual hierarchy (like Jack Elder)
- Personality-driven storytelling (like Thibaut Crépelle)
- Smooth transitions between sections (like Andrei Rybin)

---

## 3. SITE MAP & SECTIONS

1. **HERO** — Full screen cosmic intro. Name, tagline, scroll CTA.
2. **MANIFESTO** — Who I am in 3 sentences. Not a boring "About me."
3. **VENTURES** — Disciplix AI + WonderAvenues cards with descriptions.
4. **WORK** — Project showcase grid (NLP Research, Forensics, Client Sites, AI Goal Mentor).
5. **ARSENAL** — Skills & tech stack as a visual constellation.
6. **LIFE** — Lifestyle grid: fitness, fragrances, gaming, music, travel.
7. **PHILOSOPHY** — How I think, approach problems, what drives me.
8. **CONNECT** — Contact CTA, social links, availability status.

---

## 4. TECH STACK (for the portfolio itself)

- **Pure HTML5 + CSS3 + Vanilla JavaScript**
- **No build tools needed** — just open index.html
- **CSS Custom Properties** for theming
- **CSS Animations + Intersection Observer** for scroll effects
- **Canvas API** for cosmic particle background
- **Google Fonts:** Syne, Outfit, JetBrains Mono
- **Mobile-first responsive design**
- **Ready to deploy on:** GitHub Pages, Vercel, Netlify

---

## 5. FILE STRUCTURE

```
portfolio/
├── index.html          # Main single-page website
├── styles.css          # All styles
├── script.js           # Interactions & animations
├── DOCUMENTATION.md    # This file
├── README.md           # GitHub README
└── assets/             # (placeholder for images)
```

---

## 6. DEPLOYMENT INSTRUCTIONS

### GitHub Pages:
1. Create repo: `srujan-portfolio` or `username.github.io`
2. Push all files to `main` branch
3. Go to Settings → Pages → Deploy from main branch
4. Custom domain: Add CNAME file with your domain

### Vercel:
1. Push to GitHub
2. Import in Vercel dashboard
3. Auto-deploys on push

### Netlify:
1. Drag & drop the folder
2. Or connect GitHub repo for auto-deploys

---

## 7. CUSTOMIZATION GUIDE

### To update content:
- All text content is in `index.html`
- Search for sections by HTML comments: `<!-- HERO -->`, `<!-- VENTURES -->`, etc.
- Replace placeholder images with real ones in the `assets/` folder

### To change colors:
- Edit CSS variables in `:root` at the top of `styles.css`

### To add projects:
- Copy a `.project-card` block and modify content

### To modify animations:
- Scroll animations use Intersection Observer in `script.js`
- Particle system is in the `CosmicCanvas` class

---
