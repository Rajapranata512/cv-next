"use client";

import React, { useEffect, useRef } from "react";
import type { QualityLevel } from "./AdaptiveQualityProvider";

type Particle = {
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
};

type MouseState = {
  x: number;
  y: number;
  radius: number;
};

const createParticle = (width: number, height: number): Particle => {
  const x = Math.random() * width;
  const y = Math.random() * height;
  return {
    x,
    y,
    size: Math.random() * 2 + 1,
    baseX: x,
    baseY: y,
    density: Math.random() * 30 + 1,
  };
};

const updateParticle = (particle: Particle, mouse: MouseState) => {
  const dx = mouse.x - particle.x;
  const dy = mouse.y - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy) || 1;
  const maxDistance = mouse.radius;

  if (distance < maxDistance) {
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * particle.density;
    const directionY = forceDirectionY * force * particle.density;
    particle.x -= directionX;
    particle.y -= directionY;
    return;
  }

  if (particle.x !== particle.baseX) {
    const pullX = particle.x - particle.baseX;
    particle.x -= pullX / 10;
  }

  if (particle.y !== particle.baseY) {
    const pullY = particle.y - particle.baseY;
    particle.y -= pullY / 10;
  }
};

const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};

const connectParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], maxDistance: number) => {
  for (let a = 0; a < particles.length; a += 1) {
    for (let b = a + 1; b < particles.length; b += 1) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacityValue = 1 - distance / maxDistance;
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
};

export const InteractiveParticles = ({ quality = "high" }: { quality?: QualityLevel }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<MouseState>({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let particles: Particle[] = [];
    let animationFrameId = 0;
    const isHigh = quality === "high";
    const linkDistance = isHigh ? 124 : 100;

    const initParticles = () => {
      const densityDivisor = isHigh ? 11000 : 23000;
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / densityDivisor);
      particles = Array.from({ length: numberOfParticles }, () =>
        createParticle(canvas.width, canvas.height),
      );
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        drawParticle(ctx, particle);
        updateParticle(particle, mouseRef.current);
      });
      connectParticles(ctx, particles, linkDistance);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    mouseRef.current.radius = isHigh ? 185 : 110;

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [quality]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[-1] opacity-50" />;
};
