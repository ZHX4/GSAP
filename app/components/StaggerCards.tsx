/**
 * ============================================================
 * STAGGER CARDS COMPONENT
 * ============================================================
 * 
 * This component demonstrates GSAP's powerful stagger feature:
 * 1. Stagger animations for lists/grids
 * 2. Multiple stagger patterns (from, amount, each)
 * 3. Combining with ScrollTrigger
 * 4. Hover animations with GSAP
 * 
 * 🎯 Stagger Best Practice:
 * Use "stagger" to animate multiple elements with a delay between each.
 * This creates a natural, cascading effect that's pleasing to the eye.
 */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// Card data for our demo
const cards = [
  {
    icon: "🚀",
    title: "Lightning Fast",
    description: "GSAP is optimized for performance with minimal overhead.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: "🎨",
    title: "Beautifully Smooth",
    description: "Buttery 60fps animations that feel natural and fluid.",
    color: "from-accent-cyan to-blue-500",
  },
  {
    icon: "🔧",
    title: "Easy to Use",
    description: "Intuitive API that makes complex animations simple.",
    color: "from-accent-pink to-rose-500",
  },
  {
    icon: "📱",
    title: "Cross-Platform",
    description: "Works flawlessly on all browsers and devices.",
    color: "from-accent-orange to-amber-500",
  },
  {
    icon: "⚡",
    title: "Timeline Control",
    description: "Precise sequencing with timeline-based animations.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: "🎯",
    title: "ScrollTrigger",
    description: "Create scroll-driven animations with ease.",
    color: "from-violet-500 to-purple-600",
  },
];

export default function StaggerCards() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // --------------------------------------------------------
      // CARDS STAGGER ANIMATION
      // --------------------------------------------------------
      // Animate all cards with a stagger effect on scroll
      const cardElements = cardsRef.current?.querySelectorAll(".stagger-card");

      if (cardElements) {
        gsap.from(cardElements, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          rotation: -5,
          duration: 0.8,
          ease: "back.out(1.7)",
          // Stagger configuration
          stagger: {
            amount: 0.8, // Total time to stagger across all elements
            from: "start", // Start from first element
            // Other options: "end", "center", "edges", "random"
            // Or use an index number or "random"
          },
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        // --------------------------------------------------------
        // HOVER ANIMATIONS
        // --------------------------------------------------------
        // Add hover effects to each card
        cardElements.forEach((card) => {
          const icon = card.querySelector(".card-icon");
          const shine = card.querySelector(".card-shine");

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(icon, {
              scale: 1.2,
              rotation: 10,
              duration: 0.4,
              ease: "back.out(1.7)",
            });

            gsap.to(shine, {
              x: "200%",
              duration: 0.6,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.4,
              ease: "power2.out",
            });

            gsap.to(shine, {
              x: "-100%",
              duration: 0.3,
            });
          });
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-orb orb-cyan w-[600px] h-[600px] -right-40 top-1/4" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="section-badge">
            <span className="text-lg">✨</span>
            Lesson 2
          </span>
          <h2 className="section-title">Stagger Animations</h2>
          <p className="section-description mx-auto">
            Create beautiful cascading effects by staggering animations across
            multiple elements. Perfect for lists, grids, and galleries.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="stagger-card glass-card p-8 cursor-pointer relative overflow-hidden group"
            >
              {/* Shine effect overlay */}
              <div
                className="card-shine absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                style={{ transform: "translateX(-100%)" }}
              />

              {/* Card content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`card-icon inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} text-3xl mb-6 shadow-lg`}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary-300 transition-colors">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Decorative gradient border on hover */}
              <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-primary-500/0 to-accent-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
            </div>
          ))}
        </div>

        {/* Code Example */}
        <div className="mt-16 code-block max-w-3xl mx-auto">
          <div className="code-header">
            <span className="code-dot red" />
            <span className="code-dot yellow" />
            <span className="code-dot green" />
            <span className="ml-4 text-sm text-slate-500">stagger-example.ts</span>
          </div>
          <div className="code-content">
            <pre>
              <code>{`// Basic stagger - delays each element
gsap.from(".cards", {
  opacity: 0,
  y: 100,
  stagger: 0.1 // 0.1 seconds between each
});

// Advanced stagger with options
gsap.from(".cards", {
  opacity: 0,
  scale: 0.9,
  stagger: {
    amount: 0.8,      // Total stagger time
    from: "center",   // Start from center
    grid: [3, 3],     // For grid layouts
    ease: "power2.in" // Easing for stagger timing
  }
});

// Stagger from different origins:
// "start", "end", "center", "edges", "random"
// Or use an index number`}</code>
            </pre>
          </div>
        </div>

        {/* Stagger Options */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">⏱️</div>
            <h4 className="font-semibold mb-2">amount</h4>
            <p className="text-sm text-slate-400">
              Total time to distribute the staggers across all elements
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">📍</div>
            <h4 className="font-semibold mb-2">from</h4>
            <p className="text-sm text-slate-400">
              Where to start the stagger: start, end, center, edges, random
            </p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-4">📐</div>
            <h4 className="font-semibold mb-2">grid</h4>
            <p className="text-sm text-slate-400">
              Define rows/columns for grid-based stagger calculations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
