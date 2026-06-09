import { useEffect, useRef } from "react";
import { useEntrance, Count } from "../lib/anim";
import { longTail } from "../data/computed";
import { reducedMotion } from "../lib/anim";

const base = import.meta.env.BASE_URL;
const COVERS = ["truenos.jpg", "caminar.webp", "fiestas.jpg", "sadako.jpg", "georgia.jpg"];

// Interpola la curva long tail real (pct títulos -> pct ventas acumulado).
function cumAt(pct: number): number {
  const pts = longTail.puntos;
  if (pct <= pts[0].pctTitulos) return (pct / pts[0].pctTitulos) * pts[0].pctVentas;
  for (let i = 1; i < pts.length; i++) {
    if (pct <= pts[i].pctTitulos) {
      const a = pts[i - 1], b = pts[i];
      const f = (pct - a.pctTitulos) / (b.pctTitulos - a.pctTitulos);
      return a.pctVentas + f * (b.pctVentas - a.pctVentas);
    }
  }
  return 100;
}

// Acto 4 · La cola larga del catálogo, dibujada con partículas (un punto = un lote de ventas).
export default function Act04Catalogo() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEntrance(root);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    type P = { x: number; y: number; tx: number; ty: number; top5: boolean };
    let parts: P[] = [];

    function layout() {
      const w = cv!.clientWidth, h = cv!.clientHeight;
      cv!.width = w * dpr; cv!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 100 columnas = percentiles de títulos; altura = % de ventas de esa banda (curva real).
      // La altura visible usa raíz cuadrada (escala comprimida) para que la cola no desaparezca;
      // el nº de partículas sí es proporcional a las ventas reales (la densidad es honesta).
      const COLS = 100;
      const heights: number[] = [];
      for (let c = 0; c < COLS; c++) heights.push(Math.max(0.15, cumAt(c + 1) - cumAt(c)));
      const maxH = Math.max(...heights);
      const colW = w / COLS;
      parts = [];
      const PER_PCT = 38; // partículas por punto porcentual de ventas
      heights.forEach((hPct, c) => {
        const n = Math.max(1, Math.round(hPct * PER_PCT));
        const colH = Math.sqrt(hPct / maxH) * (h * 0.78);
        for (let i = 0; i < n; i++) {
          parts.push({
            x: Math.random() * w,
            y: Math.random() * h,
            tx: c * colW + Math.random() * colW * 0.85,
            ty: h - 24 - Math.random() * colH,
            top5: c < 5,
          });
        }
      });
      if (reducedMotion()) parts.forEach((p) => { p.x = p.tx; p.y = p.ty; });
    }

    function draw() {
      const w = cv!.clientWidth, h = cv!.clientHeight;
      ctx.clearRect(0, 0, w, h);
      let moving = false;
      for (const p of parts) {
        p.x += (p.tx - p.x) * 0.045;
        p.y += (p.ty - p.y) * 0.045;
        if (Math.abs(p.tx - p.x) > 0.4 || Math.abs(p.ty - p.y) > 0.4) moving = true;
        ctx.fillStyle = p.top5 ? "rgba(45,212,197,0.9)" : "rgba(184,180,168,0.34)";
        ctx.fillRect(p.x, p.y, 2.1, 2.1);
      }
      // etiqueta de la cabeza (5%)
      ctx.fillStyle = "rgba(45,212,197,0.95)";
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillText("← el 5% de los títulos", w * 0.07, h * 0.16);
      ctx.fillStyle = "rgba(184,180,168,0.7)";
      ctx.fillText("la cola: 95.000 títulos que casi no venden →", w * 0.45, h - 44);
      if (moving) raf = requestAnimationFrame(draw);
    }

    layout();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(() => { layout(); cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); });
    ro.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section ref={root} className="h-full w-full flex flex-col px-6 md:px-14 pt-20 pb-8">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.1fr_1fr] gap-8 items-end">
        <div>
          <p data-a className="act-kicker mb-3">Acto 4 · ¿Qué tiene realmente en el catálogo?</p>
          <h2 data-a className="font-display text-4xl md:text-5xl font-semibold leading-[1.05]">
            <Count to={99985} duration={2} className="text-spark" /> títulos.{" "}
            El <span className="text-spark">5%</span> hace el <span className="text-spark">53%</span> de las ventas.
          </h2>
        </div>
        <p data-a className="text-ivory-dim leading-relaxed">
          El catálogo en Excel tenía ≈7.479 referencias: el universo real, reconstruido desde la
          facturación, es <strong className="text-ivory">13 veces mayor</strong>. Cada punto es venta:
          casi toda se concentra en una cabeza minúscula.
        </p>
      </div>
      <div data-a className="relative flex-1 mt-4 min-h-0">
        <canvas ref={canvas} className="w-full h-full" />
        <div className="absolute right-2 top-2 flex gap-2">
          {COVERS.map((c, i) => (
            <img key={c} src={`${base}covers/${c}`} alt="" loading="lazy"
              className="h-20 w-14 object-cover rounded shadow-lg border border-hairline"
              style={{ transform: `rotate(${(i - 2) * 2.5}deg)` }} />
          ))}
        </div>
      </div>
    </section>
  );
}
