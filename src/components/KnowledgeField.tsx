"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * KnowledgeField — Neural mesh with signal routing & knowledge crystallization.
 *
 * Structured network with signal pulses routing through edges.
 * When signals activate all nodes of a triangle, the loop closes
 * and a "knowledge item" crystallizes — hexagon assembles, label appears.
 */

// ─── Types ──────────────────────────────────────────────

interface MeshNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  neighbors: number[];
  isHub: boolean;
  activation: number;
  radius: number;
}

interface Edge {
  from: number;
  to: number;
  brightness: number;
}

interface Signal {
  edgeIndex: number;
  progress: number;
  speed: number;
  fromNode: number;
  toNode: number;
  color: "navy" | "teal";
  intensity: number;
  trail: { x: number; y: number; age: number }[];
}

interface Triangle {
  nodes: [number, number, number];
  edges: [number, number, number];
}

interface Crystallization {
  triangle: Triangle;
  phase: number;
  label: string;
  color: "navy" | "teal";
  cx: number;
  cy: number;
}

// ─── Constants ──────────────────────────────────────────

const COLORS = {
  navy: { r: 43, g: 76, b: 126 },
  teal: { r: 58, g: 143, b: 133 },
  accent: { r: 127, g: 181, b: 176 },
};

const MAX_SIGNALS = 20;
const SIGNAL_SPAWN_RATE = 0.03;
const TRAIL_LENGTH = 24;
const CRYSTAL_DURATION = 260; // ~4.3s at 60fps
const CRYSTAL_COOLDOWN = 180; // ~3s between crystals
const FORCED_CRYSTAL_INTERVAL = 360; // force one every ~6s if none organic
const ACTIVATION_THRESHOLD = 0.12;

const KNOWLEDGE_LABELS = [
  "Authentication Flow",
  "Patient Protocol",
  "Deployment Pipeline",
  "Legal Precedent",
  "Equipment Diagnostic",
  "API Architecture",
  "Decision Rationale",
  "Compliance Matrix",
  "Repair Sequence",
  "Code Pattern",
  "Contract Analysis",
  "Incident Response",
  "Onboarding Procedure",
  "Audit Trail",
  "Treatment History",
  "System Architecture",
];

// ─── Helpers ────────────────────────────────────────────

function drawHexagon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  rotation: number
) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i + rotation;
    const hx = cx + size * Math.cos(angle);
    const hy = cy + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
}

