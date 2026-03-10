"use client";

import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/hooks/use-window-size";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [particlesMultiplier, setParticlesMultiplier] = useState(1.5);
  const [connectionDistance, setConnectionDistance] = useState(100);
  const [scrollProgressMultiplier, setScrollProgressMultiplier] = useState(1);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / scrollHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adjust particle multiplier based on viewport size
  // useEffect(() => {
  //   const updateParticleMultiplier = () => {
  //     const width = window.innerWidth;
  //     if (width < 640) {
  //       setParticlesMultiplier(1.2);      // Mobile: +20%
  //     } else if (width < 1024) {
  //       setParticlesMultiplier(1.5);      // Tablet: +50%
  //     } else {
  //       setParticlesMultiplier(2);        // Desktop: 2x
  //     }
  //   };
  //   updateParticleMultiplier();
  //   window.addEventListener("resize", updateParticleMultiplier);
  //   return () => window.removeEventListener("resize", updateParticleMultiplier);
  // }, []);

  // Dynamically adjust window size for canvas
  const [windowWidth, windowHeight] = useWindowSize();

  // Main animation loop with updates based on window size, particle multiplier, connection distance, and scroll progress multiplier
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = windowWidth;
    canvas.height = windowHeight;

    // Initialize particles
    const particleCount =
      Math.floor((canvas.width * canvas.height) / 20000) *
      particlesMultiplier;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 0.87)";
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [particlesMultiplier, connectionDistance, scrollProgressMultiplier, windowWidth, windowHeight]);

  // Calculate opacity based on scroll - fades out as you scroll down
  const particleOpacity = Math.min(Math.max(1 - scrollProgress, 0.2), 1);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Lighter background base */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/97 to-background/98" />
      {/* Canvas with blend mode for better visibility */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 transition-opacity duration-300 mix-blend-screen"
        style={{ opacity: particleOpacity }}
      />
    </div>
  );
}
