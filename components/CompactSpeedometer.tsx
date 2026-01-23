"use client";

import { motion, useReducedMotion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";

interface CompactSpeedometerProps {
  value: number; // 0-100 for percentage, or special value for time-based
  isTimeBased?: boolean; // If true, display "2.5 years" instead of percentage
  timeValue?: string; // The time value to display (e.g., "2.5 years")
  caption: string;
}

export default function CompactSpeedometer({
  value,
  isTimeBased = false,
  timeValue,
  caption,
}: CompactSpeedometerProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const needleControls = useAnimation();

  // Brand colors
  const arcColor = "#0B1F33"; // Deep navy
  const needleColor = "#1F9D8F"; // Primary teal/green
  const pivotColor = "#64748B"; // Subtle metallic gray

  // SVG dimensions - compact size
  const width = 200;
  const height = 120;
  
  // Explicit center point (cx, cy) - mathematically defined
  const centerX = width / 2;
  const centerY = height * 0.85; // Position center near bottom for semi-circle
  const radius = 70;

  // Explicit angle definitions (in degrees)
  // startAngle = -135°, endAngle = +135°
  const START_ANGLE = -135; // Minimum angle (0%)
  const END_ANGLE = 135;    // Maximum angle (100%)
  const ANGLE_SPAN = END_ANGLE - START_ANGLE; // 270 degrees

  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, isTimeBased ? 90 : value));

  // Linear interpolation: angle = startAngle + (value / 100) * (endAngle - startAngle)
  // This is SSR-safe and deterministic
  const calculateAngle = (val: number): number => {
    return START_ANGLE + (val / 100) * ANGLE_SPAN;
  };

  // Target angle for the needle (precomputed, SSR-safe)
  const targetAngle = useMemo(() => calculateAngle(clampedValue), [clampedValue]);

  // Convert degrees to radians for SVG calculations
  const degToRad = (deg: number): number => (deg * Math.PI) / 180;

  // Generate arc path (semi-circular from -135° to +135°)
  const startAngleRad = degToRad(START_ANGLE);
  const endAngleRad = degToRad(END_ANGLE);
  
  // Calculate arc endpoints
  const startX = centerX + Math.cos(startAngleRad) * radius;
  const startY = centerY - Math.sin(startAngleRad) * radius;
  const endX = centerX + Math.cos(endAngleRad) * radius;
  const endY = centerY - Math.sin(endAngleRad) * radius;

  // Large arc flag: 1 if span > 180°, 0 otherwise (270° span = 1)
  const largeArcFlag = 1;
  // Sweep flag: 1 for clockwise, 0 for counter-clockwise (we want clockwise)
  const sweepFlag = 1;

  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

  // Generate tick marks (5 ticks at 0%, 25%, 50%, 75%, 100%)
  const tickCount = 5;
  const ticks = useMemo(() => {
    return Array.from({ length: tickCount }, (_, i) => {
      const tickValue = (i / (tickCount - 1)) * 100;
      const tickAngle = calculateAngle(tickValue);
      const tickAngleRad = degToRad(tickAngle);
      const innerRadius = radius - 8;
      const outerRadius = radius + 2;
      // Coordinates relative to center (0,0 after transform)
      const x1 = Math.cos(tickAngleRad) * innerRadius;
      const y1 = -Math.sin(tickAngleRad) * innerRadius;
      const x2 = Math.cos(tickAngleRad) * outerRadius;
      const y2 = -Math.sin(tickAngleRad) * outerRadius;
      return { x1, y1, x2, y2 };
    });
  }, []);

  // Needle configuration
  // Needle length: between radius midpoint and outer arc
  const needleLength = radius * 0.75;
  // Needle is drawn pointing "up" (negative Y direction) in base position
  // When rotated, it will sweep from -135° to +135°
  const needleTipX = 0;
  const needleTipY = -needleLength;

  // Animation sequence - ensures clockwise-only rotation
  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      // Set directly to target angle (no animation)
      needleControls.set({ rotate: targetAngle });
      return;
    }

    const sequence = async () => {
      // Step 1: Start at minimum angle (-135°)
      await needleControls.set({ rotate: START_ANGLE });

      // Step 2: Animate directly to target angle - ALWAYS clockwise
      // Since targetAngle >= START_ANGLE, this is always a clockwise motion
      await needleControls.start({
        rotate: targetAngle,
        transition: {
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1], // ease-out-back with slight overshoot
        },
      });

      // Step 3: Subtle micro-vibration (small clockwise-only oscillations)
      // Ensure all movements are clockwise by constraining angles
      const vibrationOffset = 0.2; // Small angle offset
      const lowerAngle = Math.max(START_ANGLE, targetAngle - vibrationOffset);
      const upperAngle = Math.min(END_ANGLE, targetAngle + vibrationOffset);
      
      // Vibration pattern: always move clockwise first, then back
      needleControls.start({
        rotate: [
          targetAngle,
          upperAngle, // Move clockwise first
          lowerAngle, // Then back (but still within valid range)
          targetAngle,
        ],
        transition: {
          duration: 0.15,
          repeat: Infinity,
          ease: "linear",
        },
      });
    };

    sequence();
  }, [isInView, shouldReduceMotion, targetAngle, needleControls]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Speedometer SVG */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mb-4"
      >
        <g transform={`translate(${centerX}, ${centerY})`}>
          {/* Arc - semi-circular from -135° to +135° */}
          <path
            d={arcPath}
            fill="none"
            stroke={arcColor}
            strokeWidth="3"
            opacity="0.3"
          />

          {/* Tick marks */}
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={arcColor}
              strokeWidth="1.5"
              opacity="0.4"
            />
          ))}

          {/* Center hub - exact pivot point */}
          <circle cx="0" cy="0" r="5" fill={pivotColor} opacity="0.8" />
          <circle cx="0" cy="0" r="2.5" fill={pivotColor} opacity="0.95" />

          {/* Needle - anchored at exact center (0,0), rotates clockwise only */}
          <motion.g
            style={{
              transformOrigin: "0 0", // Exact center pivot
            }}
            animate={needleControls}
            initial={{ rotate: START_ANGLE }} // Start at minimum angle
          >
            <line
              x1={0}
              y1={0}
              x2={needleTipX}
              y2={needleTipY}
              stroke={needleColor}
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx={needleTipX} cy={needleTipY} r="2" fill={needleColor} />
          </motion.g>
        </g>
      </svg>

      {/* Time value display (for time-based speedometers) */}
      {isTimeBased && timeValue && (
        <div className="mb-3">
          <span
            className="text-lg md:text-xl font-normal"
            style={{ color: "#0B1F33" }}
          >
            {timeValue}
          </span>
        </div>
      )}

      {/* Caption */}
      <p className="text-sm text-text-secondary text-center leading-relaxed max-w-[180px]">
        {caption}
      </p>
    </div>
  );
}
