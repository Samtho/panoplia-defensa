import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Escena · Los 722 clientes, literal: el campo de partículas (detrás) forma una rejilla
// donde CADA PUNTO ES UN CLIENTE B2B real, ordenados por segmento RFM.
export default function EscClientes() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="relative h-full w-full">
      <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 max-w-md">
        <p data-a className="act-kicker mb-4">Capítulo II · ¿A qué clientes cuidar?</p>
        <h2 data-a className="font-display text-4xl md:text-6xl font-semibold leading-[1.02]">
          722 clientes.<br /><span className="text-spark">175 pagan casi todo.</span>
        </h2>
        <p data-a className="mt-6 text-ivory-dim text-lg leading-relaxed">
          Cada punto de la derecha <strong className="text-ivory">es un cliente B2B real</strong>, clasificado
          con RFM: cuán <em>reciente</em> compra, con qué <em>frecuencia</em> y cuánto <em>dinero</em> deja.
        </p>
        <ul data-a className="mt-7 space-y-2.5 text-sm">
          <li className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-spark shrink-0" />
            <span className="text-ivory"><strong>175 Campeones</strong> (24%) → <strong className="text-spark">75% de las ventas</strong></span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blood shrink-0" />
            <span className="text-ivory"><strong>44 En Riesgo</strong> → compraban mucho y se están enfriando</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-ivory-dim/40 shrink-0" />
            <span className="text-ivory-dim"><strong>503 restantes</strong> → leales, ocasionales o dormidos</span>
          </li>
        </ul>
      </div>
      <p data-a className="absolute bottom-14 right-6 md:right-14 text-xs text-faint">
        Segmentación RFM real sobre el histórico 2021-2026 · clientes pseudonimizados
      </p>
    </section>
  );
}
