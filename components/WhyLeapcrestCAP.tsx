"use client";

import { motion } from "framer-motion";

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
  return (
    <section
      id="why-cap"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Why Leapcrest CAP<sup>©</sup>?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all"
            >
              <h3 className="text-xl font-bold text-primary mb-3">
                {point.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