function drawRoundedRect(
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

// ─── Component ──────────────────────────────────────────

export function KnowledgeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<MeshNode[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const trianglesRef = useRef<Triangle[]>([]);
  const crystalsRef = useRef<Crystallization[]>([]);
  const lastCrystalRef = useRef(-200); // negative so first one can trigger early
  const animRef = useRef<number>(0);
  const dprRef = useRef(1);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const sizeRef = useRef({ w: 0, h: 0 });

  // ─── Build mesh & find triangles ───

  const buildMesh = useCallback((w: number, h: number) => {
    sizeRef.current = { w, h };
    const nodes: MeshNode[] = [];
    const edges: Edge[] = [];

    const cols = Math.floor(w / 80) + 2;
    const rows = Math.floor(h / 80) + 2;
    const cellW = w / (cols - 1);
    const cellH = h / (rows - 1);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const jitterX = (Math.random() - 0.5) * cellW * 0.55;
        const jitterY = (Math.random() - 0.5) * cellH * 0.55;
        const isHub = Math.random() < 0.12;
        nodes.push({
          baseX: col * cellW + jitterX,
          baseY: row * cellH + jitterY,
          x: col * cellW + jitterX,
          y: row * cellH + jitterY,
          neighbors: [],
          isHub,
          activation: 0,
          radius: isHub ? 3.5 : 1.8,
        });
      }
    }

    const maxDist = Math.max(cellW, cellH) * 1.6;
    const edgeSet = new Set<string>();
    const adjMap: Map<number, Set<number>> = new Map();

    for (let i = 0; i < nodes.length; i++) {
      const dists: { idx: number; dist: number }[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].baseX - nodes[j].baseX;
        const dy = nodes[i].baseY - nodes[j].baseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) dists.push({ idx: j, dist: d });
      }
      dists.sort((a, b) => a.dist - b.dist);

      const maxConn = nodes[i].isHub ? 6 : 3 + Math.floor(Math.random() * 2);
      for (let k = 0; k < Math.min(maxConn, dists.length); k++) {
        const j = dists[k].idx;
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          const ei = edges.length;
          edges.push({ from: i, to: j, brightness: 0 });
          nodes[i].neighbors.push(ei);
          nodes[j].neighbors.push(ei);
          if (!adjMap.has(i)) adjMap.set(i, new Set());
          if (!adjMap.has(j)) adjMap.set(j, new Set());
          adjMap.get(i)!.add(j);
          adjMap.get(j)!.add(i);
        }
      }
    }

    // Find all triangles
    const triangles: Triangle[] = [];
    const triSet = new Set<string>();

    for (let a = 0; a < nodes.length; a++) {
      const na = adjMap.get(a);
      if (!na) continue;
      for (const b of na) {
        if (b <= a) continue;
        const nb = adjMap.get(b);
        if (!nb) continue;
        for (const c of nb) {
          if (c <= b) continue;
          if (na.has(c)) {
            const triKey = `${a}-${b}-${c}`;
            if (!triSet.has(triKey)) {
              triSet.add(triKey);
              const findEdge = (n1: number, n2: number) =>
                edges.findIndex(
                  (e) =>
                    (e.from === n1 && e.to === n2) ||
                    (e.from === n2 && e.to === n1)
                );
              triangles.push({
                nodes: [a, b, c],
                edges: [findEdge(a, b), findEdge(b, c), findEdge(a, c)],
              });
            }
          }
        }
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;
    trianglesRef.current = triangles;
    signalsRef.current = [];
    crystalsRef.current = [];
    lastCrystalRef.current = -200;
  }, []);

  const spawnSignal = useCallback(() => {
    const edges = edgesRef.current;
    const signals = signalsRef.current;
    if (signals.length >= MAX_SIGNALS || edges.length === 0) return;

    const edgeIndex = Math.floor(Math.random() * edges.length);
    const edge = edges[edgeIndex];
    const reverse = Math.random() > 0.5;

    signals.push({
      edgeIndex,
      progress: 0,
      speed: 0.008 + Math.random() * 0.012,
      fromNode: reverse ? edge.to : edge.from,
      toNode: reverse ? edge.from : edge.to,
      color: Math.random() > 0.4 ? "navy" : "teal",
      intensity: 0.6 + Math.random() * 0.4,
      trail: [],
    });
  }, []);

  // ─── Pick best triangle for crystallization ───

  const pickTriangle = useCallback(
    (organic: boolean): Triangle | null => {
      const nodes = nodesRef.current;
      const triangles = trianglesRef.current;
      const { w, h } = sizeRef.current;
      if (triangles.length === 0) return null;

      // Margin: avoid vignette edges
      const mx = w * 0.12;
      const my = h * 0.15;

      if (organic) {
        // Find triangles where all 3 nodes are activated
        const candidates: { tri: Triangle; score: number }[] = [];
        for (const tri of triangles) {
          const [a, b, c] = tri.nodes;
          const minAct = Math.min(
            nodes[a].activation,
            nodes[b].activation,
            nodes[c].activation
          );
          if (minAct > ACTIVATION_THRESHOLD) {
            const cx = (nodes[a].x + nodes[b].x + nodes[c].x) / 3;
            const cy = (nodes[a].y + nodes[b].y + nodes[c].y) / 3;
            if (cx > mx && cx < w - mx && cy > my && cy < h - my) {
              candidates.push({ tri, score: minAct });
            }
          }
        }
        if (candidates.length === 0) return null;
        // Pick highest-scored
        candidates.sort((a, b) => b.score - a.score);
        return candidates[0].tri;
      } else {
        // Forced: pick a random triangle in the visible area
        const visible = triangles.filter((tri) => {
          const [a, b, c] = tri.nodes;
          const cx = (nodes[a].x + nodes[b].x + nodes[c].x) / 3;
          const cy = (nodes[a].y + nodes[b].y + nodes[c].y) / 3;
          return cx > mx && cx < w - mx && cy > my && cy < h - my;
        });
        if (visible.length === 0) return null;
        return visible[Math.floor(Math.random() * visible.length)];
      }
    },
    []
  );

  // ─── Setup ───

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    dprRef.current = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = dprRef.current;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      buildMesh(rect.width, rect.height);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const handleMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleLeave = () => {
      mouseRef.current.active = false;
    };
    container.addEventListener("mousemove", handleMouse);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      observer.disconnect();
      container.removeEventListener("mousemove", handleMouse);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [buildMesh]);

  // ─── Animation loop ───

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const { w, h } = sizeRef.current;
      const dpr = dprRef.current;
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const signals = signalsRef.current;
      const crystals = crystalsRef.current;
      const mouse = mouseRef.current;
      const t = timeRef.current;

      timeRef.current += 1;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ─── Update mesh wave ───
      for (const node of nodes) {
        const wave1 =
          Math.sin(t * 0.008 + node.baseX * 0.004 + node.baseY * 0.003) * 3;
        const wave2 =
          Math.cos(t * 0.006 + node.baseY * 0.005 - node.baseX * 0.002) * 2.5;
        node.x = node.baseX + wave1;
        node.y = node.baseY + wave2;

        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 0) {
            const pull = (1 - dist / 180) * 4;
            node.x += (dx / dist) * pull;
            node.y += (dy / dist) * pull;
          }
        }

        // Slower decay so triangles can activate
        node.activation *= 0.985;
      }

      // Decay edge brightness
      for (const edge of edges) {
        edge.brightness *= 0.97;
      }

      // ─── Spawn signals ───
      if (Math.random() < SIGNAL_SPAWN_RATE) {
        spawnSignal();
      }

      // ─── Update signals ───
      const toRemove: number[] = [];
      for (let si = 0; si < signals.length; si++) {
        const sig = signals[si];
        sig.progress += sig.speed;

        const fromN = nodes[sig.fromNode];
        const toN = nodes[sig.toNode];
        const x = fromN.x + (toN.x - fromN.x) * sig.progress;
        const y = fromN.y + (toN.y - fromN.y) * sig.progress;

        sig.trail.push({ x, y, age: 0 });
        if (sig.trail.length > TRAIL_LENGTH) sig.trail.shift();

        edges[sig.edgeIndex].brightness = Math.max(
          edges[sig.edgeIndex].brightness,
          sig.intensity * 0.6
        );

        if (sig.progress >= 1) {
          nodes[sig.toNode].activation = Math.min(
            1,
            nodes[sig.toNode].activation + sig.intensity * 0.8
          );

          const nodeEdges = nodes[sig.toNode].neighbors.filter(
            (ei) => ei !== sig.edgeIndex
          );
          const chance = nodes[sig.toNode].isHub ? 0.9 : 0.65;

          if (nodeEdges.length > 0 && Math.random() < chance) {
            const branches =
              nodes[sig.toNode].isHub && Math.random() > 0.5 ? 2 : 1;
            const shuffled = nodeEdges.sort(() => Math.random() - 0.5);
            for (
              let b = 0;
              b < Math.min(branches, shuffled.length);
              b++
            ) {
              const ne = edges[shuffled[b]];
              const nFrom = sig.toNode;
              const nTo = ne.from === nFrom ? ne.to : ne.from;
              if (signals.length < MAX_SIGNALS) {
                signals.push({
                  edgeIndex: shuffled[b],
                  progress: 0,
                  speed: 0.008 + Math.random() * 0.012,
                  fromNode: nFrom,
                  toNode: nTo,
                  color: sig.color,
                  intensity: sig.intensity * (0.75 + Math.random() * 0.15),
                  trail: [],
                });
              }
            }
          }

          toRemove.push(si);
        }
      }

      for (let i = toRemove.length - 1; i >= 0; i--) {
        signals.splice(toRemove[i], 1);
      }

      for (const sig of signals) {
        for (const tp of sig.trail) tp.age += 1;
      }

      // ─── Detect crystallization ───
      const sinceLastCrystal = t - lastCrystalRef.current;

      if (sinceLastCrystal > CRYSTAL_COOLDOWN) {
        // Try organic detection first
        let tri = pickTriangle(true);

        // Fallback: force one if it's been too long
        if (!tri && sinceLastCrystal > FORCED_CRYSTAL_INTERVAL) {
          tri = pickTriangle(false);
        }

        if (tri) {
          const [ai, bi, ci] = tri.nodes;
          const cx = (nodes[ai].x + nodes[bi].x + nodes[ci].x) / 3;
          const cy = (nodes[ai].y + nodes[bi].y + nodes[ci].y) / 3;

          crystals.push({
            triangle: tri,
            phase: 0,
            label:
              KNOWLEDGE_LABELS[
                Math.floor(Math.random() * KNOWLEDGE_LABELS.length)
              ],
            color: Math.random() > 0.5 ? "navy" : "teal",
            cx,
            cy,
          });

          // Boost the triangle nodes so it looks organic even when forced
          for (const ni of tri.nodes) {
            nodes[ni].activation = Math.min(1, nodes[ni].activation + 0.5);
          }
          for (const ei of tri.edges) {
            if (ei >= 0) edges[ei].brightness = 0.8;
          }

          lastCrystalRef.current = t;
        }
      }

      // ─── Update crystallizations ───
      const crystalRemove: number[] = [];
      for (let ci = 0; ci < crystals.length; ci++) {
        crystals[ci].phase += 1 / CRYSTAL_DURATION;
        if (crystals[ci].phase >= 1) crystalRemove.push(ci);
      }
      for (let i = crystalRemove.length - 1; i >= 0; i--) {
        crystals.splice(crystalRemove[i], 1);
      }

      // ═══════════════════════════════════════════════════
      // DRAW LAYER 1: Mesh substrate
      // ═══════════════════════════════════════════════════

      // ─── Edges ───
      for (const edge of edges) {
        const a = nodes[edge.from];
        const b = nodes[edge.to];
        const total = 0.04 + edge.brightness * 0.35;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(43, 76, 126, ${total})`;
        ctx.lineWidth =
          edge.brightness > 0.1 ? 1 + edge.brightness * 0.8 : 0.5;
        ctx.stroke();
      }

      // ─── Signal trails ───
      for (const sig of signals) {
        const c = COLORS[sig.color];
        for (let i = 0; i < sig.trail.length; i++) {
          const tp = sig.trail[i];
          const trailFade = 1 - tp.age / (TRAIL_LENGTH * 1.5);
          const posFade = (i + 1) / sig.trail.length;
          const alpha = Math.max(
            0,
            trailFade * posFade * sig.intensity * 0.5
          );
          if (alpha > 0.01) {
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, 4 + posFade * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha * 0.15})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, 1 + posFade * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
            ctx.fill();
          }
        }
      }

      // ─── Signal heads ───
      for (const sig of signals) {
        const fromN = nodes[sig.fromNode];
        const toN = nodes[sig.toNode];
        const x = fromN.x + (toN.x - fromN.x) * sig.progress;
        const y = fromN.y + (toN.y - fromN.y) * sig.progress;
        const c = COLORS[sig.color];

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${sig.intensity * 0.12})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${sig.intensity * 0.3})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${sig.intensity * 0.7})`;
        ctx.fill();
      }

      // ─── Nodes ───
      for (const node of nodes) {
        const c = node.isHub ? COLORS.navy : COLORS.accent;
        const baseAlpha = node.isHub ? 0.2 : 0.08;
        const alpha = baseAlpha + node.activation * 0.5;

        if (node.isHub) {
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            node.radius + 6 + node.activation * 4,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${node.activation * 0.08})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          node.radius + node.activation * 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, ${alpha})`;
        ctx.fill();
      }

      // ═══════════════════════════════════════════════════
      // DRAW LAYER 2: Vignette
      // ═══════════════════════════════════════════════════

      const grd = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.2,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.58
      );
      grd.addColorStop(0, "rgba(255, 255, 255, 0)");
      grd.addColorStop(0.7, "rgba(255, 255, 255, 0.3)");
      grd.addColorStop(1, "rgba(255, 255, 255, 0.92)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // ═══════════════════════════════════════════════════
      // DRAW LAYER 3: Crystallization effects (ON TOP of vignette)
      // ═══════════════════════════════════════════════════

      for (const crystal of crystals) {
        const p = crystal.phase;
        const tri = crystal.triangle;
        const [ai, bi, ci] = tri.nodes;
        const na = nodes[ai];
        const nb = nodes[bi];
        const nc = nodes[ci];
        const col = COLORS[crystal.color];

        // Phase mapping:
        // 0.00–0.15: triangle edges flare, area fills
        // 0.10–0.40: hexagon assembles
        // 0.30–0.80: label visible
        // 0.60–1.00: everything fades

        // ── Triangle edge flare ──
        let edgeFlare = 0;
        if (p < 0.15) edgeFlare = p / 0.15;
        else if (p < 0.55) edgeFlare = 1;
        else edgeFlare = Math.max(0, 1 - (p - 0.55) / 0.45);

        if (edgeFlare > 0.01) {
          // Triangle area glow
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.lineTo(nc.x, nc.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${edgeFlare * 0.1})`;
          ctx.fill();

          // Bright edges
          for (const ei of tri.edges) {
            if (ei < 0) continue;
            const e = edges[ei];
            const ea = nodes[e.from];
            const eb = nodes[e.to];

            // Glow line (wide)
            ctx.beginPath();
            ctx.moveTo(ea.x, ea.y);
            ctx.lineTo(eb.x, eb.y);
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${edgeFlare * 0.15})`;
            ctx.lineWidth = 8;
            ctx.stroke();

            // Bright line
            ctx.beginPath();
            ctx.moveTo(ea.x, ea.y);
            ctx.lineTo(eb.x, eb.y);
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${edgeFlare * 0.6})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }

          // Flare at triangle vertices
          for (const ni of tri.nodes) {
            const n = nodes[ni];
            ctx.beginPath();
            ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${edgeFlare * 0.25})`;
            ctx.fill();
          }
        }

        // ── Hexagon crystallization ──
        let hexProgress = 0;
        let hexAlpha = 0;
        if (p >= 0.08 && p < 0.35) {
          hexProgress = (p - 0.08) / 0.27;
          hexAlpha = hexProgress;
        } else if (p >= 0.35 && p < 0.6) {
          hexProgress = 1;
          hexAlpha = 1;
        } else if (p >= 0.6) {
          hexProgress = 1;
          hexAlpha = Math.max(0, 1 - (p - 0.6) / 0.35);
        }

        if (hexProgress > 0 && hexAlpha > 0.01) {
          const maxSize = 14;
          const size = maxSize * hexProgress;
          const rotation = (1 - hexProgress) * Math.PI * 0.5 + p * 0.2;

          // Outer glow
          ctx.beginPath();
          ctx.arc(crystal.cx, crystal.cy, size + 12, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${hexAlpha * 0.08})`;
          ctx.fill();

          // Hex border
          drawHexagon(ctx, crystal.cx, crystal.cy, size, rotation);
          ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${hexAlpha * 0.7})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Hex fill
          drawHexagon(ctx, crystal.cx, crystal.cy, size, rotation);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${hexAlpha * 0.12})`;
          ctx.fill();

          // Inner hexagon (smaller, rotated opposite)
          if (hexProgress > 0.4) {
            const innerAlpha = hexAlpha * ((hexProgress - 0.4) / 0.6);
            drawHexagon(
              ctx,
              crystal.cx,
              crystal.cy,
              size * 0.5,
              -rotation * 0.7
            );
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${innerAlpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Center dot
          ctx.beginPath();
          ctx.arc(
            crystal.cx,
            crystal.cy,
            2.5 * hexProgress,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${hexAlpha * 0.8})`;
          ctx.fill();

          // Orbiting sparkles during assembly
          if (p < 0.5) {
            const sparkAlpha = hexAlpha * 0.6;
            for (let s = 0; s < 6; s++) {
              const angle = (Math.PI * 2 * s) / 6 + t * 0.025;
              const dist = size * 1.8 + Math.sin(t * 0.08 + s * 1.5) * 3;
              const sx = crystal.cx + Math.cos(angle) * dist;
              const sy = crystal.cy + Math.sin(angle) * dist;

              ctx.beginPath();
              ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${sparkAlpha * (0.4 + Math.sin(t * 0.1 + s) * 0.3)})`;
              ctx.fill();
            }
          }
        }

        // ── Label ──
        let labelAlpha = 0;
        if (p >= 0.25 && p < 0.4) {
          labelAlpha = (p - 0.25) / 0.15;
        } else if (p >= 0.4 && p < 0.7) {
          labelAlpha = 1;
        } else if (p >= 0.7) {
          labelAlpha = Math.max(0, 1 - (p - 0.7) / 0.25);
        }

        if (labelAlpha > 0.02) {
          const labelY = crystal.cy + 30;
          ctx.font = `500 10px 'JetBrains Mono', monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const textMetrics = ctx.measureText(crystal.label);
          const pillW = textMetrics.width + 20;
          const pillH = 22;
          const pillX = crystal.cx - pillW / 2;
          const pillY = labelY - pillH / 2;

          // Pill background
          drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 5);
          ctx.fillStyle = `rgba(255, 255, 255, ${labelAlpha * 0.92})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${labelAlpha * 0.3})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          // Label text
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${labelAlpha * 0.85})`;
          ctx.fillText(crystal.label, crystal.cx, labelY);
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [spawnSignal, pickTriangle]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
