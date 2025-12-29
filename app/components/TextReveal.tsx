/**
 * ============================================================
 * TEXT REVEAL COMPONENT
 * ============================================================
 * 
 * This component demonstrates scroll-triggered text animations:
 * 1. ScrollTrigger integration
 * 2. Line-by-line text reveal
 * 3. Word-based stagger animations
 * 
 * 🎯 ScrollTrigger Best Practice:
 * Use "toggleActions" to control what happens when entering/leaving
 * the trigger zone: "play none none reverse" is a common pattern.
 */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function TextReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // --------------------------------------------------------
      // HEADING ANIMATION: Word-by-word reveal
      // --------------------------------------------------------
      if (headingRef.current) {
        // Split heading into words
        const words = headingRef.current.innerText.split(" ");
        headingRef.current.innerHTML = words
          .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}</span></span>`)
          .join(" ");

        // Animate each word sliding up
        gsap.to(
          headingRef.current.querySelectorAll("span > span"),
          {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 80%", // Animation starts when top of element hits 80% of viewport
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              // markers: true, // Uncomment to debug trigger positions
            },
          }
        );
      }

      // --------------------------------------------------------
      // PARAGRAPH ANIMATION: Line-by-line fade in
      // --------------------------------------------------------
      if (paragraphsRef.current) {
        const lines = paragraphsRef.current.querySelectorAll(".reveal-line");

        lines.forEach((line, index) => {
          gsap.from(line, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      // --------------------------------------------------------
      // HIGHLIGHT ANIMATION: Color change on scroll
      // --------------------------------------------------------
      gsap.to(".highlight-text", {
        backgroundSize: "100% 100%",
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".highlight-text",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="basics"
      ref={sectionRef}
      className="section py-32 relative"
    >
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <span className="section-badge">
            <span className="text-lg">📝</span>
            Lesson 1
          </span>
          <h2 ref={headingRef} className="section-title">
            Text Reveal Animations
          </h2>
          <p className="section-description">
            Beautiful text animations that reveal content as users scroll.
            Perfect for storytelling and creating engaging reading experiences.
          </p>
        </div>

        {/* Demo Area */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Demo */}
          <div className="demo-area p-8">
            <div ref={paragraphsRef} className="space-y-6">
              <p className="reveal-line text-2xl font-light text-slate-300">
                GSAP makes it easy to create{" "}
                <span className="highlight-text bg-gradient-to-r from-primary-500/50 to-accent-cyan/50 bg-[length:0%_100%] bg-no-repeat px-1">
                  stunning animations
                </span>
              </p>
              <p className="reveal-line text-2xl font-light text-slate-300">
                that{" "}
                <span className="highlight-text bg-gradient-to-r from-accent-pink/50 to-accent-orange/50 bg-[length:0%_100%] bg-no-repeat px-1">
                  captivate users
                </span>{" "}
                and enhance UX.
              </p>
              <p className="reveal-line text-2xl font-light text-slate-300">
                With{" "}
                <span className="highlight-text bg-gradient-to-r from-accent-cyan/50 to-primary-500/50 bg-[length:0%_100%] bg-no-repeat px-1">
                  ScrollTrigger
                </span>
                , timing is perfect.
              </p>
            </div>
          </div>

          {/* Right: Code Example */}
          <div className="code-block">
            <div className="code-header">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
              <span className="ml-4 text-sm text-slate-500">TextReveal.tsx</span>
            </div>
            <div className="code-content">
              <pre>
                <code>{`// Split text into words for animation
const words = heading.innerText.split(" ");
heading.innerHTML = words
  .map(word => \`<span>\${word}</span>\`)
  .join(" ");

// Animate each word with ScrollTrigger
gsap.from("span", {
  y: "100%",
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: heading,
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>💡</span> Pro Tips
          </h3>
          <ul className="space-y-3 text-slate-400">
            <li className="flex items-start gap-3">
              <span className="text-primary-400 mt-1">▸</span>
              <span>
                Use <code className="text-accent-cyan">overflow-hidden</code> on parent spans to clip text during reveal
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-400 mt-1">▸</span>
              <span>
                Set <code className="text-accent-cyan">toggleActions: "play none none reverse"</code> to replay on scroll back
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-400 mt-1">▸</span>
              <span>
                Enable <code className="text-accent-cyan">markers: true</code> during development to debug trigger positions
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
