'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import PageLayout from '../components/PageLayout';
import SectionHeader from '../components/ui/SectionHeader';
import CodeBlock from '../components/ui/CodeBlock';
import AnimatedCard from '../components/ui/AnimatedCard';

// Interactive Demo Components
function TweenDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [tweenType, setTweenType] = useState<'to' | 'from' | 'fromTo'>('to');

  const runAnimation = () => {
    gsap.killTweensOf(boxRef.current);
    gsap.set(boxRef.current, { x: 0, rotation: 0, scale: 1, opacity: 1 });

    if (tweenType === 'to') {
      gsap.to(boxRef.current, {
        x: 200,
        rotation: 360,
        duration: 1,
        ease: 'power2.out',
      });
    } else if (tweenType === 'from') {
      gsap.from(boxRef.current, {
        x: -200,
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    } else {
      gsap.fromTo(boxRef.current, 
        { x: -100, rotation: -180 },
        { x: 100, rotation: 180, duration: 1, ease: 'elastic.out(1, 0.5)' }
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        {(['to', 'from', 'fromTo'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setTweenType(type)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition-all
                       ${tweenType === type 
                         ? 'bg-purple-500 text-white' 
                         : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            gsap.{type}()
          </button>
        ))}
        <button
          onClick={runAnimation}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Run Animation
        </button>
      </div>

      <div className="h-32 bg-gray-800/50 rounded-xl flex items-center justify-center overflow-hidden">
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500"
        />
      </div>

      <CodeBlock 
        title={`gsap.${tweenType}() Example`}
        code={tweenType === 'to' 
          ? `gsap.to(element, {
  x: 200,
  rotation: 360,
  duration: 1,
  ease: 'power2.out'
});`
          : tweenType === 'from'
          ? `gsap.from(element, {
  x: -200,
  opacity: 0,
  scale: 0.5,
  duration: 1,
  ease: 'back.out(1.7)'
});`
          : `gsap.fromTo(element, 
  { x: -100, rotation: -180 },
  { x: 100, rotation: 180, duration: 1, ease: 'elastic.out(1, 0.5)' }
);`}
      />
    </div>
  );
}

function EasingDemo() {
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const easings = [
    { name: 'none', label: 'Linear' },
    { name: 'power1.out', label: 'Power1' },
    { name: 'power2.out', label: 'Power2' },
    { name: 'power3.out', label: 'Power3' },
    { name: 'power4.out', label: 'Power4' },
    { name: 'back.out(1.7)', label: 'Back' },
    { name: 'elastic.out(1, 0.3)', label: 'Elastic' },
    { name: 'bounce.out', label: 'Bounce' },
  ];

  const runAll = () => {
    boxRefs.current.forEach((box, i) => {
      if (box) {
        gsap.killTweensOf(box);
        gsap.set(box, { x: 0 });
        gsap.to(box, {
          x: 200,
          duration: 1.5,
          ease: easings[i].name,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={runAll}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   text-white font-medium hover:opacity-90 transition-opacity"
      >
        Compare All Easings
      </button>

      <div className="space-y-3">
        {easings.map((ease, i) => (
          <div key={ease.name} className="flex items-center gap-4">
            <span className="w-24 text-sm text-gray-400 font-mono">{ease.label}</span>
            <div className="flex-1 h-10 bg-gray-800/50 rounded-lg overflow-hidden relative">
              <div
                ref={(el) => { boxRefs.current[i] = el; }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md 
                          bg-gradient-to-br from-purple-500 to-cyan-500"
              />
            </div>
          </div>
        ))}
      </div>

      <CodeBlock 
        title="Easing Examples"
        code={`// Common easing functions
gsap.to(el, { x: 200, ease: 'none' });       // Linear
gsap.to(el, { x: 200, ease: 'power2.out' }); // Smooth deceleration
gsap.to(el, { x: 200, ease: 'power2.in' });  // Smooth acceleration
gsap.to(el, { x: 200, ease: 'power2.inOut' }); // Both
gsap.to(el, { x: 200, ease: 'back.out(1.7)' }); // Overshoot
gsap.to(el, { x: 200, ease: 'elastic.out(1, 0.3)' }); // Springy
gsap.to(el, { x: 200, ease: 'bounce.out' }); // Bouncy`}
      />
    </div>
  );
}

function PropertiesDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [property, setProperty] = useState('x');

  const properties = [
    { key: 'x', label: 'X Position', config: { x: 150 } },
    { key: 'y', label: 'Y Position', config: { y: -50 } },
    { key: 'scale', label: 'Scale', config: { scale: 1.5 } },
    { key: 'rotation', label: 'Rotation', config: { rotation: 360 } },
    { key: 'opacity', label: 'Opacity', config: { opacity: 0.3 } },
    { key: 'borderRadius', label: 'Border Radius', config: { borderRadius: '50%' } },
    { key: 'backgroundColor', label: 'Background', config: { backgroundColor: '#22d3ee' } },
  ];

  const runAnimation = (config: object) => {
    gsap.killTweensOf(boxRef.current);
    gsap.set(boxRef.current, { 
      x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, 
      borderRadius: '0.75rem', backgroundColor: '#a855f7' 
    });
    gsap.to(boxRef.current, {
      ...config,
      duration: 0.8,
      ease: 'power2.out',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        {properties.map((prop) => (
          <button
            key={prop.key}
            onClick={() => {
              setProperty(prop.key);
              runAnimation(prop.config);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all
                       ${property === prop.key 
                         ? 'bg-purple-500 text-white' 
                         : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            {prop.label}
          </button>
        ))}
      </div>

      <div className="h-40 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <div
          ref={boxRef}
          className="w-20 h-20 rounded-xl bg-purple-500"
        />
      </div>

      <CodeBlock 
        title="Animatable Properties"
        code={`// Transform properties (GPU accelerated)
gsap.to(el, { x: 100, y: 50 });    // Position
gsap.to(el, { scale: 1.5 });       // Scale
gsap.to(el, { rotation: 360 });    // Rotation
gsap.to(el, { skewX: 20 });        // Skew

// CSS properties
gsap.to(el, { opacity: 0.5 });
gsap.to(el, { backgroundColor: '#ff0000' });
gsap.to(el, { borderRadius: '50%' });
gsap.to(el, { width: '200px', height: '100px' });

// Special properties
gsap.to(el, { autoAlpha: 0 }); // opacity + visibility`}
      />
    </div>
  );
}

function TimelineDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useGSAP(() => {
    const boxes = containerRef.current?.querySelectorAll('.tl-box');
    if (!boxes) return;

    tlRef.current = gsap.timeline({ paused: true })
      .from(boxes[0], { x: -100, opacity: 0, duration: 0.5 })
      .from(boxes[1], { y: -50, opacity: 0, duration: 0.5 }, '-=0.3')
      .from(boxes[2], { scale: 0, opacity: 0, duration: 0.5 }, '-=0.3')
      .from(boxes[3], { rotation: -180, opacity: 0, duration: 0.5 }, '-=0.3')
      .to(boxes, { y: -20, stagger: 0.1, duration: 0.3 })
      .to(boxes, { y: 0, stagger: 0.1, duration: 0.3 });
  }, { scope: containerRef });

  const handlePlay = () => {
    if (tlRef.current) {
      if (isPlaying) {
        tlRef.current.pause();
      } else {
        if (tlRef.current.progress() === 1) {
          tlRef.current.restart();
        } else {
          tlRef.current.play();
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    tlRef.current?.restart();
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={handlePlay}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={handleRestart}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Restart
        </button>
      </div>

      <div 
        ref={containerRef}
        className="h-32 bg-gray-800/50 rounded-xl flex items-center justify-center gap-4"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="tl-box w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500"
          />
        ))}
      </div>

      <CodeBlock 
        title="Timeline Example"
        code={`// Create a timeline
const tl = gsap.timeline();

// Sequential animations (one after another)
tl.from(box1, { x: -100, opacity: 0, duration: 0.5 })
  .from(box2, { y: -50, opacity: 0, duration: 0.5 })
  .from(box3, { scale: 0, duration: 0.5 });

// Position parameter for overlap
tl.from(box1, { x: -100, duration: 0.5 })
  .from(box2, { y: -50, duration: 0.5 }, '-=0.3')  // 0.3s before end
  .from(box3, { scale: 0, duration: 0.5 }, '<');   // Same start time

// Timeline controls
tl.play();
tl.pause();
tl.reverse();
tl.restart();
tl.progress(0.5); // Jump to 50%`}
      />
    </div>
  );
}

export default function BasicsPage() {
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
                          bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
            Lesson 1
          </span>
          <h1 className="hero-text text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-cyan-200 
                            bg-clip-text text-transparent">
              GSAP Basics
            </span>
          </h1>
          <p className="hero-text text-xl text-gray-400 max-w-2xl">
            Master the fundamentals of GSAP: tweens, timelines, easing functions, 
            and animatable properties. These are the building blocks for all GSAP animations.
          </p>
        </div>

        {/* Tweens Section */}
        <section className="mb-20">
          <SectionHeader 
            title="Tweens: The Foundation"
            subtitle="A tween is a single animation. GSAP provides three methods: to(), from(), and fromTo()."
            badge="Core Concept"
            centered={false}
          />
          <AnimatedCard>
            <TweenDemo />
          </AnimatedCard>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <AnimatedCard delay={0.1}>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">gsap.to()</h4>
              <p className="text-gray-400 text-sm">
                Animates FROM the current state TO the values you define. 
                Most commonly used method.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={0.2}>
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">gsap.from()</h4>
              <p className="text-gray-400 text-sm">
                Animates FROM the values you define TO the current state. 
                Great for entrance animations.
              </p>
            </AnimatedCard>
            <AnimatedCard delay={0.3}>
              <h4 className="text-lg font-semibold text-green-400 mb-2">gsap.fromTo()</h4>
              <p className="text-gray-400 text-sm">
                Define both start and end values. Full control over the animation range.
              </p>
            </AnimatedCard>
          </div>
        </section>

        {/* Easing Section */}
        <section className="mb-20">
          <SectionHeader 
            title="Easing Functions"
            subtitle="Easing controls the rate of change during an animation, making it feel natural and polished."
            badge="Essential"
            centered={false}
          />
          <AnimatedCard>
            <EasingDemo />
          </AnimatedCard>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 
                         rounded-xl border border-purple-500/20">
            <h4 className="text-lg font-semibold mb-4">💡 Pro Tip: Easing Naming Convention</h4>
            <ul className="space-y-2 text-gray-400">
              <li><code className="text-purple-400">.in</code> - Starts slow, ends fast</li>
              <li><code className="text-purple-400">.out</code> - Starts fast, ends slow (most natural)</li>
              <li><code className="text-purple-400">.inOut</code> - Slow at both ends</li>
              <li className="pt-2">
                The number after <code className="text-cyan-400">power</code> indicates strength 
                (1 = gentle, 4 = dramatic)
              </li>
            </ul>
          </div>
        </section>

        {/* Properties Section */}
        <section className="mb-20">
          <SectionHeader 
            title="Animatable Properties"
            subtitle="GSAP can animate almost any numeric CSS property, plus special transform shortcuts."
            badge="Reference"
            centered={false}
          />
          <AnimatedCard>
            <PropertiesDemo />
          </AnimatedCard>
        </section>

        {/* Timeline Section */}
        <section className="mb-20">
          <SectionHeader 
            title="Timelines"
            subtitle="Sequence multiple animations with precise control over timing and overlap."
            badge="Powerful"
            centered={false}
          />
          <AnimatedCard>
            <TimelineDemo />
          </AnimatedCard>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <AnimatedCard>
              <h4 className="text-lg font-semibold text-purple-400 mb-3">Position Parameters</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><code className="text-cyan-400">&quot;&lt;&quot;</code> - Start at same time as previous</li>
                <li><code className="text-cyan-400">&quot;&gt;&quot;</code> - Start at end of previous (default)</li>
                <li><code className="text-cyan-400">&quot;-=0.5&quot;</code> - 0.5s before previous ends</li>
                <li><code className="text-cyan-400">&quot;+=0.5&quot;</code> - 0.5s after previous ends</li>
                <li><code className="text-cyan-400">2</code> - Absolute time (2 seconds)</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-lg font-semibold text-cyan-400 mb-3">Timeline Benefits</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Control all animations as a group</li>
                <li>✓ Pause, reverse, speed up entire sequence</li>
                <li>✓ Easily adjust timing relationships</li>
                <li>✓ Nest timelines within timelines</li>
                <li>✓ Add labels for named positions</li>
              </ul>
            </AnimatedCard>
          </div>
        </section>

        {/* Quick Reference */}
        <section>
          <SectionHeader 
            title="Quick Reference"
            subtitle="Copy these snippets to get started quickly"
            centered={false}
          />
          <div className="space-y-6">
            <CodeBlock 
              title="Basic Setup in React/Next.js"
              code={`import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function MyComponent() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Your GSAP code here - runs after component mounts
    gsap.from('.box', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    });
  }, { scope: containerRef }); // Scope animations to container

  return (
    <div ref={containerRef}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
    </div>
  );
}`}
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
