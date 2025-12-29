/**
 * ============================================================
 * GSAP + NEXT.JS TUTORIAL - MAIN PAGE
 * ============================================================
 * 
 * Welcome to the GSAP + Next.js Animation Tutorial! 🎉
 * 
 * This interactive tutorial will teach you how to create
 * stunning animations using GSAP (GreenSock Animation Platform)
 * within a Next.js application.
 * 
 * WHAT YOU'LL LEARN:
 * ─────────────────
 * 1. Setting up GSAP with Next.js and React
 * 2. Using the useGSAP hook for proper cleanup
 * 3. Text reveal animations with scroll triggers
 * 4. Stagger effects for lists and grids
 * 5. Parallax scrolling techniques
 * 6. Interactive cursor-following effects
 * 7. Timeline sequencing and control
 * 8. Scroll progress tracking
 * 
 * GETTING STARTED:
 * ────────────────
 * 1. Run `npm install` to install dependencies
 * 2. Run `npm run dev` to start the development server
 * 3. Open http://localhost:3000 in your browser
 * 4. Scroll through the page to see animations in action!
 * 
 * GSAP + REACT BEST PRACTICES:
 * ───────────────────────────
 * ✅ Always use useGSAP hook (not useEffect) for animations
 * ✅ Register plugins once at app level (see lib/gsap.ts)
 * ✅ Use refs instead of CSS selectors when possible
 * ✅ Scope animations to component containers
 * ✅ Clean up animations on unmount (useGSAP handles this!)
 * 
 * Happy animating! 🚀
 */

import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import TextReveal from "./components/TextReveal";
import StaggerCards from "./components/StaggerCards";
import ParallaxSection from "./components/ParallaxSection";
import { MagneticButtonDemo } from "./components/MagneticButton";
import TimelineDemo from "./components/TimelineDemo";
import ScrollProgress, { ScrollProgressDemo } from "./components/ScrollProgress";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ========================================
          SCROLL PROGRESS BAR
          ========================================
          A fixed progress bar at the top of the page
          that shows overall scroll progress.
      */}
      <ScrollProgress />

      {/* ========================================
          NAVIGATION
          ========================================
          Sticky navigation with smooth scroll links
          to different tutorial sections.
      */}
      <Navigation />

      {/* ========================================
          HERO SECTION
          ========================================
          Lesson: Timeline animations, text split effects,
          and floating element animations.
      */}
      <Hero />

      {/* ========================================
          TEXT REVEAL SECTION
          ========================================
          Lesson 1: ScrollTrigger basics, text animations,
          word-by-word reveals, and line animations.
      */}
      <section id="basics">
        <TextReveal />
      </section>

      {/* ========================================
          STAGGER CARDS SECTION
          ========================================
          Lesson 2: Stagger animations for grids/lists,
          hover effects, and shine animations.
      */}
      <section id="stagger">
        <StaggerCards />
      </section>

      {/* ========================================
          PARALLAX SECTION
          ========================================
          Lesson 3: Multi-layer parallax, scrub animations,
          and depth effects.
      */}
      <section id="parallax">
        <ParallaxSection />
      </section>

      {/* ========================================
          INTERACTIVE SECTION
          ========================================
          Lesson 4: Magnetic buttons, cursor following,
          and quickTo for performance.
      */}
      <section id="interactive">
        <MagneticButtonDemo />
      </section>

      {/* ========================================
          TIMELINE SECTION
          ========================================
          Lesson 5: Timeline sequencing, controls,
          labels, and position parameters.
      */}
      <section id="timeline">
        <TimelineDemo />
      </section>

      {/* ========================================
          SCROLL PROGRESS SECTION
          ========================================
          Lesson 6: Progress tracking, circular indicators,
          and onUpdate callbacks.
      */}
      <section id="progress">
        <ScrollProgressDemo />
      </section>

      {/* ========================================
          FOOTER
          ========================================
          Resources, links, and credits.
      */}
      <Footer />
    </main>
  );
}
