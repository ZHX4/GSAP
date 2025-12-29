'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../components/PageLayout';
import SectionHeader from '../components/ui/SectionHeader';
import CodeBlock from '../components/ui/CodeBlock';
import AnimatedCard from '../components/ui/AnimatedCard';

gsap.registerPlugin(ScrollTrigger);

// Demo Components
function BasicScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.scroll-box', 
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-4">
      {['Element 1', 'Element 2', 'Element 3'].map((text, i) => (
        <div 
          key={i}
          className="scroll-box p-6 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 
                     rounded-xl border border-purple-500/30"
        >
          <span className="text-lg font-medium">{text}</span>
          <span className="text-gray-400 ml-4">Animates when scrolled into view</span>
        </div>
      ))}
    </div>
  );
}

function ScrubDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(progressRef.current, {
      width: '100%',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    gsap.to('.scrub-box', {
      x: 300,
      rotation: 360,
      scale: 1.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-20 space-y-8">
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          ref={progressRef} 
          className="h-full w-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
        />
      </div>
      <div className="flex justify-start">
        <div className="scrub-box w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500" />
      </div>
      <p className="text-gray-400 text-center">
        👆 Scroll up and down - the animation is linked to scroll position
      </p>
    </div>
  );
}

function PinDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to('.pin-content', {
      x: '-300%',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000',
        scrub: 1,
        pin: true,
      },
    });
  }, { scope: containerRef });

  const slides = [
    { title: 'Horizontal Scroll', color: 'from-purple-500 to-pink-500', icon: '🎯' },
    { title: 'With Pinning', color: 'from-pink-500 to-red-500', icon: '📌' },
    { title: 'Smooth Animation', color: 'from-red-500 to-orange-500', icon: '✨' },
    { title: 'GSAP Power!', color: 'from-orange-500 to-yellow-500', icon: '🚀' },
  ];

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      <div className="pin-content flex h-full w-[400%]">
        {slides.map((slide, i) => (
          <div 
            key={i}
            className={`w-screen h-full flex items-center justify-center 
                       bg-gradient-to-br ${slide.color}`}
          >
            <div className="text-center">
              <span className="text-8xl mb-6 block">{slide.icon}</span>
              <h3 className="text-4xl font-bold text-white">{slide.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParallaxLayersDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to('.layer-1', {
      y: -200,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
    gsap.to('.layer-2', {
      y: -100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
    gsap.to('.layer-3', {
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 3,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[500px] overflow-hidden rounded-2xl bg-gray-900">
      {/* Background layer */}
      <div className="layer-1 absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>
      {/* Middle layer */}
      <div className="layer-2 absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 rounded-full bg-cyan-500/20 blur-2xl" />
      </div>
      {/* Foreground layer */}
      <div className="layer-3 absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Parallax Layers</h3>
          <p className="text-gray-400">Each layer moves at different speeds</p>
        </div>
      </div>
    </div>
  );
}

function ToggleActionsDemo() {
  const [currentAction, setCurrentAction] = useState('play none none reverse');
  const boxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const actions = [
    'play none none none',
    'play none none reverse',
    'play pause resume reverse',
    'play reverse play reverse',
    'restart none none reverse',
  ];

  useGSAP(() => {
    stRef.current?.kill();
    
    gsap.set(boxRef.current, { x: 0, opacity: 1, scale: 1 });
    
    const anim = gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      scale: 1.2,
      duration: 1,
      paused: true,
    });

    stRef.current = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top center',
      end: 'bottom center',
      toggleActions: currentAction,
      animation: anim,
    });

    return () => stRef.current?.kill();
  }, { dependencies: [currentAction] });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            onClick={() => setCurrentAction(action)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all
                       ${currentAction === action 
                         ? 'bg-purple-500 text-white' 
                         : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            {action}
          </button>
        ))}
      </div>

      <div 
        ref={triggerRef}
        className="h-40 bg-gray-800/50 rounded-xl flex items-center px-8"
      >
        <div
          ref={boxRef}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500"
        />
      </div>

      <CodeBlock 
        title="toggleActions Explained"
        code={`// toggleActions: "onEnter onLeave onEnterBack onLeaveBack"
// Values: play, pause, resume, reverse, restart, reset, complete, none

scrollTrigger: {
  trigger: element,
  start: 'top center',
  end: 'bottom center',
  toggleActions: '${currentAction}',
  //              onEnter | onLeave | onEnterBack | onLeaveBack
}`}
      />
    </div>
  );
}

function CallbacksDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLog(prev => [...prev.slice(-4), `[${time}] ${message}`]);
  };

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => addLog('🟢 onEnter'),
      onLeave: () => addLog('🔴 onLeave'),
      onEnterBack: () => addLog('🟡 onEnterBack'),
      onLeaveBack: () => addLog('🟠 onLeaveBack'),
      onUpdate: (self) => {
        if (Math.round(self.progress * 100) % 25 === 0) {
          // Only log at 25% intervals
        }
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-6 py-10">
      <div className="p-6 bg-gray-800/50 rounded-xl min-h-[120px]">
        <h4 className="text-sm text-gray-400 mb-3">Event Log:</h4>
        <div className="space-y-1 font-mono text-sm">
          {log.length === 0 ? (
            <p className="text-gray-500">Scroll to trigger events...</p>
          ) : (
            log.map((entry, i) => (
              <div key={i} className="text-purple-300">{entry}</div>
            ))
          )}
        </div>
      </div>

      <CodeBlock 
        title="ScrollTrigger Callbacks"
        code={`ScrollTrigger.create({
  trigger: element,
  start: 'top center',
  end: 'bottom center',
  
  // Callbacks
  onEnter: () => console.log('Entered from top'),
  onLeave: () => console.log('Left from bottom'),
  onEnterBack: () => console.log('Entered from bottom'),
  onLeaveBack: () => console.log('Left from top'),
  
  // Progress callback (for scrub animations)
  onUpdate: (self) => {
    console.log('Progress:', self.progress); // 0 to 1
    console.log('Direction:', self.direction); // 1 or -1
  },
});`}
      />
    </div>
  );
}

