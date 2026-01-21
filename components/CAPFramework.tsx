"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import CAPFunnel from "./CAPFunnel";

// Deep blue from logo - matches text-primary #0B1F33
const brandBlue = "#0B1F33";

export default function CAPFramework() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 px-6 lg:px-8 bg-background-light">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: brandBlue }}
          >
            CAP<sup>©</sup> Framework
          </h2>

          <div className="flex flex-col items-center mt-16">
            <CAPFunnel />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
