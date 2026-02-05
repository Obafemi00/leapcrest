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
            className="text-3xl md:text-4xl font-bold mb-3 md:mb-4"
            style={{ color: brandBlue }}
          >
            CAP Framework
          </h2>

          <div className="mt-2 md:mt-4 grid grid-cols-1 min-[900px]:grid-cols-2 gap-12 min-[900px]:gap-16 items-stretch">
            {/* LEFT: Funnel (full-width on mobile, centered on desktop) */}
            <div className="flex items-center justify-center w-full">
              <div className="w-full max-w-full md:max-w-[600px] min-[900px]:max-w-[700px]">
                <CAPFunnel />
              </div>
            </div>

            {/* RIGHT: Before vs After comparison */}
            <div className="w-full flex flex-col justify-center">
              <h3
                className="font-bold text-text-primary mb-6"
                style={{ fontSize: "clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)" }}
              >
                What Success looks like After CAP
              </h3>

              {/* Desktop / tablet (>= 900px): aligned 2-column table */}
              <div className="hidden min-[900px]:block w-full">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center border border-border rounded-md overflow-hidden bg-white">
                  <div className="px-5 py-4 text-sm font-semibold text-text-primary bg-background-light border-b border-border">
                    BEFORE CAP
                  </div>
                  <div className="px-3 py-4 bg-background-light border-b border-border" />
                  <div className="px-5 py-4 text-sm font-semibold text-text-primary bg-background-light border-b border-border">
                    AFTER CAP
                  </div>

                  {[
                    ["Low interview confidence", "Structured articulation"],
                    ["Resume screening only", "Interview conversion"],
                    ["Reactive placements", "Predictable outcomes"],
                    ["Employer complaints", "Employer satisfaction"],
                  ].map(([before, after], idx) => (
                    <div
                      key={idx}
                      className="contents"
                    >
                      <div className="px-5 py-4 text-sm text-text-secondary border-b border-border">
                        {before}
                      </div>
                      <div className="px-3 py-4 text-text-secondary border-b border-border text-center">
                        →
                      </div>
                      <div className="px-5 py-4 text-sm text-text-secondary border-b border-border">
                        {after}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile (< 900px): stacked cards */}
              <div className="min-[900px]:hidden space-y-4">
                {[
                  ["Low interview confidence", "Structured articulation"],
                  ["Resume screening only", "Interview conversion"],
                  ["Reactive placements", "Predictable outcomes"],
                  ["Employer complaints", "Employer satisfaction"],
                ].map(([before, after], idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-md bg-white p-5"
                  >
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="text-xs font-semibold text-text-primary tracking-wide">
                          BEFORE CAP
                        </div>
                        <div className="text-sm text-text-secondary mt-1">
                          {before}
                        </div>
                      </div>
                      <div className="text-text-secondary text-center">
                        →
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-text-primary tracking-wide">
                          AFTER CAP
                        </div>
                        <div className="text-sm text-text-secondary mt-1">
                          {after}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
