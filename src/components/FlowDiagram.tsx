"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";

/**
 * FlowDiagram — Knowledge-First Architecture visualization.
 *
 * Vertical flow: Query → Knowledge Graph (3 search types) →
 * Confidence Score → 3 routing paths (HIGH/MED/LOW).
 *
 * Animated sequence loops continuously with particle trails,
 * matching KnowledgeField's visual language.
 */

// ─── Palette ────────────────────────────────────────────

const C = {
  navy: "43, 76, 126",
  navyHex: "#2B4C7E",
  navyDark: "#1E3A5F",
  teal: "58, 143, 133",
  tealHex: "#3A8F85",
  accent: "127, 181, 176",
  accentHex: "#7FB5B0",
  green: "34, 197, 94",
  greenHex: "#22C55E",
  amber: "245, 158, 11",
  amberHex: "#F59E0B",
  slate: "148, 163, 184",
  slateHex: "#94A3B8",
  text: "#1E293B",
  textSec: "#64748B",
  textTri: "#94A3B8",
  border: "#E5E9F0",
  surface: "#F5F7FA",
  white: "#FFFFFF",
};

// ─── Layout computation ─────────────────────────────────

interface Layout {
  cx: number;
  // Y positions
  queryY: number;
  kgTop: number;
  kgBot: number;
  searchY: number;
  confY: number;
  routeY: number;
  metricsY: number;
  // Knowledge graph box
  kgLeft: number;
  kgRight: number;
  // Route paths x positions
  highX: number;
  medX: number;
  lowX: number;
  pathSpread: number;
}

function computeLayout(w: number, h: number): Layout {
  const cx = w / 2;
  const spread = Math.min(w * 0.28, 200);

  return {
    cx,
    queryY: h * 0.06,
    kgTop: h * 0.16,
    kgBot: h * 0.42,
    searchY: h * 0.30,
    confY: h * 0.52,
    routeY: h * 0.68,
    metricsY: h * 0.82,
    kgLeft: cx - Math.min(w * 0.35, 240),
    kgRight: cx + Math.min(w * 0.35, 240),
    highX: cx - spread,
    medX: cx,
    lowX: cx + spread,
    pathSpread: spread,
  };
}

// ─── Helpers ────────────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// Particle along a vertical/curved path
interface FlowParticle {
  progress: number;
  speed: number;
  size: number;
  opacity: number;
}

// ─── Component ──────────────────────────────────────────

