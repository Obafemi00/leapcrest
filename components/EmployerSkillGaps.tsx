"use client";

import { useEffect, useRef, useState } from "react";
import { scaleLinear } from "d3-scale";
import { motion, useInView } from "framer-motion";

// Brand deep blue from LeapCrest logo
const brandBlue = "#0B1F33";
// Muted corporate blue for bars
const barColor = "#4A90E2";
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

const chartHeight = 280;
const barHeight = 32;
const barSpacing = 20;
const chartWidth = 600; // Base width, will be responsive
const rightMargin = 70; // Space for percentage labels
const topMargin = 40;
const bottomMargin = 20;
// Left margin calculated dynamically based on longest category name

// Calculate total chart dimensions
const totalHeight = topMargin + (barData.length * (barHeight + barSpacing)) - barSpacing + bottomMargin;

export default function EmployerSkillGaps() {
  const chartRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [animatedValues, setAnimatedValues] = useState<number[]>(
    barData.map(() => 0)
  );

  useEffect(() => {
    if (isInView && chartRef.current) {
      // Animate bars from 0 to their target values
      const duration = 1200;
      const steps = 60;
      const stepDuration = duration / steps;

      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        const progress = Math.min(step / steps, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        setAnimatedValues(
          barData.map((d) => d.value * eased)
        );

        if (step >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Responsive width calculation
  const [containerWidth, setContainerWidth] = useState(650);
  const [leftMargin, setLeftMargin] = useState(280);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (containerRef.current) {
      const updateWidth = () => {
        // Get the actual left column width (65% of container)
        const sectionWidth = containerRef.current?.offsetWidth || 1200;
        const leftColumnWidth = sectionWidth * 0.65;
        // Chart width should fill available space
        const calculatedWidth = Math.min(Math.max(leftColumnWidth - 40, 550), 750);
        setContainerWidth(calculatedWidth);
        
        // Calculate left margin based on screen size (space for category labels)
        // On smaller screens, use less margin; on larger screens, more margin
        const isMobile = window.innerWidth < 1024;
        const margin = isMobile 
          ? Math.max(calculatedWidth * 0.4, 200) // 40% of chart width, min 200px
          : Math.min(calculatedWidth * 0.45, 320); // 45% of chart width, max 320px
        setLeftMargin(margin);
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  // Calculate bar area width (space between left margin and right margin)
  const barAreaWidth = containerWidth - leftMargin - rightMargin;
  const xScale = scaleLinear()
    .domain([0, 60])
    .range([0, Math.max(barAreaWidth, 150)]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 lg:px-8 mt-[50px]"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container mx-auto max-w-7xl w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN - Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3 className="text-lg font-bold text-text-primary mb-8 text-left">
              Top Deficiencies Cited by Employers
            </h3>

            <div className="w-full overflow-x-auto">
              <svg
                ref={chartRef}
                width="100%"
                height={totalHeight}
                viewBox={`0 0 ${containerWidth} ${totalHeight}`}
                preserveAspectRatio="xMidYMid meet"
                className="min-w-full"
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
                      stroke="#E0E0E0"
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
                        stroke="#E0E0E0"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                      {/* Subtle tick labels */}
                      <text
                        x={x}
                        y={totalHeight - bottomMargin + 15}
                        textAnchor="middle"
                        fontSize="10"
                        fill="#999"
                        opacity="0.5"
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
                        fontSize="13"
                        fill="#4A4A4A"
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
                          fontSize="13"
                          fill="#1A1A1A"
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

          {/* RIGHT COLUMN - Insight Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
            className="flex items-center justify-center lg:justify-start"
          >
            <div className="text-left">
              <p
                className="text-2xl md:text-3xl lg:text-4xl leading-tight font-medium"
                style={{ color: brandBlue }}
              >
                Degrees certify education.
                <br />
                Employers hire for readiness
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}