'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../components/PageLayout';
import SectionHeader from '../components/ui/SectionHeader';
import CodeBlock from '../components/ui/CodeBlock';
import AnimatedCard from '../components/ui/AnimatedCard';

gsap.registerPlugin(ScrollTrigger);

// SVG Path Drawing
function PathDrawing() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  const draw = () => {
    const paths = svgRef.current?.querySelectorAll('path, circle, rect, line');
    if (!paths) return;

    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 100;
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.3,
      ease: 'power2.inOut',
    });
    
    setIsDrawn(true);
  };

  const reset = () => {
    const paths = svgRef.current?.querySelectorAll('path, circle, rect, line');
    if (!paths) return;

    paths.forEach((path) => {
      const length = (path as SVGGeometryElement).getTotalLength?.() || 100;
      gsap.set(path, {
        strokeDashoffset: length,
      });
    });
    
    setIsDrawn(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={draw}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Draw
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center p-8">
        <svg
          ref={svgRef}
          viewBox="0 0 200 100"
          className="w-full max-w-md"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* Envelope shape */}
          <rect 
            x="20" y="20" width="160" height="60" 
            className="text-purple-400"
            strokeDasharray="440"
            strokeDashoffset="440"
          />
          <path 
            d="M20 20 L100 60 L180 20" 
            className="text-cyan-400"
            strokeDasharray="200"
            strokeDashoffset="200"
          />
          <line 
            x1="20" y1="80" x2="60" y2="50" 
            className="text-purple-400"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
          <line 
            x1="180" y1="80" x2="140" y2="50" 
            className="text-purple-400"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
        </svg>
      </div>

      <CodeBlock 
        title="SVG Path Drawing"
        code={`const path = document.querySelector('path');
const length = path.getTotalLength();

// Set initial state
gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

// Animate the drawing
gsap.to(path, {
  strokeDashoffset: 0,
  duration: 2,
  ease: 'power2.inOut',
});`}
      />
    </div>
  );
}

