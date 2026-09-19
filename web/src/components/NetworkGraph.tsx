"use client";

import { useEffect, useRef, useState } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from "d3-force";
import { tierColor } from "@/data/tiers";
import type { GraphNode, GraphLink, GraphLinkKind } from "@/data/graph";

interface SimNode extends SimulationNodeDatum, GraphNode {}
interface SimLink extends SimulationLinkDatum<SimNode> {
  kind: GraphLinkKind;
}

const REGION_COLOR = "#8b5a00";
const AREA_COLOR = "#d4a017";

function radiusFor(node: GraphNode) {
  if (node.kind === "region") return 15 + Math.min((node.count ?? 0) / 20, 10);
  if (node.kind === "area") return 8 + Math.min((node.count ?? 0) / 4, 6);
  return node.crowdLevel === "high" ? 4.2 : node.crowdLevel === "medium" ? 3.2 : 2.6;
}

function colorFor(node: GraphNode) {
  if (node.kind === "region") return REGION_COLOR;
  if (node.kind === "area") return AREA_COLOR;
  return tierColor[node.crowdLevel ?? "medium"];
}

export function NetworkGraph({
  nodes,
  links,
  showPandals,
  showDistance,
  onSelect,
}: {
  nodes: GraphNode[];
  links: GraphLink[];
  showPandals: boolean;
  showDistance: boolean;
  onSelect: (node: GraphNode | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    simNodes: SimNode[];
    simLinks: SimLink[];
    transform: { x: number; y: number; k: number };
    hovered: SimNode | null;
    dragging: SimNode | null;
    panning: boolean;
    lastPointer: { x: number; y: number };
    selectedId: string | null;
    activePointers: Map<number, { x: number; y: number }>;
    pinchStartDist: number | null;
  }>({
    simNodes: [],
    simLinks: [],
    transform: { x: 0, y: 0, k: 1 },
    hovered: null,
    dragging: null,
    panning: false,
    lastPointer: { x: 0, y: 0 },
    selectedId: null,
    activePointers: new Map(),
    pinchStartDist: null,
  });
  const [, forceRerender] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
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

    const filteredNodes = showPandals ? nodes : nodes.filter((n) => n.kind !== "pandal");
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const filteredLinks = links.filter(
      (l) =>
        nodeIds.has(l.source) &&
        nodeIds.has(l.target) &&
        (l.kind !== "distance" || showDistance)
    );

    const simNodes: SimNode[] = filteredNodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = filteredLinks.map((l) => ({
      source: l.source,
      target: l.target,
      kind: l.kind,
    }));
    stateRef.current.simNodes = simNodes;
    stateRef.current.simLinks = simLinks;

    const simulation = forceSimulation(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((l) => {
            if (l.kind === "distance") return 14;
            const s = l.source as SimNode;
            const t = l.target as SimNode;
            if (s.kind === "region" || t.kind === "region") return 90;
            if (s.kind === "area" || t.kind === "area") return 34;
            return 20;
          })
          .strength((l) => (l.kind === "distance" ? 0.25 : 0.7))
      )
      .force("charge", forceManyBody().strength((d) => ((d as SimNode).kind === "pandal" ? -18 : -220)))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "collide",
        forceCollide<SimNode>().radius((d) => radiusFor(d) + 1.5)
      )
      .alpha(1)
      .alphaDecay(0.02);

    let raf: number;
    function draw() {
      const { transform, hovered, selectedId } = stateRef.current;
      ctx!.save();
      ctx!.scale(dpr, dpr);
      ctx!.clearRect(0, 0, width, height);
      ctx!.translate(transform.x, transform.y);
      ctx!.scale(transform.k, transform.k);

      const highlightSet: Set<string> | null = selectedId
        ? new Set(
            simLinks
              .flatMap((l) => {
                const s = (typeof l.source === "object" ? l.source.id : l.source) as string;
                const t = (typeof l.target === "object" ? l.target.id : l.target) as string;
                if (s === selectedId) return [s, t];
                if (t === selectedId) return [s, t];
                return [];
              })
          )
        : null;

      for (const l of simLinks) {
        const s = l.source as SimNode;
        const t = l.target as SimNode;
        if (s.x === undefined || t.x === undefined) continue;
        const dim = highlightSet && !(highlightSet.has(s.id) && highlightSet.has(t.id));
        if (l.kind === "distance") {
          ctx!.setLineDash([3 / transform.k, 3 / transform.k]);
          ctx!.lineWidth = 0.9 / transform.k;
          ctx!.strokeStyle = dim ? "rgba(74,144,217,0.08)" : "rgba(74,144,217,0.55)";
        } else {
          ctx!.setLineDash([]);
          ctx!.lineWidth = 1 / transform.k;
          ctx!.strokeStyle = dim ? "rgba(160,148,136,0.15)" : "rgba(160,148,136,0.55)";
        }
        ctx!.beginPath();
        ctx!.moveTo(s.x!, s.y!);
        ctx!.lineTo(t.x!, t.y!);
        ctx!.stroke();
      }
      ctx!.setLineDash([]);

      for (const n of simNodes) {
        if (n.x === undefined || n.y === undefined) continue;
        const r = radiusFor(n);
        const dim = highlightSet && !highlightSet.has(n.id) && n.id !== selectedId;
        ctx!.globalAlpha = dim ? 0.18 : 1;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = colorFor(n);
        ctx!.fill();
        if (n.kind !== "pandal") {
          ctx!.lineWidth = 1.5 / transform.k;
          ctx!.strokeStyle = "#fff";
          ctx!.stroke();
        }
        if (n.id === selectedId) {
          ctx!.lineWidth = 2 / transform.k;
          ctx!.strokeStyle = "#2a1a1a";
          ctx!.stroke();
        }
        ctx!.globalAlpha = 1;
      }

      if (hovered && hovered.x !== undefined && hovered.y !== undefined) {
        const r = radiusFor(hovered);
        ctx!.font = `${12 / transform.k}px sans-serif`;
        const label = hovered.label;
        const pad = 5 / transform.k;
        const tw = ctx!.measureText(label).width;
        ctx!.fillStyle = "rgba(42,26,26,0.92)";
        ctx!.fillRect(hovered.x + r + 4, hovered.y - 10, tw + pad * 2, 18 / transform.k);
        ctx!.fillStyle = "#fff";
        ctx!.fillText(label, hovered.x + r + 4 + pad, hovered.y + 3);
      }

      ctx!.restore();
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    function toWorld(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      const { transform } = stateRef.current;
      const x = (clientX - rect.left - transform.x) / transform.k;
      const y = (clientY - rect.top - transform.y) / transform.k;
      return { x, y };
    }

    function findNode(x: number, y: number) {
      for (let i = simNodes.length - 1; i >= 0; i--) {
        const n = simNodes[i];
        if (n.x === undefined || n.y === undefined) continue;
        const r = radiusFor(n) + 2;
        if ((n.x - x) ** 2 + (n.y - y) ** 2 <= r * r) return n;
      }
      return null;
    }

    function pointerDist(pts: { x: number; y: number }[]) {
      return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
    }

    function onPointerDown(e: PointerEvent) {
      const { activePointers } = stateRef.current;
      activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      try {
        canvas!.setPointerCapture(e.pointerId);
      } catch {
        // Ignorable — can race with a second finger's own capture on some
        // touchscreens during a fast pinch start.
      }

      if (activePointers.size >= 2) {
        // Second finger landed — switch to pinch-zoom, abandon any
        // single-pointer drag/pan that was in progress.
        const dragging = stateRef.current.dragging;
        if (dragging) {
          dragging.fx = null;
          dragging.fy = null;
          simulation.alphaTarget(0);
        }
        stateRef.current.dragging = null;
        stateRef.current.panning = false;
        const pts = [...activePointers.values()].slice(0, 2);
        stateRef.current.pinchStartDist = pointerDist(pts);
        return;
      }

      const { x, y } = toWorld(e.clientX, e.clientY);
      const node = findNode(x, y);
      if (node) {
        stateRef.current.dragging = node;
        node.fx = node.x;
        node.fy = node.y;
        simulation.alphaTarget(0.3).restart();
      } else {
        stateRef.current.panning = true;
      }
      stateRef.current.lastPointer = { x: e.clientX, y: e.clientY };
    }

    function onPointerMove(e: PointerEvent) {
      const { activePointers, dragging, panning, transform, lastPointer } = stateRef.current;
      if (activePointers.has(e.pointerId)) {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }

      if (activePointers.size >= 2) {
        const pts = [...activePointers.values()].slice(0, 2);
        const rect = canvas!.getBoundingClientRect();
        const midX = (pts[0].x + pts[1].x) / 2 - rect.left;
        const midY = (pts[0].y + pts[1].y) / 2 - rect.top;
        const dist = pointerDist(pts);
        const prevDist = stateRef.current.pinchStartDist ?? dist;
        if (prevDist > 0) {
          const factor = dist / prevDist;
          const newK = Math.min(Math.max(transform.k * factor, 0.15), 5);
          transform.x = midX - ((midX - transform.x) * newK) / transform.k;
          transform.y = midY - ((midY - transform.y) * newK) / transform.k;
          transform.k = newK;
        }
        stateRef.current.pinchStartDist = dist;
        return;
      }

      if (dragging) {
        const { x, y } = toWorld(e.clientX, e.clientY);
        dragging.fx = x;
        dragging.fy = y;
      } else if (panning) {
        const dx = e.clientX - lastPointer.x;
        const dy = e.clientY - lastPointer.y;
        transform.x += dx;
        transform.y += dy;
        stateRef.current.lastPointer = { x: e.clientX, y: e.clientY };
      } else {
        const { x, y } = toWorld(e.clientX, e.clientY);
        stateRef.current.hovered = findNode(x, y);
        canvas!.style.cursor = stateRef.current.hovered ? "pointer" : "grab";
      }
    }

    function onPointerUp(e: PointerEvent) {
      const { activePointers, dragging } = stateRef.current;
      activePointers.delete(e.pointerId);
      try {
        canvas!.releasePointerCapture(e.pointerId);
      } catch {
        // Ignorable — pointer capture may already be gone by the time a
        // second finger lifts during a pinch.
      }

      if (activePointers.size >= 2) {
        const pts = [...activePointers.values()].slice(0, 2);
        stateRef.current.pinchStartDist = pointerDist(pts);
        return;
      }
      stateRef.current.pinchStartDist = null;
      if (activePointers.size === 1) {
        // One finger remains — resume panning from its current position
        // instead of jumping based on stale lastPointer.
        const [remaining] = activePointers.values();
        stateRef.current.lastPointer = remaining;
        stateRef.current.panning = true;
        return;
      }

      if (dragging) {
        dragging.fx = null;
        dragging.fy = null;
        simulation.alphaTarget(0);
      }
      stateRef.current.dragging = null;
      stateRef.current.panning = false;
    }

    function onClick(e: MouseEvent) {
      const { x, y } = toWorld(e.clientX, e.clientY);
      const node = findNode(x, y);
      stateRef.current.selectedId = node ? node.id : null;
      onSelect(node ?? null);
      forceRerender((v) => v + 1);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const { transform } = stateRef.current;
      const rect = canvas!.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      const newK = Math.min(Math.max(transform.k * factor, 0.15), 5);
      transform.x = mx - ((mx - transform.x) * newK) / transform.k;
      transform.y = my - ((my - transform.y) * newK) / transform.k;
      transform.k = newK;
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      simulation.force("center", forceCenter(width / 2, height / 2));
    });
    resizeObserver.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      simulation.stop();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("wheel", onWheel);
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, links, showPandals, showDistance]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="h-full w-full touch-none" />
    </div>
  );
}
