'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/basics', label: 'Basics', icon: '📚' },
  { href: '/scroll-animations', label: 'Scroll', icon: '📜' },
  { href: '/text-animations', label: 'Text', icon: '✨' },
  { href: '/svg-animations', label: 'SVG', icon: '🎨' },
  { href: '/interactive', label: 'Interactive', icon: '🖱️' },
  { href: '/advanced', label: 'Advanced', icon: '🚀' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(() => {
    // Use fromTo to explicitly set both start and end states
    // This prevents elements from being stuck in hidden states after re-renders
    gsap.fromTo('.nav-item', 
      { x: -30, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.08, 
        ease: 'power2.out', 
        delay: 0.3,
        clearProps: 'all' // Clear inline styles after animation
      }
    );
  }, { scope: sidebarRef });

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-3 rounded-xl bg-gray-900/90 
                   border border-gray-700 backdrop-blur-sm"
        aria-label="Toggle menu"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/95 border-r border-gray-800 
                   backdrop-blur-xl z-40 transform transition-transform duration-300
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 
                           flex items-center justify-center font-bold text-lg">
              G
            </div>
            <div>
              <h1 className="font-bold text-lg">GSAP Tutorial</h1>
              <p className="text-xs text-gray-500">Next.js Edition</p>
            </div>
          </Link>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                             ${isActive 
                               ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                               : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
                             }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 
                           border border-purple-500/20">
              <p className="text-sm text-gray-400 mb-2">Learn GSAP</p>
              <p className="text-xs text-gray-500">
                Interactive tutorials to master animations
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
