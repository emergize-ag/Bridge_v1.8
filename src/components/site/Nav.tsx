import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BridgeMark, BridgeIcon } from "./BridgeMark";
import { LanguageToggle } from "./LanguageToggle";
import { useT } from "@/i18n";
import type { TranslationKey } from "@/i18n";

const sectionDefs: Array<{ id: string; key: TranslationKey }> = [
  { id: "day", key: "nav.philosophy" },
  { id: "responses", key: "nav.system" },
  { id: "bridge", key: "nav.how" },
  { id: "how", key: "nav.research" },
  { id: "principles", key: "nav.principles" },
];

export function Nav() {
  const t = useT();
  const loc = useLocation();
  const isHome = loc.pathname === "/";
  const [active, setActive] = useState<string>("philosophy");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const els = sectionDefs
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-background/95 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 h-[68px] md:h-[76px] flex items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center text-ink shrink-0 -ml-1"
          aria-label="Bridge — home"
        >
          <BridgeMark withIcon className="text-ink text-[17px] md:text-[19px]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[13px] text-muted-ink">
          {sectionDefs.map((s) => {
            const isActive = isHome && active === s.id;
            return (
              <a
                key={s.id}
                href={`/#${s.id}`}
                className={`relative px-3 py-2 transition-colors ${
                  isActive ? "text-ink" : "hover:text-ink"
                }`}
              >
                {t(s.key)}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute left-2 right-2 -bottom-px h-px bg-accent-green"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
          <Link
            to="/teams"
            className="px-3 py-2 hover:text-ink transition-colors"
            activeProps={{ className: "px-3 py-2 text-ink" }}
          >
            {t("nav.teams")}
          </Link>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <LanguageToggle className="hidden md:inline-flex" />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-[12px] md:text-[13px] text-ink px-3 md:px-3.5 py-1.5 rounded-full border border-ink/15 hover:border-accent-green/60 hover:text-accent-green transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span className="hidden sm:inline">{t("nav.contact")}</span>
            <span className="sm:hidden">{t("nav.contact")}</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 -mr-1 rounded-full hover:bg-surface/80 transition-colors"
            aria-label={open ? t("nav.menu.close") : t("nav.menu.open")}
            aria-expanded={open}
          >
            <span className="sr-only">{open ? t("nav.menu.close") : t("nav.menu.open")}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-ink" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="lg:hidden overflow-hidden border-t border-border/60 bg-background/98"
      >
        <div className="px-5 py-5">
          <div className="flex items-center gap-3 pb-4 border-b border-border/60">
            <BridgeIcon className="h-9 w-9 rounded-[22%]" />
            <div className="text-[11px] uppercase tracking-[0.2em] text-faint-ink">Bridge · Emergize</div>
          </div>
          <nav className="mt-4 flex flex-col">
            {sectionDefs.map((s) => {
              const isActive = isHome && active === s.id;
              return (
                <a
                  key={s.id}
                  href={`/#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center justify-between py-3 border-b border-border/40 text-base ${
                    isActive ? "text-ink" : "text-muted-ink"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-1 w-1 rounded-full transition-colors ${
                        isActive ? "bg-accent-green" : "bg-border"
                      }`}
                    />
                    {t(s.key)}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-faint-ink">0{sectionDefs.indexOf(s) + 1}</span>
                </a>
              );
            })}
            <Link
              to="/teams"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 border-b border-border/40 text-base text-muted-ink"
            >
              <span className="flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-border" />
                {t("nav.teams")}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-faint-ink">06</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-3 text-base text-ink flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              {t("nav.contact")}
            </Link>
            <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-faint-ink">{t("lang.toggle.label")}</span>
              <LanguageToggle />
            </div>
          </nav>
          <div className="mt-6 pt-5 border-t border-border/60">
            <p className="font-serif italic text-xl text-ink leading-snug">
              {t("nav.tagline")}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-faint-ink">
              {t("nav.locale")}
            </p>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export function NavSpacer() {
  return <div aria-hidden className="h-[68px] md:h-[76px]" />;
}
