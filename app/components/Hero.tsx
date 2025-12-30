/**
 * ============================================================
 * HERO SECTION COMPONENT
 * ============================================================
 * 
 * This component demonstrates several GSAP techniques:
 * 1. Text split animation (character by character)
 * 2. Timeline sequencing
 * 3. Floating element animations
 * 4. useGSAP hook for React integration
 * 
 * 🎯 GSAP + React Best Practice:
 * Always use the useGSAP hook from @gsap/react instead of useEffect.
 * This ensures proper cleanup and avoids memory leaks.
 */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Hero() {
  // ============================================================
  // REFS
  // ============================================================
  // We use refs to target DOM elements for animation
  // This is the React-way of selecting elements (vs. document.querySelector)
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // GSAP ANIMATIONS
  // ============================================================
  useGSAP(
    () => {
      // Create a timeline for sequenced animations
      // Timelines let us chain animations with precise timing
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1,
        },
      });

      // --------------------------------------------------------
      // STEP 1: Animate the title
      // --------------------------------------------------------
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0.2
      );

      // --------------------------------------------------------
      // STEP 2: Animate the subtitle
      // --------------------------------------------------------
      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          clearProps: 'all',
        },
        "-=0.5" // Start 0.5s before the previous animation ends (overlap)
      );

      // --------------------------------------------------------
      // STEP 3: Animate the CTA buttons
      // --------------------------------------------------------
      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          clearProps: 'all',
        },
        "-=0.6"
      );

      // --------------------------------------------------------
      // STEP 4: Floating elements animation (infinite loop)
      // --------------------------------------------------------
      // These run independently of the timeline
      if (floatingRef.current) {
        const orbs = floatingRef.current.querySelectorAll(".floating-orb");
        orbs.forEach((orb, index) => {
          gsap.to(orb, {
            y: "random(-30, 30)", // Random Y movement
            x: "random(-20, 20)", // Random X movement
            rotation: "random(-15, 15)",
            duration: "random(3, 5)", // Random duration for organic feel
            repeat: -1, // Infinite repeat
            yoyo: true, // Animate back and forth
            ease: "sine.inOut",
            delay: index * 0.2, // Stagger the start of each orb
          });
        });
      }

      // --------------------------------------------------------
      // STEP 5: Scroll indicator animation
      // --------------------------------------------------------
      gsap.to(".scroll-indicator", {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef } // Scope animations to this component
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ========================================
          BACKGROUND DECORATIONS
          ======================================== */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="floating-orb gradient-orb orb-purple w-[500px] h-[500px] -top-20 -left-20" />
        <div className="floating-orb gradient-orb orb-cyan w-[400px] h-[400px] top-1/3 -right-10" />
        <div className="floating-orb gradient-orb orb-pink w-[300px] h-[300px] bottom-20 left-1/4" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* ========================================
          HERO CONTENT
          ======================================== */}
      <div className="container relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/30 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary-400">
            Next.js 14 + GSAP Tutorial
          </span>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="heading-xl mb-6 leading-tight"
        >
          Stunning Animations
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10"
        >
          Learn how to create beautiful, performant animations with{" "}
          <span className="text-gradient font-semibold">GSAP</span> and{" "}
          <span className="text-gradient-warm font-semibold">Next.js</span>.
          From simple fades to complex scroll-driven experiences.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <a href="#basics" className="btn btn-primary">
            <span>Start Learning</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <a
            href="https://gsap.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            GSAP Docs
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* ========================================
          SCROLL INDICATOR
          ======================================== */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
