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

### Theme: Cinematic editorial (warm light)
Warm paper-like background, blue accent, restrained motion. WebGL flow-field shader + film grain overlay. Full-screen terminal loader (unchanged timing).

### Color & type (see `styles.css` `:root`)
- **Background:** warm beige (`--bg`), **accent:** blue (`--accent`)
- **Display:** Syne · **Body:** Inter · **Mono:** JetBrains Mono · **Accent serif:** Instrument Serif

### Motion & UX
- **Lenis** smooth scroll, **GSAP** + ScrollTrigger for reveals and hero sequence
- **prefers-reduced-motion** respected for CSS; loader duration unchanged by design
- **Skip link**, mobile menu `aria-expanded` / `aria-hidden`, copy-email control
- **Videos** load/play when near viewport (`data-lazy-video`) to save bandwidth
- **Mobile quick bar:** Resume · Work · Contact (≤768px)

---

## 3. SITE MAP & SECTIONS

1. **HERO** — Name, recruiter value line, philosophy, CTAs, portrait
2. **ABOUT** — Story + walk video
3. **EXPERIENCE** — WonderAvenues, DeltaCubes (bullets + metrics)
4. **VENTURES** — Disciplix AI (featured)
5. **WORK** — Project grid (research, SaaS, agents, clients, forensics)
6. **ARSENAL** — Skills in three tiers (production / data & ML / platform & research)
7. **BEYOND** — Life cards (video backgrounds)
8. **CONTACT** — Email, copy button, socials, footer

**SEO / share:** `canonical`, Open Graph + Twitter Card (absolute image URL), JSON-LD `Person`. **Deploy:** set the canonical/OG base URL in `index.html` to your real domain (default uses GitHub Pages–style path).

---

## 4. TECH STACK (for the portfolio itself)

- **HTML5 + CSS3 + Vanilla JavaScript** (no build step)
- **Lenis**, **GSAP** (ScrollTrigger, ScrollToPlugin), **WebGL** fragment shader (hero backdrop)
- **IntersectionObserver** for lazy-playing videos
- **Google Fonts:** Syne, Inter, JetBrains Mono, Instrument Serif
- Deploy: GitHub Pages, Vercel, Netlify

---

## 5. FILE STRUCTURE

```
portfolio/
├── index.html          # Main single-page site
├── styles.css          # Styles
├── script.js           # Lenis, GSAP, shader, lazy video, nav, copy email
├── lenis.min.js, gsap*.js, Scroll*.js
├── DOCUMENTATION.md
├── README.md
├── photo1.jpg, *.mp4, resume PDF (as shipped)
└── assets/             # optional project screenshots
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
- Scroll + hero timelines: GSAP in `script.js`
- Background: WebGL canvas shader (same file); 2D particle fallback if WebGL unavailable

### Public URL for social previews:
- Update `link rel="canonical"` and `og:url` / `og:image` / `twitter:image` in `index.html` to your live origin

---
