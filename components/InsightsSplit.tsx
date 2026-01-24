"use client";

import { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import { motion, useInView } from "framer-motion";

// Brand deep blue from LeapCrest logo
const brandBlue = "#0B1F33";
// Use LeapCrest teal brand color for bars
const barColor = "#1F9D8F"; // LeapCrest primary teal
// Light grey for background
const bgColor = "#F5F7FA";

interface BarData {
  category: string;
  value: number;
}

const barData: BarData[] = [
  { category: "Interview Behavior & Workplace etiquette", value: 40 },
  { category: "Networking & Relationship building", value: 45 },
  { category: "Professional Confidence & Self presentation", value: 50 },
  { category: "Communication & Articulation", value: 55 },
];

const barHeight = 32;
const barSpacing = 20;
const rightMargin = 70; // Space for percentage labels
const topMargin = 40;
const bottomMargin = 20;
const totalHeight =
  topMargin + barData.length * (barHeight + barSpacing) - barSpacing + bottomMargin;

export default function InsightsSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [animatedValues, setAnimatedValues] = useState<number[]>(
    barData.map(() => 0),
  );

  // Responsive width calculation (based on LEFT column width)
  const [containerWidth, setContainerWidth] = useState(650);
  const [leftMargin, setLeftMargin] = useState(280);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateWidth = () => {
      const leftColumnWidth = leftColRef.current?.offsetWidth || 900;
      // Chart width should fill available space without causing overflow
      const calculatedWidth = Math.min(Math.max(leftColumnWidth - 40, 520), 760);
      setContainerWidth(calculatedWidth);

      // Leave enough space for category labels at smaller widths
      const isMobile = window.innerWidth < 768;
      const margin = isMobile
        ? Math.max(calculatedWidth * 0.38, 180)
        : Math.min(calculatedWidth * 0.45, 320);
      setLeftMargin(margin);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Animate bars from 0 to target values when in view
  useEffect(() => {
    if (!isInView || !chartRef.current) return;

    const duration = 1200;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic

      setAnimatedValues(barData.map((d) => d.value * eased));

      if (step >= steps) clearInterval(interval);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView]);

  const barAreaWidth = containerWidth - leftMargin - rightMargin;
  const xScale = scaleLinear()
    .domain([0, 60])
    .range([0, Math.max(barAreaWidth, 150)]);

  // Slightly reduce label sizing on small screens for readability
  const isNarrow = containerWidth < 560;
  const labelFontSize = isNarrow ? 11 : 13;
  const percentFontSize = isNarrow ? 11 : 13;

  return (
    <section
      ref={sectionRef}
      className="insights-split"
      style={{ backgroundColor: "#061423" }}
    >
      <div className="container mx-auto max-w-6xl px-6 lg:px-8">
        <div className="insights-split__grid">
          {/* LEFT: Bar chart block */}
          <div ref={leftColRef} className="insights-split__left max-w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <h3 className="text-lg font-bold text-white mb-8 text-left">
                Top Deficiencies Cited by Employers
              </h3>

              <div className="w-full max-w-full overflow-hidden">
                <svg
                  ref={chartRef}
                  width="100%"
                  height={totalHeight}
                  viewBox={`0 0 ${containerWidth} ${totalHeight}`}
                  preserveAspectRatio="xMidYMid meet"
                  className="block w-full"
                >
                  {/* Background grid lines */}
                  <defs>
                    <pattern
                      id="grid"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="#4A5563"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    </pattern>
                  </defs>

                  {/* X-axis grid lines */}
                  {[10, 20, 30, 40, 50, 60].map((tick) => {
                    const x = leftMargin + xScale(tick);
                    return (
                      <g key={tick}>
                        <line
                          x1={x}
                          y1={topMargin - 20}
                          x2={x}
                          y2={totalHeight - bottomMargin}
                          stroke="#4A5563"
                          strokeWidth="1"
                          opacity="0.3"
                        />
                        {/* Subtle tick labels */}
                        <text
                          x={x}
                          y={totalHeight - bottomMargin + 15}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#CBD5E1"
                          opacity="0.7"
                        >
                          {tick}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Bars */}
                  {barData.map((d, i) => {
                    const y = topMargin + i * (barHeight + barSpacing);
                    const barWidth = xScale(animatedValues[i]);
                    const labelY = y + barHeight / 2;

                    return (
                      <g key={i}>
                        {/* Bar */}
                        <rect
                          x={leftMargin}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          fill={barColor}
                          style={{ transition: "width 0.05s linear" }}
                        />

                        {/* Category label - positioned to the left of bars */}
                        <text
                          x={leftMargin - 12}
                          y={labelY}
                          fontSize={labelFontSize}
                          fill="#E5E7EB"
                          dominantBaseline="middle"
                          fontWeight="400"
                          textAnchor="end"
                        >
                          {d.category}
                        </text>

                        {/* Percentage label - at the end of bar */}
                        {animatedValues[i] > 0 && (
                          <text
                            x={leftMargin + barWidth + 10}
                            y={labelY}
                            fontSize={percentFontSize}
                            fill="#FFFFFF"
                            dominantBaseline="middle"
                            fontWeight="600"
                          >
                            {Math.round(animatedValues[i])}%
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Institutional problem text block (existing markup) */}
          <div className="insights-split__right max-w-full">
            <div className="border-l-4 border-primary pl-8">
              <h3
                className="font-bold text-white mb-6 leading-tight"
                style={{
                  fontSize: "clamp(1.25rem, 1.05rem + 1vw, 1.875rem)",
                }}
              >
                This is an institutional problem,
                <br />
                <span className="text-primary">not a student-level problem.</span>
              </h3>

              <div className="space-y-5 text-gray-300 leading-relaxed max-w-[60ch]">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

