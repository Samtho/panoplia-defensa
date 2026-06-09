import { useEffect, useRef } from "react";
import { useEntrance, Count, reducedMotion } from "../lib/anim";

// Acto 5 · 722 clientes como constelación: se encienden los Campeones, parpadea el riesgo.
// Cifras reales del RFM: 175 Campeones = 75,1% de las ventas; 44 En Riesgo = 1,04 M€.
const TOTAL = 722, CAMPEONES = 175, RIESGO = 44;

export default function Act05Clientes() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEntrance(root);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    const t0 = performance.now();

    // posiciones y grupos deterministas (semilla fija para que cada pase sea igual)
    let seed = 42;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    type Dot = { x: number; y: number; g: "resto" | "campeon" | "riesgo"; r: number; tw: number };
    let dots: Dot[] = [];

    function layout() {
      const w = cv!.clientWidth, h = cv!.clientHeight;
      cv!.width = w * dpr; cv!.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 42;
      const idx = Array.from({ length: TOTAL }, (_, i) => i);
      // barajado determinista para repartir los grupos por el cielo
      for (let i = idx.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1));
        [idx[i], idx[j]] = [idx[j], idx[i]];
      }
      const groups = new Map<number, Dot["g"]>();
      idx.slice(0, CAMPEONES).forEach((i) => groups.set(i, "campeon"));
      idx.slice(CAMPEONES, CAMPEONES + RIESGO).forEach((i) => groups.set(i, "riesgo"));
      dots = Array.from({ length: TOTAL }, (_, i) => ({
        x: 30 + rnd() * (w - 60),
        y: 26 + rnd() * (h - 52),
        g: groups.get(i) ?? "resto",
        r: 1.4 + rnd() * 1.8,
        tw: rnd() * Math.PI * 2,
      }));
    }

    function draw(now: number) {
      const t = reducedMotion() ? 99 : (now - t0) / 1000; // s desde el inicio
      const w = cv!.clientWidth, h = cv!.clientHeight;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const twinkle = 0.75 + 0.25 * Math.sin(now / 700 + d.tw);
        if (d.g === "campeon" && t > 1.2) {
          const on = Math.min(1, (t - 1.2) / 1.2);
          ctx.fillStyle = `rgba(45,212,197,${(0.25 + 0.75 * on) * twinkle})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r + 1.6 * on, 0, 7); ctx.fill();
          if (on > 0.6) {
            ctx.fillStyle = "rgba(45,212,197,0.12)";
            ctx.beginPath(); ctx.arc(d.x, d.y, (d.r + 1.6) * 2.4, 0, 7); ctx.fill();
          }
        } else if (d.g === "riesgo" && t > 3) {
          const pulse = 0.5 + 0.5 * Math.sin(now / 260);
          ctx.fillStyle = `rgba(232,93,75,${0.45 + 0.55 * pulse})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r + 1.2 + pulse, 0, 7); ctx.fill();
        } else {
          ctx.fillStyle = `rgba(184,180,168,${0.3 * twinkle})`;
          ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 7); ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    layout();
    raf = requestAnimationFrame(draw);
    const ro = new ResizeObserver(layout);
    ro.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section ref={root} className="relative h-full w-full">
      <canvas ref={canvas} className="absolute inset-0 w-full h-full" />
      <div className="absolute left-6 md:left-14 bottom-16 max-w-xl pointer-events-none">
        <p data-a className="act-kicker mb-3">Acto 5 · ¿A qué clientes cuidar?</p>
        <h2 data-a className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
          722 estrellas.<br />Solo <span className="text-spark">175 sostienen el cielo</span>.
        </h2>
        <p data-a className="mt-5 text-ivory-dim text-lg leading-relaxed">
          Los <strong className="text-spark">Campeones</strong> (24% de los clientes) generan el{" "}
          <strong className="text-spark">75% de las ventas</strong>. Y las que parpadean en rojo son los{" "}
          <strong className="text-blood">44 clientes "En Riesgo"</strong>:{" "}
          <strong className="text-blood"><Count to={1.04} decimals={2} suffix=" M€" duration={1.4} delay={3.4} /></strong>{" "}
          enfriándose ahora mismo.
        </p>
      </div>
    </section>
  );
}
