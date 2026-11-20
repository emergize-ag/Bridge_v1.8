import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav, NavSpacer } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { MomentExplorer } from "@/components/site/MomentExplorer";
import { BridgeIcon } from "@/components/site/BridgeMark";
import imgCorridor from "@/assets/img-corridor.jpg";
import imgStation from "@/assets/img-station.jpg";
import imgMeeting from "@/assets/img-meeting.jpg";
import imgCafe from "@/assets/img-cafe.jpg";
import imgTrain from "@/assets/img-train.jpg";
import imgDusk from "@/assets/img-dusk.jpg";
import { useT, useLang } from "@/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bridge, The right response for the moment you're in." },
      { name: "description", content: "Bridge helps people navigate moments of pressure at work by matching them with the right response at the right time. Curated, personalised, and made for everyday use." },
      { property: "og:title", content: "Bridge, The right response for the moment you're in." },
      { property: "og:description", content: "Bridge matches moments of pressure with a short, curated response. Built in Switzerland, made for everyday work." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function useLocalisedMeta(titleKey: Parameters<ReturnType<typeof useT>>[0], descKey: Parameters<ReturnType<typeof useT>>[0]) {
  const t = useT();
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.title = t(titleKey);
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t(descKey));
  }, [t, titleKey, descKey]);
}

function useCopy() {
  const lang = useLang();
  return (en: string, de: string) => (lang === "de" ? de : en);
}

function Home() {
  useLocalisedMeta("meta.home.title", "meta.home.desc");
  return (
    <div className="min-h-screen bg-background text-ink overflow-x-hidden">
      <Nav />
      <NavSpacer />
      <Hero />
      <DayFilmstrip />

      <ResponsesTriptych />
      <IntroSeal />
      <BridgeBlueprint />
      <DevicePreview />
      <PersonalHeatmap />
      <PrinciplesBand />
      <LibraryFrame />
      <CurationDiptych />
      <FounderCinema />
      <ClosingArch />
      <Footer />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Shared bits                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 text-[10px] uppercase tracking-[0.28em] text-faint-ink">
      <span className="font-serif italic text-2xl text-accent-green not-italic-fix">{n}</span>
      <span className="h-px w-8 bg-border" />
      <span>{label}</span>
    </div>
  );
}

