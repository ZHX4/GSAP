'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ 
  code, 
  language = 'typescript', 
  title,
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, { scope: containerRef });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    
    gsap.to(buttonRef.current, {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div ref={containerRef} className="code-block group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
          <span className="text-sm text-gray-400 font-mono">{title}</span>
          <span className="text-xs text-purple-400">{language}</span>
        </div>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 
                     transition-colors opacity-0 group-hover:opacity-100 z-10"
          aria-label="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
        <pre className="overflow-x-auto p-4">
          <code className={`language-${language}`}>
            {showLineNumbers ? (
              lines.map((line, i) => (
                <div key={i} className="table-row">
                  <span className="table-cell pr-4 text-gray-600 select-none text-right w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell">{line}</span>
                </div>
              ))
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
