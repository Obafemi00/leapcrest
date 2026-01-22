"use client";

// Client-only wave background component to prevent hydration mismatches
export default function HeroWaves() {
  return (
    <>
      {/* Horizontal wave lines - 25 lines for ocean-like effect */}
      {Array.from({ length: 25 }, (_, i) => {
        const phase = i * 0.3;
        // Calculate sine wave offsets for each segment to form a curve
        const segments = 60;
        return (
          <div
            key={i}
            className="wave-line"
            style={{
              top: `${(i / 25) * 100}%`,
              '--wave-phase': phase,
              '--line-index': i,
            } as React.CSSProperties}
            aria-hidden="true"
          >
            {/* Create wave segments - each offset vertically to form sine wave */}
            {Array.from({ length: segments }, (_, j) => {
              // Calculate sine wave offset: sin(2π * j / segments) * amplitude
              // Approximate sine values for smooth curve
              const angle = (j / segments) * Math.PI * 2;
              const baseOffset = Math.sin(angle) * 8; // 8px amplitude
              return (
                <div
                  key={j}
                  className="wave-segment"
                  style={{
                    left: `${(j / segments) * 100}%`,
                    '--segment-index': j,
                    '--base-offset': `${baseOffset}px`,
                  } as React.CSSProperties}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
}
