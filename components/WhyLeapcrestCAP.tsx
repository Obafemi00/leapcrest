"use client";

import { motion, useReducedMotion } from "framer-motion";

const points = [
  {
    title: "Not a motivational seminar",
    description:
      "CAP© is a rigorous, outcome-driven program with structured modules and assessments.",
  },
  {
    title: "Not a generic soft-skills course",
    description:
      "Contextualized to industry requirements, technical domains, and career pathways.",
  },
  {
    title: "Not one-size-fits-all",
    description:
      "Tailored to your institution's profile, student demographics, and placement goals.",
  },
  {
    title: "Designed with measurable outcomes",
    description:
      "Every component is aligned with KPIs: placement rates, salary improvements, employer satisfaction.",
  },
];

export default function WhyLeapcrestCAP() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-cap"
      className="min-h-screen md:h-screen flex items-center py-20 md:py-0 px-6 lg:px-8 bg-background-light"
    >
      <div className="container mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
            Why Leapcrest CAP<sup>©</sup>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
              >
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {point.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
