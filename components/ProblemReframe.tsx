"use client";

import { motion } from "framer-motion";

export default function ProblemReframe() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-primary/10 border-l-4 border-primary rounded-lg p-8 md:p-12 backdrop-blur-sm"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 leading-tight"
          >
            This is an institutional problem,
            <br />
            <span className="text-primary">not a student-level problem.</span>
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 leading-relaxed space-y-4"
          >
            <p>
              The challenge lies in systemic gaps between academic delivery and
              industry expectations. Individual student motivation, while
              important, cannot compensate for structural misalignments.
            </p>
            <p>
              Institutions need systematic interventions that bridge curriculum
              and placement outcomes—programs that are embedded, measured, and
              aligned with institutional goals.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
