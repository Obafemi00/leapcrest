"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16"
    >
      <div className="container mx-auto max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
        >
          Elevating Skills.
          <br />
          Accelerating Careers.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Graduates are earning degrees but are not career-ready. Leapcrest
          turns fresh graduates into industry-ready early-career professionals
          by bridging the last-mile gap.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection("cta")}
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-background-dark font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
            aria-label="Get started with Leapcrest"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollToSection("introducing-cap")}
            className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary/10 font-semibold text-lg rounded-lg transition-all"
            aria-label="Learn more about the program"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
