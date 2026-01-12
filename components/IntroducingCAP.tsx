"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function IntroducingCAP() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="introducing-cap"
      className="min-h-screen md:h-screen flex items-center py-20 md:py-0 px-6 lg:px-8 bg-white"
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
            Introducing the Career Accelerator Program (CAP<sup>©</sup>)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Structured
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  A well-defined curriculum with clear milestones and measurable
                  outcomes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Year-long</h3>
                <p className="text-text-secondary leading-relaxed">
                  Comprehensive development over a full academic cycle, ensuring
                  depth and continuity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: shouldReduceMotion ? 1 : 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Embedded within Academic Calendar
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Seamlessly integrated into existing academic schedules without
                  disrupting core learning.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  Extension of Placement Cell
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Works in partnership with your placement office, amplifying
                  existing efforts with specialized expertise.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
