import { useLanguage } from "@/i18n";
import type { Lang } from "@/i18n";

/**
 * Minimal language switcher. Two-letter codes, no flags.
 * Used in the desktop nav bar and the mobile menu.
 */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const langs: Lang[] = ["en", "de"];

  return (
    <div
      role="group"
      aria-label={t("lang.toggle.label")}
      className={`inline-flex items-center gap-px rounded-full border border-border bg-background/60 p-0.5 text-[11px] tracking-wider ${className}`}
    >
      {langs.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            aria-label={t(l === "en" ? "lang.en.long" : "lang.de.long")}
            className={`px-2.5 py-1 rounded-full transition-colors uppercase ${
              active
                ? "bg-ink text-background"
                : "text-muted-ink hover:text-ink"
            }`}
          >
            {l === "en" ? "EN" : "DE"}
          </button>
        );
      })}
    </div>
  );
}
