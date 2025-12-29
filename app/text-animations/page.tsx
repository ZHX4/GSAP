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

// Character Split Animation
function CharacterReveal() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const runAnimation = () => {
    if (!textRef.current) return;
    
    const text = textRef.current;
    const originalText = "Character Animation";
    text.innerHTML = originalText
      .split('')
      .map(char => char === ' ' ? ' ' : `<span class="char">${char}</span>`)
      .join('');

    gsap.from(text.querySelectorAll('.char'), {
      y: 100,
      opacity: 0,
      rotationX: -90,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out(1.7)',
    });
    
    setIsAnimated(true);
  };

  const reset = () => {
    if (textRef.current) {
      textRef.current.innerHTML = "Character Animation";
    }
    setIsAnimated(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={runAnimation}
          disabled={isAnimated}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Animate
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="h-40 bg-gray-800/50 rounded-xl flex items-center justify-center overflow-hidden">
        <h2 
          ref={textRef}
          className="text-4xl md:text-5xl font-bold"
          style={{ perspective: '500px' }}
        >
          Character Animation
        </h2>
      </div>

      <CodeBlock 
        title="Character-by-Character Animation"
        code={`// Split text into characters
const text = element.textContent;
element.innerHTML = text
  .split('')
  .map(char => \`<span class="char">\${char}</span>\`)
  .join('');

// Animate each character
gsap.from('.char', {
  y: 100,
  opacity: 0,
  rotationX: -90,
  duration: 0.8,
  stagger: 0.03,
  ease: 'back.out(1.7)',
});`}
      />
    </div>
  );
}

// Word Split Animation
function WordReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = containerRef.current?.querySelectorAll('.word');
    if (!words) return;

    gsap.from(words, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  const sentence = "Each word animates individually creating a beautiful reveal effect";

  return (
    <div ref={containerRef} className="py-8">
      <p className="text-3xl font-medium leading-relaxed">
        {sentence.split(' ').map((word, i) => (
          <span key={i} className="word inline-block mr-3">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}

// Line Reveal Animation
function LineReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const lines = containerRef.current?.querySelectorAll('.line');
    if (!lines) return;

    gsap.from(lines, {
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });
  }, { scope: containerRef });

  const lines = [
    "First line fades in",
    "Second line follows",
    "Creating a cascade",
    "Of beautiful motion"
  ];

  return (
    <div ref={containerRef} className="py-8">
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <p className="line text-2xl font-medium text-gray-300 mb-2">
            {line}
          </p>
        </div>
      ))}
    </div>
  );
}

// Typewriter Effect
function TypewriterEffect() {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const startTyping = () => {
    if (!textRef.current || isTyping) return;
    setIsTyping(true);
    
    const text = "Hello, I'm a typewriter effect built with GSAP!";
    textRef.current.textContent = '';
    
    const tl = gsap.timeline({
      onComplete: () => setIsTyping(false),
    });

    // Cursor blink
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    // Type each character
    text.split('').forEach((char, i) => {
      tl.to(textRef.current, {
        duration: 0.05 + Math.random() * 0.05, // Random typing speed
        onComplete: () => {
          if (textRef.current) {
            textRef.current.textContent += char;
          }
        },
      }, i * 0.08);
    });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={startTyping}
        disabled={isTyping}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   text-white font-medium hover:opacity-90 transition-opacity
                   disabled:opacity-50"
      >
        {isTyping ? 'Typing...' : 'Start Typing'}
      </button>

      <div className="h-32 bg-gray-800/50 rounded-xl flex items-center justify-center p-8">
        <p className="text-xl md:text-2xl font-mono">
          <span ref={textRef}></span>
          <span ref={cursorRef} className="text-purple-400">|</span>
        </p>
      </div>

      <CodeBlock 
        title="Typewriter Effect"
        code={`const text = "Hello World!";
let index = 0;

const tl = gsap.timeline();

text.split('').forEach((char, i) => {
  tl.to({}, {
    duration: 0.08,
    onComplete: () => {
      element.textContent += char;
    },
  });
});

// Blinking cursor
gsap.to('.cursor', {
  opacity: 0,
  duration: 0.5,
  repeat: -1,
  yoyo: true,
});`}
      />
    </div>
  );
}

