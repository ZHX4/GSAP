/**
 * ============================================================
 * MAGNETIC BUTTON COMPONENT
 * ============================================================
 * 
 * This component demonstrates interactive cursor-following animations:
 * 1. Magnetic effect that follows cursor
 * 2. Smooth interpolation with quickTo
 * 3. Hover state animations
 * 4. Mouse position calculations
 * 
 * 🎯 Interactive Animation Best Practice:
 * Use gsap.quickTo() for frequently updating values like mouse position.
 * It's optimized for performance and creates smoother animations.
 */

"use client";

import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the magnetic pull is (0-1)
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.5,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Store quickTo functions for performance
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const textXTo = useRef<gsap.QuickToFunc | null>(null);
  const textYTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(() => {
    // --------------------------------------------------------
    // CREATE QUICKTO FUNCTIONS
    // --------------------------------------------------------
    // quickTo creates an optimized function for animating a single property
    // Much faster than calling gsap.to() repeatedly on mousemove
    if (buttonRef.current && textRef.current) {
      xTo.current = gsap.quickTo(buttonRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(buttonRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });
      textXTo.current = gsap.quickTo(textRef.current, "x", {
        duration: 0.3,
        ease: "power3.out",
      });
      textYTo.current = gsap.quickTo(textRef.current, "y", {
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, []);

  // --------------------------------------------------------
  // MOUSE MOVE HANDLER
  // --------------------------------------------------------
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      // Calculate mouse position relative to button center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center (normalized)
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Animate button towards cursor
      xTo.current?.(deltaX);
      yTo.current?.(deltaY);

      // Move text slightly more for layered effect
      textXTo.current?.(deltaX * 0.3);
      textYTo.current?.(deltaY * 0.3);
    },
    [strength]
  );

  // --------------------------------------------------------
  // MOUSE LEAVE HANDLER
  // --------------------------------------------------------
  const handleMouseLeave = useCallback(() => {
    // Snap back to original position
    xTo.current?.(0);
    yTo.current?.(0);
    textXTo.current?.(0);
    textYTo.current?.(0);
  }, []);

  // --------------------------------------------------------
  // MOUSE ENTER HANDLER
  // --------------------------------------------------------
  const handleMouseEnter = useCallback(() => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`magnetic-button relative inline-flex items-center justify-center ${className}`}
      style={{ willChange: "transform" }}
    >
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
    </button>
  );
}

// ============================================================
// MAGNETIC BUTTON DEMO SECTION
// ============================================================
export function MagneticButtonDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Animate section on scroll
      gsap.from(".magnetic-demo-content", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section py-32 relative">
      <div className="container">
        <div className="magnetic-demo-content">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <span className="section-badge">
              <span className="text-lg">🧲</span>
              Lesson 4
            </span>
            <h2 className="section-title">Interactive Animations</h2>
            <p className="section-description mx-auto">
              Create engaging micro-interactions that respond to user input.
              Magnetic buttons, cursor effects, and more.
            </p>
          </div>

          {/* Demo Area */}
          <div className="demo-area p-16 flex flex-col items-center justify-center gap-8">
            <p className="text-slate-400 text-lg">
              Move your cursor over the buttons 👇
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <MagneticButton
                strength={0.4}
                className="btn btn-primary text-lg px-8 py-4"
              >
                Hover Me!
              </MagneticButton>

              <MagneticButton
                strength={0.6}
                className="btn btn-secondary text-lg px-8 py-4"
              >
                Magnetic Effect
              </MagneticButton>

              <MagneticButton strength={0.8} className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-pink to-accent-orange text-2xl shadow-lg">
                🎯
              </MagneticButton>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-12 code-block max-w-3xl mx-auto">
            <div className="code-header">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
              <span className="ml-4 text-sm text-slate-500">
                MagneticButton.tsx
              </span>
            </div>
            <div className="code-content">
              <pre>
                <code>{`// Create quickTo functions for smooth updates
const xTo = gsap.quickTo(button, "x", {
  duration: 0.4,
  ease: "power3.out"
});
const yTo = gsap.quickTo(button, "y", {
  duration: 0.4,
  ease: "power3.out"
});

// On mouse move, calculate offset and animate
const handleMouseMove = (e) => {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Strength controls how far it follows (0-1)
  const deltaX = (e.clientX - centerX) * strength;
  const deltaY = (e.clientY - centerY) * strength;
  
  xTo(deltaX);
  yTo(deltaY);
};

// On mouse leave, snap back
const handleMouseLeave = () => {
  xTo(0);
  yTo(0);
};`}</code>
              </pre>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-12 glass-card p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>⚡</span> Performance Tips
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">▸</span>
                <span>
                  Use <code className="text-accent-cyan">gsap.quickTo()</code> for
                  mouse-following animations - it&apos;s optimized for frequent updates
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">▸</span>
                <span>
                  Add <code className="text-accent-cyan">will-change: transform</code> to
                  hint the browser about upcoming animations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-400 mt-1">▸</span>
                <span>
                  Keep the strength value moderate (0.3-0.6) for a subtle, elegant effect
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
