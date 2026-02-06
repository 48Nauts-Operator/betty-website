"use client";

import { useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

interface Particle {
  x: number;
  y: number;
  progress: number;
  speed: number;
  pathIndex: number;
  size: number;
  opacity: number;
  hue: "navy" | "teal";
}

interface ArchNode {
  x: number;
  y: number;
  radius: number;
  label: string;
  sublabel: string;
  filled: boolean;
}

const NAVY = "#2B4C7E";
const TEAL = "#3A8F85";
const TEAL_LIGHT = "#7FB5B0";
const BORDER = "#E5E9F0";
const TEXT = "#1E293B";
const TEXT_MUTED = "#94A3B8";

function getNodes(w: number, h: number): ArchNode[] {
  const cx = w / 2;
  const cy = h / 2;
  const isMobile = w < 640;
  
  // Tighter spacing on mobile to prevent overlap
  const spreadX = isMobile ? Math.min(w * 0.22, 180) : Math.min(w * 0.3, 260);
  const spreadY = isMobile ? Math.min(h * 0.22, 44) : Math.min(h * 0.28, 56);
  
  // Scale down node sizes on mobile
  const scale = isMobile ? 0.7 : 1;

  return [
    { x: cx - spreadX * 1.2, y: cy, radius: 24 * scale, label: "User", sublabel: "Query", filled: false },
    { x: cx - spreadX * 0.3, y: cy, radius: 30 * scale, label: "Betty", sublabel: "Router", filled: true },
    { x: cx + spreadX * 0.5, y: cy, radius: 26 * scale, label: "Confidence", sublabel: "Check", filled: false },
    { x: cx + spreadX * 1.2, y: cy - spreadY, radius: 22 * scale, label: "Knowledge", sublabel: "Direct · 50ms", filled: false },
    { x: cx + spreadX * 1.2, y: cy + spreadY, radius: 22 * scale, label: "LLM", sublabel: "With context", filled: false },
  ];
}

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

function getPathPoint(nodes: ArchNode[], pathIndex: number, t: number): { x: number; y: number } {
  const paths: [number, number, number, number][] = [
    [0, 0, 1, 1], // User → Betty
    [1, 1, 2, 2], // Betty → Confidence
    [2, 2, 3, 3], // Confidence → Knowledge (up)
    [2, 2, 4, 4], // Confidence → LLM (down)
  ];
  const [fromIdx, , toIdx] = paths[pathIndex];
  const from = nodes[fromIdx];
  const to = nodes[toIdx];

  if (pathIndex <= 1) {
    // Straight-ish with slight curve
    const cp1x = from.x + (to.x - from.x) * 0.4;
    const cp1y = from.y - 15;
    const cp2x = from.x + (to.x - from.x) * 0.6;
    const cp2y = to.y - 10;
    return {
      x: cubicBezier(t, from.x, cp1x, cp2x, to.x),
      y: cubicBezier(t, from.y, cp1y, cp2y, to.y),
    };
  } else if (pathIndex === 2) {
    // Curve upward to Knowledge
    const cp1x = from.x + (to.x - from.x) * 0.3;
    const cp1y = from.y - 40;
    const cp2x = from.x + (to.x - from.x) * 0.7;
    const cp2y = to.y + 10;
    return {
      x: cubicBezier(t, from.x, cp1x, cp2x, to.x),
      y: cubicBezier(t, from.y, cp1y, cp2y, to.y),
    };
  } else {
    // Curve downward to LLM
    const cp1x = from.x + (to.x - from.x) * 0.3;
    const cp1y = from.y + 40;
    const cp2x = from.x + (to.x - from.x) * 0.7;
    const cp2y = to.y - 10;
    return {
      x: cubicBezier(t, from.x, cp1x, cp2x, to.x),
      y: cubicBezier(t, from.y, cp1y, cp2y, to.y),
    };
  }
}

function createParticle(pathIndex: number): Particle {
  return {
    x: 0,
    y: 0,
    progress: Math.random(),
    speed: 0.0015 + Math.random() * 0.0025,
    pathIndex,
    size: 1.8 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.5,
    hue: pathIndex >= 2 ? "teal" : "navy",
  };
}

export function ArchitectureDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });
  const dprRef = useRef(1);

  const init = useCallback(() => {
    const particles: Particle[] = [];
    for (let i = 0; i < 12; i++) particles.push(createParticle(0));
    for (let i = 0; i < 12; i++) particles.push(createParticle(1));
    for (let i = 0; i < 10; i++) particles.push(createParticle(2));
    for (let i = 0; i < 6; i++) particles.push(createParticle(3));
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    init();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [init]);

  useEffect(() => {
    if (!inView) {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dpr = dprRef.current;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodes = getNodes(w, h);

      // Draw paths
      for (let pi = 0; pi < 4; pi++) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(229, 233, 240, 0.5)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 50; i++) {
          const t = i / 50;
          const { x, y } = getPathPoint(nodes, pi, t);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Update & draw particles
      for (const p of particlesRef.current) {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.speed = 0.0015 + Math.random() * 0.0025;
        }

        const { x, y } = getPathPoint(nodes, p.pathIndex, p.progress);
        p.x = x;
        p.y = y;

        let alpha = p.opacity;
        if (p.progress < 0.1) alpha *= p.progress / 0.1;
        if (p.progress > 0.9) alpha *= (1 - p.progress) / 0.1;

        // Glow
        ctx.beginPath();
        ctx.arc(x, y, p.size + 3, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "navy"
            ? `rgba(43, 76, 126, ${alpha * 0.12})`
            : `rgba(58, 143, 133, ${alpha * 0.12})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === "navy" ? NAVY : TEAL;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw nodes
      for (const node of nodes) {
        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = node.filled
          ? "rgba(43, 76, 126, 0.06)"
          : "rgba(229, 233, 240, 0.4)";
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        if (node.filled) {
          ctx.fillStyle = NAVY;
          ctx.fill();
          ctx.shadowColor = "rgba(43, 76, 126, 0.2)";
          ctx.shadowBlur = 16;
          ctx.fill();
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.strokeStyle = BORDER;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.filled ? "#FFFFFF" : TEAL_LIGHT;
        ctx.fill();

        // Label - scale font size for mobile
        const isMobileView = w < 640;
        const labelSize = isMobileView ? (node.filled ? 10 : 9) : (node.filled ? 13 : 11);
        const sublabelSize = isMobileView ? 7 : 9;
        const labelOffset = isMobileView ? 14 : 18;
        const sublabelOffset = isMobileView ? 24 : 30;
        
        ctx.font = `600 ${labelSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = node.filled ? NAVY : TEXT;
        ctx.fillText(node.label, node.x, node.y + node.radius + labelOffset);

        // Sublabel
        ctx.font = `400 ${sublabelSize}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = TEXT_MUTED;
        ctx.fillText(node.sublabel, node.x, node.y + node.radius + sublabelOffset);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [inView]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="text-center mb-8">
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
              Architecture
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
              Knowledge-first routing
            </h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-xl mx-auto">
              Betty answers directly when confident. Routes to an LLM with
              full context only when needed.
            </p>
          </div>
        </ScrollReveal>

        <div
          ref={containerRef}
          className="relative w-full h-[280px] sm:h-[260px] md:h-[300px]"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
