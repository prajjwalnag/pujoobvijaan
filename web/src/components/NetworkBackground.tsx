"use client";

import { useEffect, useRef } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import { buildGraph, buildDistanceLinks, type GraphNode, type GraphLinkKind } from "@/data/graph";

interface SimNode extends SimulationNodeDatum, GraphNode {}
interface SimLink extends SimulationLinkDatum<SimNode> {
  kind: GraphLinkKind;
}

function radiusFor(node: GraphNode) {
  if (node.kind === "region") return 5;
  if (node.kind === "area") return 3;
  return 1.6;
}

// Ambient, non-interactive rendering of the same real pandal/area/region
// graph shown on /network — used as a decorative backdrop, not a duplicate
// dataset. No pointer handling, no labels; kept quiet so hero text on top
// of it stays readable.
export function NetworkBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = wrap.clientWidth;
    let height = wrap.clientHeight;

    function resize() {
      width = wrap!.clientWidth;
      height = wrap!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
    }
    resize();

    const { nodes, links: hierarchyLinks } = buildGraph();
    const distanceLinks = buildDistanceLinks();
    const allLinks = [...hierarchyLinks, ...distanceLinks];

    const simNodes: SimNode[] = nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = allLinks.map((l) => ({
      source: l.source,
      target: l.target,
      kind: l.kind,
    }));

    const simulation = forceSimulation(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((l) => {
            if (l.kind === "distance") return 10;
            const s = l.source as SimNode;
            const t = l.target as SimNode;
            if (s.kind === "region" || t.kind === "region") return 70;
            if (s.kind === "area" || t.kind === "area") return 26;
            return 14;
          })
          .strength((l) => (l.kind === "distance" ? 0.2 : 0.6))
      )
      .force("charge", forceManyBody().strength((d) => ((d as SimNode).kind === "pandal" ? -8 : -140)))
      .force("center", forceCenter(width / 2, height / 2))
      .force("collide", forceCollide<SimNode>().radius((d) => radiusFor(d) + 1))
      .alpha(1)
      .alphaDecay(0.008)
      // Never fully settles — keeps a faint perpetual drift instead of
      // freezing once the layout converges, which is the point of a
      // decorative "always alive" background.
      .alphaTarget(0.02)
      .velocityDecay(0.55);

    let raf: number;
    let destroyed = false;
    function draw() {
      if (destroyed) return;
      ctx!.save();
      ctx!.scale(dpr, dpr);
      ctx!.clearRect(0, 0, width, height);

      for (const l of simLinks) {
        const s = l.source as SimNode;
        const t = l.target as SimNode;
        if (s.x === undefined || t.x === undefined) continue;
        if (l.kind === "distance") {
          ctx!.strokeStyle = "rgba(212,160,23,0.10)";
          ctx!.lineWidth = 0.6;
        } else {
          ctx!.strokeStyle = "rgba(139,26,26,0.10)";
          ctx!.lineWidth = 0.7;
        }
        ctx!.beginPath();
        ctx!.moveTo(s.x!, s.y!);
        ctx!.lineTo(t.x!, t.y!);
        ctx!.stroke();
      }

      for (const n of simNodes) {
        if (n.x === undefined || n.y === undefined) continue;
        const r = radiusFor(n);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle =
          n.kind === "region"
            ? "rgba(139,90,0,0.35)"
            : n.kind === "area"
              ? "rgba(212,160,23,0.32)"
              : "rgba(139,26,26,0.28)";
        ctx!.fill();
      }

      ctx!.restore();
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      simulation.force("center", forceCenter(width / 2, height / 2));
    });
    resizeObserver.observe(wrap);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      simulation.stop();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`pointer-events-none h-full w-full ${className ?? ""}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
