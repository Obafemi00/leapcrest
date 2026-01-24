"use client";

import { motion, useReducedMotion } from "framer-motion";

// Brand colors
const brandBlue = "#0B1F33";
const tealAccent = "#1F9D8F";

const points = [
  {
    title: "Not a motivational seminar",
    description:
      "CAP© is a rigorous, outcome-driven program with structured modules and assessments.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h6" />
      </svg>
    ),
  },
  {
    title: "Not a generic soft-skills course",
    description:
      "Contextualized to industry requirements, technical domains, and career pathways.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Not one-size-fits-all",
    description:
      "Tailored to your institution's profile, student demographics, and placement goals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" strokeLinecap="round" />
        <path d="M20.364 3.636l-4.243 4.243m0 8.485l4.243 4.243M3.636 20.364l4.243-4.243m0-8.485L3.636 3.636" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Designed with measurable outcomes",
    description:
      "Every component is aligned with KPIs: placement rates, salary improvements, employer satisfaction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 16l4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function WhyLeapcrestCAP() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-cap"
      className="min-h-screen md:h-screen flex items-center py-20 md:py-0 px-6 lg:px-8"
      style={{ backgroundColor: "#061423" }}
    >
      <div className="container mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-12"
        >
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Why Leapcrest CAP<sup>©</sup>?
            </h2>
            <p
              className="text-lg md:text-xl font-medium"
              style={{ color: tealAccent }}
            >
              We Are Here to Fix the System
            </p>
          </div>

          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 }}
                className="flex gap-4"
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 mt-1"
                  style={{ color: tealAccent }}
                >
                  {point.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