// Scramble Text Effect
function ScrambleText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (!textRef.current || isScrambling) return;
    setIsScrambling(true);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const finalText = "GSAP Scramble";
    const duration = 2;
    const element = textRef.current;
    
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += 0.02;
      
      if (progress >= 1) {
        element.textContent = finalText;
        clearInterval(interval);
        setIsScrambling(false);
        return;
      }

      const revealed = Math.floor(progress * finalText.length);
      let display = '';
      
      for (let i = 0; i < finalText.length; i++) {
        if (i < revealed) {
          display += finalText[i];
        } else if (finalText[i] === ' ') {
          display += ' ';
        } else {
          display += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      element.textContent = display;
    }, duration * 1000 / 50);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={scramble}
        disabled={isScrambling}
        className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                   text-white font-medium hover:opacity-90 transition-opacity
                   disabled:opacity-50"
      >
        {isScrambling ? 'Scrambling...' : 'Scramble Text'}
      </button>

      <div className="h-32 bg-gray-800/50 rounded-xl flex items-center justify-center">
        <h2 
          ref={textRef}
          className="text-4xl md:text-5xl font-bold font-mono tracking-wider"
        >
          GSAP Scramble
        </h2>
      </div>
    </div>
  );
}

// Highlight Words
function HighlightWords() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const highlights = containerRef.current?.querySelectorAll('.highlight');
    if (!highlights) return;

    highlights.forEach((highlight) => {
      gsap.from(highlight, {
        backgroundSize: '0% 100%',
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: highlight,
          start: 'top 80%',
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="py-8">
      <p className="text-2xl leading-relaxed text-gray-300">
        GSAP makes it easy to create{' '}
        <span 
          className="highlight bg-gradient-to-r from-purple-500/50 to-purple-500/50 bg-no-repeat"
          style={{ backgroundSize: '100% 100%', backgroundPosition: '0 90%' }}
        >
          stunning text animations
        </span>{' '}
        that capture attention. You can{' '}
        <span 
          className="highlight bg-gradient-to-r from-cyan-500/50 to-cyan-500/50 bg-no-repeat"
          style={{ backgroundSize: '100% 100%', backgroundPosition: '0 90%' }}
        >
          highlight important words
        </span>{' '}
        and create{' '}
        <span 
          className="highlight bg-gradient-to-r from-green-500/50 to-green-500/50 bg-no-repeat"
          style={{ backgroundSize: '100% 100%', backgroundPosition: '0 90%' }}
        >
          engaging experiences
        </span>.
      </p>
    </div>
  );
}

// Counter Animation
function CounterAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const counters = useRef<{ value: number }[]>([
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ]);
  const [displayValues, setDisplayValues] = useState([0, 0, 0]);

  const targets = [1234, 567, 89];
  const labels = ['Users', 'Projects', 'Awards'];

  const animate = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    counters.current.forEach((counter, i) => {
      gsap.to(counter, {
        value: targets[i],
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValues(prev => {
            const newValues = [...prev];
            newValues[i] = Math.round(counter.value);
            return newValues;
          });
        },
        onComplete: () => {
          if (i === counters.current.length - 1) {
            setIsAnimating(false);
          }
        },
      });
    });
  };

  const reset = () => {
    counters.current.forEach((counter, i) => {
      counter.value = 0;
    });
    setDisplayValues([0, 0, 0]);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button
          onClick={animate}
          disabled={isAnimating}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 
                     text-white font-medium hover:opacity-90 transition-opacity
                     disabled:opacity-50"
        >
          Animate
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-gray-800 text-gray-300 
                     hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {displayValues.map((value, i) => (
          <div key={i} className="text-center p-6 bg-gray-800/50 rounded-xl">
            <div className="text-4xl font-bold text-purple-400 font-mono">
              {value.toLocaleString()}
            </div>
            <div className="text-gray-500 mt-2">{labels[i]}</div>
          </div>
        ))}
      </div>

      <CodeBlock 
        title="Number Counter Animation"
        code={`const counter = { value: 0 };

gsap.to(counter, {
  value: 1234,
  duration: 2,
  ease: 'power2.out',
  onUpdate: () => {
    element.textContent = Math.round(counter.value).toLocaleString();
  },
});`}
      />
    </div>
  );
}

