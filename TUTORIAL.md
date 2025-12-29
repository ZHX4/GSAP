# 🎬 GSAP + Next.js Tutorial

## Create Stunning Animations with GSAP in Next.js

Welcome to this comprehensive tutorial on integrating GSAP (GreenSock Animation Platform) with Next.js! By the end of this guide, you'll be able to create beautiful, performant animations that will make your web applications stand out.

![GSAP + Next.js](https://img.shields.io/badge/GSAP-Next.js-blueviolet?style=for-the-badge)

---

## 📚 Table of Contents

1. [Introduction](#-introduction)
2. [Project Setup](#-project-setup)
3. [Understanding GSAP Basics](#-understanding-gsap-basics)
4. [The useGSAP Hook](#-the-usegsap-hook)
5. [Lesson 1: Text Reveal Animations](#-lesson-1-text-reveal-animations)
6. [Lesson 2: Stagger Animations](#-lesson-2-stagger-animations)
7. [Lesson 3: Parallax Scrolling](#-lesson-3-parallax-scrolling)
8. [Lesson 4: Interactive Animations](#-lesson-4-interactive-animations)
9. [Lesson 5: Timeline Control](#-lesson-5-timeline-control)
10. [Lesson 6: Scroll Progress](#-lesson-6-scroll-progress)
11. [Best Practices](#-best-practices)
12. [Performance Tips](#-performance-tips)
13. [Resources](#-resources)

---

## 🌟 Introduction

### What is GSAP?

GSAP (GreenSock Animation Platform) is a professional-grade JavaScript animation library used by major brands and award-winning websites. It's:

- **Blazing Fast**: Optimized for performance
- **Cross-Browser**: Works everywhere
- **Feature-Rich**: From simple fades to complex timelines
- **Well-Documented**: Extensive resources and community

### Why GSAP + Next.js?

Next.js provides the perfect foundation for building modern web applications, and GSAP elevates the user experience with:

- Smooth, 60fps animations
- Scroll-driven interactions
- Complex sequenced animations
- Professional micro-interactions

---

## 🚀 Project Setup

### Step 1: Create a New Next.js Project

```bash
npx create-next-app@latest gsap-tutorial --typescript --tailwind --app
cd gsap-tutorial
```

### Step 2: Install GSAP Dependencies

```bash
npm install gsap @gsap/react
```

### Step 3: Create the GSAP Configuration File

Create `lib/gsap.ts` to register plugins globally:

```typescript
// lib/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins on the client side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Set global defaults
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

export { gsap, ScrollTrigger };
```

### Step 4: Import GSAP in Your Layout

```typescript
// app/layout.tsx
import "@/lib/gsap"; // Register plugins globally
```

---

## 🎯 Understanding GSAP Basics

### The Core Methods

GSAP provides three main animation methods:

```typescript
// gsap.to() - Animate TO a state
gsap.to(".box", { x: 100, opacity: 1 });

// gsap.from() - Animate FROM a state
gsap.from(".box", { x: -100, opacity: 0 });

// gsap.fromTo() - Define both start and end
gsap.fromTo(".box", 
  { x: -100, opacity: 0 },  // from
  { x: 100, opacity: 1 }    // to
);
```

### Common Properties

```typescript
gsap.to(".element", {
  // Transform properties (GPU-accelerated)
  x: 100,           // translateX
  y: 50,            // translateY
  rotation: 45,     // rotate in degrees
  scale: 1.5,       // scale uniformly
  scaleX: 2,        // scale horizontally
  scaleY: 0.5,      // scale vertically
  
  // Opacity
  opacity: 0.5,
  
  // Timing
  duration: 1,      // seconds
  delay: 0.5,       // seconds before start
  
  // Easing
  ease: "power3.out",
  
  // Repeat
  repeat: 2,        // number of repeats (-1 for infinite)
  yoyo: true,       // animate back and forth
});
```

### Easing Options

GSAP includes many easing functions:

```typescript
// Standard easings
"power1.out"   // Subtle
"power2.out"   // Medium
"power3.out"   // Strong (recommended default)
"power4.out"   // Very strong

// Special easings
"back.out(1.7)"    // Overshoot
"elastic.out(1, 0.5)" // Bouncy
"bounce.out"       // Bouncing ball
"expo.out"         // Exponential

// Directions
"power3.in"        // Slow start
"power3.out"       // Slow end
"power3.inOut"     // Slow start and end
```

---

## ⚛️ The useGSAP Hook

### Why useGSAP Instead of useEffect?

The `useGSAP` hook from `@gsap/react` is specifically designed for React:

1. **Automatic Cleanup**: Kills animations when component unmounts
2. **Proper Timing**: Runs after DOM is ready
3. **Scoping**: Can scope animations to a container

### Basic Usage

```typescript
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Your GSAP animations here
    gsap.from(".box", { opacity: 0, y: 50 });
  }, { scope: containerRef }); // Scope to container

  return (
    <div ref={containerRef}>
      <div className="box">Animated!</div>
    </div>
  );
}
```

### With Dependencies

```typescript
useGSAP(() => {
  gsap.to(".box", { x: position * 100 });
}, { 
  scope: containerRef,
  dependencies: [position] // Re-run when position changes
});
```

---

## 📝 Lesson 1: Text Reveal Animations

### Splitting Text for Animation

To animate text character by character or word by word:

```typescript
// Split into words
const text = "Hello World";
const words = text.split(" ");

element.innerHTML = words
  .map(word => `<span class="word">${word}</span>`)
  .join(" ");

// Animate each word
gsap.from(".word", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  duration: 0.8,
  ease: "back.out(1.7)"
});
```

### With ScrollTrigger

```typescript
gsap.from(".word", {
  y: 100,
  opacity: 0,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".text-container",
    start: "top 80%",        // When top of trigger hits 80% of viewport
    end: "bottom 20%",       // When bottom hits 20%
    toggleActions: "play none none reverse",
    // Options: play, pause, resume, reset, restart, complete, reverse, none
  }
});
```

### Highlighted Text Effect

```css
.highlight {
  background: linear-gradient(to right, purple, cyan);
  background-size: 0% 100%;
  background-repeat: no-repeat;
}
```

```typescript
gsap.to(".highlight", {
  backgroundSize: "100% 100%",
  duration: 1,
  scrollTrigger: {
    trigger: ".highlight",
    start: "top 80%",
  }
});
```

---

## ✨ Lesson 2: Stagger Animations

### Basic Stagger

```typescript
// Simple: delay between each element
gsap.from(".card", {
  opacity: 0,
  y: 100,
  stagger: 0.1  // 0.1 seconds between each
});
```

### Advanced Stagger Options

```typescript
gsap.from(".card", {
  opacity: 0,
  y: 100,
  stagger: {
    amount: 0.8,        // Total time to distribute
    from: "center",     // Start from center
    grid: "auto",       // Auto-detect grid
    ease: "power2.in"   // Easing for stagger timing
  }
});
```

### Stagger Origins

```typescript
// from options:
"start"    // First element first (default)
"end"      // Last element first
"center"   // Center elements first
"edges"    // Outer elements first
"random"   // Random order
0          // Index number
```

### Grid Stagger

```typescript
// For grid layouts
gsap.from(".grid-item", {
  opacity: 0,
  scale: 0,
  stagger: {
    amount: 1,
    from: "center",
    grid: [4, 4]  // 4x4 grid
  }
});
```

---

## 🌊 Lesson 3: Parallax Scrolling

### Basic Parallax

```typescript
// Different elements move at different speeds
gsap.to(".background", {
  y: -100,  // Moves slower
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true  // Tie to scroll position
  }
});

gsap.to(".foreground", {
  y: -300,  // Moves faster
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});
```

### Scrub Options

```typescript
scrub: true      // Immediate (1:1 with scroll)
scrub: 1         // 1 second smoothing
scrub: 0.5       // 0.5 second smoothing (snappier)
scrub: 2         // 2 second smoothing (very smooth)
```

### Horizontal Parallax

```typescript
gsap.to(".horizontal-text", {
  x: -500,
  ease: "none",
  scrollTrigger: {
    trigger: ".section",
    scrub: 1
  }
});
```

---

## 🧲 Lesson 4: Interactive Animations

### Magnetic Button Effect

```typescript
// Use quickTo for performance
const xTo = gsap.quickTo(button, "x", { 
  duration: 0.4, 
  ease: "power3.out" 
});
const yTo = gsap.quickTo(button, "y", { 
  duration: 0.4, 
  ease: "power3.out" 
});

button.addEventListener("mousemove", (e) => {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  xTo((e.clientX - centerX) * 0.5);
  yTo((e.clientY - centerY) * 0.5);
});

button.addEventListener("mouseleave", () => {
  xTo(0);
  yTo(0);
});
```

### Hover Scale Effect

```typescript
const card = document.querySelector(".card");

card.addEventListener("mouseenter", () => {
  gsap.to(card, {
    scale: 1.05,
    duration: 0.3,
    ease: "back.out(1.7)"
  });
});

card.addEventListener("mouseleave", () => {
  gsap.to(card, {
    scale: 1,
    duration: 0.3,
    ease: "power2.out"
  });
});
```

---

## 🎬 Lesson 5: Timeline Control

### Creating Timelines

```typescript
const tl = gsap.timeline({
  paused: true,  // Don't auto-play
  defaults: {
    duration: 0.8,
    ease: "power3.out"
  }
});

// Chain animations
tl.from(".title", { y: 100, opacity: 0 })
  .from(".subtitle", { y: 50, opacity: 0 }, "-=0.4")
  .from(".button", { scale: 0 }, "-=0.2");
```

### Position Parameters

```typescript
// Absolute time
tl.to(".box", { x: 100 }, 1);        // At 1 second

// Relative to previous
tl.to(".box", { x: 100 }, "-=0.5");  // 0.5s before previous ends
tl.to(".box", { x: 100 }, "+=0.5");  // 0.5s after previous ends

// Same time as previous
tl.to(".box", { x: 100 }, "<");      // Same start as previous
tl.to(".box", { x: 100 }, ">");      // Same end as previous

// Using labels
tl.addLabel("myLabel")
  .to(".box", { x: 100 }, "myLabel");
```

### Timeline Controls

```typescript
tl.play();         // Play forward
tl.pause();        // Pause
tl.reverse();      // Play backwards
tl.restart();      // Jump to start and play
tl.seek(2);        // Jump to 2 seconds
tl.progress(0.5);  // Jump to 50%
tl.timeScale(2);   // 2x speed
```

---

## 📊 Lesson 6: Scroll Progress

### Page Progress Bar

```typescript
gsap.to(".progress-bar", {
  scaleX: 1,
  ease: "none",
  scrollTrigger: {
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3
  }
});
```

### Section Progress

```typescript
ScrollTrigger.create({
  trigger: ".section",
  start: "top center",
  end: "bottom center",
  onUpdate: (self) => {
    // self.progress is 0-1
    const percent = Math.round(self.progress * 100);
    progressText.textContent = `${percent}%`;
    
    gsap.to(progressBar, {
      scaleX: self.progress,
      duration: 0.1
    });
  }
});
```

---

## ✅ Best Practices

### 1. Always Use useGSAP in React

```typescript
// ✅ Good
useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef });

// ❌ Bad - no cleanup
useEffect(() => {
  gsap.to(".box", { x: 100 });
}, []);
```

### 2. Register Plugins Once

```typescript
// lib/gsap.ts - do this once
gsap.registerPlugin(ScrollTrigger);
```

### 3. Use Refs Instead of Selectors

```typescript
// ✅ Good
const boxRef = useRef(null);
gsap.to(boxRef.current, { x: 100 });

// ❌ Okay but less reliable
gsap.to(".box", { x: 100 });
```

### 4. Scope Animations

```typescript
useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef }); // Only targets .box inside container
```

### 5. Set Initial States in CSS

```css
/* Prevent flash of unstyled content */
.animated-element {
  opacity: 0;
  transform: translateY(50px);
}
```

---

## ⚡ Performance Tips

### 1. Use Transform Properties

```typescript
// ✅ GPU-accelerated (fast)
gsap.to(".box", { x: 100, y: 50, scale: 1.2, rotation: 45 });

// ❌ Triggers layout (slower)
gsap.to(".box", { left: 100, width: 200 });
```

### 2. Use quickTo for Frequent Updates

```typescript
// ✅ Optimized for mouse tracking
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.3 });

document.addEventListener("mousemove", (e) => {
  xTo(e.clientX);  // Super fast!
});
```

### 3. Be Careful with will-change

```css
/* Use sparingly - only for known animations */
.will-animate {
  will-change: transform, opacity;
}
```

### 4. Limit Simultaneous Animations

```typescript
// ✅ Batch animations in timeline
const tl = gsap.timeline();
tl.to(".items", { opacity: 1, stagger: 0.05 });

// ❌ Many separate animations
items.forEach(item => {
  gsap.to(item, { opacity: 1 });
});
```

### 5. Use ScrollTrigger's Cleanup

```typescript
// Automatically handled by useGSAP, but manual cleanup:
const trigger = ScrollTrigger.create({ ... });
trigger.kill(); // When done
```

---

## 📖 Resources

### Official Documentation
- [GSAP Docs](https://gsap.com/docs)
- [GSAP + React Guide](https://gsap.com/resources/React)
- [ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger)
- [Next.js Docs](https://nextjs.org/docs)

### Learning Resources
- [GSAP Getting Started](https://gsap.com/resources/get-started)
- [GSAP Easing Visualizer](https://gsap.com/docs/v3/Eases)
- [GSAP Cheat Sheet](https://gsap.com/cheatsheet)

### Community
- [GSAP Forums](https://gsap.com/community)
- [CodePen Examples](https://codepen.io/GreenSock)

---

## 🎉 Congratulations!

You've completed the GSAP + Next.js tutorial! You now know how to:

- ✅ Set up GSAP with Next.js
- ✅ Use the useGSAP hook properly
- ✅ Create text reveal animations
- ✅ Build stagger effects
- ✅ Implement parallax scrolling
- ✅ Add interactive animations
- ✅ Control timelines
- ✅ Track scroll progress

Now go forth and create stunning animations! 🚀

---

**Happy Animating!** 💜

*Built with love for the web development community*
