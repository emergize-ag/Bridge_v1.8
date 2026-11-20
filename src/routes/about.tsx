import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { BridgeIcon, BridgePauseGlyph } from "@/components/site/BridgeMark";
import founderAsset from "@/assets/founder-marco.jpg.asset.json";
import workspaceImg from "@/assets/about-workspace.jpg";

const founderImg = founderAsset.url;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Emergize AG — The company behind Bridge" },
      {
        name: "description",
        content:
          "Emergize AG is a Swiss company building thoughtful digital products for modern work. Based in Altenrhein, on Lake Constance.",
      },
      { property: "og:title", content: "About Emergize AG — The company behind Bridge" },
      {
        property: "og:description",
        content:
          "A Swiss product company designing for attention, transitions, and the everyday moments of modern work.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

type Chapter = { id: string; number: string; title: string };

const chapters: Chapter[] = [
  { id: "introduction", number: "01", title: "Introduction" },
  { id: "why", number: "02", title: "Why Emergize exists" },
  { id: "bridge", number: "03", title: "The thinking behind Bridge" },
  { id: "founder", number: "04", title: "Founder" },
  { id: "principles", number: "05", title: "Principles" },
  { id: "switzerland", number: "06", title: "Switzerland & DACH" },
  { id: "building", number: "07", title: "What we're building" },
  { id: "company", number: "08", title: "Company information" },
  { id: "contact", number: "09", title: "Get in touch" },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav />
      <LangNotice />
      <ReadingProgress />
      <Hero />
      <main className="relative">
        <Introduction />
        <WhyExists />
        <BridgeThinking />
        <Founder />
        <Principles />
        <Switzerland />
        <Building />
        <CompanyInfo />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 240, damping: 36, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-[68px] md:top-[76px] z-30 h-px origin-left bg-accent-green/60"
    />
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div aria-hidden className="absolute inset-0 ambient-glow opacity-50" />
      <svg
        aria-hidden
        viewBox="0 0 1200 320"
        className="absolute inset-x-0 bottom-0 h-48 w-full text-accent-green/15"
        preserveAspectRatio="none"
      >
        <path d="M0,220 C300,80 900,80 1200,220" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0,260 C300,120 900,120 1200,260" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M0,290 C300,160 900,160 1200,290" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-36">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <BridgeIcon className="h-10 w-10 rounded-[22%]" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
                Emergize AG · About
              </span>
            </div>
            <h1 className="mt-10 font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] tracking-tight text-ink">
              About<br />Emergize AG
            </h1>
            <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-ink leading-relaxed">
              Emergize AG is a Swiss company building thoughtful digital products for
              modern work.
            </p>
            <p className="mt-5 max-w-xl text-base md:text-lg text-muted-ink leading-relaxed">
              We believe that attention, transitions, and everyday moments deserve the
              same level of design consideration as the work itself.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="mt-2 grid grid-cols-3 gap-px bg-border/70 border border-border/70 rounded-2xl overflow-hidden">
              {[
                { k: "Founded", v: "Switzerland" },
                { k: "Based in", v: "Altenrhein" },
                { k: "Focus", v: "Modern work" },
                { k: "Region", v: "DACH" },
                { k: "Product", v: "Bridge" },
                { k: "Stage", v: "Building" },
              ].map((m) => (
                <div key={m.k} className="bg-background p-5">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
                    {m.k}
                  </div>
                  <div className="mt-2 text-sm text-ink">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-faint-ink">
          <span className="inline-flex items-center gap-2">
            <BridgePauseGlyph className="h-[6px] w-5 text-faint-ink" />
            A product company
          </span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Designed in Switzerland</span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>For modern work</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Chapter wrapper ---------------- */

function Chapter({
  id,
  number,
  title,
  kicker,
  children,
}: {
  id: string;
  number: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      id={id}
      className="relative scroll-mt-32 border-t border-border/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-baseline gap-5 mb-10 md:mb-14">
            <span className="font-serif text-2xl text-accent-green/80 tabular-nums">
              {number}
            </span>
            <div>
              {kicker && (
                <div className="text-[11px] uppercase tracking-[0.22em] text-faint-ink mb-2">
                  {kicker}
                </div>
              )}
              <h2 className="font-serif text-3xl md:text-5xl text-ink leading-[1.05] tracking-tight max-w-3xl">
                {title}
              </h2>
            </div>
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- 01 Introduction ---------------- */

function Introduction() {
  const tenets = [
    { k: "Posture", v: "Patient, considered, small by intention." },
    { k: "Subject", v: "Attention, transitions, composure." },
    { k: "Method", v: "Research-grounded, restrained in execution." },
    { k: "Measure", v: "Usefulness over engagement." },
  ];

  return (
    <Chapter id="introduction" number="01" kicker="Introduction" title="A Swiss company interested in how people experience modern work.">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-5 text-muted-ink leading-relaxed text-base md:text-lg max-w-xl">
          <p>
            Emergize AG is a product-focused organisation based in Altenrhein,
            on the eastern shore of Lake Constance in Switzerland.
          </p>
          <p>
            We design and build software around the human realities of working
            life, rather than the engagement metrics typically used to measure it.
          </p>
          <p>
            The company is small by intention. The work is patient by design.
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
              How we work
            </div>
            <dl className="mt-6 divide-y divide-border/60">
              {tenets.map((t) => (
                <div key={t.k} className="grid grid-cols-3 gap-6 py-4 first:pt-0 last:pb-0">
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
                    {t.k}
                  </dt>
                  <dd className="col-span-2 text-base text-ink leading-relaxed">
                    {t.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/* ---------------- 02 Why ---------------- */

function WhyExists() {
  const observations = [
    { n: "01", t: "Work is increasingly fragmented", b: "Days fill with short, overlapping commitments. Few are given a clear beginning or end." },
    { n: "02", t: "Meetings overlap", b: "One conversation runs into the next without space to register what has been decided." },
    { n: "03", t: "Decisions stack", b: "Cognitive residue accumulates across the day. The previous task lingers under the current one." },
    { n: "04", t: "Attention switches constantly", b: "Knowledge work has shifted from depth to triage. The cost is rarely measured." },
    { n: "05", t: "Work follows people home", b: "The mental workday extends well beyond the official one, particularly in DACH professional environments." },
    { n: "06", t: "Tools optimise outcomes", b: "Most products focus on productivity, or on wellbeing after the fact. Few attend to the moments between." },
  ];

  return (
    <Chapter id="why" number="02" kicker="Why Emergize exists" title="The moments between things often determine how we experience the things themselves.">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-5 text-muted-ink leading-relaxed max-w-md">
          <p>
            Emergize was formed around a particular set of observations about
            modern professional work — not theories, not predictions, simply
            patterns we kept encountering.
          </p>
          <p>
            We became interested in what happens in the small, unnamed intervals
            between activities, and what is lost when those intervals disappear.
          </p>
          <DayDiagram />
        </div>
        <div className="lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border/70 border border-border rounded-2xl overflow-hidden">
          {observations.map((o, i) => (
            <motion.div
              key={o.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="bg-background p-6 md:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
                  Observation
                </span>
                <span className="font-serif text-xl text-accent-green/70 tabular-nums">
                  {o.n}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-xl md:text-2xl text-ink leading-snug">
                {o.t}.
              </h3>
              <p className="mt-3 text-sm text-muted-ink leading-relaxed">{o.b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}

function DayDiagram() {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
          A fragmented day
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
          09:00 — 18:00
        </span>
      </div>
      <svg viewBox="0 0 360 90" className="mt-4 w-full">
        <line x1="0" y1="68" x2="360" y2="68" stroke="var(--border)" />
        {[
          { x: 4, w: 40 }, { x: 50, w: 28 }, { x: 84, w: 18 },
          { x: 108, w: 52 }, { x: 168, w: 24 }, { x: 198, w: 38 },
          { x: 242, w: 22 }, { x: 270, w: 32 }, { x: 308, w: 18 }, { x: 332, w: 24 },
        ].map((r, i) => (
          <motion.rect
            key={i}
            x={r.x} y={50} width={r.w} height={14}
            rx={3} fill="var(--soft-green)" stroke="var(--accent-green)" strokeWidth="0.6"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 50 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          />
        ))}
        {[44, 78, 102, 160, 192, 236, 264, 302, 326].map((x, i) => (
          <line key={i} x1={x} y1={48} x2={x} y2={86} stroke="var(--warm)" strokeWidth="0.8" strokeDasharray="2 3" opacity={0.7} />
        ))}
      </svg>
      <p className="mt-3 text-xs text-muted-ink leading-relaxed">
        The blocks are the work. The gaps are where attention has to switch — and where
        most products are silent.
      </p>
    </div>
  );
}

/* ---------------- 03 Bridge ---------------- */

function BridgeThinking() {
  return (
    <Chapter id="bridge" number="03" kicker="The thinking behind Bridge" title="Bridge is the first product developed by Emergize AG.">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-5 text-muted-ink leading-relaxed text-base md:text-lg">
          <p>
            Bridge is a moment-based composure companion for the transitions
            between meetings, tasks, decisions, and the end of the workday.
          </p>
          <p>
            It works in short, structured experiences called <em className="text-ink not-italic">crossings</em> —
            usually two minutes — that help people recognise where they are
            before moving to what is next.
          </p>
          <p>
            Bridge does not promise transformation. It does not attempt to
            replace deep work, therapy, or rest. It offers a structured pause —
            and the discipline to keep it that small.
          </p>
          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm hover:bg-accent-green transition-colors"
            >
              See Bridge
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/teams"
              className="inline-flex items-center gap-2 rounded-full border border-border text-ink px-5 py-2.5 text-sm hover:bg-surface/60 transition-colors"
            >
              Bridge for Teams
            </Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <CrossingDiagram />
        </div>
      </div>
    </Chapter>
  );
}

function CrossingDiagram() {
  const stages = [
    { label: "Previous state", note: "What was just held" },
    { label: "The crossing", note: "A structured pause" },
    { label: "Next state", note: "What is being entered" },
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
      <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
        Anatomy of a crossing
      </div>
      <svg viewBox="0 0 480 160" className="mt-6 w-full">
        <line x1="20" y1="110" x2="460" y2="110" stroke="var(--border)" strokeDasharray="2 4" />
        <motion.path
          d="M40,110 C150,30 330,30 440,110"
          fill="none" stroke="var(--accent-green)" strokeWidth="1.6" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <circle cx="40" cy="110" r="6" fill="var(--surface)" stroke="var(--border)" />
        <circle cx="240" cy="50" r="7" fill="var(--soft-green)" stroke="var(--accent-green)" />
        <circle cx="440" cy="110" r="6" fill="var(--soft-green)" stroke="var(--accent-green)" />
        <text x="40" y="140" fontSize="10" fill="var(--faint-ink)" textAnchor="middle">A</text>
        <text x="240" y="40" fontSize="10" fill="var(--faint-ink)" textAnchor="middle">pause</text>
        <text x="440" y="140" fontSize="10" fill="var(--faint-ink)" textAnchor="middle">B</text>
      </svg>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {stages.map((s) => (
          <div key={s.label} className="text-xs">
            <div className="text-[10px] uppercase tracking-[0.18em] text-faint-ink">
              {s.label}
            </div>
            <div className="mt-1 text-ink">{s.note}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-ink leading-relaxed">
        The crossing is not the work, and not the rest. It is the space in
        between — designed deliberately, kept short, and easy to leave.
      </p>
    </div>
  );
}

/* ---------------- 04 Founder ---------------- */

function Founder() {
  return (
    <Chapter id="founder" number="04" kicker="Founder" title="Marco Cavelty">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <figure className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-surface/40">
              <img
                src={founderImg}
                alt="Marco Cavelty"
                loading="lazy"
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
              Marco Cavelty · Altenrhein, Switzerland
            </figcaption>
          </figure>
        </div>
        <div className="lg:col-span-7 space-y-5 text-muted-ink leading-relaxed text-base md:text-lg">
          <div>
            <div className="font-serif text-2xl md:text-3xl text-ink leading-tight">
              Marco Cavelty
            </div>
            <div className="mt-1 text-sm text-muted-ink">
              Founder &amp; Managing Director · Emergize AG
            </div>
          </div>
          <p>
            The work at Emergize sits at the intersection of human systems,
            technology, and the question of how attention is asked of us in
            modern work environments.
          </p>
          <p>
            The interest is in product design with restraint — the difference
            between software that is useful and software that is simply
            insistent, and what becomes possible when a product is willing to
            ask for less.
          </p>
          <p>
            That posture shapes how Emergize chooses problems, what it measures,
            and what it deliberately leaves out.
          </p>
          <div className="pt-2">
            <a
              href="https://www.linkedin.com/in/marco-cavelty-8291a886/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Marco Cavelty on LinkedIn"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-surface/60 text-ink hover:bg-surface hover:text-accent-green transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/* ---------------- 05 Principles ---------------- */

function Principles() {
  const items = [
    { n: "I", t: "Build for reality", b: "Products should fit into people's lives rather than demand new routines from them." },
    { n: "II", t: "Respect attention", b: "Attention is finite and valuable. We try to ask for less of it, more deliberately." },
    { n: "III", t: "Trust over engagement", b: "Success is not measured by time spent inside a product." },
    { n: "IV", t: "Technology with restraint", b: "Just because something can be measured does not mean it should be." },
    { n: "V", t: "Clarity over complexity", b: "Simple systems are often more useful, and almost always more trustworthy, than complicated ones." },
  ];

  return (
    <Chapter id="principles" number="05" kicker="Principles" title="How we work, and what we deliberately do not do.">
      <div className="space-y-12 md:space-y-16">
        {items.map((p, i) => {
          const reverse = i % 2 === 1;
          return (
            <motion.article
              key={p.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className={`col-span-2 md:col-span-1 ${reverse ? "md:col-start-11 md:order-2 md:text-right" : ""}`}>
                <span className="font-serif italic text-3xl md:text-4xl text-accent-green/70">
                  {p.n}
                </span>
              </div>
              <div className={`col-span-10 md:col-span-8 ${reverse ? "md:col-start-3 md:order-1" : "md:col-start-2"}`}>
                <h3 className="font-serif text-2xl md:text-4xl leading-[1.1] text-ink">
                  {p.t}.
                </h3>
                <p className="mt-4 text-base md:text-lg text-muted-ink leading-relaxed max-w-xl">
                  {p.b}
                </p>
                <div className="mt-7 h-px w-16 bg-border" />
              </div>
            </motion.article>
          );
        })}
      </div>
    </Chapter>
  );
}

/* ---------------- 06 Switzerland & DACH ---------------- */

function Switzerland() {
  const traits = [
    { t: "Trust", b: "Built slowly, then expected." },
    { t: "Quality", b: "Considered the baseline, not a feature." },
    { t: "Long-term thinking", b: "Products are judged over years, not weeks." },
    { t: "Privacy", b: "A default, not an add-on." },
    { t: "Reliability", b: "Restraint is read as competence." },
    { t: "Design", b: "Quiet, precise, and unsentimental." },
  ];
  return (
    <Chapter id="switzerland" number="06" kicker="Switzerland & DACH" title="Why we are based here, and why the focus begins here.">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <figure>
            <div className="overflow-hidden rounded-2xl border border-border">
              <img
                src={workspaceImg}
                alt="A quiet working space overlooking Lake Constance"
                loading="lazy"
                width={1600}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between text-[11px] uppercase tracking-[0.22em] text-faint-ink">
              <span>Altenrhein</span>
              <span>Lake Constance</span>
            </figcaption>
          </figure>

          <div className="mt-8 rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
              Region
            </div>
            <svg viewBox="0 0 320 120" className="mt-4 w-full">
              <path
                d="M20,80 C70,50 110,60 150,55 C190,50 230,70 290,40"
                stroke="var(--border)" strokeWidth="1" fill="none"
              />
              {[
                { x: 60, y: 70, label: "DE" },
                { x: 150, y: 55, label: "CH" },
                { x: 250, y: 48, label: "AT" },
              ].map((p) => (
                <g key={p.label}>
                  <circle cx={p.x} cy={p.y} r="4" fill="var(--accent-green)" />
                  <text x={p.x} y={p.y - 10} fontSize="10" fill="var(--muted-ink)" textAnchor="middle">
                    {p.label}
                  </text>
                </g>
              ))}
              <circle cx="170" cy="60" r="11" fill="none" stroke="var(--accent-green)" strokeDasharray="2 3" />
              <text x="170" y="92" fontSize="9" fill="var(--faint-ink)" textAnchor="middle">
                Altenrhein
              </text>
            </svg>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-muted-ink leading-relaxed text-base md:text-lg max-w-2xl">
          <p>
            Emergize is based in Altenrhein, a small town on the Swiss side of
            Lake Constance, close to the border with Austria and Germany.
          </p>
          <p>
            The choice is practical as much as it is symbolic. The professional
            cultures of Switzerland, Germany, and Austria share a particular
            relationship with work — reserved, considered, often understated —
            that fits the way Bridge is designed.
          </p>
          <p>
            We start where we are. The first version of Bridge is shaped for
            DACH professional environments, and tested in them.
          </p>

          <div className="grid sm:grid-cols-2 gap-px bg-border/70 border border-border rounded-2xl overflow-hidden mt-6">
            {traits.map((t) => (
              <div key={t.t} className="bg-background p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
                  {t.t}
                </div>
                <div className="mt-2 text-sm text-ink leading-relaxed">{t.b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/* ---------------- 07 Building ---------------- */

function Building() {
  return (
    <Chapter id="building" number="07" kicker="What we're building" title="Bridge is the first step, not the whole company.">
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-5 text-muted-ink leading-relaxed text-base md:text-lg max-w-xl">
          <p>
            Emergize AG is interested in thoughtful products around modern work
            and human experience — the experience of attention, of transition,
            of presence, of recovery.
          </p>
          <p>
            Bridge is the first expression of that interest. We have no
            announcements to make beyond it, and no promises to make about what
            comes next.
          </p>
          <p>
            What we can say is that anything else we build will share the same
            posture: restrained, research-grounded, and designed for the
            realities of professional life rather than for the metrics of an app.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
              Company perspective
            </div>
            <ol className="mt-6 space-y-5">
              {[
                { n: "01", t: "Attention", b: "How modern work asks for it, and what gives it back." },
                { n: "02", t: "Transitions", b: "The unnamed intervals between activities, decisions, and roles." },
                { n: "03", t: "Composure", b: "The steadiness people carry, or fail to carry, between moments." },
                { n: "04", t: "Recovery", b: "What rest looks like inside a working day, not only after it." },
              ].map((s) => (
                <li key={s.n} className="flex items-baseline gap-5 border-t border-border/60 pt-4 first:border-t-0 first:pt-0">
                  <span className="font-serif text-base text-accent-green/80 tabular-nums w-8 shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <div className="text-base text-ink">{s.t}</div>
                    <p className="mt-1 text-sm text-muted-ink leading-relaxed">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/* ---------------- 08 Company info ---------------- */

function CompanyInfo() {
  return (
    <Chapter id="company" number="08" kicker="Company information" title="Emergize AG">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <BridgeIcon className="h-10 w-10 rounded-[22%] shrink-0" />
              <div className="text-sm leading-relaxed text-ink">
                <p className="font-medium">Emergize AG</p>
                <p className="text-muted-ink">Seestrasse 3</p>
                <p className="text-muted-ink">CH-9423 Altenrhein</p>
                <p className="text-muted-ink">Switzerland</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
                  <a
                    href="https://emergize.ch"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-accent-green hover:underline underline-offset-4"
                  >
                    emergize.ch
                  </a>
                  <a
                    href="mailto:hello@emergize.ch"
                    className="text-muted-ink hover:text-ink underline underline-offset-4"
                  >
                    hello@emergize.ch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
              Commercial Registration Number
            </div>
            <p className="mt-3">
              <span className="inline-flex items-center gap-3 rounded-lg border border-border bg-surface/60 px-4 py-2.5 font-mono text-sm text-ink">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                CHE-334.768.129
              </span>
            </p>
          </div>
          <p className="text-sm text-muted-ink leading-relaxed">
            Full legal information is available in the{" "}
            <Link to="/legal" className="text-ink underline underline-offset-4">
              Legal Notice
            </Link>.
          </p>
        </div>
      </div>
    </Chapter>
  );
}

/* ---------------- 09 Contact ---------------- */

function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-32 border-t border-border/60 py-24 md:py-32"
    >
      <div aria-hidden className="absolute inset-0 ambient-glow opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
              09 · Get in touch
            </div>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink max-w-2xl">
              Get in touch.
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-ink leading-relaxed">
              Conversations welcome. Sales calls less so. If you are curious
              about the work, the company, or the thinking behind Bridge, write
              to us.
            </p>
          </div>
          <div className="lg:col-span-5">
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@emergize.ch"
                  className="group flex items-baseline justify-between border-t border-border py-5"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
                    Email
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-ink group-hover:text-accent-green transition-colors">
                    hello@emergize.ch
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://emergize.ch"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-baseline justify-between border-t border-border py-5"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
                    Website
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-ink group-hover:text-accent-green transition-colors">
                    emergize.ch
                  </span>
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="group flex items-baseline justify-between border-t border-b border-border py-5"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
                    Product
                  </span>
                  <span className="font-serif text-xl md:text-2xl text-ink group-hover:text-accent-green transition-colors">
                    Bridge →
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-center gap-4 text-faint-ink">
          <span className="h-px w-12 bg-border" />
          <BridgePauseGlyph className="h-2 w-6" />
          <span className="h-px w-12 bg-border" />
        </div>
        <p className="mt-6 text-center text-[11px] uppercase tracking-[0.22em] text-faint-ink">
          Emergize AG · Altenrhein · Switzerland
        </p>
      </div>
    </section>
  );
}

// Silence unused chapter list helper; chapters constant kept for future TOC use.
void chapters;
