import { motion } from "motion/react";
import { useT } from "@/i18n";
import type { TranslationKey } from "@/i18n";

const principles: Array<{ n: string; tKey: TranslationKey; bKey: TranslationKey }> = [
  { n: "I", tKey: "principle.1.t", bKey: "principle.1.b" },
  { n: "II", tKey: "principle.2.t", bKey: "principle.2.b" },
  { n: "III", tKey: "principle.3.t", bKey: "principle.3.b" },
  { n: "IV", tKey: "principle.4.t", bKey: "principle.4.b" },
  { n: "V", tKey: "principle.5.t", bKey: "principle.5.b" },
  { n: "VI", tKey: "principle.6.t", bKey: "principle.6.b" },
  { n: "VII", tKey: "principle.7.t", bKey: "principle.7.b" },
];

export function PrinciplesManifesto() {
  const t = useT();
  return (
    <div className="relative">
      <div className="space-y-16 md:space-y-24">
        {principles.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className={`col-span-2 md:col-span-1 ${reverse ? "md:col-start-11 md:order-2 md:text-right" : ""}`}>
                <span className="font-serif italic text-3xl md:text-5xl text-accent-green/70">{p.n}</span>
              </div>
              <div className={`col-span-10 md:col-span-8 ${reverse ? "md:col-start-3 md:order-1" : "md:col-start-2"}`}>
                <h3 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] text-ink">
                  {t(p.tKey)}.
                </h3>
                <p className="mt-5 text-base md:text-lg text-muted-ink leading-relaxed max-w-xl">
                  {t(p.bKey)}
                </p>
                <div className="mt-8 h-px w-16 bg-border" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
