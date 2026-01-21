"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// Brand deep blue from LeapCrest logo
const brandBlue = "#0B1F33";
// Lighter tint for wavy lines (subtle background)
const wavyLineColor = "#0B1F33"; // Same color but with low opacity

// Wavy Lines Background Component
function WavyLinesBackground({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  if (shouldReduceMotion === true) return null;

  // Generate smooth wavy path using quadratic curves
  const generateWavePath = (amplitude: number, frequency: number, phase: number = 0, yOffset: number) => {
    const width = dimensions.width * 1.5; // Extend for seamless animation
    const segments = 40;
    const segmentWidth = width / segments;
    let path = `M 0,${yOffset}`;
    
    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      const y = yOffset + amplitude * Math.sin((x / width) * frequency * Math.PI * 2 + phase);
      const nextX = (i + 1) * segmentWidth;
      const nextY = yOffset + amplitude * Math.sin((nextX / width) * frequency * Math.PI * 2 + phase);
      
      if (i === 0) {
        path += ` L ${x},${y}`;
      } else {
        // Use smooth curves for elegant waves
        const cpX = x + segmentWidth / 2;
        const cpY = (y + nextY) / 2;
        path += ` Q ${cpX},${y} ${nextX},${nextY}`;
      }
    }
    
    return path;
  };

  // Create multiple waves at different vertical positions
  const waves = [
    { amplitude: 12, frequency: 0.5, phase: 0, yOffset: dimensions.height * 0.3, delay: 0 },
    { amplitude: 10, frequency: 0.7, phase: Math.PI / 4, yOffset: dimensions.height * 0.5, delay: -3 },
    { amplitude: 14, frequency: 0.4, phase: Math.PI / 2, yOffset: dimensions.height * 0.7, delay: -6 },
  ];

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="absolute inset-0"
        style={{ opacity: 0.08 }}
      >
        <defs>
          <style>
            {`
              @keyframes waveMove {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-20%);
                }
              }
              .wave-line {
                animation: waveMove 25s linear infinite;
                stroke: ${wavyLineColor};
                stroke-width: 1;
                fill: none;
                vector-effect: non-scaling-stroke;
              }
            `}
          </style>
        </defs>
        {waves.map((wave, index) => {
          const pathData = generateWavePath(wave.amplitude, wave.frequency, wave.phase, wave.yOffset);
          return (
            <path
              key={index}
              d={pathData}
              className="wave-line"
              style={{
                animationDelay: `${wave.delay}s`,
                animationDuration: `${30 + index * 3}s`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

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
      className="min-h-screen flex flex-col bg-white relative"
    >
      {/* Animated Wavy Lines Background */}
      <WavyLinesBackground shouldReduceMotion={shouldReduceMotion} />
      {/* Centered content */}
      <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-24 pb-20 relative" style={{ zIndex: 1 }}>
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
