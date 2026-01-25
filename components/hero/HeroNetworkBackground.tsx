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

    // GSAP timeline for energy sweep
    if (!shouldReduceMotion) {
      const tl = gsap.timeline({ repeat: -1, ease: "none" });
      
      // Energy sweep: left to right, then wrap with fade
      tl.to(sweepXRef, {
        current: container.clientWidth + 300,
        duration: 10,
        ease: "power1.inOut",
      })
        .to(sweepXRef, {
          current: -300,
          duration: 0.8,
          ease: "power1.in",
        })
        .to(sweepXRef, {
          current: container.clientWidth + 300,
          duration: 10,
          ease: "power1.inOut",
        });

      timelineRef.current = tl;
    } else {
      // Reduced motion: static position
      sweepXRef.current = container.clientWidth / 2;
    }

    let lastTime = performance.now();

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
      const sweepX = sweepXRef.current;
      const sweepY = height / 2; // Center vertically
      const sweepRadius = 180; // Distance for illumination effect (soft band)
      const time = currentTime * 0.001;

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
          
          // Calculate midpoint for sweep influence
          const midX = (node.x + connected.x) / 2;
          const midY = (node.y + connected.y) / 2;
          const distToSweep = Math.sqrt(
            Math.pow(midX - sweepX, 2) + Math.pow(midY - sweepY, 2)
          );
          const sweepInfluence = Math.max(0, 1 - distToSweep / sweepRadius);

          // Teal bond color with low base opacity
          const bondOpacity = 0.18 + sweepInfluence * 0.12; // 0.18-0.30
          ctx.strokeStyle = `rgba(46, 200, 180, ${bondOpacity})`;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connected.x, connected.y);
          ctx.stroke();
        });
      });

      // Draw energy sweep band (soft horizontal band)
      if (!shouldReduceMotion) {
        const sweepBandHeight = 80; // Soft band height
        const gradient = ctx.createRadialGradient(
          sweepX,
          sweepY,
          0,
          sweepX,
          sweepY,
          sweepRadius
        );
        gradient.addColorStop(0, "rgba(31, 157, 143, 0.15)");
        gradient.addColorStop(0.5, "rgba(31, 157, 143, 0.08)");
        gradient.addColorStop(1, "rgba(31, 157, 143, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(sweepX - sweepRadius, sweepY - sweepBandHeight / 2, sweepRadius * 2, sweepBandHeight);
      }

      // Draw nodes (atoms) with yellowish glow
      const nodeRadius = isMobile ? 1.2 : 1.8;
      const glowRadius = isMobile ? 2.5 : 3.5;

      nodes.forEach((node) => {
        // Calculate distance from sweep band
        const distToSweep = Math.sqrt(
          Math.pow(node.x - sweepX, 2) + Math.pow(node.y - sweepY, 2)
        );
        const sweepInfluence = Math.max(0, 1 - distToSweep / sweepRadius);

        // Subtle twinkle (no flashing)
        const twinkle = shouldReduceMotion
          ? 0
          : Math.sin(time * 0.6 + node.pulsePhase) * 0.15;

        // Glow intensity: base + sweep influence + twinkle
        const glowIntensity = Math.min(
          1,
          node.baseGlow + sweepInfluence * 0.3 + twinkle
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
