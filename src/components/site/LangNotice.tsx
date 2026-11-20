import { useLang } from "@/i18n";

/**
 * Tasteful notice shown on long content pages while a German edition
 * is being prepared. Mirrors the convention used by many Swiss premium
 * product sites: chrome and primary surfaces are bilingual, but
 * long-form prose (especially legal text) is maintained in one
 * authoritative language until a curated translation is ready.
 *
 * Renders nothing when the active language is English.
 */
export function LangNotice({
  variant = "general",
}: {
  variant?: "general" | "legal";
}) {
  const lang = useLang();
  if (lang !== "de") return null;

  const isLegal = variant === "legal";

  return (
    <div className="border-y border-border/60 bg-surface/60">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-start gap-3 text-[12.5px] text-muted-ink leading-relaxed">
        <span className="mt-[2px] inline-block h-1.5 w-1.5 rounded-full bg-accent-green shrink-0" aria-hidden />
        <p>
          {isLegal ? (
            <>
              <strong className="text-ink font-medium">Sprachhinweis.</strong>{" "}
              Die deutsche Fassung dieses Dokuments ist in Vorbereitung. Bis dahin
              bleibt der englische Text die massgebende Version.
            </>
          ) : (
            <>
              <strong className="text-ink font-medium">Sprachhinweis.</strong>{" "}
              Die deutsche Fassung dieser Seite wird derzeit redaktionell finalisiert.
              Bis dahin folgt der Inhalt unten in englischer Sprache.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
