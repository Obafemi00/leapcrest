"use client";

import { motion } from "framer-motion";

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
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-dark/50">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          The Problem
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
        >
          The employability gap continues to widen. Institutions produce
          graduates with strong academic foundations, but industry demands
          practical skills, contextual knowledge, and workplace readiness that
          traditional curricula cannot fully address.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-8 hover:border-primary/40 transition-all"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-primary mb-3">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm leading-relaxed">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
