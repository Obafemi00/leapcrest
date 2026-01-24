"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Lottie background with SSR disabled to prevent hydration mismatches
const HeroLottieBackground = dynamic(() => import("./hero/HeroLottieBackground"), {
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
      className="min-h-screen max-h-screen flex flex-col bg-[#061423] relative overflow-hidden mb-24 md:mb-32"
    >
      {/* Client-only Lottie background to prevent hydration mismatches */}
      <HeroLottieBackground />
      
      {/* Subtle overlay gradient for text readability (center-left area) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none z-[1]" />
      
      {/* Left-aligned content */}
      <div className="flex-1 flex items-center px-6 lg:px-8 pt-24 md:pt-28 relative z-10 min-h-0">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-6 md:space-y-8"
          >
            {/* Top line: "Bridging the last mile gap" */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <p className="text-sm md:text-base font-medium tracking-wider text-[#1F9D8F] uppercase">
                Bridging the last mile gap
              </p>
            </motion.div>

            {/* Main headline: "Elevating skills, accelerating careers" */}
            <motion.h1
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white"
            >
              Elevating skills, accelerating careers
            </motion.h1>

            {/* Bottom line: "Industry ready talent, real outcomes" */}
            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-white/90"
            >
              Industry ready talent, real outcomes
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
              className="text-base md:text-lg text-white/75 leading-relaxed max-w-2xl pt-2"
            >
              Graduates are earning degrees but are not career-ready. Leapcrest
              turns fresh graduates into industry-ready early-career professionals
              by bridging the last-mile gap.
            </motion.p>

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
              className="pt-4"
            >
              <button
                onClick={() => scrollToSection("cta")}
                className="px-8 py-4 bg-primary text-white font-medium rounded-lg transition-all hover:opacity-90 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#061423]"
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