// Animated Logo/Icon
function AnimatedIcon() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const circle = svgRef.current?.querySelector('.outer-circle');
    const check = svgRef.current?.querySelector('.check');
    const sparkles = svgRef.current?.querySelectorAll('.sparkle');

    if (!circle || !check || !sparkles) return;

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Reset
    tl.set(circle, { scale: 0, opacity: 0 })
      .set(check, { strokeDashoffset: 50 })
      .set(sparkles, { scale: 0, opacity: 0 });

    // Animate
    tl.to(circle, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
    })
    .to(check, {
      strokeDashoffset: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(sparkles, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: 'back.out(2)',
    })
    .to(sparkles, {
      scale: 0,
      opacity: 0,
      duration: 0.2,
      delay: 0.5,
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
        Animate Success
      </button>

      <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-32 h-32"
          fill="none"
        >
          {/* Sparkles */}
          <circle className="sparkle text-yellow-400" cx="20" cy="20" r="3" fill="currentColor" />
          <circle className="sparkle text-yellow-400" cx="80" cy="20" r="2" fill="currentColor" />
          <circle className="sparkle text-yellow-400" cx="15" cy="60" r="2" fill="currentColor" />
          <circle className="sparkle text-yellow-400" cx="85" cy="55" r="3" fill="currentColor" />
          <circle className="sparkle text-yellow-400" cx="25" cy="85" r="2" fill="currentColor" />
          <circle className="sparkle text-yellow-400" cx="75" cy="80" r="2" fill="currentColor" />
          
          {/* Circle */}
          <circle 
            className="outer-circle text-green-500" 
            cx="50" cy="50" r="35" 
            stroke="currentColor" 
            strokeWidth="4"
            fill="rgba(34, 197, 94, 0.2)"
          />
          
          {/* Check */}
          <path 
            className="check text-green-400"
            d="M30 50 L45 65 L70 35"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="50"
            strokeDashoffset="50"
          />
        </svg>
      </div>
    </div>
  );
}

// Morphing Shapes
function MorphingShapes() {
  const shapeRef = useRef<SVGPathElement>(null);
  const [shapeIndex, setShapeIndex] = useState(0);
  
  const shapes = [
    'M50 10 L90 90 L10 90 Z', // Triangle
    'M10 10 L90 10 L90 90 L10 90 Z', // Square
    'M50 10 L90 35 L75 90 L25 90 L10 35 Z', // Pentagon
    'M50 10 C75 10 90 35 90 50 C90 75 65 90 50 90 C25 90 10 75 10 50 C10 25 35 10 50 10 Z', // Circle-ish
  ];
  
  const shapeNames = ['Triangle', 'Square', 'Pentagon', 'Circle'];

  const morph = () => {
    const nextIndex = (shapeIndex + 1) % shapes.length;
    
    gsap.to(shapeRef.current, {
      attr: { d: shapes[nextIndex] },
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
    
    setShapeIndex(nextIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={morph}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Morph to {shapeNames[(shapeIndex + 1) % shapes.length]}
        </button>
        <span className="text-gray-400">
          Current: {shapeNames[shapeIndex]}
        </span>
      </div>

      <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          <path
            ref={shapeRef}
            d={shapes[0]}
            fill="rgba(168, 85, 247, 0.3)"
            stroke="rgb(168, 85, 247)"
            strokeWidth="2"
          />
        </svg>
      </div>

      <CodeBlock 
        title="SVG Morphing"
        code={`// Define shapes with same number of points for smooth morph
const shapes = [
  'M50 10 L90 90 L10 90 Z', // Triangle
  'M10 10 L90 10 L90 90 L10 90 Z', // Square
];

// Morph between shapes
gsap.to('path', {
  attr: { d: shapes[1] },
  duration: 0.8,
  ease: 'elastic.out(1, 0.5)',
});

// Note: For complex morphing, consider MorphSVGPlugin`}
      />
    </div>
  );
}

// Animated Chart
function AnimatedChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const data = [
    { label: 'Mon', value: 65, color: '#a855f7' },
    { label: 'Tue', value: 85, color: '#22d3ee' },
    { label: 'Wed', value: 45, color: '#f472b6' },
    { label: 'Thu', value: 90, color: '#34d399' },
    { label: 'Fri', value: 70, color: '#fbbf24' },
  ];

  const animate = () => {
    const bars = containerRef.current?.querySelectorAll('.bar');
    if (!bars) return;

    gsap.from(bars, {
      scaleY: 0,
      transformOrigin: 'bottom',
      duration: 0.8,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
    });
    
    setAnimated(true);
  };

  const reset = () => {
    const bars = containerRef.current?.querySelectorAll('.bar');
    if (!bars) return;

    gsap.set(bars, { scaleY: 0 });
    setAnimated(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={animate}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Animate Chart
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div 
        ref={containerRef}
        className="h-64 bg-gray-800/50 rounded-xl p-6 flex items-end justify-around"
      >
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div 
              className="bar w-12 rounded-t-lg"
              style={{ 
                height: `${item.value * 1.5}px`,
                backgroundColor: item.color,
              }}
            />
            <span className="text-sm text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>

      <CodeBlock 
        title="Animated Bar Chart"
        code={`gsap.from('.bar', {
  scaleY: 0,
  transformOrigin: 'bottom',
  duration: 0.8,
  stagger: 0.1,
  ease: 'elastic.out(1, 0.5)',
});`}
      />
    </div>
  );
}

// Rotating Loader
function AnimatedLoader() {
  const loaderRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const circles = loaderRef.current?.querySelectorAll('circle');
    if (!circles) return;

    gsap.to(loaderRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });

    gsap.to(circles, {
      scale: 0.5,
      opacity: 0.3,
      duration: 0.5,
      stagger: {
        each: 0.1,
        repeat: -1,
        yoyo: true,
      },
      ease: 'power2.inOut',
    });
  });

  return (
    <div className="py-8">
      <div className="h-40 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <svg
          ref={loaderRef}
          viewBox="0 0 50 50"
          className="w-16 h-16"
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 25 + 15 * Math.cos(angle);
            const y = 25 + 15 * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={i % 2 === 0 ? '#a855f7' : '#22d3ee'}
              />
            );
          })}
        </svg>
      </div>

      <CodeBlock 
        title="Animated Loader"
        code={`// Rotate the container
gsap.to('.loader', {
  rotation: 360,
  duration: 2,
  repeat: -1,
  ease: 'none',
});

// Pulse the dots
gsap.to('.dot', {
  scale: 0.5,
  opacity: 0.3,
  duration: 0.5,
  stagger: {
    each: 0.1,
    repeat: -1,
    yoyo: true,
  },
});`}
      />
    </div>
  );
}

// Scroll-triggered SVG
function ScrollSVG() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();

    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-12">
      <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 400 100" className="w-full max-w-2xl px-8">
          <path
            ref={pathRef}
            d="M0 50 Q50 10 100 50 T200 50 T300 50 T400 50"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="text-center text-gray-500 mt-4">
        Scroll to see the wave draw
      </p>
    </div>
  );
}

