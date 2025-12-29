/**
 * ============================================================
 * TIMELINE DEMO COMPONENT
 * ============================================================
 * 
 * This component demonstrates GSAP Timeline features:
 * 1. Sequencing multiple animations
 * 2. Timeline controls (play, pause, reverse)
 * 3. Labels for easy navigation
 * 4. Relative positioning
 * 
 * 🎯 Timeline Best Practice:
 * Use timelines to group related animations. They provide
 * precise control over sequencing and are easy to manage.
 */

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function TimelineDemo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useGSAP(
    () => {
      // --------------------------------------------------------
      // CREATE TIMELINE
      // --------------------------------------------------------
      // paused: true so we control when it plays
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.8,
          ease: "power3.out",
        },
      });

      // Store reference for control buttons
      timelineRef.current = tl;

      const boxes = boxesRef.current?.querySelectorAll(".timeline-box");

      if (boxes) {
        // --------------------------------------------------------
        // ANIMATION SEQUENCE
        // --------------------------------------------------------

        // Box 1: Slide in from left
        tl.from(boxes[0], {
          x: -200,
          opacity: 0,
          rotation: -45,
        })
          // Add a label for reference
          .addLabel("box1Done")

          // Box 2: Scale up (starts when box1 is 50% done)
          .from(
            boxes[1],
            {
              scale: 0,
              opacity: 0,
              rotation: 180,
            },
            "-=0.4" // Start 0.4s before previous animation ends
          )

          // Box 3: Drop in from top
          .from(
            boxes[2],
            {
              y: -200,
              opacity: 0,
            },
            "-=0.4"
          )

          // Box 4: Slide in from right
          .from(
            boxes[3],
            {
              x: 200,
              opacity: 0,
              rotation: 45,
            },
            "-=0.4"
          )
          .addLabel("allBoxesDone")

          // All boxes: Scale up together
          .to(boxes, {
            scale: 1.1,
            duration: 0.3,
            stagger: 0.05,
          })
          .to(boxes, {
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
          })

          // Final flourish: Rotate all
          .to(boxes, {
            rotation: 360,
            duration: 1,
            ease: "power2.inOut",
            stagger: {
              amount: 0.4,
              from: "center",
            },
          });
      }

      // --------------------------------------------------------
      // SCROLL TRIGGER TO PLAY ON SCROLL
      // --------------------------------------------------------
      gsap.from(".timeline-content", {
        opacity: 0,
        y: 60,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  // --------------------------------------------------------
  // CONTROL HANDLERS
  // --------------------------------------------------------
  const handlePlay = () => {
    timelineRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    timelineRef.current?.pause();
    setIsPlaying(false);
  };

  const handleReverse = () => {
    timelineRef.current?.reverse();
    setIsPlaying(true);
  };

  const handleRestart = () => {
    timelineRef.current?.restart();
    setIsPlaying(true);
  };

  return (
    <section ref={sectionRef} className="section py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-orb orb-pink w-[500px] h-[500px] -left-20 top-1/4 opacity-30" />
      </div>

      <div className="container relative timeline-content">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="section-badge">
            <span className="text-lg">🎬</span>
            Lesson 6
          </span>
          <h2 className="section-title">Timeline Control</h2>
          <p className="section-description mx-auto">
            Sequence multiple animations with precise timing using GSAP timelines.
            Control playback with play, pause, reverse, and restart.
          </p>
        </div>

        {/* Demo Area */}
        <div className="demo-area p-8 min-h-[400px] flex flex-col items-center justify-center gap-8">
          {/* Animated Boxes */}
          <div ref={boxesRef} className="flex gap-6 flex-wrap justify-center">
            <div className="timeline-box w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/30" />
            <div className="timeline-box w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan to-blue-500 shadow-lg shadow-cyan-500/30" />
            <div className="timeline-box w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-pink to-rose-500 shadow-lg shadow-pink-500/30" />
            <div className="timeline-box w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-orange to-amber-500 shadow-lg shadow-orange-500/30" />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={handlePlay}
              className="px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors"
            >
              ▶️ Play
            </button>
            <button
              onClick={handlePause}
              className="px-6 py-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
            >
              ⏸️ Pause
            </button>
            <button
              onClick={handleReverse}
              className="px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-colors"
            >
              ⏪ Reverse
            </button>
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors"
            >
              🔄 Restart
            </button>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="code-block">
            <div className="code-header">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
              <span className="ml-4 text-sm text-slate-500">timeline.ts</span>
            </div>
            <div className="code-content text-sm">
              <pre>
                <code>{`// Create a timeline
const tl = gsap.timeline({
  paused: true, // Don't auto-play
  defaults: { 
    duration: 0.8,
    ease: "power3.out"
  }
});

// Chain animations
tl.from(box1, { x: -200, opacity: 0 })
  .from(box2, { scale: 0 }, "-=0.4")
  .from(box3, { y: -200 }, "-=0.4")
  .from(box4, { x: 200 }, "-=0.4")
  
  // Add labels for navigation
  .addLabel("allBoxesDone")
  
  // Animate all at once
  .to(boxes, {
    scale: 1.1,
    stagger: 0.05
  });`}</code>
              </pre>
            </div>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span className="code-dot red" />
              <span className="code-dot yellow" />
              <span className="code-dot green" />
              <span className="ml-4 text-sm text-slate-500">controls.ts</span>
            </div>
            <div className="code-content text-sm">
              <pre>
                <code>{`// Timeline control methods
tl.play();      // Play forward
tl.pause();     // Pause at current position
tl.reverse();   // Play backwards
tl.restart();   // Jump to start and play

// Jump to specific time
tl.seek(2);     // Jump to 2 seconds

// Jump to label
tl.seek("allBoxesDone");

// Get/set progress (0-1)
tl.progress(0.5); // Jump to 50%

// Get duration
console.log(tl.duration());

// Speed control
tl.timeScale(2);  // 2x speed`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Position Parameter Guide */}
        <div className="mt-12 glass-card p-8">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span>📍</span> Position Parameter Cheat Sheet
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-dark-300/50 p-4 rounded-xl">
              <code className="text-primary-400">1</code>
              <p className="text-sm text-slate-400 mt-2">
                Absolute time: start at 1 second
              </p>
            </div>
            <div className="bg-dark-300/50 p-4 rounded-xl">
              <code className="text-accent-cyan">"-=0.5"</code>
              <p className="text-sm text-slate-400 mt-2">
                Overlap: start 0.5s before previous ends
              </p>
            </div>
            <div className="bg-dark-300/50 p-4 rounded-xl">
              <code className="text-accent-pink">"+=0.5"</code>
              <p className="text-sm text-slate-400 mt-2">
                Gap: start 0.5s after previous ends
              </p>
            </div>
            <div className="bg-dark-300/50 p-4 rounded-xl">
              <code className="text-accent-orange">"&lt;"</code>
              <p className="text-sm text-slate-400 mt-2">
                Same start: begin with previous animation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
