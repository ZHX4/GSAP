/**
 * ============================================================
 * PARALLAX SECTION COMPONENT
 * ============================================================
 * 
 * This component demonstrates parallax scrolling effects:
 * 1. Multi-layer parallax with different speeds
 * 2. Scrub-based smooth animations
 * 3. Horizontal movement on scroll
 * 4. Scale and rotation on scroll
 * 
 * 🎯 Parallax Best Practice:
 * Use "scrub" to tie animation progress directly to scroll position.
 * scrub: true = immediate, scrub: 1 = 1 second smoothing
 */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // --------------------------------------------------------
      // LAYER 1: Slow parallax (background)
      // --------------------------------------------------------
      gsap.to(layer1Ref.current, {
        y: -100, // Moves up 100px as you scroll through
        ease: "none", // Linear movement for parallax
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start when section enters viewport
          end: "bottom top", // End when section leaves viewport
          scrub: 1, // Smooth 1 second catch-up
        },
      });

      // --------------------------------------------------------
      // LAYER 2: Medium parallax (midground)
      // --------------------------------------------------------
      gsap.to(layer2Ref.current, {
        y: -200,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // --------------------------------------------------------
      // LAYER 3: Fast parallax (foreground)
      // --------------------------------------------------------
      gsap.to(layer3Ref.current, {
        y: -300,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // --------------------------------------------------------
      // TEXT: Horizontal scroll effect
      // --------------------------------------------------------
      gsap.to(textRef.current, {
        x: -200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // --------------------------------------------------------
      // FLOATING SHAPES: Independent animations
      // --------------------------------------------------------
      gsap.utils.toArray(".parallax-shape").forEach((shape: any, i) => {
        const speed = 1 + i * 0.5;
        const direction = i % 2 === 0 ? 1 : -1;

        gsap.to(shape, {
          y: -150 * speed,
          x: 50 * direction,
          rotation: 360 * direction,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: speed,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section py-32 relative overflow-hidden min-h-[150vh]"
    >
      {/* ========================================
          PARALLAX LAYERS
          ======================================== */}
      
      {/* Layer 1: Background (slowest) */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="gradient-orb orb-purple w-[800px] h-[800px] -left-40 top-0 opacity-30" />
        <div className="gradient-orb orb-cyan w-[600px] h-[600px] right-0 bottom-0 opacity-20" />
      </div>

      {/* Layer 2: Midground shapes */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="parallax-shape absolute top-20 left-[20%] w-20 h-20 border-2 border-primary-500/30 rounded-full" />
        <div className="parallax-shape absolute top-40 right-[30%] w-16 h-16 border-2 border-accent-cyan/30 rotate-45" />
        <div className="parallax-shape absolute bottom-40 left-[40%] w-24 h-24 border-2 border-accent-pink/30 rounded-lg rotate-12" />
      </div>

      {/* Layer 3: Foreground elements (fastest) */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="parallax-shape absolute top-32 right-[15%] w-8 h-8 bg-primary-500/20 rounded-full" />
        <div className="parallax-shape absolute top-60 left-[15%] w-6 h-6 bg-accent-cyan/20 rotate-45" />
        <div className="parallax-shape absolute bottom-60 right-[25%] w-10 h-10 bg-accent-pink/20 rounded-lg" />
      </div>

      {/* ========================================
          MAIN CONTENT
          ======================================== */}
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="section-badge">
            <span className="text-lg">🌊</span>
            Lesson 3
          </span>
          <h2 className="section-title">Parallax Scrolling</h2>
          <p className="section-description">
            Create depth and dimension with multi-layer parallax effects.
            Elements move at different speeds to create an immersive experience.
          </p>
        </div>

        {/* Horizontal scrolling text */}
        <div
          ref={textRef}
          className="text-[8rem] md:text-[12rem] font-bold text-slate-800/50 whitespace-nowrap select-none pointer-events-none"
        >
          SCROLL • PARALLAX • DEPTH • MOTION •
        </div>

        {/* Demo cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="glass-card p-8">
            <div className="text-5xl mb-4">🐢</div>
            <h3 className="text-xl font-semibold mb-2">Slow Layer</h3>
            <p className="text-slate-400">
              Background elements move slowly for depth perception
            </p>
            <code className="block mt-4 text-sm text-primary-400">
              scrub: 2 (slower)
            </code>
          </div>

          <div className="glass-card p-8">
            <div className="text-5xl mb-4">🚶</div>
            <h3 className="text-xl font-semibold mb-2">Medium Layer</h3>
            <p className="text-slate-400">
              Middle elements move at a moderate pace
            </p>
            <code className="block mt-4 text-sm text-accent-cyan">
              scrub: 1 (default)
            </code>
          </div>

          <div className="glass-card p-8">
            <div className="text-5xl mb-4">🏃</div>
            <h3 className="text-xl font-semibold mb-2">Fast Layer</h3>
            <p className="text-slate-400">
              Foreground elements move quickly, closest to viewer
            </p>
            <code className="block mt-4 text-sm text-accent-pink">
              scrub: 0.5 (faster)
            </code>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-16 code-block max-w-3xl">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="ml-4 text-sm text-slate-500">parallax.ts</span>
          </div>
          <div className="code-content">
            <pre>
              <code>{`// Parallax with scrub (tied to scroll position)
gsap.to(".background-layer", {
  y: -100,
  ease: "none", // Linear for smooth parallax
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: 1 // 1 second smoothing
  }
});

// Different speeds for depth
const layers = [
  { element: ".bg", speed: 0.5 },
  { element: ".mid", speed: 1 },
  { element: ".fg", speed: 2 }
];

layers.forEach(({ element, speed }) => {
  gsap.to(element, {
    y: -200 * speed,
    scrollTrigger: {
      trigger: section,
      scrub: true
    }
  });
});`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