export default function ScrollAnimationsPage() {
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
                          bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
            Lesson 2
          </span>
          <h1 className="hero-text text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 
                            bg-clip-text text-transparent">
              ScrollTrigger
            </span>
          </h1>
          <p className="hero-text text-xl text-gray-400 max-w-2xl">
            Create scroll-driven animations with precision control. Pin elements, 
            scrub animations, and trigger actions based on scroll position.
          </p>
        </div>

        {/* Basic ScrollTrigger */}
        <section className="mb-20">
          <SectionHeader 
            title="Basic Scroll Animations"
            subtitle="Trigger animations when elements enter the viewport"
            badge="Getting Started"
            centered={false}
          />
          <AnimatedCard>
            <BasicScrollDemo />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Basic ScrollTrigger Setup"
              code={`gsap.from('.element', {
  x: -200,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: '.element',      // Element that triggers
    start: 'top 80%',         // When top of trigger hits 80% of viewport
    end: 'bottom 60%',        // When bottom hits 60%
    toggleActions: 'play none none reverse',
    markers: true,            // Debug markers (remove in production)
  },
});`}
            />
          </div>
        </section>

        {/* Start/End Positions */}
        <section className="mb-20">
          <SectionHeader 
            title="Start & End Positions"
            subtitle="Understanding the position syntax"
            badge="Important"
            centered={false}
          />
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AnimatedCard>
              <h4 className="text-lg font-semibold text-purple-400 mb-4">Position Format</h4>
              <p className="text-gray-400 mb-4 text-sm">
                <code>&quot;trigger-position viewport-position&quot;</code>
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><code className="text-cyan-400">&quot;top center&quot;</code> - Trigger&apos;s top at viewport center</li>
                <li><code className="text-cyan-400">&quot;center center&quot;</code> - Both centers aligned</li>
                <li><code className="text-cyan-400">&quot;bottom top&quot;</code> - Trigger&apos;s bottom at viewport top</li>
                <li><code className="text-cyan-400">&quot;top 80%&quot;</code> - Trigger&apos;s top at 80% of viewport</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Pixel Offsets</h4>
              <p className="text-gray-400 mb-4 text-sm">Add or subtract pixels from positions</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><code className="text-cyan-400">&quot;top top+=100&quot;</code> - 100px below viewport top</li>
                <li><code className="text-cyan-400">&quot;top-=50 center&quot;</code> - 50px above trigger top</li>
                <li><code className="text-cyan-400">&quot;center center-=20%&quot;</code> - 20% above center</li>
              </ul>
            </AnimatedCard>
          </div>
        </section>

        {/* Scrub */}
        <section className="mb-20">
          <SectionHeader 
            title="Scrub: Link to Scroll"
            subtitle="Make animations follow scroll position smoothly"
            badge="Key Feature"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <ScrubDemo />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Scrub Configuration"
              code={`// scrub: true - instant, follows scroll exactly
gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.container',
    scrub: true,  // Animation linked to scroll position
  },
});

// scrub: 1 - smoothed, takes 1 second to catch up
gsap.to('.box', {
  x: 500,
  scrollTrigger: {
    trigger: '.container',
    scrub: 1,     // Smooth with 1 second lag
  },
});

// scrub: 0.5 - faster smoothing (half second)
// scrub: 3 - slower smoothing (3 seconds)`}
            />
          </div>
        </section>

        {/* Toggle Actions */}
        <section className="mb-20">
          <SectionHeader 
            title="Toggle Actions"
            subtitle="Control what happens when scrolling in and out of the trigger area"
            badge="Control"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <ToggleActionsDemo />
          </AnimatedCard>
        </section>

        {/* Callbacks */}
        <section className="mb-20">
          <SectionHeader 
            title="Scroll Callbacks"
            subtitle="Execute code at specific scroll events"
            badge="Events"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <CallbacksDemo />
          </AnimatedCard>
        </section>

        {/* Parallax */}
        <section className="mb-20">
          <SectionHeader 
            title="Parallax Effect"
            subtitle="Create depth with layers moving at different speeds"
            badge="Visual"
            centered={false}
          />
          <ParallaxLayersDemo />

          <div className="mt-6">
            <CodeBlock 
              title="Parallax Layers"
              code={`// Different scrub values = different speeds
gsap.to('.background', {
  y: -200,
  scrollTrigger: {
    trigger: '.container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,  // Fast layer
  },
});

gsap.to('.midground', {
  y: -100,
  scrollTrigger: {
    trigger: '.container',
    scrub: 2,  // Medium layer
  },
});

gsap.to('.foreground', {
  y: -50,
  scrollTrigger: {
    trigger: '.container',
    scrub: 3,  // Slow layer (closest)
  },
});`}
            />
          </div>
        </section>

        {/* Pinning - Full Width Demo */}
        <section className="mb-20">
          <SectionHeader 
            title="Pinning"
            subtitle="Lock elements in place during scroll for dramatic effects"
            badge="Advanced"
            centered={false}
          />
          
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-300 text-sm">
              ⚠️ The demo below pins the container and creates horizontal scrolling. 
              Scroll down to experience it!
            </p>
          </div>
        </section>

        <PinDemo />

        <div className="mt-10 mb-20 max-w-5xl mx-auto px-6">
          <CodeBlock 
            title="Horizontal Scroll with Pin"
            code={`const container = document.querySelector('.container');
const sections = gsap.utils.toArray('.section');

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    pin: true,           // Pin the container
    scrub: 1,            // Smooth scrubbing
    snap: 1 / (sections.length - 1),  // Snap to sections
    end: () => '+=' + container.offsetWidth,
  },
});`}
          />
        </div>

        {/* Best Practices */}
        <section className="max-w-5xl mx-auto px-6">
          <SectionHeader 
            title="Best Practices"
            subtitle="Tips for smooth, performant scroll animations"
            centered={false}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedCard>
              <h4 className="text-green-400 font-semibold mb-3">✅ Do</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Use transform properties (x, y, scale, rotation)</li>
                <li>• Clean up ScrollTriggers on unmount</li>
                <li>• Use scoping with useGSAP hook</li>
                <li>• Test on mobile devices</li>
                <li>• Use will-change sparingly</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-red-400 font-semibold mb-3">❌ Avoid</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Animating width/height (use scale)</li>
                <li>• Too many simultaneous triggers</li>
                <li>• Forgetting to kill ScrollTriggers</li>
                <li>• Heavy calculations in onUpdate</li>
                <li>• Leaving markers: true in production</li>
              </ul>
            </AnimatedCard>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
