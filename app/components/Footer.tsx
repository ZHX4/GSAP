/**
 * ============================================================
 * FOOTER COMPONENT
 * ============================================================
 * 
 * A beautiful footer with animated elements.
 */

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".footer-content", 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative py-20 border-t border-slate-800">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent pointer-events-none" />

      <div className="container relative footer-content">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient">GSAP</span>
              <span className="text-accent-cyan">+</span>
              <span className="text-gradient-warm">Next.js</span>
            </h3>
            <p className="text-slate-400 leading-relaxed">
              A comprehensive tutorial on creating stunning animations with GSAP
              in Next.js. Built with love for the web development community.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://gsap.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transition-colors"
                >
                  GSAP Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://gsap.com/resources/React"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transition-colors"
                >
                  GSAP + React Guide
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transition-colors"
                >
                  Next.js Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://gsap.com/community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary-400 transition-colors"
                >
                  GSAP Community Forums
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Tips */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200">Quick Tips</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary-400">✓</span>
                Use useGSAP hook for React integration
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">✓</span>
                Register plugins once at app level
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">✓</span>
                Prefer refs over selectors in React
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-400">✓</span>
                Use scrub for scroll-linked animations
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 GSAP + Next.js Tutorial. Made with 💜 for developers.
          </p>
          <div className="flex gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-primary-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
