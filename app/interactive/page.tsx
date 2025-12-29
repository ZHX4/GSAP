'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageLayout from '../components/PageLayout';
import SectionHeader from '../components/ui/SectionHeader';
import CodeBlock from '../components/ui/CodeBlock';
import AnimatedCard from '../components/ui/AnimatedCard';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Effect
function MagneticButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(button.querySelector('span'), {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });

    gsap.to(buttonRef.current?.querySelector('span'), {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <div className="space-y-6">
      <div className="h-48 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 
                     rounded-full text-white font-semibold text-lg
                     hover:shadow-lg hover:shadow-purple-500/30 transition-shadow"
        >
          <span className="relative z-10 inline-block">Hover Me</span>
        </button>
      </div>

      <CodeBlock 
        title="Magnetic Button"
        code={`button.addEventListener('mousemove', (e) => {
  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;

  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3,
    ease: 'power2.out',
  });
});

button.addEventListener('mouseleave', () => {
  gsap.to(button, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: 'elastic.out(1, 0.3)',
  });
});`}
      />
    </div>
  );
}

// Cursor Follower
function CursorFollower() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Main cursor - instant
    gsap.to(cursorRef.current, {
      x,
      y,
      duration: 0.1,
      ease: 'power2.out',
    });

    // Follower - delayed
    gsap.to(followerRef.current, {
      x,
      y,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  return (
    <div className="space-y-6">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="h-64 bg-gray-800/50 rounded-xl relative overflow-hidden cursor-none"
      >
        <p className="absolute inset-0 flex items-center justify-center text-gray-500">
          Move your cursor here
        </p>
        
        {/* Main cursor */}
        <div
          ref={cursorRef}
          className="absolute w-3 h-3 bg-purple-400 rounded-full pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        
        {/* Follower */}
        <div
          ref={followerRef}
          className="absolute w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <CodeBlock 
        title="Cursor Follower"
        code={`container.addEventListener('mousemove', (e) => {
  const x = e.clientX - container.offsetLeft;
  const y = e.clientY - container.offsetTop;

  // Instant cursor
  gsap.to('.cursor', {
    x, y,
    duration: 0.1,
  });

  // Delayed follower
  gsap.to('.follower', {
    x, y,
    duration: 0.5,
    ease: 'power3.out',
  });
});`}
      />
    </div>
  );
}

// Hover Card 3D
function Card3D() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div className="space-y-6">
      <div className="h-72 flex items-center justify-center" style={{ perspective: '1000px' }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-64 h-48 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl
                     p-6 flex flex-col justify-between shadow-xl cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div>
            <div className="w-12 h-8 bg-yellow-400/80 rounded-md mb-4" />
            <div className="text-white font-mono text-lg">•••• •••• •••• 4242</div>
          </div>
          <div className="text-white/80 text-sm">
            <div>JOHN DOE</div>
            <div>12/28</div>
          </div>
        </div>
      </div>

      <CodeBlock 
        title="3D Card Tilt"
        code={`card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  gsap.to(card, {
    rotateX: (y - centerY) / 10,
    rotateY: (centerX - x) / 10,
    duration: 0.3,
  });
});`}
      />
    </div>
  );
}

