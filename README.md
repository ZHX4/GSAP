# GSAP + Next.js Tutorial

A stunning, interactive tutorial showcasing beautiful animations with GSAP (GreenSock Animation Platform) in Next.js.

## ✨ Features

- 🎬 **Hero Animation** - Character-by-character text reveal with floating elements
- 📝 **Text Reveal** - Scroll-triggered word animations with highlights
- ✨ **Stagger Effects** - Cascading card animations with hover effects
- 🌊 **Parallax Scrolling** - Multi-layer depth effects
- 🧲 **Interactive Buttons** - Magnetic cursor-following effect
- 🎥 **Timeline Control** - Sequenced animations with play/pause controls
- 📊 **Scroll Progress** - Visual progress tracking

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Tutorial

Read the full tutorial in [TUTORIAL.md](./TUTORIAL.md) for detailed explanations of each animation technique.

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **GSAP 3** - Professional animation library
- **@gsap/react** - React integration with useGSAP hook
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety

## 📁 Project Structure

```
├── app/
│   ├── components/
│   │   ├── Hero.tsx           # Intro animation
│   │   ├── TextReveal.tsx     # Scroll text effects
│   │   ├── StaggerCards.tsx   # Stagger animations
│   │   ├── ParallaxSection.tsx # Parallax scrolling
│   │   ├── MagneticButton.tsx # Interactive effects
│   │   ├── TimelineDemo.tsx   # Timeline control
│   │   ├── ScrollProgress.tsx # Progress tracking
│   │   ├── Navigation.tsx     # Site navigation
│   │   └── Footer.tsx         # Footer component
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── lib/
│   └── gsap.ts                # GSAP configuration
└── TUTORIAL.md                # Full tutorial
```

## 🎯 Key Concepts

### Using useGSAP

Always use the `useGSAP` hook from `@gsap/react` for proper cleanup:

```typescript
"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".box", { opacity: 0, y: 50 });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

### ScrollTrigger

Create scroll-driven animations:

```typescript
gsap.from(".element", {
  opacity: 0,
  y: 100,
  scrollTrigger: {
    trigger: ".element",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
```

## 📖 Learn More

- [GSAP Documentation](https://gsap.com/docs)
- [GSAP + React Guide](https://gsap.com/resources/React)
- [Next.js Documentation](https://nextjs.org/docs)

## 📄 License

MIT © 2024
