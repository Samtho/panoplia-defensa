import { useRef } from "react";
import EChart from "../components/EChart";
import { useEntrance } from "../lib/anim";
import { benchmarkRaceOption } from "../charts/stage";
import { operatingPoints } from "../data/operating";

// Acto 7 · El modelo: compite contra 7 familias, gana y se pone al servicio de la decisión.
const TONE: Record<string, string> = { potenciar: "text-leaf", vigilar: "text-ember", reducir: "text-blood" };
const BORDER: Record<string, string> = {
  potenciar: "border-leaf/40", vigilar: "border-ember/40", reducir: "border-blood/40",
};

export default function Act07Modelo() {
  const root = useRef<HTMLElement>(null);
  useEntrance(root);

  return (
    <section ref={root} className="h-full w-full flex items-center px-6 md:px-14">
      <div className="max-w-7xl mx-auto w-full">
        <p data-a className="act-kicker mb-3">Acto 7 · ¿Se puede predecir el éxito de un título?</p>
        <h2 data-a className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] max-w-4xl">
          Un modelo que compite, gana… <span className="text-spark">y se adapta a la decisión.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-8 mt-8 items-start">
          <div data-a className="rounded-2xl border border-hairline bg-stage-soft p-4">
            <p className="text-sm text-ivory-dim mb-2">
              8 familias de algoritmos, el mismo problema. Gana el <strong className="text-ivory">gradient boosting</strong> (familia XGBoost).
            </p>
            <EChart option={benchmarkRaceOption()} height={300} />
          </div>

          <div>
            <p data-a className="text-ivory-dim leading-relaxed mb-5">
              Y la clave para el negocio: <strong className="text-ivory">el mismo modelo sirve a tres
              estrategias</strong> según dónde pongas el umbral. No es un error, es una elección.
            </p>
            <div className="space-y-3">
              {operatingPoints.map((o) => (
                <div key={o.key} data-a className={`rounded-xl border ${BORDER[o.color]} bg-stage-soft px-5 py-4 flex items-center gap-6`}>
                  <div className="w-44 shrink-0">
                    <div className={`font-semibold ${TONE[o.color]}`}>{o.label}</div>
                    <div className="text-[11px] text-faint leading-tight mt-0.5">{o.objetivo}</div>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <div className={`font-display text-3xl font-semibold ${TONE[o.color]}`}>{Math.round(o.recall * 100)}%</div>
                      <div className="text-[11px] text-faint">superventas capturados</div>
                    </div>
                    <div>
                      <div className={`font-display text-3xl font-semibold ${TONE[o.color]}`}>{Math.round(o.precision * 100)}%</div>
                      <div className="text-[11px] text-faint">de las apuestas aciertan</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p data-a className="mt-4 text-sm text-faint">
              Validación ciega 80/20 sobre 112.598 pares título-mercado. Honesto: el techo (~0,64) refleja
              que anticipar un título concreto es difícil; el valor está en explicar qué mueve la demanda.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
