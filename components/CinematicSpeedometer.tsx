"use client";

import { motion, useReducedMotion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { arc } from "d3-shape";
import { scaleLinear } from "d3-scale";

interface CinematicSpeedometerProps {
  finalValue?: number; // Final settled value (0-100), defaults to 85
}

export default function CinematicSpeedometer({
  finalValue = 85,
}: CinematicSpeedometerProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const needleControls = useAnimation();

  // Deep navy / charcoal from brand palette
  const arcColor = "#0B1F33"; // text-primary from brand
  const needleColor = "#FFFFFF"; // Pure white needle
  const pivotColor = "#64748B"; // Subtle metallic gray

  // SVG dimensions
  const width = 600;
  const height = 400;
  const centerX = width / 2;
  const centerY = height * 0.5; // Center vertically for arc rotation
  const radius = 180;

  // Arc angles: Rotated 180° more (from 90° right position)
  // Arc now spans from 90° (top) to 270° (bottom) - left semicircle
  const startAngle = Math.PI / 2; // 90° - top extreme (rotated 180° more)
  const endAngle = (3 * Math.PI) / 2; // 270° - bottom extreme (rotated 180° more)
  const angleSpan = Math.PI; // 180°

  // Generate arc segments with progression (left = calmer, right = heavier)
  // Left side: thinner, lower opacity | Right side: thicker, higher opacity
  const arcSegmentCount = 40; // Number of segments for smooth progression
  const baseThickness = 2; // Minimum thickness (left side)
  const maxThickness = 4; // Maximum thickness (right side)
  const baseOpacity = 0.4; // Minimum opacity (left side)
  const maxOpacity = 1.0; // Maximum opacity (right side)

  // Generate arc segments with progressive thickness and opacity
  const arcSegments = Array.from({ length: arcSegmentCount }, (_, i) => {
    const progress = i / (arcSegmentCount - 1); // 0 to 1
    const segmentAngle = startAngle + (angleSpan * i) / arcSegmentCount;
    const nextSegmentAngle = startAngle + (angleSpan * (i + 1)) / arcSegmentCount;
    const thickness = baseThickness + (maxThickness - baseThickness) * progress;
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * progress;
    
    const segmentArcGenerator = arc<{ startAngle: number; endAngle: number }>()
      .innerRadius(radius)
      .outerRadius(radius + thickness)
      .cornerRadius(0);
    
    const segmentPath = segmentArcGenerator({
      startAngle: segmentAngle,
      endAngle: nextSegmentAngle,
    });
    
    return { path: segmentPath, opacity };
  });

  // D3 scale: map percentage (0-100) to rotation angle in degrees
  // After 180° more rotation: Needle starts pointing up (90°), rotates clockwise to point down (270°)
  const angleScale = scaleLinear()
    .domain([0, 100])
    .range([90, 270]) // 0% = 90° (pointing up), 100% = 270° (pointing down)
    .clamp(true);

  // Final settled rotation in degrees
  const settledRotation = angleScale(finalValue);


  // Animation sequence: Ignition sweep from far-left → far-right (100%) → overshoot → settle at ~85%
  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      needleControls.set({ rotate: settledRotation });
      return;
    }

    const sequence = async () => {
      // Step 1: Ignition sweep - far-left (0%) → far-right (100%)
      await needleControls.start({
        rotate: angleScale(100),
        transition: {
          duration: 1.0,
          ease: [0.34, 1.56, 0.64, 1], // easeOutBack - mechanical bounce
        },
      });

      // Step 2: Overshoot slightly past final value
      await needleControls.start({
        rotate: angleScale(finalValue + 3),
        transition: {
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      // Step 3: Settle at final value
      await needleControls.start({
        rotate: settledRotation,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        },
      });

      // Step 4: Continuous subtle micro-rotation jitter (tense, not playful)
      needleControls.start({
        rotate: [
          settledRotation,
          angleScale(finalValue - 0.1),
          angleScale(finalValue + 0.1),
          settledRotation,
        ],
        transition: {
          duration: 0.12,
          repeat: Infinity,
          ease: "linear",
        },
      });
    };

    sequence();
  }, [isInView, shouldReduceMotion, finalValue, needleControls, angleScale, settledRotation]);

  // Calculate needle tip position - needle originates from center pivot
  // After 180° more rotation: needle starts pointing up (90°), sweeps to down (270°)
  const needleLength = radius * 0.88;
  const tipX = 0; // No horizontal offset
  const tipY = -needleLength; // Up direction (negative Y) - starting position after rotation

  return (
    <div ref={ref} className="flex items-center justify-center w-full py-12">
      {/* Glassmorphic backdrop panel */}
      <motion.div
        className="relative rounded-lg px-12 py-16"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          border: "1px solid rgba(11, 31, 51, 0.1)",
        }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(11, 31, 51, 0.08)",
            "0 0 30px rgba(11, 31, 51, 0.12)",
            "0 0 20px rgba(11, 31, 51, 0.08)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* SVG Speedometer */}
        <svg
          width="100%"
          height="400"
          viewBox={`0 0 ${width} ${height}`}
          className="relative z-10"
          style={{ display: "block", overflow: "visible" }}
        >
          {/* Gradient definition for pivot subtle metallic shading */}
          <defs>
            <radialGradient id="pivotGradient" cx="50%" cy="40%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#64748B" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          
          <g transform={`translate(${centerX}, ${centerY})`}>
            {/* Progressive arc segments (left = calmer, right = heavier) */}
            {arcSegments.map((segment, i) => (
              segment.path && (
                <path
                  key={i}
                  d={segment.path}
                  fill={arcColor}
                  stroke="none"
                  opacity={segment.opacity}
                />
              )
            ))}

            {/* Subtle mechanical pivot - small bearing hub */}
            {/* Base metallic circle */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill={pivotColor}
              opacity="0.9"
            />
            {/* Subtle radial shading */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill="url(#pivotGradient)"
              opacity="0.6"
            />
            {/* Inner hub */}
            <circle
              cx="0"
              cy="0"
              r="4"
              fill={pivotColor}
              opacity="0.95"
            />

            {/* Pure white needle - very thin, tapered to sharp point */}
            <motion.g
              style={{
                transformOrigin: "0 0",
              }}
              animate={needleControls}
              initial={{ rotate: angleScale(0) }}
            >
              {/* Needle line - very thin, sharp */}
              <line
                x1={0}
                y1={0}
                x2={tipX}
                y2={tipY}
                stroke={needleColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="1"
              />
              {/* Sharp needle tip - small point */}
              <circle
                cx={tipX}
                cy={tipY}
                r="1.5"
                fill={needleColor}
                opacity="1"
              />
            </motion.g>
          </g>

          {/* Semantic labels outside the arc */}
          {/* Left side: "Stability" (calmer) */}
          <text
            x={centerX - radius * 0.85}
            y={centerY + radius * 0.3}
            textAnchor="middle"
            className="text-sm font-medium"
            fill={arcColor}
            opacity="0.5"
          >
            Stability
          </text>
          {/* Right side: "The Crisis" (heavier) */}
          <text
            x={centerX + radius * 0.85}
            y={centerY + radius * 0.3}
            textAnchor="middle"
            className="text-sm font-medium"
            fill={arcColor}
            opacity="0.8"
          >
            The Crisis
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
