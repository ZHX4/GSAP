/**
 * ============================================================
 * GSAP Configuration & Registration
 * ============================================================
 * 
 * This file centralizes all GSAP plugin registrations.
 * In Next.js/React, we register plugins ONCE at the app level
 * to avoid multiple registrations and ensure proper functionality.
 * 
 * 🎯 Best Practice: Always register GSAP plugins before using them!
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================================
// PLUGIN REGISTRATION
// ============================================================
// Register all GSAP plugins you plan to use in your application.
// This should be done once, typically in your layout or app entry point.

// Check if we're on the client side before registering
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================
// DEFAULT CONFIGURATION
// ============================================================
// Set global defaults for consistent animation behavior

gsap.defaults({
  // Default easing for smooth, natural motion
  ease: "power3.out",
  // Default duration in seconds
  duration: 0.8,
});

// ============================================================
// CUSTOM EASING FUNCTIONS
// ============================================================
// Define reusable easing configurations for your project

export const easings = {
  // Smooth and elegant - great for most UI animations
  smooth: "power2.out",
  // Snappy entrance - perfect for attention-grabbing elements
  snappy: "power4.out",
  // Elastic bounce - fun and playful
  bounce: "elastic.out(1, 0.5)",
  // Slow start, fast end - dramatic reveals
  dramatic: "power4.inOut",
  // Back easing - slight overshoot for character
  back: "back.out(1.7)",
  // Expo - very fast start, smooth end
  expo: "expo.out",
};

// ============================================================
// REUSABLE ANIMATION CONFIGURATIONS
// ============================================================
// Pre-configured animation settings for common use cases

export const animations = {
  // Fade in from below
  fadeInUp: {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: easings.smooth,
  },
  // Fade in from above
  fadeInDown: {
    opacity: 0,
    y: -60,
    duration: 1,
    ease: easings.smooth,
  },
  // Scale up entrance
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: easings.back,
  },
  // Slide in from left
  slideInLeft: {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: easings.snappy,
  },
  // Slide in from right
  slideInRight: {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: easings.snappy,
  },
};

// ============================================================
// SCROLL TRIGGER DEFAULTS
// ============================================================
// Common ScrollTrigger configurations

export const scrollTriggerDefaults = {
  // Standard reveal animation trigger
  reveal: {
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse",
  },
  // Scrub animation (tied to scroll position)
  scrub: {
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
  // Pin section while animating
  pin: {
    start: "top top",
    end: "+=100%",
    pin: true,
    scrub: 1,
  },
};

// Export gsap and ScrollTrigger for convenience
export { gsap, ScrollTrigger };
