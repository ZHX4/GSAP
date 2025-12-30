'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../components/PageLayout';
import SectionHeader from '../components/ui/SectionHeader';
import CodeBlock from '../components/ui/CodeBlock';
import AnimatedCard from '../components/ui/AnimatedCard';

gsap.registerPlugin(ScrollTrigger);

// FLIP Animation Demo
function FlipDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFlip = () => {
    const card = containerRef.current?.querySelector('.flip-card');
    if (!card) return;

    // First: Record current position
    const first = card.getBoundingClientRect();

    // Toggle state
    setIsExpanded(!isExpanded);

    // Need to wait for DOM update
    requestAnimationFrame(() => {
      // Last: Get new position
      const last = card.getBoundingClientRect();

      // Invert: Calculate the difference
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      const deltaW = first.width / last.width;
      const deltaH = first.height / last.height;

      // Play: Animate from inverted position to final
      gsap.fromTo(card, 
        {
          x: deltaX,
          y: deltaY,
          scaleX: deltaW,
          scaleY: deltaH,
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleFlip}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   text-white font-medium hover:opacity-90 transition-opacity"
      >
        Toggle FLIP
      </button>

      <div 
        ref={containerRef}
        className="min-h-[300px] bg-gray-800/50 rounded-xl p-6 relative"
      >
        <div 
          className={`flip-card bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl p-6
                     flex items-center justify-center text-white font-bold transition-none
                     ${isExpanded 
                       ? 'absolute inset-6' 
                       : 'w-32 h-32'}`}
        >
          {isExpanded ? 'Expanded!' : 'Click'}
        </div>
      </div>

      <CodeBlock 
        title="FLIP Animation Pattern"
        code={`// FLIP = First, Last, Invert, Play

// First: Record initial state
const first = element.getBoundingClientRect();

// (Make DOM change here)
element.classList.toggle('expanded');

// Last: Get final state
const last = element.getBoundingClientRect();

// Invert: Calculate difference
const deltaX = first.left - last.left;
const deltaY = first.top - last.top;
const deltaW = first.width / last.width;
const deltaH = first.height / last.height;

// Play: Animate from inverted to final
gsap.fromTo(element,
  { x: deltaX, y: deltaY, scaleX: deltaW, scaleY: deltaH },
  { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.5 }
);

// Pro Tip: Use GSAP's Flip plugin for complex scenarios`}
      />
    </div>
  );
}

// Complex Timeline Demo
function ComplexTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({ 
      paused: true,
      onUpdate: () => {
        setProgress(tl.progress() * 100);
      },
    });

    const elements = containerRef.current?.querySelectorAll('.timeline-box');
    if (!elements) return;

    // Build complex timeline
    tl.to(elements[0], { x: 200, duration: 0.5, ease: 'power2.out' })
      .to(elements[1], { x: 200, rotation: 180, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(elements[2], { x: 200, scale: 1.5, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(elements, { 
        backgroundColor: '#22d3ee', 
        duration: 0.3,
      })
      .to(elements, { 
        x: 0, 
        rotation: 0, 
        scale: 1, 
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      })
      .to(elements, { 
        backgroundColor: '#a855f7', 
        duration: 0.3,
      });

    timelineRef.current = tl;
  }, { scope: containerRef });

  const play = () => {
    timelineRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    timelineRef.current?.pause();
    setIsPlaying(false);
  };

  const reverse = () => {
    timelineRef.current?.reverse();
  };

  const restart = () => {
    timelineRef.current?.restart();
    setIsPlaying(true);
  };

  const seek = (value: number) => {
    timelineRef.current?.progress(value / 100);
    setProgress(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={isPlaying ? pause : play}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={reverse}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Reverse
        </button>
        <button
          onClick={restart}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Restart
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 w-12">{Math.round(progress)}%</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-700 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                     [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-purple-500"
        />
      </div>

      <div 
        ref={containerRef}
        className="h-48 bg-gray-800/50 rounded-xl p-6 flex flex-col justify-around"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="timeline-box w-12 h-12 rounded-lg"
            style={{ backgroundColor: '#a855f7' }}
          />
        ))}
      </div>

      <CodeBlock 
        title="Timeline Controls"
        code={`const tl = gsap.timeline({ paused: true });

// Build timeline with position parameters
tl.to('.box1', { x: 200, duration: 0.5 })
  .to('.box2', { x: 200, rotation: 180 }, '-=0.3') // 0.3s before previous ends
  .to('.box3', { x: 200, scale: 1.5 }, '<')        // Same time as previous
  .to('.all', { backgroundColor: '#22d3ee' }, '>') // After previous ends

// Control methods
tl.play();
tl.pause();
tl.reverse();
tl.restart();
tl.progress(0.5);  // Jump to 50%
tl.seek(1);        // Jump to 1 second
tl.timeScale(2);   // Double speed`}
      />
    </div>
  );
}

// Custom Easing Demo
function CustomEasing() {
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const customEasings = [
    { name: 'Default Power1', ease: 'power1.out' },
    { name: 'Bounce', ease: 'bounce.out' },
    { name: 'Elastic', ease: 'elastic.out(1, 0.3)' },
    { name: 'Back', ease: 'back.out(1.7)' },
    { name: 'Custom Bezier', ease: 'M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 0.632,1.002 0.818,1.001 1,1' },
    { name: 'Steps', ease: 'steps(5)' },
  ];

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(boxRefs.current, {
          x: 0,
          duration: 0.3,
          stagger: 0.05,
          onComplete: () => setIsAnimating(false),
        });
      },
    });

    boxRefs.current.forEach((box, i) => {
      tl.to(box, {
        x: 200,
        duration: 1,
        ease: customEasings[i].ease,
      }, 0);
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={animate}
        disabled={isAnimating}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   text-white font-medium hover:opacity-90 transition-opacity
                   disabled:opacity-50"
      >
        Compare Easings
      </button>

      <div className="bg-gray-800/50 rounded-xl p-6 space-y-3">
        {customEasings.map((item, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="w-32 text-sm text-gray-400">{item.name}</span>
            <div
              ref={el => { boxRefs.current[i] = el; }}
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500"
            />
          </div>
        ))}
      </div>

      <CodeBlock 
        title="Custom Easings"
        code={`// Built-in easings
gsap.to(el, { x: 100, ease: 'power2.out' });
gsap.to(el, { x: 100, ease: 'bounce.out' });
gsap.to(el, { x: 100, ease: 'elastic.out(1, 0.3)' });
gsap.to(el, { x: 100, ease: 'back.out(1.7)' });

// Custom bezier curve (SVG path syntax)
gsap.to(el, { 
  x: 100, 
  ease: 'M0,0 C0.126,0.382 0.282,0.674 0.44,0.822 ...' 
});

// Stepped animation
gsap.to(el, { x: 100, ease: 'steps(5)' });

// Create with CustomEase plugin
CustomEase.create('myEase', 'M0,0 C0.5,0 0.5,1 1,1');
gsap.to(el, { x: 100, ease: 'myEase' });`}
      />
    </div>
  );
}

