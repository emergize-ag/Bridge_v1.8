import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import imgMeeting from "@/assets/img-meeting.jpg";
import imgCafe from "@/assets/img-cafe.jpg";
import imgCorridor from "@/assets/img-corridor.jpg";
import { useT } from "@/i18n";
import type { TranslationKey } from "@/i18n";

type StageDef = {
  key: string;
  n: string;
  labelKey: TranslationKey;
  headKey: TranslationKey;
  bodyKey: TranslationKey;
  image: string;
};

const stages: StageDef[] = [
  { key: "notice", n: "01", labelKey: "cj.notice.label", headKey: "cj.notice.head", bodyKey: "cj.notice.body", image: imgMeeting },
  { key: "pause", n: "02", labelKey: "cj.pause.label", headKey: "cj.pause.head", bodyKey: "cj.pause.body", image: imgCafe },
  { key: "continue", n: "03", labelKey: "cj.continue.label", headKey: "cj.continue.head", bodyKey: "cj.continue.body", image: imgCorridor },
];

export function CrossingJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const arcLen = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox="0 0 60 1000"
        preserveAspectRatio="none"
        className="hidden md:block absolute left-3 top-0 h-full w-12 pointer-events-none"
      >
        <line x1="30" y1="0" x2="30" y2="1000" stroke="var(--border)" strokeDasharray="2 5" />
        <motion.line
          x1="30" y1="0" x2="30" y2="1000"
          stroke="var(--accent-green)" strokeWidth="1.5"
          style={{ pathLength: arcLen }}
        />
      </svg>

      <div className="space-y-28 md:space-y-40 md:pl-16">
        {stages.map((s, i) => (
          <Stage key={s.key} stage={s} reverse={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}

function Stage({ stage, reverse }: { stage: StageDef; reverse: boolean }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 20%"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const arc = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const fade = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.6]);

  return (
    <motion.div ref={ref} style={{ opacity: fade }} className="relative">
      <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <motion.div style={{ y }} className="lg:col-span-7 relative">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-surface">
            <img src={stage.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-transparent to-transparent" />
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <motion.path
                d={reverse ? "M380,240 C260,80 140,80 20,240" : "M20,240 C140,80 260,80 380,240"}
                fill="none" stroke="rgba(250,247,242,0.7)" strokeWidth="1.2"
                style={{ pathLength: arc }}
              />
            </svg>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-background">
              <span className="text-[10px] tracking-[0.22em] uppercase opacity-80">{t("cj.stage")} {stage.n}</span>
              <span className="font-serif italic text-xl">{t(stage.labelKey)}</span>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-5">
          <div className="eyebrow text-accent-green">{t("cj.eyebrow")} {stage.n}</div>
          <h3 className="mt-4 text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink">
            <span className="font-serif italic">{t(stage.labelKey)}.</span> <span className="font-light">{t(stage.headKey)}</span>
          </h3>
          <p className="mt-6 text-muted-ink leading-relaxed max-w-md">{t(stage.bodyKey)}</p>
        </div>
      </div>
    </motion.div>
  );
}
