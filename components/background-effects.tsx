"use client";

import { useWindowSize } from "@/hooks/use-window-size";
import { calculateFrameInterval, calculateRefreshRate } from "@/lib/framerate-utils";
import { ParticleSettings } from "@/lib/particle-settings";
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// Spatial partitioning grid for efficient collision detection
class SpatialGrid {
  cellSize: number;
  grid: Map<string, Particle[]>;
  width: number;
  height: number;

  constructor(width: number, height: number, cellSize: number) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.grid = new Map();
  }

  getCellKey(x: number, y: number): string {
    const gridX = Math.floor(x / this.cellSize);
    const gridY = Math.floor(y / this.cellSize);
    return `${gridX},${gridY}`;
  }

  insert(particle: Particle): void {
    const key = this.getCellKey(particle.x, particle.y);
    if (!this.grid.has(key)) {
      this.grid.set(key, []);
    }
    this.grid.get(key)!.push(particle);
  }

  getNearby(particle: Particle): Particle[] {
    const gridX = Math.floor(particle.x / this.cellSize);
    const gridY = Math.floor(particle.y / this.cellSize);
    const nearby: Particle[] = [];

    // Check all 9 cells (center + 8 neighbors)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const key = `${gridX + dx},${gridY + dy}`;
        const cells = this.grid.get(key);
        if (cells) {
          nearby.push(...cells);
        }
      }
    }
    return nearby;
  }

  clear(): void {
    this.grid.clear();
  }
}

export function BackgroundEffects({ settings }: { settings: ParticleSettings; }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastUpdateTimeRef = useRef(0);
  const spatialGridRef = useRef<SpatialGrid | null>(null);
  const refreshRateRef = useRef(60);
  const lastHeightRef = useRef(0);


  const [windowWidth, windowHeight] = useWindowSize();

  // Initialize lastHeightRef on mount
  useEffect(() => {
    lastHeightRef.current = window.innerHeight;
  }, []);

  // Calculate refresh rate once on mount
  useEffect(() => {
    calculateRefreshRate().then((rate) => {
      refreshRateRef.current = rate;
      console.log(`Calculated refresh rate: ${rate} FPS, frame interval: ${calculateFrameInterval(rate)} ms`);
    });
  }, []);

  // Track scroll progress with proper throttling
  const scrollFrameRateInterval = calculateFrameInterval(refreshRateRef.current);
  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastUpdateTimeRef.current < scrollFrameRateInterval) return;
      lastUpdateTimeRef.current = now;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollFrameRateInterval]);

  // Main animation loop with updates based on window size, particle multiplier, connection distance, and scroll progress multiplier
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = windowWidth;
    canvas.height = windowHeight;

    // Check if we should reset particles
    const lastHeight = lastHeightRef.current;
    const heightDiff = lastHeight - windowHeight;

    // Reset particles if:
    // 1. Height increased (likely real resize or orientation change)
    // 2. Height decreased by more than 50px (real resize, not just urlbar)
    // Skip reset if height decreased by less than 50px (browser UI changes)
    const shouldResetParticles =
      particlesRef.current.length === 0 || // First init
      windowHeight > lastHeight || // Height grew
      (windowHeight < lastHeight && heightDiff > 50); // Significant height drop

    if (shouldResetParticles) {
      const cellSize = Math.max(settings.connectionDistance * 1.5, 50);
      spatialGridRef.current = new SpatialGrid(windowWidth, windowHeight, cellSize);

      const particleCount =
        Math.floor((windowWidth * windowHeight) / 20000) *
        settings.particlesMultiplier;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        vx: (Math.random() - 0.5) * settings.particleVelocity,
        vy: (Math.random() - 0.5) * settings.particleVelocity,
        size: (Math.random() * 2 + 1 * settings.particleSize),
      }));
    } else if (spatialGridRef.current) {
      // Just update spatial grid dimensions
      spatialGridRef.current.width = windowWidth;
      spatialGridRef.current.height = windowHeight;
    }

    lastHeightRef.current = windowHeight;

    const animate = () => {
      if (!ctx || !canvas || !spatialGridRef.current) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const spatialGrid = spatialGridRef.current;

      // Clear grid and rebuild it with updated positions
      spatialGrid.clear();

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Insert into spatial grid for connection detection
        spatialGrid.insert(p);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 0.87)";
        ctx.fill();
      });

      // Draw connections using spatial partitioning
      const connectionDistSq = settings.connectionDistance * settings.connectionDistance;

      particles.forEach((p, i) => {
        const nearby = spatialGrid.getNearby(p);

        nearby.forEach((p2, j) => {
          // Only draw connection to particles that come after in the particles array to avoid duplicates
          const p2Index = particles.indexOf(p2);
          if (p2Index <= i) return;

          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < connectionDistSq && distanceSq > 0) {
            const distance = Math.sqrt(distanceSq);
            const opacity = (1 - distance / settings.connectionDistance) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [settings, windowWidth, windowHeight]);

  // Calculate opacity based on scroll - fades out as you scroll down
  const particleOpacity = Math.min(Math.max(1 - scrollProgress * settings.scrollProgressMultiplier, 0.2), 1);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Lighter background base */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/97 to-background/98" />
      {/* Canvas with blend mode for better visibility */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 mix-blend-screen"
        style={{ opacity: particleOpacity }}
      />
    </div>
  );
}
