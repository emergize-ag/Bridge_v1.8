import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { BridgeIcon, BridgePauseGlyph } from "@/components/site/BridgeMark";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Bridge" },
      {
        name: "description",
        content:
          "The terms that govern your use of Bridge by Emergize AG, including acceptable use, the employer relationship, and third-party AI experiences. Last updated 09 June 2026.",
      },
      { property: "og:title", content: "Terms & Conditions — Bridge" },
      {
        property: "og:description",
        content:
          "The terms that govern your use of Bridge, including acceptable use, the employer relationship, and third-party AI experiences.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

type Section = { id: string; number: string; title: string };

const sections: Section[] = [
  { id: "scope", number: "01", title: "Scope and acceptance" },
  { id: "who-may-use", number: "02", title: "Who may use Bridge" },
  { id: "nature", number: "03", title: "Nature of the service" },
  { id: "acceptable-use", number: "04", title: "Acceptable use" },
  { id: "ip", number: "05", title: "Intellectual property" },
  { id: "employer", number: "06", title: "Employer relationship" },
  { id: "availability", number: "07", title: "Availability and changes" },
  { id: "fees", number: "08", title: "Fees" },
  { id: "warranties", number: "09", title: "Disclaimer of warranties" },
  { id: "liability", number: "10", title: "Limitation of liability" },
  { id: "termination", number: "11", title: "Termination" },
  { id: "reflect-with-ai", number: "12", title: "Reflect with AI" },
  { id: "data-protection", number: "13", title: "Data protection" },
  { id: "law", number: "14", title: "Governing law" },
  { id: "changes", number: "15", title: "Changes to these Terms" },
];

function TermsPage() {
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
        <path d="M0,160 C300,40 900,40 1200,160" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M0,200 C300,80 900,80 1200,200" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="flex items-center gap-3">
          <BridgeIcon className="h-10 w-10 rounded-[22%]" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
            Bridge · Legal
          </span>
        </div>
        <h1 className="mt-10 font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-ink max-w-3xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-ink max-w-xl">
          The terms that govern your use of Bridge — its application, website, and
          related services.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-faint-ink">
          <span className="inline-flex items-center gap-2">
            <BridgePauseGlyph className="h-[6px] w-5 text-faint-ink" />
            Bridge
          </span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Last updated 09 June 2026</span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Emergize AG · Switzerland</span>
        </div>
      </div>
    </section>
  );
}

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
                      layoutId="toc-indicator-terms"
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
              <a href="mailto:legal@emergize.ch" className="hover:text-ink">
                legal@emergize.ch
              </a>
            </p>
            <p className="mt-4">
              <Link to="/privacy" className="hover:text-ink underline underline-offset-4">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Article() {
  return (
    <article className="max-w-[68ch] pt-2 lg:pt-6">
      <SectionBlock id="scope" number="01" title="Scope and acceptance">
        <p>
          These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Bridge
          mobile application, website and related services (collectively, the
          &ldquo;Service&rdquo;). By creating an account or using the Service, you agree
          to be bound by these Terms. If you do not agree, you must not use the Service.
        </p>
        <p>
          In most cases, access to Bridge is provided through your employer or another
          organisation that has a contract with us. In that case, these Terms apply to
          you as an end user, in addition to our agreement with the organisation.
        </p>
      </SectionBlock>

      <SectionBlock id="who-may-use" number="02" title="Who may use Bridge">
        <p>You may use Bridge if:</p>
        <ul>
          <li>You are at least 16 years old (or of legal age in your jurisdiction), and</li>
          <li>
            You have been invited by your employer or have otherwise received access from
            an authorised organisation, or you have created an individual account where
            this is enabled.
          </li>
        </ul>
        <p>
          You are responsible for keeping your login information and one-time codes
          confidential and for all activities that occur under your account.
        </p>
      </SectionBlock>

      <SectionBlock id="nature" number="03" title="Nature of the service">
        <p>
          Bridge provides short guided crossings, audio experiences, video experiences,
          and other moment-based interactions designed to support composure, steadiness,
          and presence during everyday work transitions.
        </p>
        <p>Bridge:</p>
        <ul>
          <li>Does not provide medical, psychological or psychotherapeutic treatment</li>
          <li>Does not offer diagnosis, crisis intervention or emergency services</li>
          <li>Is not a replacement for professional medical or psychological care</li>
        </ul>
        <Callout tone="warn">
          Always seek advice from a qualified professional regarding any questions about
          your health. If you are in crisis, contact local emergency services or a crisis
          hotline immediately.
        </Callout>
      </SectionBlock>

      <SectionBlock id="acceptable-use" number="04" title="Acceptable use">
        <p>
          You agree to use Bridge only for lawful purposes and in a way that is
          compatible with its intended purpose.
        </p>
        <p>In particular, you must not:</p>
        <ul>
          <li>
            Attempt to reverse engineer, decompile, modify or create derivative works
            from the app or its content
          </li>
          <li>
            Use the Service in a way that infringes the rights of others or violates
            applicable law
          </li>
          <li>
            Share your access with unauthorised persons or attempt to access other
            users&rsquo; data
          </li>
          <li>Upload or transmit malware or other harmful code</li>
        </ul>
        <p>
          We may suspend or terminate your access if we reasonably believe that you are
          misusing the Service or violating these Terms.
        </p>
      </SectionBlock>

      <SectionBlock id="ip" number="05" title="Intellectual property">
        <p>
          All content and materials made available through Bridge — including text,
          audio, music, design, logos and software — are protected by intellectual
          property rights and remain the property of us or our licensors.
        </p>
        <p>
          We grant you a limited, non-exclusive, non-transferable licence to use the
          Service and its content solely for your personal, non-commercial use, in
          accordance with these Terms and any applicable employer contract.
        </p>
        <p>
          You may not copy, distribute, publicly perform, sell, rent, or otherwise
          exploit the content beyond what is permitted by law or these Terms.
        </p>
      </SectionBlock>

      <SectionBlock id="employer" number="06" title="Employer relationship">
        <p>If your access to Bridge is provided by an employer or other organisation:</p>
        <ul>
          <li>
            Your employer pays for the licence and may receive organisational-level
            reporting and insights regarding participation, engagement patterns, and
            broader workplace transition trends.
          </li>
          <li>
            Organisational reporting is designed to focus on broader participation and
            engagement patterns rather than detailed records of an individual&rsquo;s use
            of the Service.
          </li>
        </ul>
        <p>
          Nothing in these Terms creates an employment relationship between you and us.
          Your employment relationship remains solely with your employer.
        </p>
      </SectionBlock>

      <SectionBlock id="availability" number="07" title="Availability and changes to the service">
        <p>
          We aim to provide a stable and reliable service but cannot guarantee
          uninterrupted availability.
        </p>
        <p>The Service may be temporarily unavailable due to:</p>
        <ul>
          <li>Maintenance</li>
          <li>Updates</li>
          <li>Security measures</li>
          <li>Technical issues</li>
          <li>Infrastructure failures outside our reasonable control</li>
        </ul>
        <p>We may modify, add, remove, or improve features and content over time.</p>
        <p>
          Where reasonably possible, we will inform users or organisations about
          significant changes.
        </p>
      </SectionBlock>

      <SectionBlock id="fees" number="08" title="Fees">
        <p>
          In most cases, your employer or organisation pays for your access to Bridge
          under a separate contract.
        </p>
        <p>For end users, the Service is generally provided without direct charge.</p>
        <p>
          If individual paid features are introduced in the future, we will clearly
          explain any prices, billing terms, and conditions before any charge is applied.
        </p>
      </SectionBlock>

      <SectionBlock id="warranties" number="09" title="Disclaimer of warranties">
        <p>
          Bridge is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without
          any express or implied warranties, to the maximum extent permitted by law.
        </p>
        <p>We do not warrant that:</p>
        <ul>
          <li>The Service will always be available, error-free or completely secure</li>
          <li>
            The Service will achieve specific results for your wellbeing, composure,
            performance, recovery, or work experience
          </li>
          <li>Content is suitable for every person or situation</li>
        </ul>
        <p>Your use of the Service is at your own risk.</p>
      </SectionBlock>

      <SectionBlock id="liability" number="10" title="Limitation of liability">
        <p>
          To the maximum extent permitted by applicable law, we are not liable for:
        </p>
        <ul>
          <li>
            Any indirect, incidental, consequential or punitive damages arising from your
            use of or inability to use the Service
          </li>
          <li>
            Any decisions or actions taken based on content or experiences provided
            through the Service
          </li>
          <li>
            Any interruption, loss of access, loss of data, or service disruption outside
            our reasonable control
          </li>
        </ul>
        <p>
          Nothing in these Terms limits or excludes liability where this is not permitted
          by law, including liability arising from intent, gross negligence, or injury to
          life, body, or health.
        </p>
      </SectionBlock>

      <SectionBlock id="termination" number="11" title="Termination">
        <p>You may stop using Bridge at any time.</p>
        <p>
          Where available, you may request deletion of your account through the Service
          or by contacting us.
        </p>
        <p>We may suspend or terminate access where:</p>
        <ul>
          <li>Your employer&rsquo;s contract with us ends</li>
          <li>You materially violate these Terms</li>
          <li>
            We discontinue the Service for legal, technical, operational, or business
            reasons
          </li>
        </ul>
        <p>
          Where reasonably possible, we will provide notice before termination takes
          effect.
        </p>
      </SectionBlock>

      <SectionBlock id="reflect-with-ai" number="12" title="Reflect with AI">
        <p>
          Bridge may provide links, prompts, launch experiences, or similar features that
          allow users to continue a conversation with third-party AI services such as
          ChatGPT, Claude, Grok, or similar providers.
        </p>
        <p>
          These services operate independently from Bridge and Emergize and are governed
          by their own terms, privacy policies, and practices.
        </p>
        <ReflectDiagram />
        <p>
          Bridge does not provide personal profile information, employer information,
          account activity, or individual usage history to these providers as part of
          this experience.
        </p>
        <p>
          Any information a user chooses to share within a third-party AI service is
          shared directly with that provider and falls outside the scope of the Bridge
          service.
        </p>
        <p>
          Emergize is not responsible for the availability, content, privacy practices,
          security, storage, processing, or handling of information by third-party AI
          providers.
        </p>
      </SectionBlock>

      <SectionBlock id="data-protection" number="13" title="Data protection">
        <p>
          Our handling of personal data is described in our{" "}
          <Link to="/privacy">Privacy Policy</Link>, which forms part of these Terms.
        </p>
        <p>Please read it carefully.</p>
      </SectionBlock>

      <SectionBlock id="law" number="14" title="Governing law and jurisdiction">
        <p>
          Unless otherwise required by mandatory local law, these Terms are governed by
          the laws of Switzerland, excluding conflict of law rules.
        </p>
        <p>
          Subject to mandatory consumer protection rules, any disputes arising from or in
          connection with these Terms shall be subject to the exclusive jurisdiction of
          the competent courts at our registered seat.
        </p>
      </SectionBlock>

      <SectionBlock id="changes" number="15" title="Changes to these Terms">
        <p>We may update these Terms from time to time to reflect:</p>
        <ul>
          <li>Changes to the Service</li>
          <li>Operational changes</li>
          <li>Security requirements</li>
          <li>Legal or regulatory developments</li>
        </ul>
        <p>
          Where appropriate, material changes will be communicated through the Service or
          via email.
        </p>
        <p>
          Continued use of the Service after updated Terms take effect constitutes
          acceptance of the revised Terms.
        </p>
      </SectionBlock>

      <div className="mt-20 flex items-center justify-center gap-4 text-faint-ink">
        <span className="h-px w-12 bg-border" />
        <BridgePauseGlyph className="h-2 w-6" />
        <span className="h-px w-12 bg-border" />
      </div>
      <p className="mt-6 text-center text-[11px] uppercase tracking-[0.22em] text-faint-ink">
        End of terms · Last updated 09 June 2026
      </p>
    </article>
  );
}

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

function ReflectDiagram() {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <div className="flex flex-col items-center text-center min-w-0">
          <div className="h-14 w-14 rounded-[22%] border border-border bg-background flex items-center justify-center">
            <BridgeIcon className="h-10 w-10 rounded-[22%]" />
          </div>
          <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
            Bridge
          </div>
          <div className="mt-1 text-xs text-muted-ink">In scope</div>
        </div>

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