// Draggable Element
function DraggableDemo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Snap back animation
      gsap.to(boxRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  useEffect(() => {
    if (isDragging && boxRef.current) {
      gsap.set(boxRef.current, {
        x: position.x,
        y: position.y,
      });
    }
  }, [position, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const box = boxRef.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
    setIsDragging(true);

    gsap.to(box, {
      scale: 1.1,
      duration: 0.2,
    });
  };

  return (
    <div className="space-y-6">
      <div className="h-64 bg-gray-800/50 rounded-xl relative overflow-hidden">
        <p className="absolute inset-0 flex items-center justify-center text-gray-500">
          Drag the box and release
        </p>
        
        <div
          ref={boxRef}
          onMouseDown={handleMouseDown}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl
                     flex items-center justify-center text-white font-bold cursor-grab
                     ${isDragging ? 'cursor-grabbing shadow-2xl' : ''}`}
        >
          Drag
        </div>
      </div>

      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
        <p className="text-yellow-300 text-sm">
          💡 <strong>Pro Tip:</strong> For production apps, use GSAP&apos;s Draggable plugin 
          which handles all edge cases and provides inertia, bounds, and more!
        </p>
      </div>
    </div>
  );
}

// Hover Menu
function HoverMenu() {
  const menuRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = ['Home', 'About', 'Work', 'Contact'];

  const handleHover = (index: number) => {
    const menuItems = menuRef.current?.children;
    if (!menuItems || !indicatorRef.current) return;

    const item = menuItems[index] as HTMLElement;
    
    gsap.to(indicatorRef.current, {
      x: item.offsetLeft,
      width: item.offsetWidth,
      duration: 0.3,
      ease: 'power2.out',
    });

    setActiveIndex(index);
  };

  return (
    <div className="space-y-6">
      <div className="h-32 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <nav className="relative">
          <ul ref={menuRef} className="flex gap-8">
            {items.map((item, i) => (
              <li
                key={item}
                onMouseEnter={() => handleHover(i)}
                className={`px-4 py-2 cursor-pointer transition-colors relative z-10
                           ${activeIndex === i ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {item}
              </li>
            ))}
          </ul>
          
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
            style={{ width: 0 }}
          />
        </nav>
      </div>

      <CodeBlock 
        title="Sliding Menu Indicator"
        code={`menuItem.addEventListener('mouseenter', () => {
  gsap.to('.indicator', {
    x: menuItem.offsetLeft,
    width: menuItem.offsetWidth,
    duration: 0.3,
    ease: 'power2.out',
  });
});`}
      />
    </div>
  );
}

// Stagger Gallery
function StaggerGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    const items = galleryRef.current?.querySelectorAll('.gallery-item');
    if (!items) return;

    gsap.fromTo(items, 
      { scale: 0, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.5,
        stagger: {
          amount: 0.6,
          from: 'random',
        },
        ease: 'back.out(1.7)',
      }
    );
    
    setIsVisible(true);
  };

  const hide = () => {
    const items = galleryRef.current?.querySelectorAll('.gallery-item');
    if (!items) return;

    gsap.to(items, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      stagger: {
        amount: 0.3,
        from: 'end',
      },
      ease: 'power2.in',
    });
    
    setIsVisible(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={show}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity"
        >
          Show Items
        </button>
        <button
          onClick={hide}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Hide Items
        </button>
      </div>

      <div 
        ref={galleryRef}
        className="grid grid-cols-4 gap-4 p-6 bg-gray-800/50 rounded-xl"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="gallery-item aspect-square rounded-lg opacity-0"
            style={{
              background: `linear-gradient(135deg, 
                hsl(${260 + i * 15}, 70%, 50%), 
                hsl(${280 + i * 15}, 70%, 40%))`,
            }}
          />
        ))}
      </div>

      <CodeBlock 
        title="Random Stagger Animation"
        code={`gsap.from('.gallery-item', {
  scale: 0,
  opacity: 0,
  rotation: -10,
  duration: 0.5,
  stagger: {
    amount: 0.6,
    from: 'random', // or 'start', 'end', 'center', 'edges'
  },
  ease: 'back.out(1.7)',
});`}
      />
    </div>
  );
}

