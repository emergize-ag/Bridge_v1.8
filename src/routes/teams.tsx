import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/i18n/LanguageProvider";

import imgCorridor from "@/assets/team-corridor.jpg";
import imgLeadership from "@/assets/team-leadership.jpg";
import imgWorkspace from "@/assets/team-workspace.jpg";
import imgCommute from "@/assets/team-commute.jpg";
import imgStandup from "@/assets/team-standup.jpg";
import imgFocus from "@/assets/team-focus.jpg";

export const Route = createFileRoute("/teams")({
  head: () => ({
    meta: [
      { title: "Bridge for Teams — Aggregate transition signals, designed for trust." },
      { name: "description", content: "Bridge for Teams surfaces cohort-level signals about how organisations move between meetings, focus, and the day's boundary. Built for DACH workplaces." },
      { property: "og:title", content: "Bridge for Teams" },
      { property: "og:description", content: "Cohort-level transition signals, designed for trust. Built for DACH workplaces." },
      { property: "og:url", content: "/teams" },
      { property: "og:image", content: imgCorridor },
      { name: "twitter:image", content: imgCorridor },
    ],
    links: [{ rel: "canonical", href: "/teams" }],
  }),
  component: TeamsPage,
});

function TeamsPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav />
      <LangNotice />
      <Hero />
      <LogosStrip />
      <RolesBand />
      <DayCollage />
      <DayTimeline />
      <DashboardShowcase />
      <SplitFragmented />
      <Insights />
      <Privacy />
      <Quote />
      <FinalCta />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const de = useLang() === "de";

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-20 md:pb-28 grid lg:grid-cols-[1.05fr_1.1fr] gap-12 lg:gap-16 items-center">
        <div>
          <Reveal>
            <div className="eyebrow">{de ? "Für Organisationen · DACH" : "For organisations · DACH"}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] tracking-tight">
              {de ? (
                <>Was zwischen <span className="serif-italic text-accent-green">Meetings, Aufgaben und Entscheidungen</span> passiert, entscheidet vielfach über den Rest des Tages.</>
              ) : (
                <>The work between <span className="serif-italic text-accent-green">the work</span> is where teams quietly lose or hold their day.</>
              )}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-7 text-muted-ink text-lg max-w-xl leading-relaxed">
              {de
                ? "Bridge gibt Führungskräften und HR einen ruhigen Einblick, wie Teams zwischen Fokus, Übergängen und Tagesende navigieren — gestaltet, um zu informieren, nicht um zu überwachen."
                : "Bridge for Teams surfaces cohort-level signals about how your organisation moves between meetings, focus, and the day's boundary — designed to inform, not to surveil."}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#talk" className="rounded-full bg-ink text-background px-6 py-3 text-sm hover:bg-accent-green transition-colors">
                {de ? "20-Minuten-Gespräch vereinbaren" : "Book a 20-minute walkthrough"}
              </a>
              <a href="#privacy" className="rounded-full border border-border px-6 py-3 text-sm text-ink hover:border-ink/60 transition-colors">
                {de ? "Datenschutzmodell lesen" : "Read the privacy model"}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-faint-ink">
              {de ? (
                <>
                  <span>· DSGVO / DSG conform</span>
                  <span>· Anonymisierte Gruppenauswertung</span>
                  <span>· Designed for trust</span>
                </>
              ) : (
                <>
                  <span>· DSGVO / nFADP aligned</span>
                  <span>· Cohort-level signals</span>
                  <span>· Designed for trust</span>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* Image collage */}
        <div className="relative h-[520px] md:h-[600px]">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-[70%] h-[62%] rounded-2xl overflow-hidden border border-border shadow-2xl shadow-ink/10">
            <img src={imgCorridor} alt="Professionals walking through a Swiss office corridor" className="w-full h-full object-cover" width={1920} height={1080} />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute left-0 bottom-0 w-[58%] h-[58%] rounded-2xl overflow-hidden border border-border shadow-xl shadow-ink/10">
            <img src={imgLeadership} alt="A leadership conversation" className="w-full h-full object-cover" loading="lazy" width={1080} height={1920} />
          </motion.div>
          {/* Floating stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute left-[42%] top-[44%] bg-background/95 backdrop-blur rounded-xl border border-border p-4 shadow-xl shadow-ink/10 w-[180px]">
            <div className="eyebrow text-[10px]">{de ? "Tägliche Übergänge" : "Daily transitions"}</div>
            <div className="mt-1 text-3xl font-light text-ink">37</div>
            <div className="mt-1 text-[11px] text-muted-ink">{de ? "pro Wissensarbeitenden, im Durchschnitt" : "per knowledge worker, on average"}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const items = ["Zurich", "Basel", "Bern", "München", "Wien", "Hamburg", "Berlin"];
  const de = useLang() === "de";
  return (
    <section className="border-y border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-x-10 gap-y-2 text-[11px] tracking-[0.18em] uppercase text-faint-ink">
        <span className="text-muted-ink">{de ? "Entwickelt in Zusammenarbeit mit Teams in" : "Designed alongside teams in"}</span>
        {items.map((c) => <span key={c}>{c}</span>)}
      </div>
    </section>
  );
}

/* ---------------- DAY COLLAGE ---------------- */
function DayCollage() {
  const de = useLang() === "de";
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-end">
          <div>
            <Reveal><div className="eyebrow">{de ? "Ein Tag, wie er sich wirklich anfühlt" : "A day, as it actually feels"}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl md:text-5xl font-light leading-tight">
                {de ? (
                  <>Kalender zeigen <span className="serif-italic text-faint-ink">Blöcke</span>. Menschen leben die <span className="serif-italic text-accent-green">Räume dazwischen</span>.</>
                ) : (
                  <>Calendars show <span className="serif-italic text-faint-ink">blocks</span>. People live the <span className="serif-italic text-accent-green">spaces between</span>.</>
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-muted-ink max-w-md">
                {de
                  ? "Ein Morgen voller Back-to-backs. Ein Bahnsteig. Ein Standup beim Kaffee. Stille Konzentration am Fenster. Das Nachmittagsloch. Die Grenze am Tagesende. Bridge trifft den Tag dort, wo er stattfindet — und benennt die Zustände zwischen den geplanten Blöcken."
                  : "A morning of back-to-backs. A station platform. A standup over coffee. Quiet focus by a window. The afternoon dip. The end-of-day boundary. Bridge meets the day where it lives — naming the work-states between scheduled blocks."}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-6 gap-3 h-[460px]">
            <div className="col-span-3 row-span-2 rounded-2xl overflow-hidden border border-border">
              <img src={imgCommute} alt="Commute" className="w-full h-full object-cover" loading="lazy" width={1080} height={1920} />
            </div>
            <div className="col-span-3 rounded-2xl overflow-hidden border border-border">
              <img src={imgStandup} alt="Team standup" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden border border-border">
              <img src={imgWorkspace} alt="Workspace" className="w-full h-full object-cover" loading="lazy" width={1920} height={1080} />
            </div>
            <div className="col-span-1 rounded-2xl overflow-hidden border border-border">
              <img src={imgFocus} alt="Focus" className="w-full h-full object-cover" loading="lazy" width={1080} height={1920} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DAY TIMELINE ---------------- */
function DayTimeline() {
  const de = useLang() === "de";
  const labelMap: Record<string, string> = de
    ? {
        Commute: "Arbeitsweg",
        Lunch: "Mittagessen",
        "Client call": "Telefon Kunde",
        "Deep work": "Fokus",
        Focus: "Fokus",
      }
    : {};
  const tr = (l: string) => labelMap[l] ?? l;

  const blocks: Array<{ time: string; label: string; tone: "meeting" | "focus" | "transit" | "break" | "boundary"; w: number }> = [
    { time: "08:30", label: "Commute", tone: "transit", w: 8 },
    { time: "09:00", label: "Standup", tone: "meeting", w: 6 },
    { time: "09:30", label: "Strategy review", tone: "meeting", w: 10 },
    { time: "10:30", label: "1:1", tone: "meeting", w: 7 },
    { time: "11:15", label: "Deep work", tone: "focus", w: 16 },
    { time: "13:00", label: "Lunch", tone: "break", w: 6 },
    { time: "13:30", label: "Client call", tone: "meeting", w: 9 },
    { time: "14:15", label: "Review", tone: "meeting", w: 8 },
    { time: "15:00", label: "Focus", tone: "focus", w: 12 },
    { time: "16:00", label: "Sync", tone: "meeting", w: 6 },
    { time: "16:30", label: "Wrap", tone: "focus", w: 9 },
    { time: "17:30", label: "Boundary", tone: "boundary", w: 5 },
  ];
  const tones = {
    meeting: "bg-ink/85 text-background",
    focus: "bg-soft-green text-accent-green border border-accent-green/30",
    transit: "bg-warm/20 text-warm border border-warm/40",
    break: "bg-surface text-muted-ink border border-border",
    boundary: "bg-accent-green text-background",
  } as const;

  return (
    <section className="border-t border-border/60 bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1.05fr_1fr] gap-10 mb-12 items-end">
          <div>
            <Reveal><div className="eyebrow">{de ? "Ein typischer Dienstag" : "A composite Tuesday"}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl md:text-5xl font-light leading-tight">
                {de ? "Zwölf Übergänge vor dem Mittag." : "Twelve transitions before lunch."}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-muted-ink max-w-md md:justify-self-end">
              {de
                ? "Jede Übergabe trägt Rückstände: den Ton des letzten Meetings, eine unbeantwortete Nachricht, die Energie, die das nächste Gespräch braucht. Die Bögen zeigen, wohin diese Rückstände wandern — von einem Zustand in den nächsten, auf Teamebene betrachtet."
                : "Each handover carries residue: the last meeting's tone, an unanswered message, the energy needed for what comes next. Bridge surfaces where that residue lives — at the team level."}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-3xl border border-border bg-background p-6 md:p-8 overflow-hidden">
            <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-faint-ink mb-3 px-1">
              {["08","10","12","14","16","18"].map((h) => <span key={h}>{h}:00</span>)}
            </div>
            <div className="relative h-px bg-border" />
            <div className="mt-6 flex gap-1.5">
              {blocks.map((b, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  style={{ flex: b.w }}
                  className={`h-16 rounded-md px-2.5 py-1.5 text-[10px] flex flex-col justify-between ${tones[b.tone]}`}>
                  <span className="opacity-70">{b.time}</span>
                  <span className="font-medium truncate">{tr(b.label)}</span>
                </motion.div>
              ))}
            </div>
            <svg viewBox="0 0 1000 60" className="w-full h-12 mt-4" preserveAspectRatio="none">
              {Array.from({ length: 11 }).map((_, i) => {
                const x = 60 + i * 80;
                return (
                  <motion.path key={i} d={`M${x - 20},45 Q${x},5 ${x + 20},45`} fill="none" stroke="var(--accent-green)" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="3 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.06, duration: 0.8 }} />
                );
              })}
            </svg>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-[11px] text-faint-ink">
              <Legend swatch="bg-ink/85" label="Meeting" />
              <Legend swatch="bg-soft-green border border-accent-green/40" label={de ? "Fokus" : "Focus"} />
              <Legend swatch="bg-warm/30 border border-warm/40" label={de ? "Unterwegs" : "Transit"} />
              <Legend swatch="bg-accent-green" label="Boundary" />
              <span className="ml-auto">{de ? "Bögen = was vom letzten Zustand mitgenommen wird" : "Arcs = transition residue carried forward"}</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {(de
            ? [
                { n: "23 min", l: "durchschnittliche Zeit, um nach einer Unterbrechung wieder in tiefe Konzentration zurückzufinden", s: "Gloria Mark, UC Irvine" },
                { n: "11×", l: "durchschnittliche Aufgabenwechsel pro Stunde", s: "RescueTime, 2022" },
                { n: "68%", l: "der DACH-Fachkräfte geben an, nach Feierabend mental schwer abschalten zu können", s: "Statista, 2023" },
              ]
            : [
                { n: "23 min", l: "to regain focus after an interruption", s: "Gloria Mark, UC Irvine" },
                { n: "11×", l: "average task switches per hour", s: "RescueTime, 2022" },
                { n: "68%", l: "DACH professionals struggle to disconnect", s: "Statista, 2023" },
              ]).map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-background p-6">
              <div className="text-4xl md:text-5xl font-light text-ink">{s.n}</div>
              <div className="mt-3 text-sm text-muted-ink leading-relaxed">{s.l}</div>
              <div className="mt-3 text-[11px] text-faint-ink">{s.s}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Legend({ swatch, label }: { swatch: string; label: string }) {
  return <span className="inline-flex items-center gap-1.5"><span className={`inline-block w-3 h-3 rounded-sm ${swatch}`} />{label}</span>;
}

/* ---------------- DASHBOARD SHOWCASE ---------------- */
function DashboardShowcase() {
  const de = useLang() === "de";
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 mb-14 items-end">
          <div>
            <Reveal><div className="eyebrow">{de ? "Bridge für Teams — ein Einblick" : "Inside Bridge for Teams"}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl md:text-5xl font-light leading-tight">
                {de ? "Ein ruhiger Blick darauf, wie die Organisation sich bewegt." : "A quiet view of how the organisation actually moves."}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="text-muted-ink max-w-lg">
              {de
                ? "Keine Ranglisten. Keine Einzelbewertungen. Signale werden wie Wetter gelesen — Drucksysteme, Erholungsmuster, der Rhythmus einer Woche."
                : "No leaderboards. No individual scores. Signals are read like weather — pressure systems, recovery patterns, the rhythm of a week."}
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          <DashCard className="lg:col-span-7 lg:row-span-2 min-h-[420px]">
            <CardHead
              eyebrow={de ? "Wochenrhythmus" : "Weekly rhythm"}
              title={de ? "Übergangsdichte · diese Woche" : "Transition density · this week"}
              right={de ? "↗ ruhiger als letzte Woche" : "↗ calmer than last week"} />
            <RhythmHeatmap />
          </DashCard>

          <DashCard className="lg:col-span-5">
            <CardHead
              eyebrow={de ? "Meeting-Bereitschaft" : "Meeting readiness"}
              title={de ? "Wie Ankünfte sich anfühlen" : "How arrivals feel"}
              right="+12%" />
            <ReadinessGauge />
          </DashCard>

          <DashCard className="lg:col-span-4">
            <CardHead
              eyebrow={de ? "Beteiligung" : "Participation"}
              title={de ? "Abgeschlossene Übergänge" : "Crossings completed"}
              right={de ? "64% der Gruppe" : "64% of cohort"} />
            <ParticipationDots />
          </DashCard>

          <DashCard className="lg:col-span-4">
            <CardHead
              eyebrow={de ? "Tagesgrenze" : "Boundary"}
              title={de ? "Tagesabschluss" : "End-of-day closure"}
              right={de ? "17:42 Durchschnitt" : "17:42 avg"} />
            <BoundaryBar />
          </DashCard>

          <DashCard className="lg:col-span-4">
            <CardHead
              eyebrow={de ? "Teamvergleich" : "Cross-team"}
              title={de ? "Übergangslast nach Team" : "Transition load by team"}
              right={de ? "6 Teams" : "6 teams"} />
            <TeamBars />
          </DashCard>
        </div>
      </div>
    </section>
  );
}

function DashCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7 }}
      className={`rounded-2xl border border-border bg-background p-6 ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}
function CardHead({ eyebrow, title, right }: { eyebrow: string; title: string; right?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-5">
      <div>
        <div className="eyebrow text-[10px]">{eyebrow}</div>
        <div className="mt-1 text-base text-ink font-medium">{title}</div>
      </div>
      {right && <div className="text-[11px] text-accent-green whitespace-nowrap mt-1">{right}</div>}
    </div>
  );
}

function RhythmHeatmap() {
  const de = useLang() === "de";
  const days = de ? ["Mo","Di","Mi","Do","Fr"] : ["Mon","Tue","Wed","Thu","Fri"];
  const hours = Array.from({ length: 11 });
  const intensity = (d: number, h: number) => {
    const v = Math.sin(d * 1.3 + h * 0.9) * 0.5 + 0.5;
    const peak = h >= 1 && h <= 3 ? 0.25 : h >= 5 && h <= 7 ? 0.2 : 0;
    return Math.min(1, v * 0.7 + peak);
  };
  return (
    <div>
      <div className="flex">
        <div className="w-10" />
        <div className="flex-1 grid grid-cols-11 gap-1 text-[9px] text-faint-ink mb-1">
          {hours.map((_, h) => <div key={h} className="text-center">{8 + h}</div>)}
        </div>
      </div>
      <div className="space-y-1">
        {days.map((d, di) => (
          <div key={d} className="flex items-center gap-2">
            <div className="w-10 text-[10px] uppercase tracking-[0.15em] text-faint-ink">{d}</div>
            <div className="flex-1 grid grid-cols-11 gap-1">
              {hours.map((_, h) => {
                const v = intensity(di, h);
                return (
                  <motion.div key={h}
                    initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (di * 11 + h) * 0.012 }}
                    className="aspect-square rounded-[3px]"
                    style={{
                      background: `color-mix(in oklab, var(--accent-green) ${Math.round(v * 80)}%, var(--surface))`,
                    }} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-[11px] text-faint-ink">
        <span>{de ? "Ruhiger" : "Calmer"}</span>
        <div className="flex gap-1">
          {[10,25,40,55,70,85].map((v) => (
            <div key={v} className="w-5 h-2 rounded-sm" style={{ background: `color-mix(in oklab, var(--accent-green) ${v}%, var(--surface))` }} />
          ))}
        </div>
        <span>{de ? "Dichter" : "Denser"}</span>
      </div>
    </div>
  );
}

function ReadinessGauge() {
  const de = useLang() === "de";
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-32 h-32 -rotate-90">
        <circle cx="70" cy="70" r="58" fill="none" stroke="var(--border)" strokeWidth="10" />
        <motion.circle cx="70" cy="70" r="58" fill="none" stroke="var(--accent-green)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 58}
          initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
          whileInView={{ strokeDashoffset: 2 * Math.PI * 58 * (1 - 0.72) }}
          viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }} />
      </svg>
      <div>
        <div className="text-4xl font-light text-ink">72<span className="text-xl text-muted-ink">%</span></div>
        <div className="mt-1 text-sm text-muted-ink">{de ? "kommen gefasst an" : "arrive composed"}</div>
        <div className="mt-4 space-y-1.5 text-[11px] text-faint-ink">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent-green" /> {de ? "Gefasst · 72%" : "Composed · 72%"}</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-warm" /> {de ? "Mit Rückständen · 21%" : "Carrying residue · 21%"}</div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-border" /> {de ? "Unbekannt · 7%" : "Unknown · 7%"}</div>
        </div>
      </div>
    </div>
  );
}

function ParticipationDots() {
  const de = useLang() === "de";
  return (
    <div>
      <div className="grid grid-cols-12 gap-1">
        {Array.from({ length: 60 }).map((_, i) => {
          const filled = i % 5 !== 4 && i % 7 !== 3;
          return <motion.div key={i}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.008 }}
            className={`aspect-square rounded-full ${filled ? "bg-accent-green/80" : "bg-border"}`} />;
        })}
      </div>
      <div className="mt-4 text-[11px] text-faint-ink">
        {de
          ? "Jeder Punkt = eine Person in einem Team von 60. Ausgefüllt = mindestens ein Übergang diese Woche."
          : "Each dot = one person in a team of 60. Filled = at least one crossing this week."}
      </div>
    </div>
  );
}
function BoundaryBar() {
  const de = useLang() === "de";
  return (
    <div>
      <div className="relative h-24 rounded-xl overflow-hidden border border-border"
        style={{ background: "linear-gradient(90deg, #FFF8E7 0%, #F4F1EC 55%, #293441 100%)" }}>
        <motion.div initial={{ left: "0%" }} whileInView={{ left: "62%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute top-0 bottom-0 w-px bg-ink/70" />
        <div className="absolute top-2 left-2 text-[10px] text-faint-ink">06:00</div>
        <div className="absolute top-2 right-2 text-[10px] text-background/70">22:00</div>
        <div className="absolute bottom-2 left-[62%] -translate-x-1/2 text-[10px] text-ink bg-background/90 px-1.5 py-0.5 rounded">17:42</div>
      </div>
      <div className="mt-4 text-[11px] text-faint-ink">
        {de
          ? "Medianzeitpunkt, zu dem dein Team den Tag als abgeschlossen markiert. 18 Minuten früher als letzten Monat."
          : "Median moment your team marks the day complete. 18 min earlier this month."}
      </div>
    </div>
  );
}
function TeamBars() {
  const de = useLang() === "de";
  const teams = [
    { n: "Product", v: 0.78 },
    { n: "Engineering", v: 0.42 },
    { n: "People", v: 0.55 },
    { n: "Sales", v: 0.86 },
    { n: "Design", v: 0.34 },
    { n: "Finance", v: 0.48 },
  ];
  return (
    <div className="space-y-2.5">
      {teams.map((t, i) => (
        <div key={t.n} className="flex items-center gap-3 text-[11px]">
          <div className="w-20 text-muted-ink">{t.n}</div>
          <div className="flex-1 h-2 rounded-full bg-surface overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.v * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.08 }}
              className="h-full rounded-full" style={{ background: t.v > 0.7 ? "var(--warm)" : "var(--accent-green)" }} />
          </div>
          <div className="w-8 text-right text-faint-ink">{Math.round(t.v * 100)}</div>
        </div>
      ))}
      <div className="pt-2 text-[11px] text-faint-ink">
        {de ? "Höher = dichtere Übergänge. Keine Rangliste — eine Wetterkarte." : "Higher = denser transitions. Not a ranking — a weather map."}
      </div>
    </div>
  );
}

/* ---------------- SPLIT FRAGMENTED VS COMPOSED ---------------- */
function SplitFragmented() {
  const de = useLang() === "de";
  return (
    <section className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal>
          <div className="eyebrow">{de ? "Derselbe Mittwoch — zweimal" : "Two versions of the same Wednesday"}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-3xl md:text-5xl font-light max-w-3xl leading-tight">
            {de ? (
              <>Derselbe Kalender. Unterschiedliche <span className="serif-italic text-accent-green">Qualität</span>.</>
            ) : (
              <>Same calendar. Different <span className="serif-italic text-accent-green">arrivals</span>.</>
            )}
          </h2>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <FragmentedCard kind="fragmented" />
          <FragmentedCard kind="composed" />
        </div>
      </div>
    </section>
  );
}
function FragmentedCard({ kind }: { kind: "fragmented" | "composed" }) {
  const de = useLang() === "de";
  const isF = kind === "fragmented";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
      className={`relative rounded-3xl border border-border overflow-hidden ${isF ? "bg-background" : "bg-soft-green/40"}`}>
      <div className="aspect-[5/3] relative overflow-hidden">
        <img src={isF ? imgWorkspace : imgFocus} alt="" className={`w-full h-full object-cover ${isF ? "saturate-[0.7]" : ""}`} loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0" style={{ background: isF ? "linear-gradient(180deg, transparent 40%, rgba(31,42,55,0.45) 100%)" : "linear-gradient(180deg, transparent 40%, rgba(59,122,109,0.35) 100%)" }} />
        <svg viewBox="0 0 400 80" className="absolute inset-x-0 bottom-3 px-4 w-full">
          {isF ? (
            Array.from({ length: 14 }).map((_, i) => (
              <motion.line key={i} x1={20 + i * 26} y1={20 + Math.random() * 20} x2={20 + i * 26} y2={60 - Math.random() * 20}
                stroke="white" strokeOpacity="0.85" strokeWidth="1.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} />
            ))
          ) : (
            <motion.path d="M10,55 C60,30 110,52 160,38 C220,22 270,42 330,30 C360,24 380,28 390,30"
              fill="none" stroke="white" strokeOpacity="0.95" strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }} />
          )}
        </svg>
        <div className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase text-background/90">
          {isF ? (de ? "Ohne Bridge" : "Without Bridge") : (de ? "Mit Bridge" : "With Bridge")}
        </div>
      </div>
      <div className="p-7">
        <h3 className="text-xl font-light">
          {isF
            ? (de ? "Fragmentierte Ankünfte, Rückstände mitgetragen." : "Fragmented arrivals, residue carried forward.")
            : (de ? "Gefasste Ankünfte, Rückstände losgelassen." : "Composed arrivals, residue released.")}
        </h3>
        <ul className="mt-5 space-y-2 text-sm text-muted-ink">
          {isF ? (
            de ? (
              <>
                <li>· 11 unabgeschlossene Gedanken um 16:00</li>
                <li>· 4 Meetings beginnen mit einer Entschuldigung</li>
                <li>· Tagesgrenze verschiebt sich auf 19:10</li>
              </>
            ) : (
              <>
                <li>· 11 unfinished thoughts at 16:00</li>
                <li>· 4 meetings start with apology</li>
                <li>· End-of-day boundary slips to 19:10</li>
              </>
            )
          ) : (
            de ? (
              <>
                <li>· Zweiminütige Übergänge zwischen den Blöcken</li>
                <li>· Meetings beginnen beim Meeting — nicht beim letzten</li>
                <li>· Tagesgrenze setzt sich zuverlässiger bei 17:40</li>
              </>
            ) : (
              <>
                <li>· 2-minute crossings between transitions</li>
                <li>· Meetings start at the meeting, not the last one</li>
                <li>· Boundary settles at 17:40, more reliably</li>
              </>
            )
          )}
        </ul>
      </div>
    </motion.div>
  );
}

/* ---------------- INSIGHTS (image-led) ---------------- */
function Insights() {
  const de = useLang() === "de";
  const items = de
    ? [
        { img: imgLeadership, eyebrow: "Führungsmuster", signal: "Führungsmuster", title: "Wo Druck sich aufbaut — und wo er nachlässt.", body: "Aggregierte Signale aus Führungsgruppen zeigen meetingdichte Vormittage und Residuenmuster am Tagesende — ohne eine einzige Person zu benennen." },
        { img: imgStandup, eyebrow: "Teamrhythmus", signal: "Teamrhythmus", title: "Der Wochenpuls, wie ein Team sich bewegt.", body: "Standups, Fokusarbeit, Übergaben, Kaffeepausen. Bridge zeigt, wo die Übergänge am engsten sind — nach Team, nach Woche." },
        { img: imgCommute, eyebrow: "Fragmentierung", signal: "Fragmentierung", title: "Arbeitsweg, Kontextwechsel, neuer Fokus. Der Tag beginnt, bevor er beginnt.", body: "Fragmentierte Tage und Wochen haben mehr Übergänge, nicht weniger. Bridge behandelt sie als Teil des Arbeitstags — nicht als Ausnahmen davon." },
      ]
    : [
        { img: imgLeadership, eyebrow: "Leadership patterns", signal: "Leadership patterns", title: "Where pressure compounds — and where it eases.", body: "Aggregate signals across leadership cohorts surface meeting-heavy mornings and end-of-day residue patterns, without naming a single person." },
        { img: imgStandup, eyebrow: "Team rhythm", signal: "Team rhythm", title: "The weekly pulse of how a team actually moves.", body: "Standups, deep work, handovers, walks. Bridge reads the rhythm and shows where transitions are tightest — by team, by week." },
        { img: imgCommute, eyebrow: "Hybrid transitions", signal: "Hybrid transitions", title: "Commute, threshold, room. The day starts before it starts.", body: "Hybrid weeks have more thresholds, not fewer. Bridge respects them as part of the working day, not exceptions to it." },
      ];
  const tags = de ? ["· Gruppen-Ebene", "· Keine Personendaten", "· Vertrauen zuerst"] : ["· Cohort-level", "· No PII", "· Trust-first"];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 space-y-28 md:space-y-36">
        {items.map((it, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden border border-border aspect-[4/5]">
                <img src={it.img} alt="" className="w-full h-full object-cover" loading="lazy" width={1080} height={1920} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 bg-background/90 backdrop-blur rounded-xl border border-border p-4">
                  <div className="eyebrow text-[10px]">{de ? "Signal" : "Signal"} · {it.signal}</div>
                  <MiniSparkline />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="eyebrow">{it.eyebrow}</div>
                <h3 className="mt-4 text-3xl md:text-4xl font-light leading-tight">{it.title}</h3>
                <p className="mt-5 text-muted-ink max-w-md leading-relaxed">{it.body}</p>
                <div className="mt-7 flex items-center gap-6 text-[11px] tracking-[0.15em] uppercase text-faint-ink">
                  {tags.map((tg) => <span key={tg}>{tg}</span>)}
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
function MiniSparkline() {
  return (
    <svg viewBox="0 0 220 40" className="w-full h-10 mt-2">
      <motion.path d="M0,28 C30,30 50,18 80,20 C110,22 130,10 160,14 C180,16 200,8 220,12"
        fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
      {[0,55,110,165,220].map((x, i) => (
        <motion.circle key={i} cx={x} cy={[28,22,18,14,12][i]} r="2" fill="var(--accent-green)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} />
      ))}
    </svg>
  );
}

/* ---------------- PRIVACY (with integrated trust badges) ---------------- */
function Privacy() {
  const de = useLang() === "de";
  const layers = de
    ? [
        { t: "Person", n: "Der Moment gehört dem Individuum" },
        { t: "Anonymer Übergang", n: "Losgelöst von der Identität" },
        { t: "Geschützte Ebene", n: "Aggregiert, bevor es sichtbar wird" },
        { t: "Teammuster", n: "Signale auf Gruppenebene" },
        { t: "Organisationsansicht", n: "Was an die Oberfläche steigt" },
      ]
    : [
        { t: "Person", n: "The crossing belongs to the individual" },
        { t: "Anonymous Crossing", n: "Stripped of identity" },
        { t: "Protected Layer", n: "Aggregated before it surfaces" },
        { t: "Team Patterns", n: "Cohort-level signal" },
        { t: "Organisation View", n: "What rises to the surface" },
      ];
  const trust = de
    ? [
        { t: "Datenschutz", n: "DSGVO + DSG konform" },
        { t: "Autonomie", n: "Opt-in als Standard" },
        { t: "Vertrauen", n: "Signale auf Gruppenebene" },
        { t: "Zurückhaltung", n: "Keine Streaks, keine Scores" },
      ]
    : [
        { t: "Privacy", n: "DSGVO + nFADP aligned" },
        { t: "Autonomy", n: "Opt-in by default" },
        { t: "Trust", n: "Cohort-level signals" },
        { t: "Restraint", n: "No streaks, no scores" },
      ];
  return (
    <section id="privacy" className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <Reveal><div className="eyebrow">{de ? "Datenschutz-Architektur" : "Privacy architecture"}</div></Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl md:text-5xl font-light leading-tight">
                {de ? (
                  <>Die Menschen sehen die Tropfen im Wasser. <br className="hidden md:block" /><span className="serif-italic text-accent-green">Die Organisation sieht den Fluss.</span></>
                ) : (
                  <>Pebbles flow into a river. <br className="hidden md:block" /><span className="serif-italic text-accent-green">You see the river.</span></>
                )}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-muted-ink max-w-md">
                {de
                  ? "Einzelne Übergänge fliessen in aggregierte Muster. Die Organisation sieht den Rhythmus — nicht die Einzelpersonen. Von Grund auf nach DSGVO und DSG gestaltet."
                  : "Individual crossings flow into aggregate patterns. The organisation sees rhythm, not individuals. Designed to DSGVO and nFADP standards from the first line of code."}
              </p>
            </Reveal>
          </div>
          <div className="relative rounded-3xl border border-border bg-background p-8">
            <ul className="space-y-3">
              {layers.map((l, i) => (
                <motion.li key={l.t}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border border-border ${i < 2 ? "bg-surface/60 opacity-60" : "bg-soft-green/30"}`}>
                  <span className="text-sm text-ink font-medium">{l.t}</span>
                  <span className="text-[11px] text-faint-ink">{l.n}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 text-[11px] text-faint-ink text-center">
              {de ? "Einzelne Schichten verschwinden. Das Aggregat bleibt." : "Individual layers fade. Aggregate remains."}
            </div>
          </div>
        </div>

        {/* Compact trust badges integrated beneath privacy */}
        <Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {trust.map((l) => (
              <div key={l.t} className="rounded-2xl border border-border bg-background px-5 py-5">
                <div className="text-sm text-ink font-medium">{l.t}</div>
                <div className="mt-1 text-[11px] text-faint-ink">{l.n}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- LARGE QUOTE ---------------- */
function Quote() {
  const de = useLang() === "de";
  return (
    <section className="border-t border-border/60 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgCorridor} alt="" className="w-full h-full object-cover opacity-25" loading="lazy" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-28 md:py-36 text-center">
        <div className="w-10 h-px bg-accent-green/60 mx-auto mb-8" />
        <blockquote className="text-3xl md:text-5xl font-light leading-[1.2] font-serif">
          {de
            ? "\u201CBridge hat nicht unseren Kalender verändert. Es hat verändert, wie unsere Menschen darin ankommen.\u201D"
            : "\u201CBridge didn't change our calendar. It changed how our people arrive at it.\u201D"}
        </blockquote>
        <div className="mt-8 eyebrow">{de ? "Head of People · Technologiesektor" : "Early User · Beta Tester"}</div>
        <div className="w-10 h-px bg-accent-green/60 mx-auto mt-8" />
      </div>
    </section>
  );
}

/* ---------------- ROLES BAND ("Who Bridge Was Built For") ---------------- */
function RolesBand() {
  const de = useLang() === "de";
  const roles = de
    ? [
        { r: "Gründerinnen & Gründer", n: "Erkennen, ob das Team gefestigt genug ist, um das Tempo zu halten." },
        { r: "People & Culture", n: "Übergeordnete Tendenzen beobachten, ohne Einzelpersonen zu instrumentalisieren." },
        { r: "Unternehmens- & Bereichsleitungen", n: "Übergangslast wahrnehmen, bevor sie zu Präsentismus oder Fluktuation wird." },
      ]
    : [
        { r: "Founders", n: "See whether the team is composed enough to sustain pace." },
        { r: "People & Culture", n: "Watch boundary health without instrumenting individuals." },
        { r: "Heads of Function", n: "Notice transition load before it becomes attrition." },
      ];
  return (
    <section className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <Reveal><div className="eyebrow">{de ? "Für wen Bridge gebaut wurde" : "Who Bridge was built for"}</div></Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {roles.map((r, i) => (
            <motion.div key={r.r}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-background p-7">
              <div className="text-lg font-light text-ink">{r.r}</div>
              <p className="mt-3 text-sm text-muted-ink leading-relaxed">{r.n}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCta() {
  const de = useLang() === "de";
  return (
    <section id="talk" className="relative border-t border-border/60 overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-90 pointer-events-none" />
      <motion.div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-10 w-[36rem] h-[36rem] rounded-full bg-soft-green/40 blur-3xl breathe" />
      <div className="relative mx-auto max-w-3xl px-6 py-28 md:py-36 text-center">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          {de ? (
            <>Betreten Sie den nächsten <span className="serif-italic text-accent-green">Raum</span>.</>
          ) : (
            <>Enter the next <span className="serif-italic text-accent-green">room</span>.</>
          )}
        </h2>
        <p className="mt-6 text-muted-ink max-w-lg mx-auto">
          {de
            ? "Ein kurzes Gespräch darüber, ob Bridge zu Ihrer Organisation passt. Kein Pitch-Deck. Kein Beschaffungstheater."
            : "A short conversation about how Bridge might fit your organisation. No pitch deck. No procurement theatre."}
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <a href="mailto:teams@emergize.ch" className="inline-flex rounded-full bg-ink text-background px-7 py-3.5 text-sm hover:bg-accent-green transition-colors">
            {de ? "Lassen Sie uns reden" : "Talk to us"}
          </a>
          <a href="#privacy" className="inline-flex rounded-full border border-border px-7 py-3.5 text-sm text-ink hover:border-ink/60 transition-colors">
            {de ? "Datenschutzmodell lesen" : "Read the privacy model"}
          </a>
        </div>
      </div>
    </section>
  );
}
