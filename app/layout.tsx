/**
 * ============================================================
 * ROOT LAYOUT - Next.js App Router
 * ============================================================
 * 
 * This is the root layout for our GSAP tutorial application.
 * Here we set up fonts, metadata, and global providers.
 * 
 * 🎯 Key Point: GSAP plugins are registered in lib/gsap.ts
 * and imported here to ensure they're available throughout the app.
 */

import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

// Import GSAP configuration to register plugins globally
import "@/lib/gsap";

// ============================================================
// FONT CONFIGURATION
// ============================================================
// Using Inter for body text - clean and modern
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Using Fira Code for code blocks - great for readability
const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// ============================================================
// METADATA
// ============================================================
export const metadata: Metadata = {
  title: "GSAP + Next.js Tutorial | Learn Stunning Animations",
  description:
    "A comprehensive tutorial on creating beautiful, performant animations with GSAP in Next.js. Learn scroll animations, text reveals, parallax effects, and more.",
  keywords: [
    "GSAP",
    "Next.js",
    "animations",
    "React",
    "tutorial",
    "web development",
    "ScrollTrigger",
  ],
};

// ============================================================
// ROOT LAYOUT COMPONENT
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="bg-dark-500 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
