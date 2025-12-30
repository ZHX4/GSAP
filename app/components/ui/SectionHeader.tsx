'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export default function SectionHeader({ 
  title, 
  subtitle, 
  badge,
  centered = true 
}: SectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = containerRef.current?.querySelectorAll('.animate-in');
    if (!elements) return;
    
    gsap.fromTo(elements, 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {badge && (
        <span className="animate-in inline-block px-4 py-1.5 mb-4 text-sm font-medium 
                        bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
          {badge}
        </span>
      )}
      <h2 className="animate-in text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 
                        bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="animate-in text-gray-400 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
