"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function ProblemDataVisual() {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const durationMs = 1500;

  const [t1, setT1] = useState(0); // 0 → 1
  const [t2, setT2] = useState(0); // 0 → 50
  const [t3, setT3] = useState(0); // 0 → 35
  const [t4, setT4] = useState(0); // 0.0 → 2.5
  const [done, setDone] = useState(false);

  const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

  const targets = useMemo(
    () => ({
      crore: 1,
      employableMid: 50,
      corporateMid: 35,
      years: 2.5,
    }),
    [],
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      setT1(targets.crore);
      setT2(targets.employableMid);
      setT3(targets.corporateMid);
      setT4(targets.years);
      setDone(true);
      hasAnimatedRef.current = true;
      return;
    }

    const node = panelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        let rafId = 0;
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          const p = Math.min(1, elapsed / durationMs);
          const e = easeOutCubic(p);

          setT1(Math.round(targets.crore * e));
          setT2(Math.round(targets.employableMid * e));
          setT3(Math.round(targets.corporateMid * e));
          setT4(Math.round(targets.years * e * 10) / 10);

          if (p < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            setDone(true);
          }
        };

        rafId = requestAnimationFrame(tick);

        observer.disconnect();
        return () => cancelAnimationFrame(rafId);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion, targets]);

  return (
    <div className="w-full">
      <div
        ref={panelRef}
        className="w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1F33] to-[#061423] px-8 py-10 md:px-10 md:py-12 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Tile 1 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {done ? "1 Crore+" : `${t1}`}
            </div>
            <div className="mt-3 text-sm text-white/70 leading-relaxed">
              graduates enter the Indian workforce every year
            </div>
          </div>

          {/* Tile 2 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {done ? "50%" : `${t2}%`}
            </div>
            <div className="mt-3 text-sm text-white/70 leading-relaxed">
              considered employable beyond basic clerical work
            </div>
          </div>

          {/* Tile 3 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {done ? "35%" : `${t3}%`}
            </div>
            <div className="mt-3 text-sm text-white/70 leading-relaxed">
              employable for white-collar / corporate roles
            </div>
          </div>

          {/* Tile 4 */}
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {done ? "2.5 years" : `${t4.toFixed(1)} years`}
            </div>
            <div className="mt-3 text-sm text-white/70 leading-relaxed">
              average time for a fresh graduate to become productive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
