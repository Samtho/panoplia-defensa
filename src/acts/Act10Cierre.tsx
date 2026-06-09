import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Acto 10 · Cierre: la tesis en una frase y la puerta al cuadro de mando completo.
const DASHBOARD_URL = "https://samtho.github.io/panoplia-dashboard/";

export default function Act10Cierre() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <p data-a className="act-kicker mb-8">Acto final · La tesis</p>
      <h2 data-a className="act-title max-w-5xl">
        De <span className="text-blood">decirse exportadora</span><br />
        a <span className="text-spark">serlo de verdad</span>.
      </h2>
      <p data-a className="mt-8 text-lg md:text-xl text-ivory-dim max-w-3xl leading-relaxed">
        Con sus propios datos, herramientas abiertas y sin inversión externa: un diagnóstico honesto,
        una matriz para decidir, un modelo que se explica y una hoja de ruta que ya está en marcha.
      </p>

      <div data-a className="mt-12 flex flex-col items-center gap-3">
        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-spark text-stage font-semibold px-8 py-3.5 text-lg hover:opacity-90 transition-opacity"
        >
          Explorar el cuadro de mando completo →
        </a>
        <span className="text-sm text-faint">{DASHBOARD_URL.replace("https://", "")}</span>
      </div>

      <p data-a className="mt-14 text-sm text-faint">
        Grupo 4 · Máster en Business Analytics e IA · INESDI · 2026
      </p>
    </section>
  );
}
