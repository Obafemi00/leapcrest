"use client";

import { motion } from "framer-motion";

export default function IntroducingCAP() {
  return (
    <section
      id="introducing-cap"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background-dark/50"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Introducing the Career Accelerator Program (CAP<sup>©</sup>)
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">
                Structured
              </h3>
              <p className="text-gray-300">
                A well-defined curriculum with clear milestones and measurable
                outcomes.
              </p>
            </div>

            <div className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">Year-long</h3>
              <p className="text-gray-300">
                Comprehensive development over a full academic cycle, ensuring
                depth and continuity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">
                Embedded within Academic Calendar
              </h3>
              <p className="text-gray-300">
                Seamlessly integrated into existing academic schedules without
                disrupting core learning.
              </p>
            </div>

            <div className="bg-background/60 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-3">
                Extension of Placement Cell
              </h3>
              <p className="text-gray-300">
                Works in partnership with your placement office, amplifying
                existing efforts with specialized expertise.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
