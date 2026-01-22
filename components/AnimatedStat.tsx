"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface AnimatedStatProps {
  targetValue: number;
  suffix?: string;
  supportingText: string;
}

export default function AnimatedStat({
  targetValue,
  suffix = "",
  supportingText,
}: AnimatedStatProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(targetValue);
      return;
    }

    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out function
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(startValue + (targetValue - startValue) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, shouldReduceMotion, targetValue]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col"
    >
      <div className="mb-4">
        <span
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none"
          style={{ color: "#0B1F33" }}
        >
          {formatNumber(displayValue)}
          {suffix && (
            <span className="text-5xl md:text-6xl lg:text-7xl ml-2">
              {suffix}
            </span>
          )}
        </span>
      </div>
      <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-md">
        {supportingText}
      </p>
    </motion.div>
  );
}
