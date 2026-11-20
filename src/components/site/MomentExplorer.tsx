import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import imgMeeting from "@/assets/img-meeting.jpg";
import imgCafe from "@/assets/img-cafe.jpg";
import imgStation from "@/assets/img-station.jpg";
import imgTrain from "@/assets/img-train.jpg";
import imgDusk from "@/assets/img-dusk.jpg";
import { useT } from "@/i18n";
import type { TranslationKey } from "@/i18n";

type M = {
  id: string;
  index: string;
  timeKey: TranslationKey;
  titleKey: TranslationKey;
  bodyKey: TranslationKey;
  statKey?: TranslationKey;
  image: string;
  tint: string;
};

const items: M[] = [
  { id: "pre", index: "01", timeKey: "moment.pre.time", titleKey: "moment.pre.title", bodyKey: "moment.pre.body", image: imgMeeting, tint: "from-[#D9EAE6] to-transparent" },
  { id: "post", index: "02", timeKey: "moment.post.time", titleKey: "moment.post.title", bodyKey: "moment.post.body", image: imgCafe, tint: "from-[#EFE3D6] to-transparent" },
  { id: "switch", index: "03", timeKey: "moment.switch.time", titleKey: "moment.switch.title", bodyKey: "moment.switch.body", statKey: "moment.switch.stat", image: imgStation, tint: "from-[#E1E8EF] to-transparent" },
  { id: "fog", index: "04", timeKey: "moment.fog.time", titleKey: "moment.fog.title", bodyKey: "moment.fog.body", image: imgTrain, tint: "from-[#EADDD0] to-transparent" },
  { id: "end", index: "05", timeKey: "moment.end.time", titleKey: "moment.end.title", bodyKey: "moment.end.body", image: imgDusk, tint: "from-[#D4D9DD] to-transparent" },
];

export function MomentExplorer() {
  const t = useT();
  const [active, setActive] = useState(0);

  useEffect(() => {
    items.forEach((it) => {
      const img = new Image();
      img.decoding = "async";
      img.src = it.image;
    });
  }, []);

  const m = items[active];

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-stretch">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[560px] rounded-2xl overflow-hidden bg-surface border border-border">
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "opacity" }}
              aria-hidden={i !== active}
            >
              <img
                src={it.image}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${it.tint} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />
            </motion.div>
          ))}

          <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <motion.path
              key={m.id + "-arc"}
              d="M-20,460 C100,300 300,300 420,460"
              fill="none"
              stroke="rgba(250,247,242,0.45)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            />
          </svg>

          <div className="absolute left-6 top-6 right-6 flex items-start justify-between text-background">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase opacity-70">{t("moment.label.count", { n: m.index })}</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.id + "-time"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-1 font-serif italic text-2xl"
                >
                  {t(m.timeKey)}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-[10px] tracking-[0.22em] uppercase opacity-70">{t("moment.label.awareness")}</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={m.id + "-cap"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="absolute left-6 right-6 bottom-6 text-background"
            >
              <h3 className="font-serif text-3xl md:text-4xl leading-tight">{t(m.titleKey)}.</h3>
              {m.statKey && <p className="mt-3 text-[11px] text-background/70 max-w-xs">{t(m.statKey)}</p>}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          <ul className="flex-1 divide-y divide-border">
            {items.map((it, i) => {
              const isActive = i === active;
              return (
                <li key={it.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group w-full py-5 md:py-6 text-left flex items-baseline gap-5"
                  >
                    <span className={`text-xs tracking-[0.2em] w-9 shrink-0 transition-colors ${isActive ? "text-accent-green" : "text-faint-ink"}`}>{it.index}</span>
                    <span className="flex-1 min-w-0">
                      <span className={`block transition-all duration-500 ${isActive ? "font-serif italic text-3xl md:text-4xl text-ink" : "text-lg md:text-xl text-muted-ink group-hover:text-ink"}`}>
                        {t(it.titleKey)}
                      </span>
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45 }}
                            className="block overflow-hidden"
                          >
                            <span className="block mt-3 text-sm text-muted-ink leading-relaxed max-w-md">{t(it.bodyKey)}</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className={`shrink-0 w-1.5 h-1.5 rounded-full transition-all ${isActive ? "bg-accent-green scale-100" : "bg-border scale-75"}`} />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-xs text-faint-ink max-w-sm">{t("moment.footer")}</p>
        </div>
      </div>
    </div>
  );
}