// Gradient Text Animation
function GradientText() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.to(textRef.current, {
      backgroundPosition: '200% center',
      duration: 3,
      repeat: -1,
      ease: 'none',
    });
  });

  return (
    <div className="py-8">
      <h2 
        ref={textRef}
        className="text-5xl md:text-6xl font-bold text-center"
        style={{
          background: 'linear-gradient(90deg, #a855f7, #22d3ee, #a855f7, #22d3ee)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Animated Gradient
      </h2>

      <CodeBlock 
        title="Animated Gradient Text"
        code={`// CSS
.gradient-text {
  background: linear-gradient(90deg, #a855f7, #22d3ee, #a855f7, #22d3ee);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

// GSAP
gsap.to('.gradient-text', {
  backgroundPosition: '200% center',
  duration: 3,
  repeat: -1,
  ease: 'none',
});`}
      />
    </div>
  );
}

export default function TextAnimationsPage() {
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
                          bg-pink-500/20 text-pink-300 rounded-full border border-pink-500/30">
            Lesson 3
          </span>
          <h1 className="hero-text text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-pink-200 to-purple-200 
                            bg-clip-text text-transparent">
              Text Animations
            </span>
          </h1>
          <p className="hero-text text-xl text-gray-400 max-w-2xl">
            Create captivating text effects: character reveals, typewriter effects, 
            scramble animations, and more. Make your typography come alive!
          </p>
        </div>

        {/* Character Animation */}
        <section className="mb-20">
          <SectionHeader 
            title="Character-by-Character"
            subtitle="Split text into individual characters for dramatic reveals"
            badge="Popular"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <CharacterReveal />
          </AnimatedCard>
        </section>

        {/* Word Animation */}
        <section className="mb-20">
          <SectionHeader 
            title="Word-by-Word Reveal"
            subtitle="Animate each word separately for a flowing effect"
            badge="Elegant"
            centered={false}
          />
          <AnimatedCard>
            <WordReveal />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Word Split Animation"
              code={`// Split into words
const sentence = "Your text here";
container.innerHTML = sentence
  .split(' ')
  .map(word => \`<span class="word">\${word}</span>\`)
  .join(' ');

// Animate words
gsap.from('.word', {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.08,
  ease: 'power3.out',
});`}
            />
          </div>
        </section>

        {/* Line Reveal */}
        <section className="mb-20">
          <SectionHeader 
            title="Line-by-Line Reveal"
            subtitle="Perfect for paragraphs and lists"
            badge="Clean"
            centered={false}
          />
          <AnimatedCard>
            <LineReveal />
          </AnimatedCard>
        </section>

        {/* Typewriter */}
        <section className="mb-20">
          <SectionHeader 
            title="Typewriter Effect"
            subtitle="Classic typing animation with blinking cursor"
            badge="Classic"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <TypewriterEffect />
          </AnimatedCard>
        </section>

        {/* Scramble */}
        <section className="mb-20">
          <SectionHeader 
            title="Scramble Effect"
            subtitle="Decode text with random character scrambling"
            badge="Techy"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <ScrambleText />
          </AnimatedCard>

          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
            <p className="text-purple-300 text-sm">
              💡 <strong>Pro Tip:</strong> GSAP has an official TextPlugin for advanced text 
              manipulation. Consider using it for complex text effects in production.
            </p>
          </div>
        </section>

        {/* Highlight */}
        <section className="mb-20">
          <SectionHeader 
            title="Highlight Words"
            subtitle="Animate text highlights for emphasis"
            badge="Marketing"
            centered={false}
          />
          <AnimatedCard>
            <HighlightWords />
          </AnimatedCard>

          <div className="mt-6">
            <CodeBlock 
              title="Animated Highlight"
              code={`// CSS - Set initial state
.highlight {
  background: linear-gradient(to right, rgba(168, 85, 247, 0.5), rgba(168, 85, 247, 0.5));
  background-size: 0% 100%;
  background-repeat: no-repeat;
  background-position: 0 90%;
}

// GSAP - Animate background size
gsap.from('.highlight', {
  backgroundSize: '0% 100%',
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.2,
});`}
            />
          </div>
        </section>

        {/* Counter */}
        <section className="mb-20">
          <SectionHeader 
            title="Number Counter"
            subtitle="Animate numbers counting up for statistics"
            badge="Stats"
            centered={false}
          />
          <AnimatedCard hoverEffect={false}>
            <CounterAnimation />
          </AnimatedCard>
        </section>

        {/* Gradient */}
        <section className="mb-20">
          <SectionHeader 
            title="Animated Gradient"
            subtitle="Create eye-catching animated gradient text"
            badge="Stylish"
            centered={false}
          />
          <AnimatedCard>
            <GradientText />
          </AnimatedCard>
        </section>

        {/* Tips */}
        <section>
          <SectionHeader 
            title="Performance Tips"
            centered={false}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedCard>
              <h4 className="text-green-400 font-semibold mb-3">✅ Best Practices</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Split text once, not on every animation</li>
                <li>• Use CSS transforms (translate, scale, rotate)</li>
                <li>• Keep stagger values reasonable (0.02-0.1s)</li>
                <li>• Test with longer text content</li>
                <li>• Consider accessibility (screen readers)</li>
              </ul>
            </AnimatedCard>
            <AnimatedCard>
              <h4 className="text-cyan-400 font-semibold mb-3">🔧 SplitText Plugin</h4>
              <p className="text-sm text-gray-400 mb-3">
                For production apps, consider GSAP&apos;s official SplitText plugin:
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Handles edge cases automatically</li>
                <li>• Preserves accessibility</li>
                <li>• Supports lines, words, and characters</li>
                <li>• Works with responsive layouts</li>
              </ul>
            </AnimatedCard>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