export function FlowDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const dprRef = useRef(1);
  const timeRef = useRef(0);
  const inView = useInView(containerRef, { once: false, margin: "-80px" });
  // Particles for each path segment
  const queryParticles = useRef<FlowParticle[]>([]);
  const highParticles = useRef<FlowParticle[]>([]);
  const medParticles = useRef<FlowParticle[]>([]);
  const lowParticles = useRef<FlowParticle[]>([]);

  // Cycle state: which path is "active" this cycle
  const cycleRef = useRef(0);
  const activePathRef = useRef(0); // 0=high,1=med,2=low

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    dprRef.current = window.devicePixelRatio || 1;

    const initParticles = () => {
      const make = (count: number): FlowParticle[] =>
        Array.from({ length: count }, () => ({
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          size: 1.5 + Math.random() * 1.5,
          opacity: 0.2 + Math.random() * 0.4,
        }));
      queryParticles.current = make(8);
      highParticles.current = make(10);
      medParticles.current = make(5);
      lowParticles.current = make(3);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = dprRef.current;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    initParticles();

    const obs = new ResizeObserver(resize);
    obs.observe(container);
    return () => obs.disconnect();
  }, []);

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
      const t = timeRef.current;
      timeRef.current += 1;

      // Cycle: change active path every ~5s
      const cycleLen = 300;
      const cycle = Math.floor(t / cycleLen);
      if (cycle !== cycleRef.current) {
        cycleRef.current = cycle;
        // Weighted: HIGH 60%, MED 25%, LOW 15%
        const r = Math.random();
        activePathRef.current = r < 0.6 ? 0 : r < 0.85 ? 1 : 2;
      }
      const activePath = activePathRef.current;
      // Phase within cycle 0-1
      const cyclePhase = (t % cycleLen) / cycleLen;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const L = computeLayout(w, h);

      // ═══════════════════════════════════════════
      // DRAW STATIC STRUCTURE
      // ═══════════════════════════════════════════

      // ── Query node at top ──
      const queryPulse = 0.6 + Math.sin(t * 0.04) * 0.15;
      ctx.beginPath();
      ctx.arc(L.cx, L.queryY, 18, 0, Math.PI * 2);
      ctx.fillStyle = C.white;
      ctx.fill();
      ctx.strokeStyle = `rgba(${C.navy}, 0.3)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Query glow when active
      if (cyclePhase < 0.2) {
        const glow = (1 - cyclePhase / 0.2) * 0.15;
        ctx.beginPath();
        ctx.arc(L.cx, L.queryY, 24, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C.navy}, ${glow})`;
        ctx.fill();
      }

      ctx.font = `600 11px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = C.navyHex;
      ctx.fillText("Query", L.cx, L.queryY);

      // ── Connector: query → KG box ──
      ctx.beginPath();
      ctx.moveTo(L.cx, L.queryY + 18);
      ctx.lineTo(L.cx, L.kgTop);
      ctx.strokeStyle = `rgba(${C.navy}, 0.12)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Knowledge Graph box ──
      const kgW = L.kgRight - L.kgLeft;
      const kgH = L.kgBot - L.kgTop;

      // Box glow when active
      const kgGlow =
        cyclePhase > 0.08 && cyclePhase < 0.45
          ? Math.min(1, (cyclePhase - 0.08) / 0.1) *
            Math.min(1, (0.45 - cyclePhase) / 0.1)
          : 0;

      if (kgGlow > 0) {
        roundRect(ctx, L.kgLeft - 4, L.kgTop - 4, kgW + 8, kgH + 8, 16);
        ctx.fillStyle = `rgba(${C.navy}, ${kgGlow * 0.04})`;
        ctx.fill();
      }

      // Box bg
      roundRect(ctx, L.kgLeft, L.kgTop, kgW, kgH, 12);
      ctx.fillStyle = C.white;
      ctx.fill();
      ctx.strokeStyle = kgGlow > 0
        ? `rgba(${C.navy}, ${0.15 + kgGlow * 0.2})`
        : `rgba(${C.navy}, 0.1)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // KG title
      ctx.font = `600 12px Inter, system-ui, sans-serif`;
      ctx.fillStyle = C.navyHex;
      ctx.fillText("Betty's Knowledge Graph", L.cx, L.kgTop + 18);

      // ── 3 Search types ──
      const searchTypes = [
        "Semantic Search",
        "Full-Text Search",
        "Relationship Mapping",
      ];
      const searchSpacing = kgW / 4;
      const searchStartX = L.kgLeft + searchSpacing * 0.55;

      for (let i = 0; i < 3; i++) {
        const sx = searchStartX + i * searchSpacing;
        const sy = L.searchY;

        // Pulse animation: left→right wave
        let pulse = 0;
        if (cyclePhase > 0.12 && cyclePhase < 0.4) {
          const pStart = 0.12 + i * 0.06;
          const pEnd = pStart + 0.12;
          if (cyclePhase > pStart && cyclePhase < pEnd) {
            pulse = Math.sin(
              ((cyclePhase - pStart) / (pEnd - pStart)) * Math.PI
            );
          }
        }

        // Search type pill
        ctx.font = `500 9px 'JetBrains Mono', monospace`;
        const tw = ctx.measureText(searchTypes[i]).width;
        const pillW = tw + 16;
        const pillH = 22;

        roundRect(ctx, sx - pillW / 2, sy - pillH / 2, pillW, pillH, 6);
        ctx.fillStyle =
          pulse > 0
            ? `rgba(${C.navy}, ${0.04 + pulse * 0.08})`
            : `rgba(${C.navy}, 0.04)`;
        ctx.fill();
        ctx.strokeStyle =
          pulse > 0
            ? `rgba(${C.navy}, ${0.12 + pulse * 0.3})`
            : `rgba(${C.navy}, 0.08)`;
        ctx.lineWidth = 0.75;
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle =
          pulse > 0
            ? `rgba(${C.navy}, ${0.6 + pulse * 0.35})`
            : C.textSec;
        ctx.fillText(searchTypes[i], sx, sy);

        // Pulse glow
        if (pulse > 0.1) {
          ctx.beginPath();
          ctx.arc(sx, sy, 20, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${C.navy}, ${pulse * 0.05})`;
          ctx.fill();
        }
      }

      // ── 47K+ items indicator ──
      ctx.font = `600 9px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.fillStyle = C.textTri;
      ctx.fillText("47K+ knowledge items", L.cx, L.kgBot - 12);

      // ── Connector: KG box → Confidence ──
      ctx.beginPath();
      ctx.moveTo(L.cx, L.kgBot);
      ctx.lineTo(L.cx, L.confY - 16);
      ctx.strokeStyle = `rgba(${C.navy}, 0.12)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // ── Confidence Score ──
      // Determine score based on active path
      const confLabel =
        activePath === 0
          ? "92%"
          : activePath === 1
          ? "68%"
          : "34%";
      const confColor =
        activePath === 0
          ? C.green
          : activePath === 1
          ? C.amber
          : C.slate;
      const confColorHex =
        activePath === 0
          ? C.greenHex
          : activePath === 1
          ? C.amberHex
          : C.slateHex;

      // Confidence glow when active
      let confGlow = 0;
      if (cyclePhase > 0.35 && cyclePhase < 0.6) {
        confGlow =
          Math.min(1, (cyclePhase - 0.35) / 0.08) *
          Math.min(1, (0.6 - cyclePhase) / 0.1);
      }

      // Bar background
      const barW = Math.min(160, kgW * 0.5);
      const barH = 6;
      roundRect(ctx, L.cx - barW / 2, L.confY + 6, barW, barH, 3);
      ctx.fillStyle = `rgba(${C.navy}, 0.06)`;
      ctx.fill();

      // Bar fill
      const fillFrac =
        activePath === 0 ? 0.92 : activePath === 1 ? 0.68 : 0.34;
      const barFillW = barW * fillFrac;
      if (cyclePhase > 0.38) {
        const fillPhase = Math.min(1, (cyclePhase - 0.38) / 0.12);
        roundRect(
          ctx,
          L.cx - barW / 2,
          L.confY + 6,
          barFillW * fillPhase,
          barH,
          3
        );
        ctx.fillStyle = `rgba(${confColor}, ${0.4 + confGlow * 0.3})`;
        ctx.fill();
      }

      ctx.font = `700 13px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle =
        confGlow > 0
          ? confColorHex
          : C.textSec;
      ctx.fillText("Confidence: " + confLabel, L.cx, L.confY - 4);

      // ── Three routing paths ──
      const paths = [
        {
          x: L.highX,
          label: "Direct Answer",
          range: "HIGH >85%",
          time: "50ms",
          cost: "$0.00",
          color: C.green,
          colorHex: C.greenHex,
          particles: highParticles.current,
          weight: 3,
        },
        {
          x: L.medX,
          label: "Betty + LLM Verify",
          range: "MED 50-85%",
          time: "~500ms",
          cost: "~$0.001",
          color: C.amber,
          colorHex: C.amberHex,
          particles: medParticles.current,
          weight: 1.5,
        },
        {
          x: L.lowX,
          label: "LLM + Full Context",
          range: "LOW <50%",
          time: "1-3s",
          cost: "~$0.003",
          color: C.slate,
          colorHex: C.slateHex,
          particles: lowParticles.current,
          weight: 1,
        },
      ];

      // Connectors: confidence → each path
      for (let i = 0; i < 3; i++) {
        const p = paths[i];
        const isActive = i === activePath;

        // Curve from confidence to route card
        ctx.beginPath();
        ctx.moveTo(L.cx, L.confY + 16);
        ctx.quadraticCurveTo(
          L.cx + (p.x - L.cx) * 0.3,
          L.confY + 30,
          p.x,
          L.routeY - 28
        );
        ctx.strokeStyle = isActive
          ? `rgba(${p.color}, ${0.2 + confGlow * 0.3})`
          : `rgba(${C.navy}, 0.06)`;
        ctx.lineWidth = isActive ? 1.5 + confGlow : 0.75;
        ctx.stroke();

        // Active path glow line
        if (isActive && cyclePhase > 0.5) {
          const pathGlow = Math.min(1, (cyclePhase - 0.5) / 0.1);
          ctx.beginPath();
          ctx.moveTo(L.cx, L.confY + 16);
          ctx.quadraticCurveTo(
            L.cx + (p.x - L.cx) * 0.3,
            L.confY + 30,
            p.x,
            L.routeY - 28
          );
          ctx.strokeStyle = `rgba(${p.color}, ${pathGlow * 0.08})`;
          ctx.lineWidth = 6;
          ctx.stroke();
        }
      }

      // Route cards
      for (let i = 0; i < 3; i++) {
        const p = paths[i];
        const isActive = i === activePath;
        const cardW = Math.min(140, L.pathSpread * 0.85);
        const cardH = 72;
        const cx = p.x;
        const cy = L.routeY;

        // Card visibility: fade in when path activates
        let cardAlpha = 0.5;
        if (isActive && cyclePhase > 0.48) {
          cardAlpha = 0.5 + Math.min(0.5, (cyclePhase - 0.48) / 0.12);
        }

        // Card shadow for active
        if (isActive && cyclePhase > 0.5) {
          roundRect(
            ctx,
            cx - cardW / 2 - 1,
            cy - cardH / 2 - 1,
            cardW + 2,
            cardH + 2,
            10
          );
          ctx.fillStyle = `rgba(${p.color}, 0.06)`;
          ctx.fill();
        }

        // Card bg
        roundRect(ctx, cx - cardW / 2, cy - cardH / 2, cardW, cardH, 8);
        ctx.fillStyle = C.white;
        ctx.fill();
        ctx.strokeStyle = isActive
          ? `rgba(${p.color}, ${cardAlpha * 0.4})`
          : `rgba(${C.navy}, 0.08)`;
        ctx.lineWidth = isActive ? 1.5 : 0.75;
        ctx.stroke();

        // Range label (top)
        ctx.font = `700 8px 'JetBrains Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isActive
          ? p.colorHex
          : C.textTri;
        ctx.fillText(p.range, cx, cy - cardH / 2 + 14);

        // Separator line
        ctx.beginPath();
        ctx.moveTo(cx - cardW * 0.3, cy - cardH / 2 + 23);
        ctx.lineTo(cx + cardW * 0.3, cy - cardH / 2 + 23);
        ctx.strokeStyle = `rgba(${C.navy}, 0.06)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Label
        ctx.font = `600 10px Inter, system-ui, sans-serif`;
        ctx.fillStyle = isActive ? C.text : C.textSec;
        ctx.fillText(p.label, cx, cy - 2);

        // Metrics row (time + cost)
        // Only show when active and after phase threshold
        let metricsAlpha = 0.4;
        if (isActive && cyclePhase > 0.6) {
          metricsAlpha = 0.4 + Math.min(0.6, (cyclePhase - 0.6) / 0.1);
        }

        ctx.font = `500 8px 'JetBrains Mono', monospace`;
        ctx.fillStyle =
          isActive
            ? `rgba(${p.color}, ${metricsAlpha})`
            : C.textTri;
        ctx.fillText(p.time + " · " + p.cost, cx, cy + 16);

        // Emphasis glow for HIGH path (the differentiator)
        if (i === 0 && isActive && cyclePhase > 0.55) {
          const emphasis = Math.sin(t * 0.04) * 0.03 + 0.05;
          roundRect(
            ctx,
            cx - cardW / 2 - 3,
            cy - cardH / 2 - 3,
            cardW + 6,
            cardH + 6,
            11
          );
          ctx.fillStyle = `rgba(${C.green}, ${emphasis})`;
          ctx.fill();
        }
      }

      // ═══════════════════════════════════════════
      // ANIMATED PARTICLES along flow paths
      // ═══════════════════════════════════════════

      // Query → KG particles
      for (const p of queryParticles.current) {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.speed = 0.003 + Math.random() * 0.004;
        }
        const py = L.queryY + 18 + (L.kgTop - L.queryY - 18) * p.progress;
        let alpha = p.opacity;
        if (p.progress < 0.1) alpha *= p.progress / 0.1;
        if (p.progress > 0.85) alpha *= (1 - p.progress) / 0.15;

        ctx.beginPath();
        ctx.arc(L.cx, py, p.size + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C.navy}, ${alpha * 0.12})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(L.cx, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C.navy}, ${alpha * 0.5})`;
        ctx.fill();
      }

      // Particles on active routing path
      const ap = paths[activePath];
      const activeParticles = ap.particles;
      for (const p of activeParticles) {
        p.progress += p.speed * 0.8;
        if (p.progress >= 1) {
          p.progress = 0;
          p.speed = 0.003 + Math.random() * 0.005;
        }

        // Follow the quadratic curve from confidence to card
        const t2 = p.progress;
        const startY = L.confY + 16;
        const endY = L.routeY - 28;
        const cpX = L.cx + (ap.x - L.cx) * 0.3;
        const cpY = L.confY + 30;
        const px =
          (1 - t2) * (1 - t2) * L.cx +
          2 * (1 - t2) * t2 * cpX +
          t2 * t2 * ap.x;
        const py =
          (1 - t2) * (1 - t2) * startY +
          2 * (1 - t2) * t2 * cpY +
          t2 * t2 * endY;

        let alpha = p.opacity;
        if (p.progress < 0.1) alpha *= p.progress / 0.1;
        if (p.progress > 0.85) alpha *= (1 - p.progress) / 0.15;

        // Only show when routing is active in cycle
        if (cyclePhase > 0.45) {
          const show = Math.min(1, (cyclePhase - 0.45) / 0.1);
          alpha *= show;
        } else {
          alpha = 0;
        }

        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(px, py, p.size + 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ap.color}, ${alpha * 0.15})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ap.color}, ${alpha * 0.6})`;
          ctx.fill();
        }
      }

      // KG → Confidence particles
      for (const p of queryParticles.current) {
        // Reuse with offset
        const prog = (p.progress + 0.5) % 1;
        const py = L.kgBot + (L.confY - 16 - L.kgBot) * prog;
        let alpha = p.opacity * 0.6;
        if (prog < 0.1) alpha *= prog / 0.1;
        if (prog > 0.85) alpha *= (1 - prog) / 0.15;

        if (cyclePhase > 0.3 && cyclePhase < 0.7) {
          const show =
            Math.min(1, (cyclePhase - 0.3) / 0.08) *
            Math.min(1, (0.7 - cyclePhase) / 0.1);
          alpha *= show;
        } else {
          alpha = 0;
        }

        if (alpha > 0.01) {
          ctx.beginPath();
          ctx.arc(L.cx, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${C.navy}, ${alpha * 0.4})`;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [inView]);

  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <ScrollReveal>
          <div className="text-center mb-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[#7FB5B0] mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B]">
              Knowledge-first architecture
            </h2>
            <p className="mt-4 text-lg text-[#64748B] max-w-2xl mx-auto">
              Every query hits Betty&rsquo;s knowledge graph first. She only
              routes to an LLM when her own confidence is low — and even
              then, with full context. The result: faster answers, lower
              cost, zero data exposure.
            </p>
          </div>
        </ScrollReveal>

        <div
          ref={containerRef}
          className="relative w-full h-[520px] md:h-[560px] lg:h-[580px]"
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
