import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { moments, type Moment } from "@/lib/moments";

const zones = ["All", "Pre-meeting", "Saturation", "Focus-fade", "Boundary", "Night"] as const;

export function MomentDeck() {
  const [zone, setZone] = useState<(typeof zones)[number]>("All");
  const [open, setOpen] = useState<Moment | null>(null);
  const filtered = zone === "All" ? moments : moments.filter((m) => m.zone === zone);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {zones.map((z) => (
          <button
            key={z}
            onClick={() => setZone(z)}
            className={`text-[12px] tracking-wide px-3.5 py-1.5 rounded-full border transition-all ${
              zone === z
                ? "bg-ink text-background border-ink"
                : "bg-transparent text-muted-ink border-border hover:border-ink/40 hover:text-ink"
            }`}
          >
            {z}
          </button>
        ))}
      </div>

      <div className="grid gap-px bg-border/70 rounded-2xl overflow-hidden border border-border">
        {filtered.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => setOpen(m)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -2 }}
            className="group text-left bg-background hover:bg-surface transition-colors px-6 md:px-8 py-6 grid md:grid-cols-[140px_1fr_auto] gap-4 items-baseline"
          >
            <span className="eyebrow">{m.zone}</span>
            <span className="text-ink text-lg font-light">{m.title}</span>
            <span className="text-faint-ink text-sm opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl w-full bg-background border border-border rounded-2xl p-8 md:p-10 shadow-xl"
            >
              <div className="eyebrow">{open.zone}</div>
              <h3 className="mt-3 text-2xl md:text-3xl font-light text-ink">{open.title}</h3>
              <p className="mt-5 text-muted-ink leading-relaxed">{open.body}</p>
              {open.stat && (
                <p className="mt-4 text-xs text-faint-ink border-l-2 border-accent-green/60 pl-3">{open.stat}</p>
              )}
              <div className="mt-8 flex justify-between items-center">
                <span className="text-xs text-faint-ink">One of 13 awareness moments.</span>
                <button onClick={() => setOpen(null)} className="text-sm text-ink hover:text-accent-green">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
