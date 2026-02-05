"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

// Brand deep blue from LeapCrest logo
const brandBlue = "#0B1F33";
const brandBlueDarker = "#061520"; // Slightly darker for gradient
const tealAccent = "#1F9D8F"; // Teal from primary color
const whiteText = "#FFFFFF";
const lightGrey = "#E5E7EB";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Structured",
    description: "A well-defined curriculum with clear milestones and measurable outcomes.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 15h6M9 12h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Year-long",
    description: "Comprehensive development over a full academic cycle, ensuring depth and continuity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Embedded within Academic Calendar",
    description: "Seamlessly integrated into existing academic schedules without disrupting core learning.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Extension of Placement Cell",
    description: "Works in partnership with your placement office, amplifying existing efforts with specialized expertise.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function IntroducingCAP() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="introducing-cap"
      className="min-h-screen flex items-center justify-center py-24 md:py-32 px-6 lg:px-8 w-full relative overflow-hidden bg-background-light"
    >
      <div className="container mx-auto max-w-7xl w-full">
        <div className="flex flex-col items-center text-center space-y-16">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1], // Custom ease-out for cinematic feel
            }}
            className="space-y-6 max-w-4xl"
          >
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight"
              style={{ letterSpacing: "0.02em" }}
            >
              Introducing the Career Accelerator Program (CAP)
            </h2>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
              A systematic, institutional solution that bridges curriculum and placement outcomes—
              programs that are embedded, measured, and aligned with your institutional goals.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 w-full max-w-6xl mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 20,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1], // Cinematic ease-out
                  delay: 0.3 + index * 0.1, // Sequential animation
                }}
                className="flex flex-col items-center text-center space-y-4 px-4"
              >
                {/* Icon */}
                <motion.div
                  className="flex items-center justify-center mb-3"
                  style={{ color: tealAccent }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.4 + index * 0.1,
                  }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg md:text-xl font-semibold text-text-primary leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
