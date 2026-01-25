"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";

type LottieJson = {
  v: string;
  fr: number;
  ip: number;
  op: number;
  layers: unknown[];
};

function isValidLottieJson(data: unknown): data is LottieJson {
  if (typeof data !== "object" || data === null) return false;
  const x = data as any;
  return (
    typeof x.v === "string" &&
    typeof x.fr === "number" &&
    typeof x.ip === "number" &&
    typeof x.op === "number" &&
    Array.isArray(x.layers)
  );
}

export default function HeroLottieBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [animationData, setAnimationData] = useState<LottieJson | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Fetch Lottie JSON from public directory
    fetch("/lottie/leapcrest-hero.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch Lottie JSON: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        // Validate required keys exist
        if (isValidLottieJson(json)) {
          setAnimationData(json);
        } else {
          console.error("Invalid Lottie JSON: missing required keys (v, fr, ip, op, layers)");
          setHasError(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load Lottie animation:", err);
        setHasError(true);
      });
  }, []);

  // Render nothing on server or if there's an error
  if (hasError || !animationData) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Lottie layer */}
      <div className="absolute inset-0 opacity-[0.15] md:opacity-[0.32]">
        <Lottie
          animationData={animationData}
          loop={!shouldReduceMotion}
          autoplay={!shouldReduceMotion}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Subtle vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/65" />
    </div>
  );
}
