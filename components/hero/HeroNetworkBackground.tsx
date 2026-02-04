"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";

interface Node {
  x: number;
  y: number;
  vx: number; // Velocity X for drift
  vy: number; // Velocity Y for drift
  baseGlow: number; // Base glow intensity
  pulsePhase: number;
  connections: number[];
}

export default function HeroNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const sweepXRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const phaseRef = useRef<"intro" | "ambient">("intro");
  const introStartTimeRef = useRef<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  // Initialize nodes after mount (SSR-safe)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Performance: clamp devicePixelRatio to max 2
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 45 : 90;

    // Resize handler
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // Generate nodes avoiding center text area
    const generateNodes = (): Node[] => {
      const nodes: Node[] = [];
      const width = container.clientWidth;
      const height = container.clientHeight;

      // Define text safe zone (center area to avoid)
      const textSafeZone = {
        left: width * 0.15,
        right: width * 0.85,
        top: height * 0.2,
        bottom: height * 0.8,
      };

      for (let i = 0; i < nodeCount; i++) {
        let x: number;
        let y: number;
        let attempts = 0;
        const maxAttempts = 50;

        // Try to place node outside text safe zone
        do {
          // Prefer left and right sides
          if (Math.random() < 0.5) {
            // Left side
            x = Math.random() * (textSafeZone.left - 50) + 20;
          } else {
            // Right side
            x = textSafeZone.right + 50 + Math.random() * (width - textSafeZone.right - 70);
          }
          y = Math.random() * height;

          attempts++;
        } while (
          attempts < maxAttempts &&
          x > textSafeZone.left &&
          x < textSafeZone.right &&
          y > textSafeZone.top &&
          y < textSafeZone.bottom
        );

        // If we couldn't avoid center, place it anyway but with lower probability
        if (attempts >= maxAttempts) {
          x = Math.random() * width;
          y = Math.random() * height;
        }

        // Slow drift velocity (very subtle)
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.12; // Very slow drift
        nodes.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseGlow: 0.6 + Math.random() * 0.3, // 0.6-0.9
          pulsePhase: Math.random() * Math.PI * 2,
          connections: [],
        });
      }

      // Precompute nearest neighbor connections (k=2 or k=3)
      const k = 2;
      nodes.forEach((node, i) => {
        const distances = nodes
          .map((other, j) => ({
            index: j,
            dist: Math.sqrt(
              Math.pow(node.x - other.x, 2) + Math.pow(node.y - other.y, 2)
            ),
          }))
          .filter((d) => d.index !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, k);

        node.connections = distances.map((d) => d.index);
      });

      return nodes;
    };

    nodesRef.current = generateNodes();

    // Initialize intro phase
    const introStartTime = performance.now();
    introStartTimeRef.current = introStartTime;
    phaseRef.current = "intro";
    const introDuration = 2200; // 2.2 seconds
    const width = container.clientWidth;
    const height = container.clientHeight;

    // GSAP timeline for ambient energy sweep (after intro)
    if (!shouldReduceMotion) {
      // Start intro sweep at left edge
      sweepXRef.current = -200;
      
      // Ambient loop timeline (starts after intro)
      const tl = gsap.timeline({ 
        repeat: -1, 
        ease: "none",
        paused: true, // Will be unpaused after intro
      });
      
      // Ambient energy sweep: left to right, then wrap with fade
      tl.to(sweepXRef, {
        current: width + 300,
        duration: 12,
        ease: "power1.inOut",
      })
        .to(sweepXRef, {
          current: -300,
          duration: 1,
          ease: "power1.in",
        })
        .to(sweepXRef, {
          current: width + 300,
          duration: 12,
          ease: "power1.inOut",
        });

      timelineRef.current = tl;
    } else {
      // Reduced motion: static position
      sweepXRef.current = width / 2;
    }

    let lastTime = performance.now();

    // Gaussian function for smooth falloff
    const gaussianInfluence = (x: number, center: number, sigma: number): number => {
      const diff = x - center;
      return Math.exp(-(diff * diff) / (2 * sigma * sigma));
    };

    // Animation loop
    const animate = (currentTime: number) => {
      if (!ctx) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
      lastTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const time = currentTime * 0.001;
      const introStartTime = introStartTimeRef.current;
      const phase = phaseRef.current;
      const introDuration = 2200;
      const introElapsed = currentTime - introStartTime;
      
      // Define text safe zone for brightness clamping
      const textSafeZone = {
        left: width * 0.15,
        right: width * 0.85,
        top: height * 0.2,
        bottom: height * 0.8,
      };

      let sweepX: number;
      let sweepY: number;
      let sweepStrength: number;
      let sigma: number; // Gaussian sigma for falloff

      // Handle intro phase
      if (phase === "intro" && !shouldReduceMotion && introElapsed < introDuration) {
        const introProgress = Math.min(introElapsed / introDuration, 1);
        
        // Sweep moves from left to right
        const startX = -200;
        const endX = width + 200;
        sweepX = startX + (endX - startX) * introProgress;
        sweepY = height * 0.45; // Slightly above mid-height
        
        // Sweep strength: high at start, eases down near end
        sweepStrength = 1 - introProgress * 0.3; // 1.0 -> 0.7
        
        // Gaussian sigma (responsive)
        sigma = isMobile ? 120 : 180;
        
        // Transition to ambient when intro completes
        if (introProgress >= 1) {
          phaseRef.current = "ambient";
          if (timelineRef.current) {
            timelineRef.current.play();
          }
        }
      } else {
        // Ambient phase (or reduced motion)
        if (phase === "intro") {
          phaseRef.current = "ambient";
        }
        sweepX = sweepXRef.current;
        sweepY = height / 2; // Center vertically
        sweepStrength = shouldReduceMotion ? 0 : 0.4; // Gentler in ambient
        sigma = isMobile ? 150 : 200; // Wider, softer band
      }

      // Update node positions (slow drift)
      if (!shouldReduceMotion) {
        nodes.forEach((node) => {
          node.x += node.vx * deltaTime * 20; // Scale for smooth movement
          node.y += node.vy * deltaTime * 20;

          // Wrap around edges
          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        });
      }

      // Draw bonds (lines) - NO FILLS, ONLY LINES
      ctx.lineWidth = 0.7;
      
      nodes.forEach((node) => {
        node.connections.forEach((connIndex) => {
          const connected = nodes[connIndex];
          
          // Calculate bond orientation
          const dx = connected.x - node.x;
          const dy = connected.y - node.y;
          const isHorizontal = Math.abs(dy) < Math.abs(dx) * 0.6;
          
          // Calculate midpoint for sweep influence
          const midX = (node.x + connected.x) / 2;
          const midY = (node.y + connected.y) / 2;
          
          // Use Gaussian falloff for smooth band effect
          const horizontalDist = Math.abs(midX - sweepX);
          const verticalDist = Math.abs(midY - sweepY);
          const horizontalInfluence = gaussianInfluence(midX, sweepX, sigma);
          const verticalInfluence = Math.max(0, 1 - verticalDist / (sigma * 1.5));
          let sweepInfluence = horizontalInfluence * verticalInfluence * sweepStrength;
          
          // During intro, emphasize horizontal bonds
          if (phase === "intro" && isHorizontal) {
            sweepInfluence *= 1.4; // Boost horizontal bonds
          }
          
          // Clamp brightness in text safe zone
          const inSafeZone = 
            midX > textSafeZone.left && 
            midX < textSafeZone.right && 
            midY > textSafeZone.top && 
            midY < textSafeZone.bottom;
          
          if (inSafeZone) {
            sweepInfluence *= 0.5; // Reduce brightness behind text
          }

          // Teal bond color with low base opacity
          const bondOpacity = 0.18 + sweepInfluence * 0.15; // 0.18-0.33
          ctx.strokeStyle = `rgba(46, 200, 180, ${bondOpacity})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connected.x, connected.y);
          ctx.stroke();
        });
      });

      // Draw energy sweep band (soft horizontal band)
      if (!shouldReduceMotion) {
        const sweepBandHeight = phase === "intro" ? 100 : 80; // Taller during intro
        const bandOpacity = phase === "intro" ? 0.2 : 0.12; // More visible during intro
        
        // Use Gaussian-based gradient for smoother falloff
        const gradient = ctx.createLinearGradient(
          sweepX - sigma * 2,
          sweepY,
          sweepX + sigma * 2,
          sweepY
        );
        
        // Create Gaussian-like stops
        const centerStop = 0.5;
        gradient.addColorStop(0, `rgba(31, 157, 143, 0)`);
        gradient.addColorStop(centerStop - 0.2, `rgba(31, 157, 143, ${bandOpacity * 0.3})`);
        gradient.addColorStop(centerStop, `rgba(31, 157, 143, ${bandOpacity})`);
        gradient.addColorStop(centerStop + 0.2, `rgba(31, 157, 143, ${bandOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(31, 157, 143, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          sweepX - sigma * 2, 
          sweepY - sweepBandHeight / 2, 
          sigma * 4, 
          sweepBandHeight
        );
      }

      // Draw nodes (atoms) with yellowish glow
      const nodeRadius = isMobile ? 1.2 : 1.8;
      const glowRadius = isMobile ? 2.5 : 3.5;

      nodes.forEach((node) => {
        // Use Gaussian falloff for smooth band effect
        const horizontalDist = Math.abs(node.x - sweepX);
        const verticalDist = Math.abs(node.y - sweepY);
        const horizontalInfluence = gaussianInfluence(node.x, sweepX, sigma);
        const verticalInfluence = Math.max(0, 1 - verticalDist / (sigma * 1.5));
        let sweepInfluence = horizontalInfluence * verticalInfluence * sweepStrength;
        
        // Clamp brightness in text safe zone
        const inSafeZone = 
          node.x > textSafeZone.left && 
          node.x < textSafeZone.right && 
          node.y > textSafeZone.top && 
          node.y < textSafeZone.bottom;
        
        if (inSafeZone) {
          sweepInfluence *= 0.5; // Reduce brightness behind text
        }

        // Subtle twinkle (no flashing) - only in ambient phase
        const twinkle = shouldReduceMotion || phase === "intro"
          ? 0
          : Math.sin(time * 0.6 + node.pulsePhase) * 0.15;

        // Glow intensity: base + sweep influence + twinkle
        const glowIntensity = Math.min(
          1,
          node.baseGlow + sweepInfluence * 0.4 + twinkle
        );

        // Draw glow halo (outer)
        ctx.globalAlpha = 0.12 * glowIntensity;
        ctx.fillStyle = "rgba(255, 214, 102, 1)";
        ctx.shadowBlur = glowRadius * 2;
        ctx.shadowColor = "rgba(255, 214, 102, 0.8)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Draw core node (inner)
        ctx.globalAlpha = 0.9 * glowIntensity;
        ctx.fillStyle = "rgba(255, 214, 102, 1)";
        ctx.shadowBlur = nodeRadius;
        ctx.shadowColor = "rgba(255, 214, 102, 0.9)";
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    lastTime = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    // Handle resize
    let lastWidth = container.clientWidth;
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      // Regenerate nodes on significant resize
      if (Math.abs(container.clientWidth - lastWidth) > 50) {
        nodesRef.current = generateNodes();
        lastWidth = container.clientWidth;
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      resizeObserver.disconnect();
    };
  }, [isMounted, shouldReduceMotion]);

  // Render nothing on server
  if (!isMounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-70"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
