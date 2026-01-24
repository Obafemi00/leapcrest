"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/assets/leapcrest-hero.json";

type LottieJson = Record<string, unknown>;

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

  // TEMP debugging to determine actual imported shape
  console.log("Lottie animationData raw:", animationData);
  console.log("typeof:", typeof animationData);
  console.log("keys:", animationData && typeof animationData === "object" ? Object.keys(animationData as any) : "n/a");
  console.log("default keys:", (animationData as any)?.default && typeof (animationData as any).default === "object"
    ? Object.keys((animationData as any).default)
    : "n/a");

  // Normalize the import result before validation
  const normalizedAnimationData =
    (animationData as any)?.v ? animationData :
    (animationData as any)?.default?.v ? (animationData as any).default :
    null;

  // Validate ONLY the normalized object
  if (!normalizedAnimationData) {
    console.error("Lottie animationData is null/invalid import shape");
    return null;
  }

  if (!isValidLottieJson(normalizedAnimationData)) {
    console.error("Invalid Lottie JSON after normalization. keys=", Object.keys(normalizedAnimationData));
    return null;
  }

  const opacityClass = useMemo(
    () => "opacity-[0.15] md:opacity-[0.32]",
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Lottie layer */}
      <div className={`absolute inset-0 ${opacityClass}`}>
        <Lottie
          animationData={normalizedAnimationData}
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
