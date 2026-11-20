import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useT } from "@/i18n";

/**
 * Premium video container for the forthcoming Bridge founder / product story.
 * No founder portrait, no breathing UI, no fake crossing — only the frame
 * the future video will sit inside.
 */
export function VideoShowcase() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);
  const arcLen = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* Ambient bloom layers */}
      <motion.div
        aria-hidden
        style={{ y: yA }}
        className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-soft-green/50 blur-3xl pointer-events-none"
      />
      <motion.div
        aria-hidden
        style={{ y: yB }}
        className="absolute -bottom-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-[color:var(--warm)]/15 blur-3xl pointer-events-none"
      />

      <div className="relative grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Pull quote */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <div className="eyebrow">{t("vs.founder_note")}</div>
          <blockquote className="mt-6 font-serif text-2xl md:text-3xl text-ink leading-[1.2]">
            <span className="text-accent-green/60 mr-0.5">"</span>
            {t("vs.quote")}
            <span className="text-accent-green/60 ml-0.5">"</span>
          </blockquote>
          <div className="mt-6 text-[11px] tracking-[0.22em] uppercase text-faint-ink">
            {t("vs.brand")}
          </div>
          <div className="mt-8 hidden lg:block">
            <div className="h-px w-10 bg-border" />
            <p className="mt-4 font-serif italic text-lg text-muted-ink leading-snug">
              {t("nav.tagline")}
            </p>
          </div>
        </div>

        {/* Video container */}
        <div className="lg:col-span-9 order-1 lg:order-2">
          <div className="relative">
            {/* Layered frame */}
            <div className="absolute -inset-4 md:-inset-6 rounded-[2rem] bg-gradient-to-br from-surface to-alt-surface/60 border border-border/60 -z-10" />
            <div className="absolute -inset-px rounded-[1.6rem] bg-gradient-to-br from-soft-green/40 via-transparent to-[color:var(--warm)]/15 pointer-events-none" />

            <div className="relative aspect-[16/9] rounded-[1.5rem] overflow-hidden bg-ink border border-border shadow-[0_30px_80px_-30px_rgba(31,42,55,0.35)]">
              {/* Cinematic placeholder — replace with <video /> when the file is ready */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(217,234,230,0.18),_transparent_60%)]" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1f2a37] via-[#243341] to-[#0f1820]" />

              {/* Soft moving aurora */}
              <motion.div
                aria-hidden
                className="absolute -inset-1/4 opacity-40 blur-3xl"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, rgba(59,122,109,0.35), rgba(217,234,230,0.05), rgba(216,143,96,0.18), rgba(59,122,109,0.35))",
                }}
              />

              {/* Soft arc — the Bridge crossing motif */}
              <svg
                viewBox="0 0 1600 900"
                className="absolute inset-0 w-full h-full pointer-events-none"
                preserveAspectRatio="xMidYMid slice"
              >
                <motion.path
                  d="M-50,750 C400,420 1200,420 1650,750"
                  fill="none"
                  stroke="rgba(250,247,242,0.35)"
                  strokeWidth="1.2"
                  style={{ pathLength: arcLen }}
                />
              </svg>

              {/* Centre play affordance — visual only, no interaction yet */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-background/10 blur-2xl scale-150" aria-hidden />
                  <span className="relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full border border-background/40 bg-background/10 backdrop-blur-md">
                    <span
                      className="absolute inset-0 rounded-full border border-background/30"
                      style={{
                        animation: "breathe 6s ease-in-out infinite",
                      }}
                      aria-hidden
                    />
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-background/90 translate-x-[2px]">
                      <path d="M8 5v14l11-7z" fill="currentColor" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="absolute left-5 top-5 right-5 flex items-start justify-between text-background/80 text-[10px] tracking-[0.22em] uppercase">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
                  {t("vs.coming")}
                </span>
                <span className="hidden sm:inline">EN · DE · 02:14</span>
              </div>

              <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between text-background">
                <div>
                  <div className="font-serif italic text-2xl md:text-3xl leading-tight">{t("vs.crossing_label")}</div>
                  <div className="text-[11px] opacity-70 mt-1">{t("vs.filmed")}</div>
                </div>
                <div className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase opacity-70">
                  <span>{t("vs.chapter")}</span>
                  <span className="text-background/90">{t("vs.chapter1")}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[11px] text-faint-ink">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-border" />
                {t("vs.caption")}
              </div>
              <div className="inline-flex items-center gap-4 uppercase tracking-[0.22em]">
                <span>01 · {t("cj.notice.label")}</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>02 · Crossing</span>
                <span className="h-1 w-1 rounded-full bg-border" />
                <span>03 · {t("cj.continue.label")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
