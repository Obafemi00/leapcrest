"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import CAPFunnel from "./CAPFunnel";

// Deep blue from logo - matches text-primary #0B1F33
const brandBlue = "#0B1F33";

export default function CAPFramework() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 lg:px-8 bg-background-light">
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
                className="font-bold text-text-primary mt-2 mb-6"
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

              {/* Mobile (< 900px): premium compact cards */}
              <div className="min-[900px]:hidden space-y-4">
                {[
                  ["Low interview confidence", "Structured articulation"],
                  ["Resume screening only", "Interview conversion"],
                  ["Reactive placements", "Predictable outcomes"],
                  ["Employer complaints", "Employer satisfaction"],
                ].map(([before, after], idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {/* 2-column layout: Before | Divider | After */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-start">
                      {/* BEFORE block */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-2">
                          {/* Low/down indicator icon */}
                          <svg 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className="w-4 h-4 text-slate-400"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="M5 8l5 5 5-5" 
                            />
                          </svg>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Before
                          </span>
                        </div>
                        <p className="text-base text-text-secondary leading-relaxed">
                          {before}
                        </p>
                      </div>

                      {/* Vertical divider with arrow */}
                      <div className="flex flex-col items-center justify-center h-full py-1">
                        <div className="w-px h-full bg-slate-200 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-0.5">
                            <svg 
                              viewBox="0 0 16 16" 
                              fill="none" 
                              className="w-3 h-3 text-slate-400"
                            >
                              <path 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M6 12l4-4-4-4" 
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* AFTER block */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-2">
                          {/* Check/upgrade icon */}
                          <svg 
                            viewBox="0 0 20 20" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className="w-4 h-4 text-[#3FBFB0]"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                            />
                          </svg>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#3FBFB0]">
                            After
                          </span>
                        </div>
                        <p className="text-base text-text-secondary leading-relaxed font-medium">
                          {after}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
