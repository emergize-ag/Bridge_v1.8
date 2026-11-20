import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useT } from "@/i18n";
import type { TranslationKey } from "@/i18n";

type Item = {
  stat: string;
  labelKey: TranslationKey;
  textKey: TranslationKey;
  source: string;
  diagram: "focus" | "fragments" | "split" | "boundary" | "switches" | "arc";
};

const items: Item[] = [
  { stat: "23 min", labelKey: "rg.1.label", textKey: "rg.1.text", source: "Gloria Mark, UC Irvine, 2008.", diagram: "focus" },
  { stat: "2.5 hrs", labelKey: "rg.2.label", textKey: "rg.2.text", source: "Meyer & Kieras, 1997.", diagram: "fragments" },
  { stat: "40%", labelKey: "rg.3.label", textKey: "rg.3.text", source: "Meyer & Kieras.", diagram: "split" },
  { stat: "68%", labelKey: "rg.4.label", textKey: "rg.4.text", source: "Statista DACH, 2023.", diagram: "boundary" },
  { stat: "11×", labelKey: "rg.5.label", textKey: "rg.5.text", source: "RescueTime, 2022.", diagram: "switches" },
  { stat: "2 min", labelKey: "rg.6.label", textKey: "rg.6.text", source: "Grossmann & Kross, 2014.", diagram: "arc" },
];

function Diagram({ kind }: { kind: Item["diagram"] }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const draw = { initial: { pathLength: 0 }, animate: inView ? { pathLength: 1 } : {}, transition: { duration: 1.6, ease: "easeOut" as const } };

  return (
    <svg ref={ref} viewBox="0 0 220 80" className="w-full h-20">
      {kind === "focus" && (
        <>
          <line x1="0" y1="50" x2="220" y2="50" stroke="var(--border)" strokeDasharray="2 4" />
          <motion.path d="M0,30 L70,30 L72,70 L80,70 C140,70 160,32 220,32" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" {...draw} />
          <circle cx="72" cy="70" r="3" fill="var(--warm)" />
        </>
      )}
      {kind === "fragments" && (
        <>
          {[0,1,2,3,4,5,6,7].map((i) => (
            <motion.rect key={i} x={i * 26 + 4} y={30} width={18} height={20}
              fill="var(--soft-green)" stroke="var(--accent-green)" strokeWidth="0.8"
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 30 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }} />
          ))}
        </>
      )}
      {kind === "split" && (
        <>
          <rect x="20" y="30" width="180" height="20" rx="10" fill="var(--surface)" stroke="var(--border)" />
          <motion.rect x="20" y="30" height="20" rx="10" fill="var(--accent-green)"
            initial={{ width: 0 }} animate={inView ? { width: 108 } : {}} transition={{ duration: 1.4 }} />
          <text x="110" y="22" textAnchor="middle" fontSize="9" fill="var(--faint-ink)">60% effective</text>
        </>
      )}
      {kind === "boundary" && (
        <>
          <line x1="0" y1="50" x2="220" y2="50" stroke="var(--border)" />
          <motion.path d="M0,55 C40,55 80,55 120,45 C160,35 200,30 220,30" fill="none" stroke="var(--warm)" strokeWidth="2" {...draw} />
          <line x1="140" y1="10" x2="140" y2="70" stroke="var(--border)" strokeDasharray="3 4" />
          <text x="142" y="18" fontSize="8" fill="var(--faint-ink)">17:30</text>
        </>
      )}
      {kind === "switches" && (
        <>
          <line x1="0" y1="40" x2="220" y2="40" stroke="var(--border)" />
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.circle key={i} cx={10 + i * 20} cy={40} r="3" fill="var(--accent-green)"
              initial={{ opacity: 0, cy: 60 }} animate={inView ? { opacity: 1, cy: 40 } : {}} transition={{ delay: i * 0.08 }} />
          ))}
        </>
      )}
      {kind === "arc" && (
        <>
          <circle cx="40" cy="50" r="6" fill="var(--surface)" stroke="var(--border)" />
          <circle cx="180" cy="50" r="6" fill="var(--soft-green)" stroke="var(--accent-green)" />
          <motion.path d="M40,50 C80,10 140,10 180,50" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" {...draw} />
        </>
      )}
    </svg>
  );
}

export function ResearchGrid() {
  const t = useT();
  return (
    <div className="grid gap-px bg-border/70 border border-border rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <motion.div key={it.labelKey} className="bg-background p-7"
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.7 }}>
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">{t(it.labelKey)}</span>
            <span className="text-2xl md:text-3xl font-light text-ink">{it.stat}</span>
          </div>
          <div className="mt-5"><Diagram kind={it.diagram} /></div>
          <p className="mt-5 text-sm text-muted-ink leading-relaxed">{t(it.textKey)}</p>
          <p className="mt-3 text-[11px] text-faint-ink">{it.source}</p>
        </motion.div>
      ))}
    </div>
  );
}
