import { useEffect, useState } from "react";
import { useTheatre } from "./lib/theatre";
import { ACTS } from "./acts";

// Cortina de entrada del teatro.
function Preloader() {
  const [gone, setGone] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setHidden(true); return; }
    const t1 = setTimeout(() => setGone(true), 1300);
    const t2 = setTimeout(() => setHidden(true), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (hidden) return null;
  return (
    <div className={`fixed inset-0 z-[100] bg-stage flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] ${gone ? "-translate-y-full" : ""}`} aria-hidden="true">
      <div className="text-center">
        <div className="font-display text-5xl md:text-6xl font-semibold">
          Panoplia<span className="text-spark">.</span>
        </div>
        <div className="mt-2 text-sm tracking-[0.3em] uppercase text-faint">La defensa</div>
        <div className="mt-6 h-px w-48 mx-auto bg-hairline overflow-hidden">
          <div className="h-full bg-spark animate-[bar_1.3s_ease-out_forwards]" style={{ width: 0 }} />
        </div>
        <style>{`@keyframes bar { to { width: 100%; } }`}</style>
      </div>
    </div>
  );
}

// Índice de actos (Esc): saltar a cualquier momento del guion.
function ActIndex({ act, onJump, onClose }: { act: number; onJump: (n: number) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] bg-stage/95 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
      <div className="max-w-lg w-full px-8" onClick={(e) => e.stopPropagation()}>
        <p className="act-kicker mb-6">Índice de la defensa</p>
        {ACTS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => { onJump(i); onClose(); }}
            className={`block w-full text-left py-2 font-display text-2xl md:text-3xl font-semibold transition-colors ${i === act ? "text-spark" : "text-ivory hover:text-spark"}`}
          >
            <span className="text-faint text-sm font-sans mr-4">{String(i + 1).padStart(2, "0")}</span>
            {a.label}
          </button>
        ))}
        <p className="mt-8 text-xs text-faint">Esc para cerrar · ←/→ para navegar · números 1-0 saltan directo</p>
      </div>
    </div>
  );
}

export default function App() {
  const { act, go, next, prev, indexOpen, setIndexOpen } = useTheatre(ACTS.length);
  const Current = ACTS[act].Comp;

  return (
    <div className="stage-grain fixed inset-0 overflow-hidden select-none bg-stage">
      <Preloader />

      {/* barra de progreso del guion */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[70] bg-hairline/50">
        <div
          className="h-full bg-spark transition-[width] duration-700 ease-out"
          style={{ width: `${((act + 1) / ACTS.length) * 100}%` }}
        />
      </div>

      {/* marca y contador */}
      <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-10 h-16 pointer-events-none">
        <span className="font-display font-semibold text-lg">Panoplia<span className="text-spark">.</span> <span className="text-faint font-sans text-xs ml-1 tracking-[0.25em] uppercase">La defensa</span></span>
        <button
          onClick={() => setIndexOpen(true)}
          className="pointer-events-auto text-sm text-faint hover:text-spark transition-colors tabular-nums"
        >
          {String(act + 1).padStart(2, "0")} / {ACTS.length} · índice
        </button>
      </header>

      {/* el acto en escena (key fuerza remount = coreografía de entrada) */}
      <main key={act} className="absolute inset-0">
        <Current />
      </main>

      {/* zonas de click para avanzar/retroceder (bordes) */}
      <button aria-label="Anterior" onClick={prev} className="fixed left-0 top-16 bottom-16 w-14 z-[50] opacity-0" />
      <button aria-label="Siguiente" onClick={next} className="fixed right-0 top-16 bottom-16 w-14 z-[50] opacity-0" />

      {/* pie con ayuda */}
      <footer className="fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-10 h-12 text-[11px] text-faint pointer-events-none">
        <span>TFM · Business Analytics e IA · INESDI</span>
        <span className="hidden md:inline">← → navegar · Esc índice · datos reales del histórico 2021-2026</span>
      </footer>

      {indexOpen && <ActIndex act={act} onJump={go} onClose={() => setIndexOpen(false)} />}
    </div>
  );
}
