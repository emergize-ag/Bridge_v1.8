import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { BridgeIcon, BridgePauseGlyph } from "@/components/site/BridgeMark";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Bridge" },
      {
        name: "description",
        content:
          "How Bridge by Emergize AG handles personal information, organisational reporting, and third-party AI experiences. Last updated June 2026.",
      },
      { property: "og:title", content: "Privacy Policy — Bridge" },
      {
        property: "og:description",
        content:
          "How Bridge handles data, organisational reporting, and third-party AI experiences.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

type Section = {
  id: string;
  number: string;
  title: string;
};

const sections: Section[] = [
  { id: "who-we-are", number: "01", title: "Who we are" },
  { id: "what-bridge-does", number: "02", title: "What Bridge does (and does not do)" },
  { id: "data-we-collect", number: "03", title: "What data we collect" },
  { id: "how-we-use", number: "04", title: "How we use your data" },
  { id: "legal-basis", number: "05", title: "Legal basis" },
  { id: "how-we-share", number: "06", title: "How we share data" },
  { id: "retention", number: "07", title: "Data retention" },
  { id: "your-rights", number: "08", title: "Your rights" },
  { id: "security", number: "09", title: "Data security" },
  { id: "reflect-with-ai", number: "10", title: "Reflect with AI" },
  { id: "contact", number: "11", title: "Contact and complaints" },
  { id: "changes", number: "12", title: "Changes to this policy" },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav />
      <LangNotice variant="legal" />
      <ReadingProgress />
      <Hero />
      <main className="relative mx-auto max-w-7xl px-5 sm:px-6 pb-32">
        <div className="grid gap-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
          <TableOfContents />
          <Article />
        </div>
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Reading progress bar ---------- */
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

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div aria-hidden className="absolute inset-0 ambient-glow opacity-40" />
      <svg
        aria-hidden
        viewBox="0 0 1200 240"
        className="absolute inset-x-0 bottom-0 h-32 w-full text-accent-green/15"
        preserveAspectRatio="none"
      >
        <path
          d="M0,160 C300,40 900,40 1200,160"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M0,200 C300,80 900,80 1200,200"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </svg>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex items-center gap-3">
          <BridgeIcon className="h-10 w-10 rounded-[22%]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
            Bridge · Legal
          </span>
        </div>
        <h1 className="mt-10 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-ink max-w-3xl">
          Privacy Policy
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-ink max-w-xl">
          How Bridge handles personal information, organisational reporting, and the
          experiences that surround a crossing.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-faint-ink">
          <span className="inline-flex items-center gap-2">
            <BridgePauseGlyph className="h-[6px] w-5 text-faint-ink" />
            Bridge
          </span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Last updated June 2026</span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Emergize AG · Switzerland</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Table of contents ---------- */
function TableOfContents() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const els = sections
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
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const activeSection = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <>
      {/* Mobile collapsible */}
      <aside className="lg:hidden sticky top-[68px] z-20 -mx-5 sm:-mx-6 mb-4 bg-background/90 backdrop-blur-xl border-b border-border/60">
        <button
          type="button"
          onClick={() => setOpenMobile((o) => !o)}
          className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left"
          aria-expanded={openMobile}
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink shrink-0">
              {activeSection.number}
            </span>
            <span className="text-sm text-ink truncate">{activeSection.title}</span>
          </span>
          <svg
            viewBox="0 0 16 16"
            className={`h-4 w-4 text-muted-ink transition-transform ${openMobile ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
        <motion.div
          initial={false}
          animate={openMobile ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <ol className="px-5 sm:px-6 pb-5 space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpenMobile(false)}
                  className={`flex items-baseline gap-3 py-2 text-sm ${
                    active === s.id ? "text-ink" : "text-muted-ink"
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink w-6 shrink-0">
                    {s.number}
                  </span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </motion.div>
      </aside>

      {/* Desktop sticky sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[110px]">
          <div className="text-[11px] uppercase tracking-[0.22em] text-faint-ink mb-5">
            Contents
          </div>
          <ol className="space-y-1 border-l border-border">
            {sections.map((s) => {
              const isActive = active === s.id;
              return (
                <li key={s.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="toc-indicator"
                      className="absolute -left-px top-0 bottom-0 w-px bg-accent-green"
                      transition={{ type: "spring", stiffness: 360, damping: 32 }}
                    />
                  )}
                  <a
                    href={`#${s.id}`}
                    className={`group flex items-baseline gap-3 pl-5 pr-2 py-2 text-[13px] transition-colors ${
                      isActive ? "text-ink" : "text-muted-ink hover:text-ink"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink w-6 shrink-0">
                      {s.number}
                    </span>
                    <span className="leading-snug">{s.title}</span>
                  </a>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 pl-5 text-[11px] text-faint-ink leading-relaxed">
            <p>Emergize AG</p>
            <p>Seestrasse 3</p>
            <p>CH-9423 Altenrhein</p>
            <p className="mt-2">
              <a href="mailto:privacy@emergize.ch" className="hover:text-ink">
                privacy@emergize.ch
              </a>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- Article ---------- */
function Article() {
  return (
    <article className="max-w-[68ch] pt-2 lg:pt-6">
      <SectionBlock id="who-we-are" number="01" title="Who we are">
        <p>
          Bridge is a moment-based transition and composure companion for employees and
          professionals navigating demanding work environments. It helps people move
          through the transitions between meetings, tasks, decisions, and the end of the
          workday through short, structured experiences called crossings.
        </p>
        <p>
          Access to Bridge is typically provided by an employer or organisation as part of
          a workplace wellbeing, development, or support initiative.
        </p>
        <p>
          In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to{" "}
          <strong className="text-ink font-medium">Emergize AG</strong>, the operator of
          the Bridge platform, application, and website.
        </p>
      </SectionBlock>

      <SectionBlock id="what-bridge-does" number="02" title="What Bridge does (and does not do)">
        <p>
          Bridge provides short guided crossings, audio experiences, and other
          moment-based interactions designed to support composure, steadiness, and
          presence during everyday work transitions.
        </p>
        <Callout tone="warn">
          Bridge is not a medical device and does not provide diagnosis, treatment,
          psychotherapy, counselling, or crisis support services. If you are experiencing
          a medical emergency or are in immediate distress, please contact local
          emergency services or an appropriately qualified healthcare professional.
        </Callout>
      </SectionBlock>

      <SectionBlock id="data-we-collect" number="03" title="What data we collect">
        <p>
          We collect and process information necessary to provide, secure, improve, and
          operate the Bridge service.
        </p>

        <SubHeading>3.1 Account and access data</SubHeading>
        <ul>
          <li>Name or alias (where provided)</li>
          <li>Work email address</li>
          <li>Authentication and login information</li>
          <li>Organisation or employer information relevant to account access</li>
        </ul>

        <SubHeading>3.2 Usage and activity data</SubHeading>
        <ul>
          <li>Crossings and experiences started or completed</li>
          <li>Favourites and saved content</li>
          <li>Reminder and ritual preferences</li>
          <li>Engagement and participation information</li>
          <li>General usage patterns</li>
          <li>Technical interaction events necessary for product operation and improvement</li>
        </ul>
        <Callout>
          Personal reflections, journal content, and similar user-generated content are
          not included in organisational reporting provided to employers.
        </Callout>

        <SubHeading>3.3 Device and technical data</SubHeading>
        <ul>
          <li>Device type</li>
          <li>Operating system information</li>
          <li>Language settings</li>
          <li>Technical identifiers required for secure operation</li>
          <li>Error logs, diagnostics, and crash reports</li>
        </ul>
        <p>We do not collect precise GPS location information.</p>
      </SectionBlock>

      <SectionBlock id="how-we-use" number="04" title="How we use your data">
        <p>We use information for the following purposes:</p>
        <ul>
          <li>Providing access to Bridge and its features</li>
          <li>Delivering crossings, reminders, and saved experiences</li>
          <li>Maintaining security, reliability, and performance</li>
          <li>Understanding how Bridge is used and improving the product experience</li>
          <li>Developing new features and content</li>
          <li>
            Providing organisations with organisational-level insights regarding
            participation, engagement patterns, and workplace transition trends
          </li>
        </ul>
        <p>
          We do not use personal information to make automated decisions that produce
          legal or similarly significant effects on individuals.
        </p>
      </SectionBlock>

      <SectionBlock id="legal-basis" number="05" title="Legal basis">
        <p>
          Where applicable laws require a legal basis for processing, we may rely on:
        </p>
        <ul>
          <li>
            <strong className="text-ink font-medium">Performance of a contract</strong>,
            including providing access to Bridge and related services
          </li>
          <li>
            <strong className="text-ink font-medium">Legitimate interests</strong>,
            including operating, securing, maintaining, evaluating, and improving the
            service while balancing those interests against the rights and expectations
            of users
          </li>
          <li>
            <strong className="text-ink font-medium">Consent</strong>, where specifically
            requested for optional features, communications, notifications, or future
            experimental capabilities
          </li>
        </ul>
      </SectionBlock>

      <SectionBlock id="how-we-share" number="06" title="How we share data">
        <p>We may share information with the following categories of recipients:</p>

        <SubHeading>Your employer or organisation</SubHeading>
        <p>
          We may provide organisations with organisational-level reporting, participation
          trends, engagement patterns, and other workplace insights generated from the
          use of Bridge.
        </p>
        <Callout>
          Employers are not provided with individual session histories, personal
          reflections, journal content, or detailed records of how a specific person
          engages with crossings.
        </Callout>

        <SubHeading>Service providers and processors</SubHeading>
        <p>
          We work with carefully selected vendors who support hosting, infrastructure,
          authentication, analytics, communications, and technical operations.
        </p>
        <p>
          These providers process information only under appropriate contractual
          safeguards and only to the extent necessary to provide their services.
        </p>

        <SubHeading>Legal obligations</SubHeading>
        <p>
          We may disclose information when required by applicable law, regulation, court
          order, or legal process.
        </p>
        <p className="text-ink">
          <strong className="font-medium">
            We do not sell personal information to third parties.
          </strong>
        </p>
      </SectionBlock>

      <SectionBlock id="retention" number="07" title="Data retention">
        <p>
          We retain account information and service-related data for as long as
          reasonably necessary to provide Bridge and support organisational access.
        </p>
        <p>Where appropriate, information may be retained for additional periods to:</p>
        <ul>
          <li>Meet legal obligations</li>
          <li>Resolve disputes</li>
          <li>Enforce agreements</li>
          <li>Protect the security and integrity of the service</li>
        </ul>
        <p>
          Where personal information is no longer required, it may be deleted,
          anonymised, or aggregated.
        </p>
        <p>
          Data may be stored and processed within the European Union, Switzerland, or
          other jurisdictions that support the operation of our services. Where required,
          appropriate safeguards are implemented to support applicable data protection
          requirements.
        </p>
      </SectionBlock>

      <SectionBlock id="your-rights" number="08" title="Your rights">
        <p>Depending on applicable laws, you may have rights including:</p>
        <RightsGrid />
        <p>Requests may require identity verification before action can be taken.</p>
      </SectionBlock>

      <SectionBlock id="security" number="09" title="Data security">
        <p>
          We implement appropriate technical and organisational measures designed to
          protect information against unauthorised access, misuse, loss, disclosure, or
          alteration.
        </p>
        <p>These measures include:</p>
        <SecurityGrid />
        <p>
          While no system can guarantee absolute security, we continuously review and
          improve our security practices.
        </p>
      </SectionBlock>

      <SectionBlock id="reflect-with-ai" number="10" title="Reflect with AI">
        <p>
          Bridge may provide links, prompts, or launch experiences that allow users to
          continue a conversation with third-party AI services such as ChatGPT, Claude,
          Grok, or similar providers.
        </p>
        <p>These services are operated independently from Bridge and Emergize.</p>
        <ReflectDiagram />
        <p>
          Bridge does not provide personal profile information, employer information,
          account activity, or individual usage history to these providers as part of
          this experience.
        </p>
        <p>
          Any information a user chooses to share after leaving Bridge and interacting
          with a third-party AI service is governed by that provider&rsquo;s own terms,
          privacy practices, and policies.
        </p>
        <p>
          Conversations that occur within third-party AI platforms take place outside the
          scope of the Bridge service, and Emergize is not responsible for the handling,
          storage, processing, or retention of information within those platforms.
        </p>
      </SectionBlock>

      <SectionBlock id="contact" number="11" title="Contact and complaints">
        <p>
          If you have questions regarding this Privacy Policy or our handling of personal
          information, please contact:
        </p>
        <div className="not-prose my-8 rounded-2xl border border-border bg-surface/60 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <BridgeIcon className="h-10 w-10 rounded-[22%] shrink-0" />
            <div className="text-sm leading-relaxed text-ink">
              <p className="font-medium">Emergize AG</p>
              <p className="text-muted-ink">Seestrasse 3</p>
              <p className="text-muted-ink">CH-9423 Altenrhein</p>
              <p className="text-muted-ink">Switzerland</p>
              <p className="mt-3">
                <a
                  href="mailto:privacy@emergize.ch"
                  className="text-accent-green hover:underline underline-offset-4"
                >
                  privacy@emergize.ch
                </a>
              </p>
            </div>
          </div>
        </div>
        <p>
          You may also have the right to lodge a complaint with a relevant supervisory
          authority or data protection regulator.
        </p>
      </SectionBlock>

      <SectionBlock id="changes" number="12" title="Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes to
          Bridge, legal requirements, operational practices, or regulatory obligations.
        </p>
        <p>
          Where appropriate, material changes will be communicated through the service or
          via email.
        </p>
      </SectionBlock>

      {/* End ornament */}
      <div className="mt-20 flex items-center justify-center gap-4 text-faint-ink">
        <span className="h-px w-12 bg-border" />
        <BridgePauseGlyph className="h-2 w-6" />
        <span className="h-px w-12 bg-border" />
      </div>
      <p className="mt-6 text-center text-[11px] uppercase tracking-[0.22em] text-faint-ink">
        End of policy · Last updated June 2026
      </p>
    </article>
  );
}

/* ---------- Section building blocks ---------- */
function SectionBlock({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      id={id}
      className="scroll-mt-32 pt-14 first:pt-0 border-t border-border/60 first:border-t-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-serif text-2xl text-accent-green/80 tabular-nums">
            {number}
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-ink leading-tight">
            {title}
          </h2>
        </div>
        <div className="prose-bridge mt-6">{children}</div>
      </motion.div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="not-prose mt-8 mb-3 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
      {children}
    </h3>
  );
}

function Callout({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "warn";
}) {
  const isWarn = tone === "warn";
  return (
    <aside
      className={`not-prose my-6 rounded-xl border p-5 md:p-6 text-sm leading-relaxed ${
        isWarn
          ? "border-warm/40 bg-warm/5 text-ink"
          : "border-accent-green/30 bg-soft-green/40 text-ink"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
            isWarn ? "bg-warm" : "bg-accent-green"
          }`}
        />
        <div>{children}</div>
      </div>
    </aside>
  );
}

/* ---------- Rights grid (section 08) ---------- */
function RightsGrid() {
  const rights = [
    { label: "Access", desc: "to your personal information" },
    { label: "Correction", desc: "of inaccurate information" },
    { label: "Deletion", desc: "of personal information" },
    { label: "Restriction", desc: "of processing" },
    { label: "Objection", desc: "to certain processing activities" },
    { label: "Portability", desc: "of data where applicable" },
    { label: "Withdrawal", desc: "of consent where processing relies on consent" },
  ];
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {rights.map((r) => (
        <div
          key={r.label}
          className="rounded-xl border border-border bg-surface/50 p-4 flex items-start gap-3"
        >
          <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-green shrink-0" />
          <div className="text-sm">
            <div className="text-ink font-medium">{r.label}</div>
            <div className="text-muted-ink mt-0.5">{r.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Security grid (section 09) ---------- */
function SecurityGrid() {
  const items = [
    { label: "Encrypted connections", sub: "HTTPS / TLS in transit" },
    { label: "Access controls", sub: "Permission and role management" },
    { label: "Security monitoring", sub: "Ongoing observation of the service" },
    { label: "Application security", sub: "Infrastructure and code practices" },
    { label: "Regular updates", sub: "Maintenance and patching" },
  ];
  return (
    <ul className="not-prose my-6 grid gap-2 sm:grid-cols-2">
      {items.map((i) => (
        <li
          key={i.label}
          className="rounded-xl border border-border bg-surface/50 p-4 flex items-center gap-3"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 text-accent-green shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
          </svg>
          <div className="text-sm">
            <div className="text-ink">{i.label}</div>
            <div className="text-faint-ink text-[12px]">{i.sub}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Reflect with AI diagram (section 10) ---------- */
function ReflectDiagram() {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        {/* Bridge */}
        <div className="flex flex-col items-center text-center min-w-0">
          <div className="h-14 w-14 rounded-[22%] border border-border bg-background flex items-center justify-center">
            <BridgeIcon className="h-10 w-10 rounded-[22%]" />
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
            Bridge
          </div>
          <div className="mt-1 text-xs text-muted-ink">In scope</div>
        </div>

        {/* Connector */}
        <div className="flex-1 relative flex items-center justify-center min-w-0">
          <svg
            aria-hidden
            viewBox="0 0 200 40"
            className="w-full h-10 text-accent-green/70"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20 C60,20 80,4 100,4 C120,4 140,36 200,36"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeDasharray="3 4"
            />
          </svg>
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-faint-ink whitespace-nowrap">
            You choose to continue
          </span>
        </div>

        {/* External */}
        <div className="flex flex-col items-center text-center min-w-0">
          <div className="h-14 w-14 rounded-[22%] border border-dashed border-border bg-background flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-muted-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M14 3h7v7" />
              <path d="M21 3l-9 9" />
              <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
            </svg>
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
            Third-party AI
          </div>
          <div className="mt-1 text-xs text-muted-ink">Outside Bridge</div>
        </div>
      </div>
      <figcaption className="mt-6 text-center text-[12px] text-faint-ink">
        Conversations within ChatGPT, Claude, Grok, or similar providers take place
        outside the scope of Bridge and are governed by that provider&rsquo;s terms.
      </figcaption>
    </figure>
  );
}

/* ---------- Article prose styles ---------- */
// Tailwind v4: use a local utility-less wrapper via inline styles.
// We rely on plain spacing classes rather than @tailwindcss/typography
// to keep the design system in control.
const proseClassInjection = `
.prose-bridge p { color: var(--muted-ink); font-size: 0.975rem; line-height: 1.75; margin-top: 1rem; }
.prose-bridge p:first-child { margin-top: 0; }
.prose-bridge ul { margin-top: 1rem; padding-left: 1.25rem; color: var(--muted-ink); font-size: 0.975rem; line-height: 1.75; }
.prose-bridge ul li { position: relative; padding-left: 0.75rem; margin-top: 0.35rem; list-style: none; }
.prose-bridge ul li::before { content: ""; position: absolute; left: 0; top: 0.7em; width: 6px; height: 1px; background: var(--accent-green); opacity: 0.8; }
.prose-bridge strong { color: var(--ink); font-weight: 500; }
.prose-bridge a { color: var(--accent-green); text-decoration: underline; text-underline-offset: 4px; }
`;

// Inject prose styles once.
if (typeof document !== "undefined" && !document.getElementById("prose-bridge-styles")) {
  const tag = document.createElement("style");
  tag.id = "prose-bridge-styles";
  tag.textContent = proseClassInjection;
  document.head.appendChild(tag);
}