// Accordion
function Accordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = [
    { title: 'What is GSAP?', content: 'GSAP (GreenSock Animation Platform) is a professional-grade JavaScript animation library used by millions of developers worldwide.' },
    { title: 'Is GSAP free?', content: 'GSAP core is free and MIT licensed. Some plugins require a paid Club GreenSock membership.' },
    { title: 'Why use GSAP?', content: 'GSAP offers unmatched performance, cross-browser compatibility, and a rich feature set that makes complex animations easy.' },
  ];

  const toggle = (index: number) => {
    const content = contentRefs.current[index];
    if (!content) return;

    if (activeIndex === index) {
      // Close
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      setActiveIndex(null);
    } else {
      // Close previous
      if (activeIndex !== null) {
        const prev = contentRefs.current[activeIndex];
        if (prev) {
          gsap.to(prev, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          });
        }
      }
      
      // Open new
      gsap.to(content, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.inOut',
      });
      setActiveIndex(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-xl overflow-hidden">
        {items.map((item, i) => (
          <div key={i} className="border-b border-gray-700 last:border-b-0">
            <button
              onClick={() => toggle(i)}
              className="w-full p-4 text-left flex justify-between items-center
                         hover:bg-gray-700/30 transition-colors"
            >
              <span className="font-medium">{item.title}</span>
              <span 
                className="text-2xl transition-transform duration-300"
                style={{ transform: activeIndex === i ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </button>
            <div
              ref={el => { contentRefs.current[i] = el; }}
              className="overflow-hidden h-0 opacity-0"
            >
              <p className="px-4 pb-4 text-gray-400">{item.content}</p>
            </div>
          </div>
        ))}
      </div>

      <CodeBlock 
        title="Accordion Animation"
        code={`// Open accordion
gsap.to(content, {
  height: 'auto',
  opacity: 1,
  duration: 0.3,
  ease: 'power2.inOut',
});

// Close accordion
gsap.to(content, {
  height: 0,
  opacity: 0,
  duration: 0.3,
  ease: 'power2.inOut',
});`}
      />
    </div>
  );
}

export default function InteractivePage() {
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
                          bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
            Lesson 5
          </span>
          <h1 className="hero-text text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-yellow-200 to-orange-200 
                            bg-clip-text text-transparent">
              Interactive Effects
            </span>
          </h1>
          <p className="hero-text text-xl text-gray-400 max-w-2xl">
            Create engaging mouse interactions: magnetic buttons, cursor followers, 
            3D cards, draggable elements, and more. Make your UI feel alive!
          </p>
        </div>

        {/* Magnetic Button */}
        <section className="mb-20">
          <SectionHeader 
            title="Magnetic Button"
            subtitle="Buttons that are attracted to the cursor"
            badge="Popular"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <MagneticButton />
          </AnimatedCard>
        </section>

        {/* Cursor Follower */}
        <section className="mb-20">
          <SectionHeader 
            title="Cursor Follower"
            subtitle="Custom cursor with smooth following effect"
            badge="Creative"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <CursorFollower />
          </AnimatedCard>
        </section>

        {/* 3D Card */}
        <section className="mb-20">
          <SectionHeader 
            title="3D Card Tilt"
            subtitle="Cards that respond to cursor position"
            badge="3D"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <Card3D />
          </AnimatedCard>
        </section>

        {/* Draggable */}
        <section className="mb-20">
          <SectionHeader 
            title="Draggable Elements"
            subtitle="Drag and drop with physics"
            badge="Touch"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <DraggableDemo />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Basic Drag Logic"
              code={`// On mouse down
element.addEventListener('mousedown', (e) => {
  const offsetX = e.clientX - element.offsetLeft;
  const offsetY = e.clientY - element.offsetTop;
  
  const move = (e) => {
    gsap.set(element, {
      x: e.clientX - offsetX,
      y: e.clientY - offsetY,
    });
  };
  
  const up = () => {
    document.removeEventListener('mousemove', move);
    gsap.to(element, {
      x: 0, y: 0,
      ease: 'elastic.out(1, 0.5)',
    });
  };
  
  document.addEventListener('mousemove', move);
  document.addEventListener('mouseup', up, { once: true });
});`}
            />
          </div>
        </section>

        {/* Hover Menu */}
        <section className="mb-20">
          <SectionHeader 
            title="Animated Navigation"
            subtitle="Sliding indicator follows cursor"
            badge="Navigation"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <HoverMenu />
          </AnimatedCard>
        </section>

        {/* Stagger Gallery */}
        <section className="mb-20">
          <SectionHeader 
            title="Stagger Gallery"
            subtitle="Random stagger for dynamic reveals"
            badge="Gallery"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <StaggerGallery />
          </AnimatedCard>
        </section>

        {/* Accordion */}
        <section className="mb-20">
          <SectionHeader 
            title="Animated Accordion"
            subtitle="Smooth height transitions"
            badge="UI"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <Accordion />
          </AnimatedCard>
        </section>

        {/* Tips */}
        <section>
          <SectionHeader 
            title="Interaction Tips"
            centered={false}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedCard>
              <h4 className="text-yellow-400 font-semibold mb-3">⚡ Performance</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Use CSS transforms only</li>
                <li>• Throttle/debounce rapid events</li>
                <li>• Use will-change sparingly</li>
                <li>• Test on low-end devices</li>
                <li>• Clean up event listeners</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-orange-400 font-semibold mb-3">♿ Accessibility</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Respect prefers-reduced-motion</li>
                <li>• Ensure keyboard accessibility</li>
                <li>• Maintain focus visibility</li>
                <li>• Don&apos;t rely on hover for content</li>
                <li>• Test with screen readers</li>
              </ul>
            </AnimatedCard>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
