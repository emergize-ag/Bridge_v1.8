import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { BridgeIcon } from "./BridgeMark";
import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n";

/**
 * Bridge cookie consent.
 *
 * Category-based consent (not vendor-based) so any future analytics or
 * monitoring tool — PostHog, Plausible, Vercel Analytics, GA, Sentry, etc. —
 * can hook into the appropriate category without redesigning the system.
 *
 * Categories:
 *   - necessary   : always on, cannot be disabled
 *   - analytics   : performance + product analytics
 *   - functional  : preferences, accessibility, embeds
 *
 * Consumers can read consent with `getCookieConsent()` or subscribe via
 * the `bridge:consent-change` window event, e.g.:
 *
 *   window.addEventListener("bridge:consent-change", (e) => {
 *     const consent = (e as CustomEvent<ConsentState>).detail;
 *     if (consent.analytics) initAnalytics();
 *   });
 *
 * Re-open the settings modal from anywhere:
 *
 *   window.dispatchEvent(new Event("bridge:open-cookie-settings"));
 */

const STORAGE_KEY = "bridge.cookie-consent.v1";

export type ConsentCategory = "necessary" | "analytics" | "functional";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  decidedAt: string; // ISO timestamp
};

const DEFAULT_OPTIONAL: Pick<ConsentState, "analytics" | "functional"> = {
  analytics: false,
  functional: false,
};

export function getCookieConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed || typeof parsed !== "object") return null;
    return { ...parsed, necessary: true };
  } catch {
    return null;
  }
}

function saveConsent(state: Omit<ConsentState, "necessary" | "decidedAt">) {
  const full: ConsentState = {
    necessary: true,
    analytics: !!state.analytics,
    functional: !!state.functional,
    decidedAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  } catch {
    /* storage may be unavailable; consent is per-session in that case */
  }
  window.dispatchEvent(new CustomEvent("bridge:consent-change", { detail: full }));
  return full;
}

