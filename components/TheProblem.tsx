"use client";

import { motion, useReducedMotion } from "framer-motion";

const stats = [
  {
    number: "85%",
    label: "of graduates lack industry-ready skills",
    description: "Majority of graduates enter the workforce unprepared",
  },
  {
    number: "60%",
    label: "employability gap in technical roles",
    description: "Skills mismatch between education and industry needs",
  },
  {
    number: "2.5 years",
    label: "average time to become productive",
    description: "Fresh graduates require extensive onboarding period",
  },
];

export default function TheProblem() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="min-h-screen md:h-screen flex items-center py-20 md:py-0 px-6 lg:px-8 bg-background-light">
      <div className="container mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              The Problem
            </h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="text-lg text-text-secondary mb-16 leading-relaxed max-w-3xl"
            >
              The employability gap continues to widen. Institutions produce
              graduates with strong academic foundations, but industry demands
              practical skills, contextual knowledge, and workplace readiness that
              traditional curricula cannot fully address.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                className="border-t-2 border-primary pt-6"
              >
                <div className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-text-primary mb-2">
                  {stat.label}
                </div>
                <div className="text-text-secondary text-sm leading-relaxed">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
