import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function CrossingPreview() {
  const [phase, setPhase] = useState<"notice" | "pause" | "continue">("notice");
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    setPhase("pause");
    const start = Date.now();
    const duration = 12000;
    timer.current = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / duration);
      setProgress(p);
      if (p >= 1) {
        clearInterval(timer.current!);
        setPhase("continue");
        setRunning(false);
      }
    }, 60);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [running]);

  const reset = () => { setPhase("notice"); setProgress(0); setRunning(false); };

  const R = 92;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - progress);
  const seconds = Math.round(120 - progress * 120);
  const mm = String(Math.floor(seconds / 60)).padStart(1, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative rounded-3xl border border-border bg-surface/60 overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-60 pointer-events-none" />
      <div className="relative grid md:grid-cols-[1fr_1.2fr]">
        <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border/70">
          <div className="eyebrow">The crossing · 02:00</div>
          <h3 className="mt-4 text-2xl md:text-3xl font-light text-ink leading-tight">
            {phase === "notice" && "Pre-meeting pressure."}
            {phase === "pause" && "Hold the transition."}
            {phase === "continue" && "Crossing complete."}
          </h3>
          <p className="mt-4 text-muted-ink text-sm leading-relaxed max-w-sm">
            {phase === "notice" && "Your next meeting starts in four minutes. You're still in the last one, mentally."}
            {phase === "pause" && "Two minutes. A structured crossing — a short set of micro-interactions that hold the transition open."}
            {phase === "continue" && "A quiet handover. Continue with a little more room."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {phase === "notice" && (
              <button onClick={() => setRunning(true)} className="rounded-full bg-ink text-background text-sm px-5 py-2.5 hover:bg-accent-green transition-colors">Begin crossing</button>
            )}
            {phase === "pause" && (
              <button onClick={reset} className="rounded-full border border-border text-sm px-5 py-2.5 text-muted-ink hover:text-ink">Exit anytime</button>
            )}
            {phase === "continue" && (
              <button onClick={reset} className="rounded-full border border-border text-sm px-5 py-2.5 text-muted-ink hover:text-ink">Replay</button>
            )}
            <span className="text-xs text-faint-ink self-center">Held for {Math.round(progress * 120)} seconds</span>
          </div>
        </div>
        <div className="relative aspect-square md:aspect-auto md:min-h-[360px] flex items-center justify-center p-8">
          <svg viewBox="0 0 240 240" className="w-full max-w-[280px]">
            <defs>
              <radialGradient id="g1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--soft-green)" stopOpacity="0.7" />
                <stop offset="100%" stopColor="var(--soft-green)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="120" cy="120" r="110" fill="url(#g1)" />
            <circle cx="120" cy="120" r={R} fill="none" stroke="var(--border)" strokeWidth="1.5" />
            <motion.circle
              cx="120" cy="120" r={R} fill="none"
              stroke="var(--accent-green)" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              transform="rotate(-90 120 120)"
              transition={{ ease: "linear" }}
            />
            <motion.circle
              cx="120" cy="120" r="46"
              fill="var(--background)"
              stroke="var(--accent-green)" strokeOpacity="0.25" strokeWidth="1"
              animate={phase === "pause" ? { r: [46, 56, 46] } : { r: 46 }}
              transition={phase === "pause" ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : {}}
            />
            <text x="120" y="118" textAnchor="middle" fontSize="22" fontWeight="300" fill="var(--ink)">{mm}:{ss}</text>
            <text x="120" y="138" textAnchor="middle" fontSize="9" letterSpacing="2" fill="var(--faint-ink)">
              {phase === "pause" ? "HOLDING" : phase === "continue" ? "COMPLETE" : "READY"}
            </text>
          </svg>
        </div>
      </div>
      <div className="relative px-6 md:px-10 py-3 text-[11px] text-faint-ink border-t border-border/60">
        105 seconds. A preview of the crossing.
      </div>
    </div>
  );
}
