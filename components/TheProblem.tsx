"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import ProblemDataVisual from "./ProblemDataVisual";

// Deep blue from logo - matches text-primary #0B1F33
const brandBlue = "#0B1F33";

export default function TheProblem() {
  const shouldReduceMotion = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const isLineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section className="min-h-[120vh] flex items-center py-20 md:py-24 px-6 lg:px-8 bg-background-light relative z-0 mt-[50px] overflow-hidden">
      <div className="container mx-auto max-w-6xl w-full relative">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-12"
        >
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: brandBlue }}
            >
              The Problem
            </h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
              className="text-lg text-text-secondary mb-12 leading-relaxed max-w-3xl"
            >
              The employability gap continues to widen. Institutions produce
              graduates with strong academic foundations, but industry demands
              practical skills, contextual knowledge, and workplace readiness that
              traditional curricula cannot fully address.
            </motion.p>

            {/* Data-driven visual block */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
              className="mb-16"
            >
              <ProblemDataVisual />
            </motion.div>

            {/* Animated horizontal line */}
            <div ref={lineRef} className="relative mb-16 h-px overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  backgroundColor: brandBlue,
                  width: "100%",
                }}
                initial={{ x: "-100%" }}
                animate={isLineInView ? { x: 0 } : { x: "-100%" }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 1.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
