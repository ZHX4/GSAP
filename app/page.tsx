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

import Link from "next/link";
import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import TextReveal from "./components/TextReveal";
import StaggerCards from "./components/StaggerCards";
import ParallaxSection from "./components/ParallaxSection";
import { MagneticButtonDemo } from "./components/MagneticButton";
import TimelineDemo from "./components/TimelineDemo";
import ScrollProgress, { ScrollProgressDemo } from "./components/ScrollProgress";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ========================================
          SIDEBAR NAVIGATION
          ========================================
          Persistent sidebar for navigating between
          tutorial lessons/pages.
      */}
      <Sidebar />

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
          EXPLORE MORE LESSONS
          ========================================
          Links to detailed lesson pages.
      */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Explore In-Depth Lessons
            </span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Dive deeper into specific GSAP topics with our comprehensive tutorial pages.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/basics', title: 'GSAP Basics', desc: 'Tweens, timelines, easing, and core concepts', color: 'from-purple-500 to-purple-600' },
              { href: '/scroll-animations', title: 'ScrollTrigger', desc: 'Scroll-linked animations, scrub, pin, and parallax', color: 'from-cyan-500 to-cyan-600' },
              { href: '/text-animations', title: 'Text Animations', desc: 'Character reveals, typewriter, scramble effects', color: 'from-pink-500 to-pink-600' },
              { href: '/svg-animations', title: 'SVG Animations', desc: 'Path drawing, morphing, charts, and icons', color: 'from-green-500 to-green-600' },
              { href: '/interactive', title: 'Interactive Effects', desc: 'Magnetic buttons, cursors, 3D cards, drag', color: 'from-yellow-500 to-yellow-600' },
              { href: '/advanced', title: 'Advanced Techniques', desc: 'FLIP, performance, accessibility, custom easings', color: 'from-red-500 to-red-600' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative p-6 rounded-2xl bg-gray-800/50 border border-gray-700
                           hover:border-gray-600 transition-all hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 
                                 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
                <span className="absolute bottom-6 right-6 text-gray-600 group-hover:text-white 
                                 group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
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
