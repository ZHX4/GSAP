/**
 * ============================================================
 * SCROLL PROGRESS COMPONENT
 * ============================================================
 * 
 * This component demonstrates scroll progress tracking:
 * 1. Overall page progress bar
 * 2. Section-based progress indicators
 * 3. Dynamic scroll-linked animations
 * 
 * 🎯 Scroll Progress Best Practice:
 * Use ScrollTrigger with scrub for smooth progress tracking.
 * The progress value (0-1) can drive any animation property.
 */

"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // --------------------------------------------------------
    // OVERALL PAGE PROGRESS
    // --------------------------------------------------------
    // Animate the progress bar based on total page scroll
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3, // Smooth, responsive tracking
      },
    });
  }, []);

  return (
    <div
      ref={progressRef}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

// ============================================================
// SCROLL PROGRESS DEMO SECTION
// ============================================================
export function ScrollProgressDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      // --------------------------------------------------------
      // CIRCULAR PROGRESS INDICATOR
      // --------------------------------------------------------
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          // Update React state for the percentage display
          setProgress(Math.round(self.progress * 100));

          // Animate the circle stroke
          if (circleRef.current) {
            const circle = circleRef.current.querySelector("circle:last-child");
            if (circle) {
              // strokeDashoffset controls how much of the circle is visible
              // 565 is the circumference (2 * π * 90 radius)
              const offset = 565 - 565 * self.progress;
              gsap.to(circle, {
                strokeDashoffset: offset,
                duration: 0.1,
                ease: "none",
              });
            }
          }
        },
      });

      // --------------------------------------------------------
      // ANIMATED PROGRESS ITEMS
      // --------------------------------------------------------
      const items = sectionRef.current?.querySelectorAll(".progress-item");
      items?.forEach((item, index) => {
        const progressBar = item.querySelector(".item-progress");
        const percentText = item.querySelector(".item-percent");

        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          end: "top 30%",
          onUpdate: (self) => {
            const percent = Math.round(self.progress * 100);
            if (percentText) {
              percentText.textContent = `${percent}%`;
            }
            gsap.to(progressBar, {
              scaleX: self.progress,
              duration: 0.1,
              ease: "none",
            });
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section py-32 relative min-h-[120vh]">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="section-badge">
            <span className="text-lg">📊</span>
            Lesson 5
          </span>
          <h2 className="section-title">Scroll Progress Tracking</h2>
          <p className="section-description">
            Track scroll position and use it to drive animations.
            Perfect for progress indicators and scroll-linked effects.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Circular Progress */}
          <div className="sticky top-32">
            <div className="glass-card p-8 flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6">Section Progress</h3>

              {/* Circular Progress SVG */}
              <div ref={circleRef} className="relative w-48 h-48">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(139, 92, 246, 0.2)"
                    strokeWidth="12"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="565"
                    strokeDashoffset="565"
                  />
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient
                      id="progressGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gradient">
                    {progress}%
                  </span>
                </div>
              </div>

              <p className="mt-6 text-slate-400 text-center">
                Scroll through this section to see the progress update
              </p>
            </div>
          </div>

          {/* Right: Progress Items */}
          <div className="space-y-8">
            {[
              { label: "Understanding GSAP Basics", color: "from-primary-500 to-primary-600" },
              { label: "Mastering ScrollTrigger", color: "from-accent-cyan to-blue-500" },
              { label: "Timeline Animations", color: "from-accent-pink to-rose-500" },
              { label: "Performance Optimization", color: "from-accent-orange to-amber-500" },
              { label: "Advanced Techniques", color: "from-green-400 to-emerald-500" },
            ].map((item, index) => (
              <div key={index} className="progress-item glass-card p-6">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">{item.label}</h4>
                  <span className="item-percent text-primary-400 font-mono">
                    0%
                  </span>
                </div>
                <div className="h-3 bg-dark-300 rounded-full overflow-hidden">
                  <div
                    className={`item-progress h-full bg-gradient-to-r ${item.color} rounded-full origin-left`}
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-16 code-block max-w-3xl">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="ml-4 text-sm text-slate-500">progress.ts</span>
          </div>
          <div className="code-content">
            <pre>
              <code>{`// Create a ScrollTrigger with onUpdate callback
ScrollTrigger.create({
  trigger: section,
  start: "top center",
  end: "bottom center",
  onUpdate: (self) => {
    // self.progress is 0-1 based on scroll position
    const percent = Math.round(self.progress * 100);
    percentDisplay.textContent = \`\${percent}%\`;
    
    // Animate progress bar
    gsap.to(progressBar, {
      scaleX: self.progress,
      duration: 0.1,
      ease: "none"
    });
  }
});

// Or use scrub for automatic progress-linked animation
gsap.to(progressBar, {
  scaleX: 1,
  scrollTrigger: {
    trigger: page,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.3
  }
});`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