// Interactive Hover SVG
function HoverSVG() {
  const starRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = () => {
    gsap.to(starRef.current, {
      rotation: 360,
      scale: 1.2,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
    
    const starFill = starRef.current?.querySelector('.star-fill');
    if (starFill) {
      gsap.to(starFill, {
        fill: '#fbbf24',
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    gsap.to(starRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
    
    const starFill = starRef.current?.querySelector('.star-fill');
    if (starFill) {
      gsap.to(starFill, {
        fill: 'transparent',
        duration: 0.3,
      });
    }
  };

  return (
    <div className="py-8">
      <div className="h-40 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <svg
          ref={starRef}
          viewBox="0 0 50 50"
          className="w-20 h-20 cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <path
            className="star-fill"
            d="M25 5 L30 20 L45 20 L33 30 L38 45 L25 35 L12 45 L17 30 L5 20 L20 20 Z"
            fill="transparent"
            stroke="#fbbf24"
            strokeWidth="2"
          />
        </svg>
      </div>
      <p className="text-center text-gray-500 mt-4">
        Hover over the star
      </p>
    </div>
  );
}

export default function SVGAnimationsPage() {
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
            Lesson 4
          </span>
          <h1 className="hero-text text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-cyan-200 
                            bg-clip-text text-transparent">
              SVG Animations
            </span>
          </h1>
          <p className="hero-text text-xl text-gray-400 max-w-2xl">
            Master SVG animations: path drawing, morphing, icons, charts, and 
            scroll-triggered effects. Bring your vector graphics to life!
          </p>
        </div>

        {/* Path Drawing */}
        <section className="mb-20">
          <SectionHeader 
            title="Path Drawing"
            subtitle="The classic SVG animation technique using stroke-dashoffset"
            badge="Essential"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <PathDrawing />
          </AnimatedCard>
        </section>

        {/* Animated Icon */}
        <section className="mb-20">
          <SectionHeader 
            title="Animated Icons"
            subtitle="Create lively icon animations with multiple elements"
            badge="UI/UX"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <AnimatedIcon />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Success Icon Animation"
              code={`const tl = gsap.timeline();

// Circle pops in
tl.to('.circle', {
  scale: 1,
  opacity: 1,
  duration: 0.4,
  ease: 'back.out(1.7)',
})
// Checkmark draws
.to('.check', {
  strokeDashoffset: 0,
  duration: 0.3,
  ease: 'power2.out',
})
// Sparkles appear
.to('.sparkles', {
  scale: 1,
  opacity: 1,
  stagger: 0.05,
  ease: 'back.out(2)',
});`}
            />
          </div>
        </section>

        {/* Morphing */}
        <section className="mb-20">
          <SectionHeader 
            title="Shape Morphing"
            subtitle="Transform between different shapes smoothly"
            badge="Advanced"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <MorphingShapes />
          </AnimatedCard>

          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <p className="text-cyan-300 text-sm">
              💡 <strong>Pro Tip:</strong> For complex shape morphing (different point counts), 
              use GSAP&apos;s MorphSVGPlugin. It handles path interpolation automatically!
            </p>
          </div>
        </section>

        {/* Charts */}
        <section className="mb-20">
          <SectionHeader 
            title="Animated Charts"
            subtitle="Bring data visualizations to life"
            badge="Data Viz"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <AnimatedChart />
          </AnimatedCard>
        </section>

        {/* Loader */}
        <section className="mb-20">
          <SectionHeader 
            title="Animated Loaders"
            subtitle="Create engaging loading indicators"
            badge="UI"
            centered={false}
          />
          <AnimatedCard>
            <AnimatedLoader />
          </AnimatedCard>
        </section>

        {/* Scroll SVG */}
        <section className="mb-20">
          <SectionHeader 
            title="Scroll-Triggered SVG"
            subtitle="Connect SVG animations to scroll position"
            badge="ScrollTrigger"
            centered={false}
          />
          <AnimatedCard>
            <ScrollSVG />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Scroll-Linked Path Drawing"
              code={`const path = document.querySelector('path');
const length = path.getTotalLength();

gsap.set(path, {
  strokeDasharray: length,
  strokeDashoffset: length,
});

gsap.to(path, {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1, // Smooth scroll connection
  },
});`}
            />
          </div>
        </section>

        {/* Hover SVG */}
        <section className="mb-20">
          <SectionHeader 
            title="Interactive SVG"
            subtitle="Respond to user interactions"
            badge="Interactive"
            centered={false}
          />
          <AnimatedCard>
            <HoverSVG />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Hover Animation"
              code={`// Mouse enter
star.addEventListener('mouseenter', () => {
  gsap.to(star, {
    rotation: 360,
    scale: 1.2,
    duration: 0.6,
    ease: 'elastic.out(1, 0.5)',
  });
  
  gsap.to('.star-fill', {
    fill: '#fbbf24',
    duration: 0.3,
  });
});

// Mouse leave
star.addEventListener('mouseleave', () => {
  gsap.to(star, {
    rotation: 0,
    scale: 1,
    duration: 0.4,
    ease: 'power2.out',
  });
});`}
            />
          </div>
        </section>

        {/* Tips */}
        <section>
          <SectionHeader 
            title="SVG Animation Tips"
            centered={false}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedCard>
              <h4 className="text-green-400 font-semibold mb-3">✅ Best Practices</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Optimize SVGs (SVGO, SVGOMG)</li>
                <li>• Use viewBox for responsive scaling</li>
                <li>• Keep paths simple when possible</li>
                <li>• Set transform-origin correctly</li>
                <li>• Cache getTotalLength() results</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-cyan-400 font-semibold mb-3">🔧 GSAP Plugins</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• <strong>MorphSVGPlugin</strong> - Complex morphing</li>
                <li>• <strong>DrawSVGPlugin</strong> - Path drawing</li>
                <li>• <strong>MotionPathPlugin</strong> - Animate along paths</li>
                <li>• These are Club GreenSock plugins</li>
              </ul>
            </AnimatedCard>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
