import { useRef } from "react";
import { useEntrance } from "../lib/anim";

// Tarjeta de capítulo: respiro entre bloques + relevo de presentador.
export default function CardCapitulo({
  num, titulo, frase, presenta, color,
}: {
  num: string; titulo: string; frase: string; presenta: string; color: string;
}) {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex flex-col items-center justify-center text-center px-6">
      <div data-a className="font-display font-bold leading-none select-none" style={{ fontSize: "clamp(8rem, 30vh, 16rem)", color, opacity: 0.18 }}>
        {num}
      </div>
      <h2 data-a className="act-title -mt-8" style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)" }}>{titulo}</h2>
      <p data-a className="mt-5 text-lg text-ivory-dim max-w-2xl">{frase}</p>
      <div data-a className="mt-10 flex items-center gap-3">
        <span className="h-9 px-3 rounded-full grid place-items-center text-sm font-bold text-stage" style={{ background: color }}>
          {presenta.split("·")[0].trim()}
        </span>
        <span className="text-sm text-faint">Presenta · {presenta.split("·")[1]?.trim()}</span>
      </div>
    </section>
  );
}
