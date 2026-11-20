import { Link } from "@tanstack/react-router";
import { BridgeMark, BridgeIcon } from "./BridgeMark";
import { useT } from "@/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="relative border-t border-border bg-surface/40 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-green/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:pt-24 pb-14 md:pb-20">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end">
          <div>
            <Link to="/" className="inline-flex items-center text-ink" aria-label="Bridge — home">
              <BridgeMark withIcon className="text-ink text-[34px] md:text-[42px]" />
            </Link>
            <p className="mt-7 font-serif italic text-3xl md:text-4xl text-ink leading-[1.15] max-w-xl">
              {t("footer.tagline")}
            </p>
            <p className="mt-5 text-sm text-muted-ink max-w-md leading-relaxed">
              {t("footer.intro")}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <div className="eyebrow">{t("footer.stay_close")}</div>
            <p className="mt-4 text-sm text-muted-ink max-w-sm">{t("footer.stay_close.body")}</p>
            <form className="mt-5 flex items-center gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("footer.email.placeholder")}
                aria-label={t("footer.email.aria")}
                className="flex-1 min-w-0 bg-background border border-border rounded-full px-4 py-2.5 text-sm text-ink placeholder:text-faint-ink focus:outline-none focus:ring-2 focus:ring-accent-green/40"
              />
              <button
                type="submit"
                className="rounded-full bg-ink text-background px-4 py-2.5 text-sm hover:bg-accent-green transition-colors"
              >
                {t("btn.notify_me")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10 grid gap-10 md:grid-cols-12 border-t border-border/60">
        <div className="md:col-span-3">
          <h4 className="eyebrow">{t("footer.col.product")}</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-ink">
            <li><a href="/#system" className="hover:text-ink">{t("footer.link.moment_library")}</a></li>
            <li><a href="/#how" className="hover:text-ink">{t("footer.link.the_crossing")}</a></li>
            <li><a href="/#research" className="hover:text-ink">{t("footer.link.research")}</a></li>
            <li><a href="/#principles" className="hover:text-ink">{t("footer.link.principles")}</a></li>
            <li><Link to="/teams" className="hover:text-ink">{t("footer.link.for_teams")}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="eyebrow">{t("footer.col.company")}</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-ink">
            <li><Link to="/about" className="hover:text-ink">{t("footer.link.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-ink">{t("footer.link.contact")}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="eyebrow">{t("footer.col.legal")}</h4>
          <ul className="mt-5 space-y-3 text-sm text-muted-ink">
            <li><Link to="/privacy" className="hover:text-ink">{t("footer.link.privacy")}</Link></li>
            <li><Link to="/cookies" className="hover:text-ink">{t("footer.link.cookies")}</Link></li>
            <li><button type="button" onClick={() => window.dispatchEvent(new Event("bridge:open-cookie-settings"))} className="hover:text-ink text-left">{t("footer.link.cookie_settings")}</button></li>
            <li><Link to="/legal" className="hover:text-ink">{t("footer.link.legal_notice")}</Link></li>
            <li><Link to="/terms" className="hover:text-ink">{t("footer.link.terms")}</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h4 className="eyebrow">{t("footer.col.bridge")}</h4>
          <p className="mt-5 text-sm text-muted-ink leading-relaxed">
            {t("footer.bridge.body")}
          </p>
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 text-[11px] text-faint-ink flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2">
            <BridgeIcon className="h-4 w-4 rounded-[22%]" />
            {t("footer.copyright")}
          </span>
          <span className="tracking-[0.2em] uppercase">{t("footer.locale")}</span>
        </div>
      </div>
    </footer>
  );
}
