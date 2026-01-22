"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

// Brand deep blue from LeapCrest logo
const brandBlue = "#0B1F33";

// Dynamically import wave background with SSR disabled to prevent hydration mismatches
const HeroWaves = dynamic(() => import("./HeroWaves"), {
  ssr: false,
});

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col bg-white relative hero-waves pb-24 md:pb-32"
    >
      {/* Client-only wave background to prevent hydration mismatches */}
      <HeroWaves />
      
      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-24 pb-20 relative z-10">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ color: brandBlue }}
              >
                Elevating Skills.
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ color: brandBlue }}
              >
                Accelerating Careers.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
              className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl"
            >
              Graduates are earning degrees but are not career-ready. Leapcrest
              turns fresh graduates into industry-ready early-career professionals
              by bridging the last-mile gap.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
              className="pt-4"
            >
              <button
                onClick={() => scrollToSection("cta")}
                className="px-6 py-3 bg-primary text-white font-medium rounded transition-colors hover:opacity-90"
                aria-label="Get started with Leapcrest"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