export function CookieConsent() {
  const t = useT();
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, functional: false });

  // Initial mount: read existing consent and show banner if missing.
  useEffect(() => {
    setMounted(true);
    const existing = getCookieConsent();
    if (existing) {
      setPrefs({ analytics: existing.analytics, functional: existing.functional });
    } else {
      // Small delay so the banner doesn't slam in on first paint.
      const t = window.setTimeout(() => setBannerOpen(true), 700);
      return () => window.clearTimeout(t);
    }
  }, []);

  // Allow any part of the app (e.g. footer link) to reopen settings.
  useEffect(() => {
    const open = () => {
      const existing = getCookieConsent();
      if (existing) {
        setPrefs({ analytics: existing.analytics, functional: existing.functional });
      }
      setBannerOpen(false);
      setModalOpen(true);
    };
    window.addEventListener("bridge:open-cookie-settings", open);
    return () => window.removeEventListener("bridge:open-cookie-settings", open);
  }, []);

  // Lock body scroll while modal is open.
  useEffect(() => {
    if (!modalOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  const acceptAll = useCallback(() => {
    saveConsent({ analytics: true, functional: true });
    setPrefs({ analytics: true, functional: true });
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    saveConsent({ ...DEFAULT_OPTIONAL });
    setPrefs({ ...DEFAULT_OPTIONAL });
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const savePreferences = useCallback(() => {
    saveConsent(prefs);
    setBannerOpen(false);
    setModalOpen(false);
  }, [prefs]);

  const openSettings = useCallback(() => {
    setBannerOpen(false);
    setModalOpen(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* ---------- Banner ---------- */}
      <AnimatePresence>
        {bannerOpen && !modalOpen && (
          <motion.div
            key="cookie-banner"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            role="region"
            aria-label={t("cookie.aria.region")}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:left-6 sm:bottom-6 sm:right-6 z-40"
          >
            <div className="mx-auto sm:ml-auto sm:mr-0 max-w-md rounded-2xl border border-border bg-background shadow-[0_20px_60px_-20px_rgba(31,42,55,0.25)] p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <BridgeIcon className="h-8 w-8 rounded-[22%] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
                    {t("cookie.eyebrow")}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-ink">
                    {t("cookie.banner.body")}{" "}
                    <Link
                      to="/cookies"
                      className="text-ink underline underline-offset-4 decoration-border hover:decoration-accent-green"
                    >
                      {t("btn.learn_more")}
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-full bg-ink text-background px-4 py-2 text-[13px] hover:bg-accent-green transition-colors"
                >
                  {t("cookie.btn.accept")}
                </button>
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-full border border-border text-ink px-4 py-2 text-[13px] hover:bg-surface transition-colors"
                >
                  {t("cookie.btn.reject")}
                </button>
                <button
                  type="button"
                  onClick={openSettings}
                  className="ml-auto text-[12px] text-muted-ink hover:text-ink underline underline-offset-4 decoration-border px-2 py-2"
                >
                  {t("cookie.btn.settings")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- Settings modal ---------- */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="cookie-modal"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="cookie-settings-title"
          >
            <motion.button
              type="button"
              aria-label={t("cookie.aria.close")}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-ink/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[88vh] overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_80px_-20px_rgba(31,42,55,0.35)] flex flex-col"
            >
              <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-border/60">
                <div className="flex items-center gap-3">
                  <BridgeIcon className="h-8 w-8 rounded-[22%]" />
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
                    {t("cookie.modal.eyebrow")}
                  </div>
                </div>
                <h2
                  id="cookie-settings-title"
                  className="mt-4 font-serif text-2xl sm:text-3xl text-ink leading-tight"
                >
                  {t("cookie.modal.title")}
                </h2>
                <p className="mt-2 text-[13px] text-muted-ink max-w-md">
                  {t("cookie.modal.intro")}
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  aria-label={t("btn.close")}
                  className="absolute top-4 right-4 h-9 w-9 inline-flex items-center justify-center rounded-full text-muted-ink hover:text-ink hover:bg-surface transition-colors"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto px-6 sm:px-8 py-5 space-y-3">
                <CategoryRow
                  title={t("cookie.cat.necessary.title")}
                  badge={t("cookie.cat.necessary.badge")}
                  description={t("cookie.cat.necessary.body")}
                  checked
                  disabled
                />
                <CategoryRow
                  title={t("cookie.cat.analytics.title")}
                  description={t("cookie.cat.analytics.body")}
                  checked={prefs.analytics}
                  onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
                />
                <CategoryRow
                  title={t("cookie.cat.functional.title")}
                  description={t("cookie.cat.functional.body")}
                  checked={prefs.functional}
                  onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))}
                />
                <p className="pt-2 text-[12px] text-faint-ink leading-relaxed">
                  <Link
                    to="/cookies"
                    className="text-muted-ink hover:text-ink underline underline-offset-4 decoration-border"
                    onClick={() => setModalOpen(false)}
                  >
                    {t("cookie.footer.policy")}
                  </Link>
                </p>
              </div>

              <div className="px-6 sm:px-8 py-5 border-t border-border/60 flex flex-wrap items-center gap-2 bg-surface/40">
                <button
                  type="button"
                  onClick={savePreferences}
                  className="rounded-full border border-border text-ink px-4 py-2 text-[13px] hover:bg-background transition-colors"
                >
                  {t("cookie.btn.save")}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="ml-auto rounded-full bg-ink text-background px-4 py-2 text-[13px] hover:bg-accent-green transition-colors"
                >
                  {t("cookie.btn.accept")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CategoryRow({
  title,
  description,
  checked,
  disabled,
  badge,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  badge?: string;
  onChange?: (v: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/40 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[14px] text-ink font-medium">{title}</h3>
            {badge && (
              <span className="text-[10px] uppercase tracking-[0.18em] text-accent-green bg-soft-green/60 rounded-full px-2 py-0.5">
                {badge}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-ink">
            {description}
          </p>
        </div>
        <Toggle checked={checked} disabled={disabled} onChange={onChange} label={title} />
      </div>
    </div>
  );
}

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative shrink-0 h-6 w-11 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent-green/40 ${
        checked ? "bg-accent-green" : "bg-border"
      } ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