function PrimaryCTA({ children, to = "/contact" }: { children: React.ReactNode; to?: string }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-3 rounded-full bg-ink text-background pl-6 pr-2 py-2 text-sm transition-colors hover:bg-accent-green"
    >
      <span>{children}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-background/15 group-hover:bg-background/25 transition-colors">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

function QuietLink({ children, href = "#day" }: { children: React.ReactNode; href?: string }) {
  return (
    <a href={href} className="group inline-flex items-center gap-2 text-sm text-muted-ink hover:text-ink transition-colors">
      <span className="border-b border-border group-hover:border-ink/60 transition-colors pb-0.5">{children}</span>
      <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  1. HERO, editorial split with a living "moment card" and 24h ribbon      */
/* ────────────────────────────────────────────────────────────────────────── */

function Hero() {
  const c = useCopy();

  const frames = [
    { time: "09:12", en: "Before an important meeting", de: "Vor einem wichtigen Meeting", img: imgMeeting },
    { time: "11:30", en: "Between back-to-back calls", de: "Zwischen aufeinanderfolgenden Calls", img: imgStation },
    { time: "13:05", en: "Facing a difficult decision", de: "Vor einer schwierigen Entscheidung", img: imgTrain },
    { time: "15:40", en: "Overwhelmed, mentally full", de: "Überfordert, gedanklich voll", img: imgCorridor },
    { time: "18:20", en: "Unable to switch off after work", de: "Nach Feierabend nicht abschalten", img: imgDusk },
  ];
  const idx = 0;

  return (
    <section className="relative overflow-hidden">
      {/* Ambient wash */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[110%] pointer-events-none bg-[radial-gradient(circle_at_35%_10%,var(--soft-green)_0,transparent_42%),radial-gradient(circle_at_85%_38%,rgba(216,143,96,0.10)_0,transparent_30%)] opacity-70" />

      {/* Top meta rail — Swiss hairline */}
      <div className="relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 h-10 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-faint-ink">
          <span className="flex items-center gap-3">
            <BridgeIcon className="h-3.5 w-3.5 text-accent-green" />
            {c("Emergize · Basel", "Emergize · Basel")}
          </span>
          <span>{c("A calm utility", "Ein ruhiges Werkzeug")}</span>
        </div>
      </div>


      <div className="relative mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-28 md:pb-36 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left column — copy */}
        <div className="lg:col-span-6 relative z-10">
          <Reveal>
            <div className="flex items-center gap-3 eyebrow">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent-green" />
              </span>
              {c("A calm utility, built in Switzerland", "Ein ruhiges Werkzeug, aus der Schweiz")}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 text-[46px] sm:text-6xl md:text-7xl lg:text-[92px] leading-[0.94] tracking-[-0.028em] text-ink">
              <span className="font-light">{c("The right response", "Die richtige Antwort")}</span>
              <br />
              <span className="font-light">{c("for the ", "für den ")}</span>
              <span className="font-serif italic text-accent-green">{c("moment", "Moment,")}</span>
              <br />
              <span className="font-light">{c("you're in.", "in dem du bist.")}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-10 text-lg md:text-xl text-muted-ink max-w-xl leading-relaxed">
              {c(
                "Bridge helps people navigate moments of pressure at work, before a meeting, after a difficult call, at the close of a demanding day, by matching each moment with a short, curated response, ready when it's needed.",
                "Bridge hilft, Momente des Drucks im Arbeitsalltag zu navigieren, vor einem Meeting, nach einem schwierigen Call, am Ende eines fordernden Tages, indem jeder Moment mit einer kurzen, kuratierten Antwort verbunden wird.",
              )}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap gap-6 items-center">
              <PrimaryCTA>{c("Request access", "Zugang anfragen")}</PrimaryCTA>
              <QuietLink href="#day">{c("See how a day unfolds", "So verläuft ein Tag")}</QuietLink>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { k: c("Moments", "Momente"), v: "13" },
                { k: c("Response", "Antwort"), v: c("< 2 min", "< 2 Min") },
                { k: c("Available", "Verfügbar"), v: "Q3 · 26" },
              ].map((m) => (
                <div key={m.k} className="border-t border-border/70 pt-3">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">{m.k}</div>
                  <div className="mt-1 font-serif italic text-2xl text-ink">{m.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right column — editorial image composition */}
        <div className="lg:col-span-6 relative">
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/5] w-full max-w-[380px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-none mx-auto">
              {/* Frame ticks */}
              <div aria-hidden className="absolute -left-4 top-0 bottom-0 flex flex-col justify-between text-[9px] uppercase tracking-[0.28em] text-faint-ink pointer-events-none">
                <span>01</span><span>·</span><span>·</span><span>·</span><span>05</span>
              </div>

              {/* Primary image, cross-fades between frames */}
              <div className="absolute inset-0 rounded-[2px] overflow-hidden bg-alt-surface shadow-[0_60px_120px_-40px_rgba(20,30,40,0.35)]">
                <img src={frames[idx].img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                {/* Vignette + grain */}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                <div aria-hidden className="absolute inset-0 mix-blend-multiply opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.7) 1px, transparent 1px)", backgroundSize: "3px 3px" }} />

                {/* Corner ticks */}
                <span aria-hidden className="absolute top-3 left-3 h-3 w-3 border-l border-t border-background/70" />
                <span aria-hidden className="absolute top-3 right-3 h-3 w-3 border-r border-t border-background/70" />
                <span aria-hidden className="absolute bottom-3 left-3 h-3 w-3 border-l border-b border-background/70" />
                <span aria-hidden className="absolute bottom-3 right-3 h-3 w-3 border-r border-b border-background/70" />

                {/* Overlay caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.28em] text-background/80">
                    <span>{c("Moment", "Moment")}</span>
                    <span className="tabular-nums">{String(idx + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-4">
                    <span className="font-serif italic text-3xl md:text-4xl text-background tabular-nums">{frames[idx].time}</span>
                    <span className="text-background/90 text-sm md:text-base max-w-[24ch] leading-snug">
                      {c(frames[idx].en, frames[idx].de)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary image, offset */}
              <div className="absolute -bottom-10 -left-8 md:-left-14 w-[42%] aspect-[3/4] rounded-[2px] overflow-hidden bg-alt-surface shadow-[0_30px_60px_-20px_rgba(20,30,40,0.4)] border border-background/60 hidden sm:block">
                <img src={frames[(idx + 2) % frames.length].img} alt="" className="absolute inset-0 h-full w-full object-cover" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>

              {/* Floating pause badge */}
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 grid place-items-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-background border border-border shadow-[0_20px_50px_-20px_rgba(20,30,40,0.4)]">
                <div className="flex flex-col items-center gap-1.5">
                  <span className="flex gap-1">
                    <span className="h-3 w-[3px] bg-ink rounded-full" />
                    <span className="h-3 w-[3px] bg-ink rounded-full" />
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.28em] text-faint-ink">{c("Pause", "Pause")}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Caption */}
          <div className="mt-12 flex items-baseline justify-between text-[10px] uppercase tracking-[0.28em] text-faint-ink">
            <span>{c("Fig. 01 · From the field", "Abb. 01 · Aus dem Feld")}</span>
            <span className="font-serif italic normal-case tracking-normal text-muted-ink">
              {c("Not a schedule. A shape.", "Kein Plan. Eine Form.")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ────────────────────────────────────────────────────────────────────────── */
/*  2. DAY FILMSTRIP, horizontal scroll of moments, editorial cinema         */
/* ────────────────────────────────────────────────────────────────────────── */

function DayFilmstrip() {
  const c = useCopy();
  const items = [
    { time: "09:12", en: "Before an important meeting", de: "Vor einem wichtigen Meeting", note: c("The room isn't ready. Neither are you.", "Der Raum ist nicht bereit. Du auch nicht."), img: imgMeeting, weight: 0.55 },
    { time: "10:47", en: "After a difficult conversation", de: "Nach einem schwierigen Gespräch", note: c("Words linger. The next task begins.", "Worte hallen nach. Die nächste Aufgabe beginnt."), img: imgCafe, weight: 0.7 },
    { time: "11:30", en: "Between back-to-back calls", de: "Zwischen aufeinanderfolgenden Calls", note: c("No pause. Only pivots.", "Keine Pause. Nur Wechsel."), img: imgStation, weight: 0.62 },
    { time: "13:05", en: "Facing a difficult decision", de: "Vor einer schwierigen Entscheidung", note: c("Every option looks partly right.", "Jede Option wirkt halb richtig."), img: imgTrain, weight: 0.78 },
    { time: "15:40", en: "Overwhelmed, mentally full", de: "Überfordert, gedanklich voll", note: c("Small tasks feel disproportionate.", "Kleine Dinge fühlen sich gross an."), img: imgCorridor, weight: 0.9 },
    { time: "18:20", en: "Unable to switch off after work", de: "Nach Feierabend nicht abschalten", note: c("You leave the office. It doesn't leave you.", "Du gehst. Es geht nicht mit."), img: imgDusk, weight: 0.82 },
  ];

  // The path — a calm SVG curve threading through the day.
  // Six points spread along x, gently rising/falling on y to visualise mounting residue.
  const W = 1200;
  const H = 320;
  const pts = items.map((m, i) => ({
    x: 80 + (i * (W - 160)) / (items.length - 1),
    y: H - 40 - m.weight * (H - 100),
  }));
  // Build a smooth cubic path through points
  const pathD = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const cx1 = prev.x + (p.x - prev.x) * 0.5;
    const cx2 = prev.x + (p.x - prev.x) * 0.5;
    return `${acc} C ${cx1} ${prev.y}, ${cx2} ${p.y}, ${p.x} ${p.y}`;
  }, "");

  const [active, setActive] = useState(0);
  const marker = pts[active];

  return (
    <section id="day" className="relative border-t border-border/60 overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-warm/10 to-transparent pointer-events-none" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-20 md:pt-28 pb-24 md:pb-32">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <Reveal className="lg:col-span-7">
            <SectionLabel n="01" label={c("A day, observed", "Ein Tag, beobachtet")} />
            <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("The workday is calm, ", "Der Arbeitstag ist ruhig, ")}</span>
              <span className="font-serif italic text-accent-green">{c("until", "bis")}</span>{" "}
              <span className="font-serif italic">{c("it isn't.", "er es nicht mehr ist.")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-ink leading-relaxed">
              {c(
                "Almost no one struggles across an entire day. They struggle in specific moments, moments most calendars never mark. The residue of one carries silently into the next.",
                "Fast niemand ringt einen ganzen Tag lang. Menschen ringen in bestimmten Momenten, die kein Kalender einträgt. Der Rückstand eines Moments zieht leise in den nächsten.",
              )}
            </p>
          </Reveal>
        </div>

        {/* Meta strip */}
        <div className="mt-14 md:mt-16 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-faint-ink">
          <span>{c("Field flow · 06 moments", "Feldfluss · 06 Momente")}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="tabular-nums">09:00 → 19:00</span>
        </div>

        {/* The visible flow — desktop / tablet SVG */}
        <div className="mt-8 relative rounded-2xl border border-border/70 bg-background/40 overflow-hidden hidden md:block">
          {/* Grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Flow SVG */}
          <div className="relative w-full">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[280px] md:h-[340px]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--warm)" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <line x1="0" y1={H - 40} x2={W} y2={H - 40} stroke="var(--border)" strokeWidth="1" />
              <path d={pathD} fill="none" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />
              <path
                d={pathD}
                fill="none"
                stroke="url(#flow-grad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {pts.map((p, i) => (
                <g key={i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0} className="cursor-pointer">
                  <line x1={p.x} y1={p.y} x2={p.x} y2={H - 40} stroke="var(--border)" strokeWidth="1" opacity={active === i ? 0.9 : 0.45} />
                  <text x={p.x} y={H - 20} textAnchor="middle" className="fill-faint-ink" style={{ font: "italic 500 13px 'Instrument Serif', serif" }}>
                    {items[i].time}
                  </text>
                  <circle cx={p.x} cy={p.y} r={active === i ? 7 : 5} fill={active === i ? "var(--accent-green)" : "var(--warm)"} stroke="var(--background)" strokeWidth="2" />
                  <text x={p.x} y={p.y - 14} textAnchor="middle" className="fill-faint-ink" style={{ font: "500 9px 'Inter', sans-serif", letterSpacing: "2px", textTransform: "uppercase" }}>
                    0{i + 1}
                  </text>
                </g>
              ))}
              <g>
                <circle cx={marker.x} cy={marker.y} r="12" fill="var(--accent-green)" opacity="0.16" />
                <circle cx={marker.x} cy={marker.y} r="4" fill="var(--accent-green)" />
              </g>
            </svg>
          </div>

          {/* Bottom axis captions */}
          <div className="relative border-t border-border/70 grid grid-cols-6 text-[10px] uppercase tracking-[0.24em] text-faint-ink">
            {items.map((m, i) => (
              <button
                key={m.time}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`px-3 py-3 text-left border-r border-border/60 last:border-r-0 transition-colors ${
                  active === i ? "bg-soft-green/40 text-ink" : "hover:bg-surface/60"
                }`}
              >
                <div className="tabular-nums">0{i + 1}</div>
                <div className="mt-1 font-serif italic normal-case tracking-normal text-sm text-ink/80 truncate">{c(m.en, m.de)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile flow — vertical timeline, legible on small screens */}
        <div className="mt-8 md:hidden rounded-2xl border border-border/70 bg-background/40 overflow-hidden">
          <div className="relative">
            {items.map((m, i) => {
              const isActive = active === i;
              return (
                <button
                  key={m.time}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative w-full flex items-start gap-4 text-left px-5 py-4 border-b border-border/60 last:border-b-0 transition-colors ${
                    isActive ? "bg-soft-green/40" : "hover:bg-surface/60"
                  }`}
                >
                  {/* Rail */}
                  <div className="relative flex flex-col items-center shrink-0 pt-1">
                    <span
                      className={`h-3 w-3 rounded-full border-2 border-background ${
                        isActive ? "bg-accent-green" : "bg-warm"
                      }`}
                    />
                    {i < items.length - 1 && (
                      <span className="mt-1 h-10 w-px bg-border" aria-hidden />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-serif italic text-lg text-ink tabular-nums">{m.time}</span>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-faint-ink tabular-nums">0{i + 1}/06</span>
                    </div>
                    <div className={`mt-1 text-sm leading-snug ${isActive ? "text-ink" : "text-muted-ink"}`}>
                      {c(m.en, m.de)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active moment detail */}
        <div className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <img src={items[active].img} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-background/85">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                {c("Field note", "Feldnotiz")} · {String(active + 1).padStart(2, "0")}/06
              </div>
              <div className="absolute inset-x-5 bottom-5 text-background">
                <div className="font-serif italic text-4xl leading-none tabular-nums">{items[active].time}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">
                  {c("Moment", "Moment")} · 0{active + 1}
                </div>
                <h3 className="mt-3 text-3xl md:text-5xl font-light text-ink leading-[1.05] tracking-[-0.01em]">
                  {c(items[active].en, items[active].de)}
                </h3>
                <p className="mt-6 font-serif italic text-xl md:text-2xl text-muted-ink leading-snug max-w-2xl">
                  "{items[active].note}"
                </p>

                <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg">
                  <div className="border-t border-border/70 pt-3">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">{c("Weight", "Gewicht")}</div>
                    <div className="mt-1 font-serif italic text-2xl text-ink tabular-nums">
                      {Math.round(items[active].weight * 100)}
                    </div>
                  </div>
                  <div className="border-t border-border/70 pt-3">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">{c("Named by", "Benannt von")}</div>
                    <div className="mt-1 font-serif italic text-2xl text-ink">Bridge</div>
                  </div>
                  <div className="border-t border-border/70 pt-3">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">{c("Response", "Antwort")}</div>
                    <div className="mt-1 font-serif italic text-2xl text-ink">{c("< 2 min", "< 2 Min")}</div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Closing line */}
        <Reveal className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-8 items-start border-t border-border/70 pt-10">
          <div className="lg:col-span-1 hidden lg:block">
            <span className="font-serif text-6xl text-warm/40 leading-none">"</span>
          </div>
          <p className="lg:col-span-8 font-serif italic text-2xl md:text-3xl leading-snug text-ink">
            {c(
              "The residue of one moment carries into the next. And the next. Until the whole day carries it.",
              "Der Rückstand eines Moments trägt in den nächsten. Und den nächsten. Bis der ganze Tag ihn trägt.",
            )}
          </p>
          <div className="lg:col-span-3 pt-2 text-[11px] uppercase tracking-[0.28em] text-faint-ink">
            {c("Observation → Design brief", "Beobachtung → Entwurfsauftrag")}
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ────────────────────────────────────────────────────────────────────────── */
/*  3. RESPONSES TRIPTYCH, three vertical "receipts", each ending in a gap   */
/* ────────────────────────────────────────────────────────────────────────── */

function ResponsesTriptych() {
  const c = useCopy();
  const cols = [
    {
      num: "01",
      title: c("Push through", "Durchhalten"),
      body: c(
        "Ignore it. Carry the tension into the next meeting, the next task, the drive home. Silent, invisible, cumulative.",
        "Ignorieren. Die Anspannung ins nächste Meeting, in die nächste Aufgabe, nach Hause tragen. Leise, unsichtbar, aufaddierend.",
      ),
      tag: c("Most common", "Am häufigsten"),
      pct: 68,
    },
    {
      num: "02",
      title: c("Search randomly", "Wahllos suchen"),
      body: c(
        "Open Spotify. Scroll YouTube. Try a meditation app. Skip through breathing videos. Too much choice, too little context.",
        "Spotify öffnen. YouTube durchscrollen. Eine Meditations-App öffnen. Atemvideos überspringen. Zu viel Auswahl, zu wenig Kontext.",
      ),
      tag: c("Familiar", "Vertraut"),
      pct: 24,
    },
    {
      num: "03",
      title: c("Professional support", "Professionelle Unterstützung"),
      body: c(
        "Helpful and important, but not available in the exact moment a difficult one appears. It serves a different, longer purpose.",
        "Hilfreich und wichtig, aber nicht verfügbar in genau dem Moment, in dem ein schwieriger auftaucht. Sie erfüllt einen anderen, längeren Zweck.",
      ),
      tag: c("A different purpose", "Anderer Zweck"),
      pct: 8,
    },
  ];

  return (
    <section id="responses" className="relative border-t border-border/60 bg-surface/40">
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <SectionLabel n="02" label={c("What people do today", "Was Menschen heute tun")} />
            <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("Three responses. ", "Drei Reaktionen. ")}</span>
              <span className="font-serif italic">{c("One gap.", "Eine Lücke.")}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-ink leading-relaxed">
              {c(
                "When a moment arrives, most people default to one of three responses. None of them were designed for this.",
                "Wenn ein Moment kommt, greifen die meisten auf eine von drei Reaktionen zurück. Keine davon wurde dafür gemacht.",
              )}
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-6 lg:gap-8">
          {cols.map((col, i) => (
            <Reveal key={col.num} delay={i * 0.08}>
              <article className="relative h-full bg-background border border-border rounded-2xl overflow-hidden group hover:border-ink/30 transition-colors">
                {/* Bulb accent, top-right */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">{col.tag}</span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-warm/30" />
                    <span className="relative h-2 w-2 rounded-full bg-warm" />
                  </span>
                </div>

                <div className="p-8 md:p-10">
                  <span className="font-serif italic text-[64px] leading-none text-ink/10 block">{col.num}</span>

                  <h3 className="mt-6 text-3xl md:text-4xl font-light text-ink leading-tight">{col.title}</h3>
                  <p className="mt-5 text-muted-ink leading-relaxed">{col.body}</p>

                  {/* Prevalence bar */}
                  <div className="mt-12">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-faint-ink">{c("Observed", "Beobachtet")}</span>
                      <span className="font-serif italic text-3xl text-ink tabular-nums">{col.pct}<span className="text-lg text-faint-ink">%</span></span>
                    </div>
                    <div className="mt-3 h-[3px] w-full bg-border/60 rounded-full relative overflow-hidden">
                      <div className="absolute left-0 top-0 h-full bg-accent-green rounded-full" style={{ width: `${col.pct}%` }} />
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-warm/80">
                      <span className="h-px w-6 bg-warm/50" />
                      {c("Doesn't close the distance", "Schließt den Abstand nicht")}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>


        <Reveal delay={0.2}>
          <div className="mt-20 md:mt-28 max-w-3xl">
            <p className="font-serif italic text-3xl md:text-4xl text-ink leading-snug">
              {c(
                "None of them close the distance between the moment and the support.",
                "Keine schließt den Abstand zwischen Moment und Halt.",
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  4. INTRO SEAL, a circular concentric mark with 4 orbiting principles     */
/* ────────────────────────────────────────────────────────────────────────── */

function IntroSeal() {
  const c = useCopy();
  const pillars = [
    {
      k: c("Built Around Moments", "Rund um Momente gebaut"),
      b: c(
        "Bridge starts with the real moments of your day, not a library of generic sessions.",
        "Bridge beginnt mit den echten Momenten deines Tages, nicht mit einer Bibliothek generischer Sitzungen.",
      ),
    },
    {
      k: c("Designed as Experiences", "Als Erlebnisse gestaltet"),
      b: c(
        "Every moment combines audio, breathing, visuals and interaction into one intentional experience.",
        "Jeder Moment verbindet Audio, Atem, Bild und Interaktion zu einem bewussten Erlebnis.",
      ),
    },
    {
      k: c("Adapts Naturally", "Passt sich natürlich an"),
      b: c(
        "Bridge quietly learns which moments matter most and makes them easier to return to over time.",
        "Bridge lernt leise, welche Momente am wichtigsten sind, und macht sie mit der Zeit leichter erreichbar.",
      ),
    },
    {
      k: c("Fits Into Work", "Fügt sich in die Arbeit"),
      b: c(
        "Short experiences designed to fit naturally between meetings, tasks and everyday transitions.",
        "Kurze Erlebnisse, gemacht, um zwischen Meetings, Aufgaben und Übergängen des Alltags Platz zu finden.",
      ),
    },
  ];

  const [active, setActive] = useState(0);
  // Bridge geometry — viewBox 0 0 800 220
  // Anchors span the full viewBox width so pillar columns align cleanly beneath.
  // For a symmetric quadratic Bezier with anchors at y=200 and apex at (400,40),
  // x(t) is linear in t → station t = column-center fraction. No overlap math needed.
  const VBW = 800;
  const VBH = 220;
  const anchorL = { x: 0, y: 200 };
  const anchorR = { x: VBW, y: 200 };
  const apex = { x: VBW / 2, y: 40 };
  const arcPoint = (t: number) => ({
    x: (1 - t) * (1 - t) * anchorL.x + 2 * (1 - t) * t * apex.x + t * t * anchorR.x,
    y: (1 - t) * (1 - t) * anchorL.y + 2 * (1 - t) * t * apex.y + t * t * anchorR.y,
  });
  // Column centres → 12.5%, 37.5%, 62.5%, 87.5% → matches 4-col grid centres exactly.
  const stationT = [0.125, 0.375, 0.625, 0.875];
  const stations = stationT.map(arcPoint);
  const activePt = stations[active];
  const { ref: arcRef, progress: arcProgress } = useScrollProgress<HTMLDivElement>({ start: 0.05, end: 0.6 });

  return (
    <section id="bridge" ref={arcRef} className="relative border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-60 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <div className="max-w-3xl">
          <SectionLabel n="03" label={c("This is Bridge", "Das ist Bridge")} />
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-ink">
            <span className="font-light">{c("A connected ", "Ein verbundenes ")}</span>
            <span className="font-serif italic text-accent-green">{c("experience", "Erlebnis")}</span>
            <span className="font-light">{c(", not a ", ", keine ")}</span>
            <span className="font-serif italic">{c("catalogue.", "Bibliothek.")}</span>
          </h2>
          <p className="mt-8 text-base md:text-lg text-muted-ink leading-relaxed max-w-2xl">
            {c(
              "Bridge is built around the real moments of the working day. Each moment is a short, guided experience — audio, breath, image and interaction — designed to help you recognise where you are and return with a little more clarity.",
              "Bridge ist um die echten Momente des Arbeitstags gebaut. Jeder Moment ist ein kurzes, geführtes Erlebnis — Audio, Atem, Bild und Interaktion — das dir hilft, deinen Zustand zu erkennen und mit etwas mehr Klarheit zurückzukehren.",
            )}
          </p>
        </div>

        {/* DESKTOP / TABLET: arc + aligned 4-col pillar grid */}
        <div className="hidden md:block mt-16 md:mt-24 mx-auto w-full max-w-4xl lg:max-w-5xl">
          <div className="relative">
            <svg viewBox={`0 0 ${VBW} ${VBH}`} className="block w-full h-auto" aria-hidden preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="bridge-arc-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--accent-green)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Horizon */}
              <line x1="0" y1="200" x2={VBW} y2="200" stroke="var(--border)" strokeWidth="1" opacity="0.6" />

              {/* Dashed guide arc */}
              <path
                d={`M ${anchorL.x} ${anchorL.y} Q ${apex.x} ${apex.y} ${anchorR.x} ${anchorR.y}`}
                fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 5" opacity="0.7"
              />

              {/* Suspenders */}
              {Array.from({ length: 30 }).map((_, i) => {
                const t = (i + 1) / 32;
                const p = arcPoint(t);
                return (
                  <line key={"s" + i} x1={p.x} y1={p.y} x2={p.x} y2={200}
                    stroke="var(--border)" strokeWidth="0.75" opacity="0.25" />
                );
              })}

              {/* Progress arc glow + line (draws in as you scroll) */}
              <path
                d={`M ${anchorL.x} ${anchorL.y} Q ${apex.x} ${apex.y} ${anchorR.x} ${anchorR.y}`}
                fill="none" stroke="var(--accent-green)" strokeWidth="10" opacity={0.16 * arcProgress}
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - arcProgress}
              />
              <path
                d={`M ${anchorL.x} ${anchorL.y} Q ${apex.x} ${apex.y} ${anchorR.x} ${anchorR.y}`}
                fill="none" stroke="url(#bridge-arc-grad)" strokeWidth="2.4" strokeLinecap="round"
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - arcProgress}
              />

              {/* Stations */}
              {stations.map((pt, i) => (
                <g key={"st" + i}>
                  <line
                    x1={pt.x} y1={pt.y} x2={pt.x} y2={200}
                    stroke={active === i ? "var(--accent-green)" : "var(--border)"}
                    strokeWidth={active === i ? 1.4 : 1}
                    opacity={active === i ? 0.85 : 0.5}
                    style={{ transition: "all 500ms ease" }}
                  />
                  <circle
                    cx={pt.x} cy={pt.y} r={active === i ? 8 : 5}
                    fill={active === i ? "var(--accent-green)" : "var(--surface)"}
                    stroke="var(--accent-green)" strokeWidth="1.6"
                    style={{ transition: "all 500ms ease" }}
                  />
                  <text
                    x={pt.x} y={pt.y - 18} textAnchor="middle"
                    className={active === i ? "fill-accent-green" : "fill-faint-ink"}
                    style={{ fontSize: 14, letterSpacing: "0.24em", transition: "fill 500ms ease" }}
                  >
                    {`0${i + 1}`}
                  </text>
                  <line
                    x1={pt.x - 8} y1={200} x2={pt.x + 8} y2={200}
                    stroke={active === i ? "var(--accent-green)" : "var(--ink)"}
                    strokeWidth={active === i ? 1.6 : 1}
                    opacity={active === i ? 1 : 0.65}
                    style={{ transition: "all 500ms ease" }}
                  />
                </g>
              ))}

              {/* Traveller */}
              <g transform={`translate(${activePt.x} ${activePt.y})`}>
                <circle r="14" fill="none" stroke="var(--accent-green)" strokeWidth="1" opacity="0.35" />
                <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" />
              </g>
            </svg>

            {/* Endpoint marginalia */}
            <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.28em] text-faint-ink">
              <span>{c("Recognise", "Erkennen")}</span>
              <span>{c("Return", "Zurück")}</span>
            </div>

            {/* 4-col pillar grid aligned to stations */}
            <div className="mt-8 grid grid-cols-4 gap-4 lg:gap-6">
              {pillars.map((p, i) => (
                <button
                  key={p.k}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`text-left border-t pt-3 transition-colors ${
                    active === i ? "border-accent-green" : "border-border"
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-serif italic text-base lg:text-lg transition-colors ${
                        active === i ? "text-accent-green" : "text-ink/40"
                      }`}
                    >{`0${i + 1}`}</span>
                    <h3 className="text-sm lg:text-base text-ink leading-tight">{p.k}</h3>
                  </div>
                  <p className="mt-2 text-xs lg:text-sm text-muted-ink leading-relaxed">{p.b}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: compact arc + stacked pillars */}
        <div className="md:hidden mt-12">
          <svg viewBox={`0 0 ${VBW} 180`} className="block w-full h-auto" aria-hidden>
            <defs>
              <linearGradient id="bridge-arc-grad-m" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.25" />
                <stop offset="50%" stopColor="var(--accent-green)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <line x1="0" y1="160" x2={VBW} y2="160" stroke="var(--border)" strokeWidth="1" opacity="0.6" />
            <path
              d={`M 0 160 Q 400 20 800 160`}
              fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 5" opacity="0.7"
            />
            <path
              d={`M 0 160 Q 400 20 800 160`}
              fill="none" stroke="url(#bridge-arc-grad-m)" strokeWidth="3" strokeLinecap="round"
              pathLength={1} strokeDasharray={1} strokeDashoffset={1 - arcProgress}
            />
            {stationT.map((t, i) => {
              const x = 800 * t;
              const y = (1 - t) * (1 - t) * 160 + 2 * (1 - t) * t * 20 + t * t * 160;
              return (
                <g key={"mst" + i}>
                  <circle cx={x} cy={y} r={active === i ? 10 : 6}
                    fill={active === i ? "var(--accent-green)" : "var(--surface)"}
                    stroke="var(--accent-green)" strokeWidth="1.8"
                    style={{ transition: "all 500ms ease" }} />
                  <text x={x} y={y - 18} textAnchor="middle"
                    className={active === i ? "fill-accent-green" : "fill-faint-ink"}
                    style={{ fontSize: 18, letterSpacing: "0.24em" }}
                  >{`0${i + 1}`}</text>
                </g>
              );
            })}
          </svg>

          <ul className="mt-8 space-y-6">
            {pillars.map((p, i) => (
              <li key={p.k}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full text-left border-t pt-4 transition-colors ${
                    active === i ? "border-accent-green" : "border-border"
                  }`}
                >
                  <div className="flex items-baseline gap-3">
                    <span className={`font-serif italic text-xl transition-colors ${
                      active === i ? "text-accent-green" : "text-ink/40"
                    }`}>{`0${i + 1}`}</span>
                    <h3 className="text-base text-ink">{p.k}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-ink leading-relaxed">{p.b}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


/* ────────────────────────────────────────────────────────────────────────── */
/*  5. BRIDGE BLUEPRINT, a literal, editorial bridge diagram                 */
/* ────────────────────────────────────────────────────────────────────────── */

function BridgeBlueprint() {

  const c = useCopy();
  const { ref: bpRef, progress: bpProgress } = useScrollProgress<HTMLDivElement>({ start: 0.1, end: 0.7 });

  return (
    <section className="relative border-t border-border/60">
      <div ref={bpRef} className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6">
            <SectionLabel n="04" label={c("The real challenge", "Die eigentliche Herausforderung")} />
            <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("The distance between ", "Der Abstand zwischen ")}</span>
              <span className="font-serif italic">{c("a difficult moment", "einem schwierigen Moment")}</span>{" "}
              <span className="font-light">{c("and the ", "und dem ")}</span>
              <span className="font-serif italic text-accent-green">{c("next one.", "nächsten.")}</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-muted-ink leading-relaxed">
              {c(
                "People rarely fail because support doesn't exist. They struggle because support rarely appears when it is actually needed. The real challenge is timing, context and relevance, reducing the distance between experiencing a difficult moment and receiving something that meaningfully helps.",
                "Menschen scheitern selten daran, dass es keinen Halt gibt. Sie ringen, weil Halt selten dann auftaucht, wenn er wirklich gebraucht wird. Die eigentliche Herausforderung ist Timing, Kontext und Relevanz, den Abstand zwischen einem schwierigen Moment und wirksamer Unterstützung zu verkürzen.",
              )}
            </p>
          </div>
        </div>

        {/* Blueprint */}
        <div className="mt-16 md:mt-24 relative mx-auto w-full max-w-4xl lg:max-w-5xl">
          <div className="rounded-3xl border border-border bg-surface/30 p-4 sm:p-6 md:p-10 relative overflow-hidden">
            {/* Grid backdrop */}
            <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
              <defs>
                <pattern id="bp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="var(--border)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bp-grid)" />
            </svg>

            <svg viewBox="0 0 1000 500" className="relative w-full h-auto" preserveAspectRatio="xMidYMid meet">
              {/* Two banks */}
              <path d="M0,340 L200,340 L220,360 L0,360 Z" fill="var(--warm)" opacity="0.15" />
              <path d="M780,340 L1000,340 L1000,360 L800,360 Z" fill="var(--soft-green)" opacity="0.9" />
              <line x1="0" y1="340" x2="200" y2="340" stroke="var(--warm)" strokeWidth="1.2" />
              <line x1="800" y1="340" x2="1000" y2="340" stroke="var(--accent-green)" strokeWidth="1.2" />

              {/* Bank labels */}
              <text x="20" y="395" fontSize="28" fill="var(--faint-ink)" fontFamily="Inter" letterSpacing="3">
                {c("THIS MOMENT", "DIESER MOMENT")}
              </text>
              <text x="980" y="395" fontSize="28" fill="var(--accent-green)" fontFamily="Inter" letterSpacing="3" textAnchor="end">
                {c("NEXT MOMENT", "NÄCHSTER MOMENT")}
              </text>

              {/* Water / distance */}
              {Array.from({ length: 12 }).map((_, i) => (
                <line
                  key={i}
                  x1={220 + i * 48} y1={440 - (i % 2) * 6}
                  x2={220 + i * 48 + 24} y2={440 - (i % 2) * 6}
                  stroke="var(--muted-ink)" strokeWidth="1" opacity="0.3"
                />
              ))}

              {/* Meandering "usual" path */}
              <path
                d="M180,340 C 280,120 380,460 500,220 C 600,20 700,440 820,340"
                fill="none" stroke="var(--muted-ink)" strokeWidth="1.8" strokeDasharray="6 8" opacity="0.55"
              />
              {/* Subtle "usual path" label — sits along the gray line */}
              <text x="500" y="100" fontSize="20" fill="var(--muted-ink)" fontFamily="var(--font-serif)" fontStyle="italic" textAnchor="middle" opacity="0.7">
                {c("usual path", "üblicher Weg")}
              </text>

              {/* Bridge, pylons + deck + suspension */}
              <g>
                {/* Pylons */}
                <line x1="320" y1="340" x2="320" y2="180" stroke="var(--ink)" strokeWidth="2" />
                <line x1="680" y1="340" x2="680" y2="180" stroke="var(--ink)" strokeWidth="2" />
                {/* Pylon tops */}
                <circle cx="320" cy="180" r="4" fill="var(--ink)" />
                <circle cx="680" cy="180" r="4" fill="var(--ink)" />
                {/* Main cable (parabola) */}
                <path
                  d="M200,340 C 320,180 680,180 800,340"
                  fill="none" stroke="var(--accent-green)" strokeWidth="2.2" strokeLinecap="round"
                  pathLength={1} strokeDasharray={1} strokeDashoffset={1 - bpProgress}
                />
                {/* Deck */}
                <path
                  d="M200,340 L800,340"
                  fill="none" stroke="var(--accent-green)" strokeWidth="3" strokeLinecap="round"
                  pathLength={1} strokeDasharray={1} strokeDashoffset={1 - bpProgress}
                />
                {/* Suspension lines */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const t = i / 10;
                  const x = 200 + t * 600;
                  const cableY = 340 - Math.sin(t * Math.PI) * 160;
                  return (
                    <line key={i} x1={x} y1={cableY} x2={x} y2={340} stroke="var(--accent-green)" strokeWidth="0.8" opacity="0.6" />
                  );
                })}

              </g>

              {/* Subtle "with Bridge" label — floats above the deck */}
              <text x="500" y="315" fontSize="22" fill="var(--accent-green)" fontFamily="var(--font-serif)" fontStyle="italic" textAnchor="middle">
                {c("with Bridge", "mit Bridge")}
              </text>
            </svg>

            {/* Legend chips */}
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-2 md:gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.28em] text-faint-ink">
              <span>{c("Right moment", "Richtiger Moment")}</span>
              <span className="text-center">{c("Right context", "Richtiger Kontext")}</span>
              <span className="text-right text-accent-green">{c("Less friction", "Weniger Reibung")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  6. DEVICE PREVIEW, 4 steps as an interactive phone-frame mockup          */
/* ────────────────────────────────────────────────────────────────────────── */

function DevicePreview() {
  const c = useCopy();
  const steps = [
    {
      num: "01",
      title: c("Recognise the moment", "Den Moment erkennen"),
      body: c("You notice a moment worth attending to, before a meeting, after a call, between contexts.", "Du bemerkst einen Moment, der Aufmerksamkeit verdient, vor einem Meeting, nach einem Call, zwischen Kontexten."),
    },
    {
      num: "02",
      title: c("Understand what you're experiencing", "Verstehen, was gerade ist"),
      body: c("Bridge helps name the state you're in. Naming it is where the shift begins.", "Bridge hilft, den Zustand zu benennen, in dem du bist. Mit der Benennung beginnt die Verschiebung."),
    },
    {
      num: "03",
      title: c("Receive a curated response", "Eine kuratierte Antwort erhalten"),
      body: c("A short, carefully selected response, chosen for this moment, not pulled from a search bar.", "Eine kurze, sorgfältig gewählte Antwort, für diesen Moment ausgewählt, nicht aus einer Suchleiste gezogen."),
    },
    {
      num: "04",
      title: c("Return to your day", "Zurück in den Tag"),
      body: c("You close the app and continue, with a little more composure than you arrived with.", "Du schließt die App und machst weiter, mit etwas mehr Fassung, als du gekommen bist."),
    },
  ];
  const [step, setStep] = useState(0);

  return (
    <section id="how" className="relative border-t border-border/60 bg-surface/40 overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-40">
        {/* Header with a small bulb-lit bridge arc */}
        <div className="grid lg:grid-cols-12 gap-6 items-end mb-12 md:mb-20">
          <div className="lg:col-span-8">
            <SectionLabel n="05" label={c("How Bridge works", "Wie Bridge funktioniert")} />
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("Four steps. ", "Vier Schritte. ")}</span>
              <span className="font-serif italic">{c("A structured response.", "Eine strukturierte Antwort.")}</span>
            </h2>
            <p className="mt-6 text-muted-ink leading-relaxed max-w-xl">
              {c(
                "Bridge follows the same repeatable pattern every time, so that in a moment of pressure, there is nothing to figure out.",
                "Bridge folgt jedes Mal dem gleichen Muster, damit im Moment des Drucks nichts zu klären ist.",
              )}
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end">
            <BulbArc active={step} total={steps.length} />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Step selector list */}
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li key={s.num}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    className={`w-full text-left flex items-start gap-5 p-4 rounded-xl border transition-all ${
                      step === i ? "bg-background border-accent-green/40 shadow-sm" : "bg-transparent border-transparent hover:bg-background/60"
                    }`}
                  >
                    <span className={`mt-1 font-serif italic text-2xl transition-colors ${step === i ? "text-accent-green" : "text-ink/25"}`}>{s.num}</span>
                    <div className="flex-1">
                      <div className={`text-base md:text-lg transition-colors ${step === i ? "text-ink" : "text-muted-ink"}`}>{s.title}</div>
                      {step === i && <p className="text-sm text-muted-ink leading-relaxed mt-2">{s.body}</p>}
                    </div>
                  </button>
                </li>
              ))}
            </ol>

            {/* Mobile-only supporting vignettes */}
            <div className="mt-10 lg:hidden">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-faint-ink mb-4">
                <span className="h-px flex-1 bg-border" />
                <span>{c("Moments Bridge holds", "Momente, die Bridge trägt")}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { img: imgMeeting, t: "09:12", l: c("Before a meeting", "Vor einem Meeting") },
                  { img: imgStation, t: "11:30", l: c("Between calls", "Zwischen Calls") },
                  { img: imgCorridor, t: "15:40", l: c("Mentally full", "Gedanklich voll") },
                  { img: imgDusk, t: "18:20", l: c("End of day", "Ende des Tages") },
                ].map((v) => (
                  <div key={v.t} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border">
                    <img src={v.img} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                    <div className="absolute left-2.5 bottom-2.5 right-2.5 text-background">
                      <div className="font-serif italic text-base text-warm">{v.t}</div>
                      <div className="text-[11px] leading-tight opacity-90">{v.l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Device */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
            <DeviceFrame step={step} />
          </div>
        </div>
      </div>
    </section>
  );
}

function BulbArc({ active, total }: { active: number; total: number }) {
  return (
    <div className="w-full max-w-[280px]">
      <svg viewBox="0 0 280 90" className="w-full h-auto">
        <path
          d="M10,78 C 70,10 210,10 270,78"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <line x1="10" y1="78" x2="270" y2="78" stroke="var(--border)" strokeWidth="1" />
        {Array.from({ length: total }).map((_, i) => {
          const t = total === 1 ? 0.5 : i / (total - 1);
          const x = 10 + t * 260;
          const y = 78 - Math.sin(t * Math.PI) * 68;
          const isActive = i === active;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x} y2={78} stroke="var(--border)" strokeWidth="0.6" />
              {isActive && (
                <circle cx={x} cy={y} r="8" fill="var(--accent-green)" opacity="0.18" />
              )}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 3.6 : 2.4}
                fill={isActive ? "var(--accent-green)" : "var(--border)"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}


function DeviceFrame({ step }: { step: number }) {
  const c = useCopy();
  return (
    <div className="relative">
      <div className="absolute -inset-8 ambient-glow opacity-70 pointer-events-none rounded-[3rem]" />
      <div className="relative w-[300px] md:w-[340px] aspect-[9/19] rounded-[46px] bg-ink p-3 shadow-2xl">
        {/* Screen */}
        <div className="relative w-full h-full rounded-[36px] bg-background overflow-hidden">
          {/* status bar */}
          <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-6 text-[10px] text-ink/60 z-20">
            <span>14:20</span>
            <span className="h-4 w-16 rounded-full bg-ink/85" />
            <span>·····</span>
          </div>

          <div className="absolute inset-0 pt-14 px-6 pb-8 flex flex-col">
              {step === 0 && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">{c("Notice", "Bemerken")}</div>
                  <div className="mt-4 font-serif italic text-3xl text-ink leading-tight">
                    {c("A moment", "Ein Moment")}<br />
                    <span className="text-accent-green">{c("worth attending to.", "der Aufmerksamkeit verdient.")}</span>
                  </div>
                  <div className="mt-auto space-y-3">
                    {["09:12", "10:47", "11:30"].map((t, i) => (
                      <div key={t} className="flex items-center gap-3 border-t border-border pt-3">
                        <span className="font-serif italic text-lg text-accent-green">{t}</span>
                        <span className="text-xs text-muted-ink flex-1">{c("Before a meeting", "Vor einem Meeting")}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                      </div>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">{c("Name", "Benennen")}</div>
                  <div className="mt-4 font-serif italic text-2xl text-ink leading-snug">
                    {c("What are you feeling?", "Was fühlst du gerade?")}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[c("Under pressure", "Unter Druck"), c("Scattered", "Zerstreut"), c("Fatigued", "Erschöpft"), c("Uneasy", "Unruhig"), c("Focused", "Fokussiert")].map((chip, i) => (
                      <span
                        key={chip}
                        className={`text-xs px-3 py-1.5 rounded-full border ${i === 0 ? "bg-accent-green text-background border-accent-green" : "border-border text-ink"}`}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto rounded-2xl border border-border p-4">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">{c("Named", "Benannt")}</div>
                    <div className="mt-1 text-sm text-ink italic font-serif">"{c("Under pressure before a meeting.", "Unter Druck vor einem Meeting.")}"</div>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">{c("Response", "Antwort")}</div>
                  <div className="mt-4 font-serif italic text-2xl text-ink leading-snug">
                    {c("A short reset.", "Ein kurzer Reset.")}
                  </div>
                  <div className="mt-5 relative rounded-2xl overflow-hidden aspect-[4/5] border border-border">
                    <img src={imgCorridor} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <div className="absolute left-3 top-3 text-background/85 text-[9px] tracking-[0.22em] uppercase">02:12</div>
                    <div className="absolute left-3 right-3 bottom-3 text-background">
                      <div className="font-serif italic text-lg">{c("Settle before you begin.", "Ankommen, bevor du beginnst.")}</div>
                    </div>
                    <div className="absolute left-3 right-3 bottom-3 h-0.5 bg-background/30">
                      <span className="block h-full w-2/3 bg-background/70" />
                    </div>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">{c("Continue", "Weiter")}</div>
                  <div className="mt-4 font-serif italic text-2xl text-ink leading-snug">
                    {c("Back to your day.", "Zurück in deinen Tag.")}
                  </div>
                  <div className="mt-auto flex flex-col items-center justify-center flex-1 gap-6">
                    <div className="h-24 w-24 rounded-full bg-accent-green/20 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-accent-green" />
                    </div>
                    <div className="text-center text-sm text-muted-ink italic font-serif max-w-[200px]">
                      {c("A little more composure than you arrived with.", "Etwas mehr Fassung, als du gekommen bist.")}
                    </div>
                  </div>
                </>
              )}
          </div>

          {/* dot indicator */}
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${step === i ? "w-6 bg-accent-green" : "w-1 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  7. PERSONAL HEATMAP, 30 days x moments, filling in over scroll           */
/* ────────────────────────────────────────────────────────────────────────── */

function PersonalHeatmap() {
  const c = useCopy();
  const days = 30;
  const rows = 6;

  // Precompute cell fills (stable per render)
  const cells = Array.from({ length: rows * days }).map((_, i) => {
    const dayIdx = i % days;
    const rowIdx = Math.floor(i / days);
    const base = (dayIdx / days) * 0.9;
    const recur = rowIdx === 2 ? 0.35 : rowIdx === 4 ? 0.2 : 0;
    const jitter = ((i * 9301 + 49297) % 233) / 233 * 0.35;
    return Math.min(1, base * 0.7 + recur + jitter * 0.4);
  });

  const { ref: hmRef, progress: hmProgress } = useScrollProgress<HTMLDivElement>({ start: 0.05, end: 0.75 });

  return (
    <section className="relative border-t border-border/60">
      <div ref={hmRef} className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <SectionLabel n="06" label={c("Personalisation", "Personalisierung")} />
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("Bridge becomes more useful ", "Bridge wird nützlicher ")}</span>
              <span className="font-serif italic">{c("over time.", "mit der Zeit.")}</span>
            </h2>
            <p className="mt-6 text-muted-ink leading-relaxed max-w-md">
              {c(
                "As it's used, Bridge gradually understands which moments occur most in your workday, what supports you best, and what you return to. The result is a system that quietly becomes more suited to the way your own days unfold.",
                "Mit der Nutzung versteht Bridge nach und nach, welche Momente in deinem Arbeitstag am häufigsten sind, was dir am meisten hilft und wozu du zurückkehrst. Das Ergebnis ist ein System, das leise besser zu deinen Tagen passt.",
              )}
            </p>

            <div className="mt-8 space-y-3">
              {[
                { l: c("Recurring situations recognised", "Wiederkehrende Situationen erkannt"), pct: 78 },
                { l: c("Routines understood", "Routinen verstanden"), pct: 62 },
                { l: c("Suggestions that fit", "Vorschläge, die passen"), pct: 91 },
              ].map((m) => (
                <div key={m.l} className="flex items-center gap-4 text-sm">
                  <span className="w-52 shrink-0 text-muted-ink">{m.l}</span>
                  <div className="flex-1 h-px bg-border relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-accent-green" style={{ width: `${m.pct}%` }} />
                  </div>
                  <span className="font-serif italic text-accent-green w-10 text-right tabular-nums">{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-border bg-surface/40 p-6 md:p-10">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-faint-ink">
                <span>{c("Same person · 30 days", "Gleiche Person · 30 Tage")}</span>
                <span>{c("Signals over time", "Signale mit der Zeit")}</span>
              </div>
              <HeatGrid cells={cells} days={days} progress={hmProgress} />
              <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-faint-ink">
                <div className="flex items-center gap-3">
                  <span>{c("Less relevant", "Weniger passend")}</span>
                  <div className="flex gap-1">
                    {[0.15, 0.35, 0.55, 0.75, 0.95].map((op) => (
                      <span key={op} className="h-2 w-2 rounded-sm bg-accent-green" style={{ opacity: op }} />
                    ))}
                  </div>
                  <span>{c("More relevant", "Passender")}</span>
                </div>
                <span className="text-accent-green">{c("Better fit", "Bessere Passung")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeatGrid({ cells, days, progress }: { cells: number[]; days: number; progress: number }) {
  const isMobile = useIsMobile();
  const cols = isMobile ? Math.ceil(days / 2) : days;
  return (
    <div
      className="mt-6 grid gap-1.5 sm:gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.map((v, i) => {
        const dayIdx = i % days;
        // Reveal cells column-by-column as scroll progresses
        const threshold = dayIdx / days;
        const local = Math.max(0, Math.min(1, (progress - threshold) * 4));
        return (
          <span
            key={i}
            className="aspect-square rounded-[3px] bg-accent-green"
            style={{ opacity: 0.05 + v * local }}
          />
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  8. PRINCIPLES BAND, editorial 3-column band, no cards                    */
/* ────────────────────────────────────────────────────────────────────────── */

function PrinciplesBand() {
  const c = useCopy();
  const pillars = [
    { n: "01", en: { title: "Curated", body: "A focused, carefully selected set of responses designed specifically for real workplace moments, not an open catalogue to browse.", tag: "Informed by wellbeing practice" }, de: { title: "Kuratiert", body: "Eine fokussierte, sorgfältig gewählte Reihe von Antworten, gezielt für reale Arbeitsmomente gestaltet, kein offener Katalog zum Stöbern.", tag: "Aus etablierter Praxis" } },
    { n: "02", en: { title: "Personal", body: "Bridge quietly adapts to the moments and rhythms of each individual, so support becomes more relevant with each use.", tag: "Grounded in behavioural science" }, de: { title: "Persönlich", body: "Bridge passt sich leise an die Momente und Rhythmen jeder Person an, sodass Halt mit jeder Nutzung passender wird.", tag: "Fundiert in Verhaltensforschung" } },
    { n: "03", en: { title: "Repeatable", body: "The same person moves through many difficult moments each week. Bridge is designed to be reached for again and again, the same way every time.", tag: "Evidence-informed design" }, de: { title: "Wiederholbar", body: "Dieselbe Person durchlebt viele schwierige Momente pro Woche. Bridge ist gemacht, immer wieder gegriffen zu werden, jedes Mal auf die gleiche Art.", tag: "Evidenz-informiert gestaltet" } },
  ];
  return (
    <section id="research" className="relative border-t border-border/60 bg-surface/40">
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="max-w-3xl">
          <SectionLabel n="07" label={c("What makes Bridge effective", "Was Bridge wirksam macht")} />
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-ink">
            <span className="font-light">{c("Support that fits ", "Halt, der zum ")}</span>
            <span className="font-serif italic">{c("the moment.", "Moment passt.")}</span>
          </h2>
          <p className="mt-6 text-muted-ink leading-relaxed max-w-xl">
            {c(
              "Bridge is built on three principles, informed by research on how people experience stress during work and by established wellbeing practices, designed for how the workday actually unfolds.",
              "Bridge ruht auf drei Prinzipien, informiert von Forschung dazu, wie Menschen Belastung im Arbeitsalltag erleben, und von etablierten Wohlbefindenspraktiken, gestaltet für den tatsächlichen Verlauf eines Arbeitstages.",
            )}
          </p>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-3 md:divide-x divide-border gap-y-2">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.1}>
              <div className={`${i === 0 ? "" : "md:pl-10"} ${i === 2 ? "" : "md:pr-10"} py-8 md:py-4`}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-accent-green">
                    <span className="h-1 w-1 rounded-full bg-accent-green" />
                    {c("Pillar", "Prinzip")} {p.n}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-6 text-3xl md:text-4xl font-light text-ink leading-tight">{c(p.en.title, p.de.title)}</h3>
                <p className="mt-4 text-muted-ink leading-relaxed">{c(p.en.body, p.de.body)}</p>
                <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-faint-ink">
                  <span className="h-1 w-1 rounded-full bg-accent-green" />
                  <span>{c(p.en.tag, p.de.tag)}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  9. LIBRARY FRAME, magazine-style wrap around the MomentExplorer          */
/* ────────────────────────────────────────────────────────────────────────── */

function LibraryFrame() {
  const c = useCopy();
  return (
    <section id="system" className="relative border-t border-border/60">
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <SectionLabel n="08" label={c("Moments library", "Moment-Bibliothek")} />
            <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("Support for the moments ", "Halt für die Momente, ")}</span>
              <span className="font-serif italic">{c("professionals experience every day.", "die Fachkräfte täglich erleben.")}</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted-ink leading-relaxed">
              {c(
                "A structured collection of moments, from the meeting that hasn't started to the message at 19:00. Each one paired with a curated response.",
                "Eine strukturierte Sammlung von Momenten, vom Meeting, das noch nicht begonnen hat, bis zur Nachricht um 19:00 Uhr. Jeder mit einer kuratierten Antwort verbunden.",
              )}
            </p>
          </div>
        </div>
        <div className="mt-16"><MomentExplorer /></div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  10. CURATION DIPTYCH, chaos grid vs curated list                         */
/* ────────────────────────────────────────────────────────────────────────── */

function CurationDiptych() {
  const c = useCopy();
  return (
    <section id="principles" className="relative border-t border-border/60 bg-surface/40">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-40">
        <div className="max-w-3xl">
          <SectionLabel n="09" label={c("Timing over search", "Timing statt Suche")} />
          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-ink">
            <span className="font-light">{c("Less searching. ", "Weniger suchen. ")}</span>
            <span className="font-serif italic">{c("More support.", "Mehr Halt.")}</span>
          </h2>
          <p className="mt-6 text-muted-ink leading-relaxed max-w-xl">
            {c(
              "When a difficult moment arrives, searching is the first thing that stops working. Bridge is structured so the right response is already there, matched to the moment, ready to reach for, the same way every time.",
              "Wenn ein schwieriger Moment kommt, hört Suchen als Erstes auf zu funktionieren. Bridge ist so strukturiert, dass die richtige Antwort schon da ist, auf den Moment abgestimmt, greifbar, jedes Mal auf die gleiche Art.",
            )}
          </p>
        </div>

        <div className="mt-12 md:mt-24 grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Chaos side */}
          <Reveal>
            <div className="relative rounded-3xl border border-border bg-background p-6 sm:p-8 md:p-10 h-full overflow-hidden">
              <div className="flex items-baseline justify-between gap-3">
                <div className="eyebrow">{c("Without Bridge", "Ohne Bridge")}</div>
                <span className="font-serif italic text-xl md:text-2xl text-ink/25 shrink-0">01</span>
              </div>
              <h3 className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-ink leading-tight">
                {c("A moment arrives. Then a decision to make.", "Ein Moment kommt. Und eine Entscheidung dazu.")}
              </h3>
              {/* Animated chaos grid */}
              <div className="mt-6 md:mt-8 grid grid-cols-8 gap-1 sm:gap-1.5">
                {Array.from({ length: 64 }).map((_, i) => (
                  <span
                    key={i}
                    className="aspect-square rounded-[3px] bg-muted-ink/15"
                    style={{ opacity: 0.18 + ((i * 17) % 35) / 100, backgroundColor: i % 5 === 0 ? "rgba(216,143,96,0.32)" : undefined }}
                  />
                ))}
              </div>
              <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.24em] md:tracking-[0.28em] text-faint-ink">
                <span>{c("Search", "Suche")}</span>
                <span className="h-px w-6 bg-border" />
                <span>{c("Choose", "Wählen")}</span>
                <span className="h-px w-6 bg-border" />
                <span>{c("Hope", "Hoffen")}</span>
              </div>
            </div>
          </Reveal>

          {/* Curated side */}
          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-accent-green/30 bg-background p-6 sm:p-8 md:p-10 h-full overflow-hidden">
              <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full ambient-glow opacity-80" />
              <div className="relative">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="eyebrow text-accent-green">Bridge</div>
                  <span className="font-serif italic text-xl md:text-2xl text-accent-green/40 shrink-0">02</span>
                </div>
                <h3 className="mt-4 text-xl sm:text-2xl md:text-3xl font-light text-ink leading-tight">
                  {c("A moment arrives. Support is already there.", "Ein Moment kommt. Halt ist schon da.")}
                </h3>
                <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
                  {[
                    { t: "09:12", l: c("Before a meeting", "Vor einem Meeting") },
                    { t: "10:47", l: c("After a difficult conversation", "Nach einem schwierigen Gespräch") },
                    { t: "13:05", l: c("Context switching", "Kontextwechsel") },
                    { t: "18:20", l: c("End of the workday", "Ende des Arbeitstags") },
                  ].map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 md:py-3 border-b border-border last:border-b-0"
                    >
                      <span className="font-serif italic text-base md:text-lg text-accent-green tabular-nums w-12 md:w-14 shrink-0">{row.t}</span>
                      <span className="text-ink text-xs sm:text-sm flex-1 min-w-0">{row.l}</span>
                      <span className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] text-accent-green shrink-0">{c("Ready", "Bereit")}</span>
                      <span className="sm:hidden h-1.5 w-1.5 rounded-full bg-accent-green shrink-0" aria-hidden />
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] uppercase tracking-[0.24em] md:tracking-[0.28em] text-accent-green">
                  <span>{c("Recognise", "Erkennen")}</span>
                  <span className="h-px w-6 bg-accent-green/40" />
                  <span>{c("Receive", "Empfangen")}</span>
                  <span className="h-px w-6 bg-accent-green/40" />
                  <span>{c("Continue", "Weitermachen")}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  11. FOUNDER CINEMA, cinematic full-bleed video block                     */
/* ────────────────────────────────────────────────────────────────────────── */

function FounderCinema() {
  const c = useCopy();
  const [playing, setPlaying] = useState(false);
  return (
    <section className="relative border-t border-border/60">
      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <SectionLabel n="10" label={c("Founder story", "Gründergeschichte")} />
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.02em] text-ink">
              <span className="font-light">{c("Why we built ", "Warum wir ")}</span>
              <span className="font-serif italic">{c("Bridge.", "Bridge gebaut haben.")}</span>
            </h2>
            <p className="mt-6 text-muted-ink leading-relaxed">
              {c(
                "Bridge wasn't created to become another meditation app. It was created after observing that most people don't struggle all day, they struggle during specific moments throughout the workday.",
                "Bridge wurde nicht gebaut, um noch eine Meditations-App zu werden. Es entstand aus der Beobachtung, dass die meisten nicht den ganzen Tag ringen, sie ringen in bestimmten Momenten des Arbeitstages.",
              )}
            </p>
            <p className="mt-4 text-muted-ink leading-relaxed">
              {c(
                "The moments before important conversations. After difficult meetings. Between constant context switching. At the end of demanding days. Those moments often determine how the rest of the day unfolds.",
                "Die Momente vor wichtigen Gesprächen. Nach schwierigen Meetings. Zwischen ständigem Kontextwechsel. Am Ende fordernder Tage. Diese Momente entscheiden oft darüber, wie der Rest des Tages verläuft.",
              )}
            </p>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-ink group">
                <img
                  src={imgStation}
                  alt={c("Founder video placeholder", "Platzhalter für Gründervideo")}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                {/* Frame ticks */}
                <div className="absolute inset-4 border border-background/15 rounded-2xl pointer-events-none" />
                {[["4","4"],["4","auto right-4"],["auto bottom-4","4"],["auto bottom-4","auto right-4"]].map((_, i) => (
                  <span key={i} className={`absolute h-3 w-3 border-background/60 ${
                    ["top-4 left-4 border-t border-l", "top-4 right-4 border-t border-r", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"][i]
                  }`} />
                ))}

                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-background/90 border border-background/60 shadow-xl transition-transform hover:scale-105"
                    aria-label={c("Play the founder story", "Gründergeschichte abspielen")}
                  >
                    <span className="absolute inset-0 rounded-full ring-1 ring-background/40" />
                    <svg viewBox="0 0 24 24" className="h-7 w-7 text-ink ml-1" fill="currentColor">
                      <path d="M6 4l14 8-14 8V4z" />
                    </svg>
                  </button>
                </div>

                <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-ink/35 border border-background/25 px-3 py-1.5 text-background text-[10px] tracking-[0.28em] uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                  {c("The story behind Bridge", "Die Geschichte hinter Bridge")}
                </div>
                <div className="absolute right-6 top-6 rounded-full bg-ink/35 border border-background/25 px-3 py-1.5 text-background text-[10px] tracking-widest">
                  02:48
                </div>
                <div className="absolute left-6 bottom-6 text-background">
                  <div className="font-serif italic text-2xl md:text-3xl leading-tight">
                    {c("Why we built Bridge.", "Warum wir Bridge gebaut haben.")}
                  </div>
                  <div className="mt-1 text-[10px] tracking-[0.28em] uppercase opacity-80">
                    Emergize AG · Basel
                  </div>
                </div>

                {playing && (
                    <div className="absolute inset-0 bg-ink/95 flex flex-col items-center justify-center text-background text-center px-8">
                      <div className="h-10 w-10 rounded-full border border-background/40" />
                      <p className="mt-6 text-sm text-background/80 max-w-xs">
                        {c("The founder film will be embedded here at launch.", "Der Gründerfilm wird zum Launch hier eingebettet.")}
                      </p>
                      <button
                        type="button"
                        onClick={() => setPlaying(false)}
                        className="mt-6 text-xs uppercase tracking-[0.28em] text-background/70 hover:text-background"
                      >
                        {c("Close", "Schließen")}
                      </button>
                    </div>
                  )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  12. CLOSING ARCH, a wide bridge silhouette holds the final CTA           */
/* ────────────────────────────────────────────────────────────────────────── */

function ClosingArch() {
  const c = useCopy();
  const { ref: caRef, progress: caProgress } = useScrollProgress<HTMLDivElement>({ start: 0.05, end: 0.6 });
  return (
    <section id="get" className="relative border-t border-border/60 overflow-hidden">
      {/* Layered ambient horizon */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 ambient-glow opacity-70" />
        <div className="absolute inset-x-0 top-10 h-[520px] bg-[radial-gradient(ellipse_at_center,var(--soft-green)_0,transparent_58%)] opacity-60" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-24 md:pt-32 pb-20 md:pb-28 text-center">
        {/* Signature crossing — a single, quiet arc */}
        <div ref={caRef} className="relative mx-auto w-full max-w-2xl h-32 sm:h-40 md:h-48">
          <svg viewBox="0 0 800 240" className="w-full h-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
            <defs>
              <linearGradient id="close-arc-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="var(--accent-green)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="close-deck-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--border)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--accent-green)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--border)" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="close-halo" cx="50%" cy="60%" r="60%">
                <stop offset="0%" stopColor="var(--accent-green)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--accent-green)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Soft halo */}
            <ellipse cx="400" cy="200" rx="360" ry="90" fill="url(#close-halo)" opacity={caProgress} />

            {/* Horizon line */}
            <line x1="20" y1="220" x2="780" y2="220" stroke="url(#close-deck-grad)" strokeWidth="1" />

            {/* Primary crossing arc — draws in on scroll */}
            <path
              d="M20,220 Q 400,20 780,220"
              fill="none" stroke="url(#close-arc-grad)" strokeWidth="2" strokeLinecap="round"
              pathLength={1} strokeDasharray={1} strokeDashoffset={1 - caProgress}
            />

            {/* Endpoint pins */}
            <circle cx="20" cy="220" r="3.5" fill="var(--muted-ink)" opacity="0.7" />
            <circle cx="780" cy="220" r={3.5 * (0.4 + 0.6 * caProgress)} fill="var(--accent-green)" opacity={0.3 + 0.7 * caProgress} />
          </svg>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.28em] text-faint-ink">
          <span className="h-px w-8 bg-border" />
          {c("The crossing", "Der Übergang")}
          <span className="h-px w-8 bg-border" />
        </div>


        <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl text-ink leading-[1.02] tracking-[-0.02em]">
          <span className="font-light">{c("The next difficult moment ", "Der nächste schwierige Moment ")}</span>
          <span className="font-serif italic">{c("doesn't have to become the rest of your day.", "muss nicht der Rest deines Tages werden.")}</span>
        </h2>
        <p className="mt-8 text-muted-ink max-w-xl mx-auto leading-relaxed">
          {c(
            "Bridge is currently in a private access phase. Get in touch to learn more, discuss your workplace, or request early access.",
            "Bridge ist aktuell in einer privaten Zugangsphase. Melde dich, um mehr zu erfahren, deinen Arbeitsalltag zu besprechen oder frühen Zugang anzufragen.",
          )}
        </p>
        <div className="mt-10 flex justify-center">
          <PrimaryCTA>{c("Request access", "Zugang anfragen")}</PrimaryCTA>
        </div>
        <p className="mt-10 text-xs text-faint-ink tracking-wider">
          {c("Built in Basel · For DACH workplaces · Designed with privacy in mind", "Gebaut in Basel · Für DACH-Arbeitswelten · Mit Blick auf Privatsphäre gestaltet")}
        </p>
      </div>
    </section>
  );
}

function BridgeIconSVG({ cx, cy }: { cx: number; cy: number }) {
  // Bridge app mark — pause-bar fermata above a lowercase "b", on a rounded tile.
  const size = 44;
  const x = cx - size / 2;
  const y = cy - size / 2;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={size} height={size} rx={size * 0.22} fill="var(--background)" stroke="var(--border)" strokeWidth="0.8" />
      <line
        x1={size * 0.34} y1={size * 0.24}
        x2={size * 0.66} y2={size * 0.24}
        stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"
      />
      <text
        x={size / 2} y={size * 0.82}
        fontFamily='Inter, "Helvetica Neue", Arial, sans-serif'
        fontWeight={450}
        fontSize={size * 0.62}
        fill="var(--ink)"
        textAnchor="middle"
      >
        b
      </text>
    </g>
  );
}