// Performance Optimization Demo
function PerformanceDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxCount, setBoxCount] = useState(50);
  const [fps, setFps] = useState(60);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const measureFPS = useCallback(() => {
    let lastTime = performance.now();
    let frames = 0;
    
    const measure = () => {
      frames++;
      const now = performance.now();
      
      if (now - lastTime >= 1000) {
        setFps(Math.round(frames * 1000 / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      
      requestAnimationFrame(measure);
    };
    
    measure();
  }, []);

  useEffect(() => {
    measureFPS();
  }, [measureFPS]);

  const startAnimation = () => {
    const boxes = containerRef.current?.querySelectorAll('.perf-box');
    if (!boxes) return;

    animationRef.current?.kill();
    
    animationRef.current = gsap.to(boxes, {
      x: 'random(-100, 100)',
      y: 'random(-50, 50)',
      rotation: 'random(-180, 180)',
      duration: 1,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.02,
        from: 'random',
      },
      ease: 'sine.inOut',
    });
  };

  const stopAnimation = () => {
    animationRef.current?.kill();
    const boxes = containerRef.current?.querySelectorAll('.perf-box');
    if (boxes) {
      gsap.to(boxes, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.3,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={startAnimation}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Start Stress Test
        </button>
        <button
          onClick={stopAnimation}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Stop
        </button>
        
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Boxes:</span>
          <input
            type="range"
            min="10"
            max="200"
            value={boxCount}
            onChange={(e) => setBoxCount(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-cyan-400 w-8">{boxCount}</span>
        </div>

        <div className={`px-3 py-1 rounded-lg text-sm font-medium
                        ${fps >= 55 ? 'bg-green-500/20 text-green-400' : 
                          fps >= 30 ? 'bg-yellow-500/20 text-yellow-400' : 
                          'bg-red-500/20 text-red-400'}`}>
          {fps} FPS
        </div>
      </div>

      <div 
        ref={containerRef}
        className="h-64 bg-gray-800/50 rounded-xl relative overflow-hidden flex flex-wrap 
                   content-center justify-center gap-2 p-4"
      >
        {[...Array(boxCount)].map((_, i) => (
          <div
            key={i}
            className="perf-box w-4 h-4 rounded-sm"
            style={{
              backgroundColor: `hsl(${(i * 5) % 360}, 70%, 50%)`,
            }}
          />
        ))}
      </div>

      <CodeBlock 
        title="Performance Best Practices"
        code={`// 1. Use transforms only (GPU accelerated)
gsap.to(el, { x: 100, y: 50, rotation: 45, scale: 1.2 });

// 2. Avoid animating layout properties
// ❌ width, height, top, left, padding, margin
// ✅ x, y, scale, rotation, opacity

// 3. Use will-change sparingly
gsap.set(el, { willChange: 'transform' });
// Remove after animation
tl.eventCallback('onComplete', () => {
  gsap.set(el, { willChange: 'auto' });
});

// 4. Kill animations when component unmounts
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations here
  });
  return () => ctx.revert(); // cleanup
}, []);

// 5. Use gsap.ticker for custom frame logic
gsap.ticker.add(myFunction);
gsap.ticker.remove(myFunction);`}
      />
    </div>
  );
}

// Reduced Motion Demo
function ReducedMotionDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animate = () => {
    if (prefersReducedMotion) {
      // Instant change for reduced motion
      gsap.set(boxRef.current, {
        x: gsap.getProperty(boxRef.current, 'x') === 0 ? 200 : 0,
      });
    } else {
      // Full animation
      gsap.to(boxRef.current, {
        x: gsap.getProperty(boxRef.current, 'x') === 0 ? 200 : 0,
        rotation: '+=360',
        duration: 0.8,
        ease: 'back.out(1.7)',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={animate}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Animate
        </button>
        
        <div className={`px-3 py-1 rounded-lg text-sm
                        ${prefersReducedMotion 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-green-500/20 text-green-400'}`}>
          {prefersReducedMotion ? 'Reduced Motion: ON' : 'Reduced Motion: OFF'}
        </div>
      </div>

      <div className="h-32 bg-gray-800/50 rounded-xl flex items-center p-8">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500"
        />
      </div>

      <CodeBlock 
        title="Respecting Reduced Motion"
        code={`// Check user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Conditional animation
if (prefersReducedMotion) {
  // Instant change
  gsap.set(element, { x: 200 });
} else {
  // Full animation
  gsap.to(element, {
    x: 200,
    rotation: 360,
    duration: 0.8,
    ease: 'back.out(1.7)',
  });
}

// Or use gsap.matchMedia for responsive animations
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  // Full animations here
});`}
      />
    </div>
  );
}

// Context Cleanup Demo
function ContextDemo() {
  const [showBox, setShowBox] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowBox(!showBox)}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   text-white font-medium hover:opacity-90 transition-opacity"
      >
        {showBox ? 'Unmount' : 'Mount'} Component
      </button>

      <div ref={containerRef} className="h-48 bg-gray-800/50 rounded-xl p-8">
        {showBox && <AnimatedBox />}
      </div>

      <CodeBlock 
        title="GSAP Context for Cleanup"
        code={`import { useGSAP } from '@gsap/react';

function AnimatedComponent() {
  const containerRef = useRef(null);

  // useGSAP automatically handles cleanup
  useGSAP(() => {
    gsap.to('.box', {
      rotation: 360,
      duration: 2,
      repeat: -1,
    });
  }, { scope: containerRef }); // Scope animations to container

  return <div ref={containerRef}>...</div>;
}

// Manual cleanup (if not using useGSAP)
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to('.box', { x: 100 });
    ScrollTrigger.create({ ... });
  }, containerRef);

  return () => ctx.revert(); // Kills all animations and ScrollTriggers
}, []);`}
      />
    </div>
  );
}

// Sub-component for context demo
function AnimatedBox() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(boxRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });
  });

  return (
    <div className="h-full flex items-center justify-center">
      <div
        ref={boxRef}
        className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   flex items-center justify-center text-white font-bold"
      >
        ∞
      </div>
    </div>
  );
}

export default function AdvancedPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.hero-text', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );
  }, { scope: heroRef });

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <div ref={heroRef} className="mb-20">
          <span className="hero-text inline-block px-4 py-1.5 mb-4 text-sm font-medium 
                          bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
            Lesson 6
          </span>
          <h1 className="hero-text text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-red-200 to-orange-200 
                            bg-clip-text text-transparent">
              Advanced Techniques
            </span>
          </h1>
          <p className="hero-text text-xl text-gray-400 max-w-2xl">
            Master professional animation patterns: FLIP, complex timelines, 
            custom easings, performance optimization, and accessibility.
          </p>
        </div>

        {/* FLIP */}
        <section className="mb-20">
          <SectionHeader 
            title="FLIP Animation"
            subtitle="First, Last, Invert, Play - for layout animations"
            badge="Pro"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <FlipDemo />
          </AnimatedCard>

          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <p className="text-purple-300 text-sm">
              💡 <strong>Pro Tip:</strong> GSAP has an official Flip plugin that handles 
              all the complexity automatically, including nested elements and responsive layouts!
            </p>
          </div>
        </section>

        {/* Complex Timeline */}
        <section className="mb-20">
          <SectionHeader 
            title="Complex Timelines"
            subtitle="Build intricate sequences with full control"
            badge="Essential"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <ComplexTimeline />
          </AnimatedCard>
        </section>

        {/* Custom Easing */}
        <section className="mb-20">
          <SectionHeader 
            title="Custom Easings"
            subtitle="Create unique motion curves"
            badge="Creative"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <CustomEasing />
          </AnimatedCard>
        </section>

        {/* Performance */}
        <section className="mb-20">
          <SectionHeader 
            title="Performance Optimization"
            subtitle="Keep animations smooth at 60fps"
            badge="Important"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <PerformanceDemo />
          </AnimatedCard>
        </section>

        {/* Reduced Motion */}
        <section className="mb-20">
          <SectionHeader 
            title="Accessibility"
            subtitle="Respect user motion preferences"
            badge="A11y"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <ReducedMotionDemo />
          </AnimatedCard>
        </section>

        {/* Context Cleanup */}
        <section className="mb-20">
          <SectionHeader 
            title="GSAP Context & Cleanup"
            subtitle="Proper animation lifecycle management in React"
            badge="React"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <ContextDemo />
          </AnimatedCard>
        </section>

        {/* Summary */}
        <section>
          <SectionHeader 
            title="Advanced Tips Summary"
            centered={false}
          />
          
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatedCard>
              <h4 className="text-purple-400 font-semibold mb-3">🎯 GSAP Plugins</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>Flip</strong> - Layout animations</li>
                <li>• <strong>MotionPath</strong> - Path following</li>
                <li>• <strong>MorphSVG</strong> - Shape morphing</li>
                <li>• <strong>SplitText</strong> - Text splitting</li>
                <li>• <strong>Draggable</strong> - Drag interactions</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-cyan-400 font-semibold mb-3">⚡ Performance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Only animate transforms</li>
                <li>• Use gsap.context for cleanup</li>
                <li>• Avoid layout thrashing</li>
                <li>• Kill unused animations</li>
                <li>• Test on low-end devices</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-green-400 font-semibold mb-3">📚 Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>gsap.com/docs</strong></li>
                <li>• <strong>gsap.com/community</strong></li>
                <li>• <strong>CodePen collections</strong></li>
                <li>• <strong>GreenSock YouTube</strong></li>
                <li>• <strong>CSS-Tricks articles</strong></li>
              </ul>
            </AnimatedCard>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
