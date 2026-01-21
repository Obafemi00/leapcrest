"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

interface FunnelSegment {
  name: string;
  details?: string;
  timeline?: string;
  color: string;
  widthRatio: number; // 0-1, 1 is widest
}

const funnelSegments: FunnelSegment[] = [
  {
    name: "Continuous Support",
    details:
      "1:1 counselling, guidance on internships & projects, monthly office hours, and much more.",
    color: "#1F9D8F", // Brand teal
    widthRatio: 1.0, // WIDEST (TOP)
  },
  {
    name: "Higher Education",
    color: "#D946EF", // Magenta
    widthRatio: 0.8,
  },
  {
    name: "Advanced Placement Bootcamp",
    color: "#78350F", // Dark brown
    widthRatio: 0.6,
  },
  {
    name: "Booster Week",
    color: "#6B7280", // Grey
    widthRatio: 0.45,
  },
  {
    name: "Foundation Week",
    color: "#9333EA", // Purple
    widthRatio: 0.4, // NARROW TIP (BOTTOM)
  },
];

export default function CAPFunnel() {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // SVG dimensions
  const width = 600;
  const totalHeight = 750; // Increased to accommodate gaps
  const gapSize = 12; // Vertical gap between segments
  const baseSegmentHeight = (totalHeight - gapSize * (funnelSegments.length - 1)) / funnelSegments.length;
  const maxWidth = width * 0.9; // Maximum funnel width
  const centerX = width / 2;

  // Generate trapezoidal path for a segment
  const getSegmentPath = (
    topWidth: number,
    bottomWidth: number,
    topY: number,
    bottomY: number
  ): string => {
    const topLeft = centerX - topWidth / 2;
    const topRight = centerX + topWidth / 2;
    const bottomLeft = centerX - bottomWidth / 2;
    const bottomRight = centerX + bottomWidth / 2;

    return `M ${topLeft} ${topY} L ${topRight} ${topY} L ${bottomRight} ${bottomY} L ${bottomLeft} ${bottomY} Z`;
  };

  // Generate top edge highlight path (slight inset for subtle edge)
  const getTopEdgePath = (
    topWidth: number,
    topY: number,
    edgeHeight: number = 2
  ): string => {
    const topLeft = centerX - topWidth / 2;
    const topRight = centerX + topWidth / 2;
    const inset = 1; // Subtle inset for edge definition

    return `M ${topLeft + inset} ${topY} L ${topRight - inset} ${topY} L ${topRight - inset} ${topY + edgeHeight} L ${topLeft + inset} ${topY + edgeHeight} Z`;
  };

  return (
    <div ref={ref} className="w-full py-12">
      <svg
        width="100%"
        height={totalHeight}
        viewBox={`0 0 ${width} ${totalHeight}`}
        className="overflow-visible"
        style={{ display: "block" }}
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Shadow filter definitions - increasing intensity toward bottom */}
        <defs>
          {funnelSegments.map((_, index) => {
            // Shadow intensity increases toward bottom (deeper = darker shadow)
            const depthFactor = (index + 1) / funnelSegments.length;
            const shadowBlur = 8 + depthFactor * 12; // 8px to 20px blur
            const shadowY = 4 + depthFactor * 6; // 4px to 10px offset
            const shadowOpacity = 0.15 + depthFactor * 0.2; // 0.15 to 0.35 opacity

            return (
              <filter 
                key={`shadow-${index}`} 
                id={`shadow-${index}`}
                x="-50%" 
                y="-50%" 
                width="200%" 
                height="200%"
              >
                <feGaussianBlur in="SourceAlpha" stdDeviation={shadowBlur / 2} />
                <feOffset dx="0" dy={shadowY} result="offsetblur" />
                <feComponentTransfer in="offsetblur" result="shadow">
                  <feFuncA type="linear" slope={shadowOpacity} />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            );
          })}

          {/* Top edge highlight gradient */}
          <linearGradient id="topEdgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {funnelSegments.map((segment, index) => {
          // Calculate positions with gaps
          const accumulatedGaps = index * gapSize;
          const topY = index * baseSegmentHeight + accumulatedGaps;
          const bottomY = (index + 1) * baseSegmentHeight + accumulatedGaps;
          const segmentHeight = bottomY - topY;

          // Calculate widths for this segment
          const topWidth = maxWidth * segment.widthRatio;
          // Bottom segment must terminate in a pointed tip (zero width)
          const bottomWidth =
            index < funnelSegments.length - 1
              ? maxWidth * funnelSegments[index + 1].widthRatio
              : 0; // Pointed tip at bottom - funnel converges to single point

          // For bottom segment, generate proper funnel termination: rectangle + centered triangle
          const segmentPath = index === funnelSegments.length - 1
            ? // Two-part path: text container rectangle (top) + centered funnel tip (bottom)
              (() => {
                // PART A: Text container - rectangle with stable width
                const textZoneHeight = segmentHeight * 0.65; // 65% for text
                const textZoneBottomY = topY + textZoneHeight;
                const textZoneWidth = topWidth; // Full width, no taper (stable for text)
                
                // PART B: Funnel tip - centered isosceles triangle
                const tipBottomY = bottomY;
                const tipX = centerX; // Tip centered perfectly
                
                // Calculate coordinates for proper funnel shape
                const topLeft = centerX - topWidth / 2;
                const topRight = centerX + topWidth / 2;
                const textZoneBottomLeft = centerX - textZoneWidth / 2; // Same as topLeft
                const textZoneBottomRight = centerX + textZoneWidth / 2; // Same as topRight
                
                // Proper funnel path: rectangle (top) + centered triangle (bottom)
                // Path order: top-left → top-right → down right side → tip → up left side → close
                return `M ${topLeft} ${topY} 
                        L ${topRight} ${topY} 
                        L ${textZoneBottomRight} ${textZoneBottomY} 
                        L ${tipX} ${tipBottomY} 
                        L ${textZoneBottomLeft} ${textZoneBottomY} 
                        Z`;
              })()
            : // Standard trapezoidal path for other segments
              getSegmentPath(topWidth, bottomWidth, topY, bottomY);
          const topEdgePath = getTopEdgePath(topWidth, topY);

          // Calculate text constraints - use NARROWEST width to prevent overflow
          // For bottom segment, text is in the stable trapezoid zone (top 70%)
          const minWidth = index === funnelSegments.length - 1 
            ? topWidth // Bottom segment: text zone maintains full width (no taper in text area)
            : Math.min(topWidth, bottomWidth); // Other segments: use narrowest point
          // Effective text width: account for padding, use 85% of narrowest point
          const textWidth = minWidth * 0.85;
          // Horizontal position: center minus half of text container
          const textX = centerX - textWidth / 2;
          // Vertical position: center of TEXT ZONE (top 70% of segment), not full segment
          const textZoneHeight = index === funnelSegments.length - 1 
            ? segmentHeight * 0.7 
            : segmentHeight;
          const textY = topY + textZoneHeight / 2;
          
          // Typography scale: smaller font for narrower segments
          const fontSizeBase = minWidth < width * 0.5 ? "sm" : "base";
          const fontSizeTitle = minWidth < width * 0.5 ? "base" : "lg";
          const fontSizeDetails = minWidth < width * 0.5 ? "xs" : "sm";

          return (
            <g key={index}>
              {/* Main segment path with 3D depth shadow */}
              <motion.path
                d={segmentPath}
                fill={segment.color}
                stroke="none"
                filter={`url(#shadow-${index})`}
                initial={{ 
                  opacity: 0, 
                  y: shouldReduceMotion ? 0 : 12,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : { 
                        opacity: 0, 
                        y: shouldReduceMotion ? 0 : 12,
                      }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  ease: [0.25, 0.1, 0.25, 1], // ease-out expo
                  delay: index * 0.1,
                }}
                style={{ cursor: "pointer" }}
                whileHover={{
                  opacity: 0.95,
                  filter: `url(#shadow-${index}) brightness(1.05)`,
                }}
              />

              {/* Top edge highlight - subtle light reflection */}
              <motion.path
                d={topEdgePath}
                fill="url(#topEdgeGradient)"
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.1 + 0.2,
                }}
                style={{ pointerEvents: "none" }}
              />

              {/* Text content - constrained to segment bounds */}
              {/* For bottom segment, text is constrained to text zone only (not tip) */}
              <foreignObject
                x={textX}
                y={topY}
                width={textWidth}
                height={index === funnelSegments.length - 1 ? segmentHeight * 0.7 : segmentHeight}
                style={{ pointerEvents: "none", overflow: "hidden" }}
              >
                <motion.div
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "0 8px",
                    boxSizing: "border-box",
                  }}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : { opacity: 0, y: shouldReduceMotion ? 0 : 10 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    ease: [0.4, 0, 0.2, 1],
                    delay: index * 0.1 + 0.2,
                  }}
                >
                  <h3
                    className={`font-bold mb-1 ${fontSizeTitle === "lg" ? "text-lg md:text-xl" : "text-base"}`}
                    style={{
                      color: "#FFFFFF",
                      lineHeight: "1.3",
                      wordBreak: "break-word",
                      maxWidth: "100%",
                    }}
                  >
                    {segment.name}
                  </h3>
                  {segment.timeline && (
                    <p
                      className={`${fontSizeBase === "base" ? "text-sm md:text-base" : "text-xs"}`}
                      style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        lineHeight: "1.4",
                        wordBreak: "break-word",
                        maxWidth: "100%",
                      }}
                    >
                      {segment.timeline}
                    </p>
                  )}
                  {segment.details && (
                    <p
                      className={`mt-2 ${fontSizeDetails === "sm" ? "text-xs md:text-sm" : "text-xs"}`}
                      style={{
                        color: "rgba(255, 255, 255, 0.85)",
                        lineHeight: "1.5",
                        wordBreak: "break-word",
                        maxWidth: "100%",
                        whiteSpace: "normal",
                      }}
                    >
                      {segment.details}
                    </p>
                  )}
                </motion.div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
