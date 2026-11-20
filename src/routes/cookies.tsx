import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { BridgeIcon, BridgePauseGlyph } from "@/components/site/BridgeMark";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Bridge" },
      {
        name: "description",
        content:
          "How Bridge by Emergize AG uses cookies and similar technologies across its website and services. Last updated June 2026.",
      },
      { property: "og:title", content: "Cookie Policy — Bridge" },
      {
        property: "og:description",
        content:
          "How Bridge uses cookies and similar technologies across its website and services.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

type Section = { id: string; number: string; title: string };

const sections: Section[] = [
  { id: "what-are-cookies", number: "01", title: "What are cookies?" },
  { id: "how-bridge-uses", number: "02", title: "How Bridge uses cookies" },
  { id: "types", number: "03", title: "Types of cookies we use" },
  { id: "analytics", number: "04", title: "Analytics and performance technologies" },
  { id: "managing", number: "05", title: "Managing cookies" },
  { id: "third-party", number: "06", title: "Third-party services" },
  { id: "changes", number: "07", title: "Changes to this Cookie Policy" },
  { id: "contact", number: "08", title: "Contact" },
];

function CookiesPage() {
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
          Cookie Policy
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-ink max-w-xl">
          How Bridge uses cookies and similar technologies across its website and
          services.
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
                      layoutId="toc-indicator-cookies"
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
            <div className="mt-4 space-y-1">
              <Link to="/privacy" className="block hover:text-ink underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block hover:text-ink underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function Article() {
  return (
    <article className="max-w-[68ch] pt-2 lg:pt-6">
      <SectionBlock id="what-are-cookies" number="01" title="What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website or
          use certain online services.
        </p>
        <p>
          Cookies help websites function correctly, remember preferences, improve
          performance, and provide insights into how services are used.
        </p>
        <p>
          In this Cookie Policy, the term &ldquo;cookies&rdquo; also includes similar
          technologies such as local storage, pixels, software development kits (SDKs),
          and other technologies that help us understand and improve the Bridge
          experience.
        </p>
      </SectionBlock>

      <SectionBlock id="how-bridge-uses" number="02" title="How Bridge uses cookies">
        <p>Bridge uses cookies and similar technologies to:</p>
        <ul>
          <li>Provide core website functionality</li>
          <li>Support authentication and secure access</li>
          <li>Remember preferences and settings</li>
          <li>Improve performance and reliability</li>
          <li>Understand how the website and services are used</li>
          <li>Maintain security and prevent abuse</li>
        </ul>
        <p className="text-ink">
          <strong className="font-medium">
            We do not use cookies to sell personal information to third parties.
          </strong>
        </p>
      </SectionBlock>

      <SectionBlock id="types" number="03" title="Types of cookies we use">
        <CookieCategoryGrid />

        <SubHeading>Strictly necessary cookies</SubHeading>
        <p>
          These cookies are required for the website and services to function properly.
        </p>
        <p>Examples may include:</p>
        <ul>
          <li>Authentication and login management</li>
          <li>Security and fraud prevention</li>
          <li>Session management</li>
          <li>Technical functionality required to operate the service</li>
        </ul>
        <p>The website may not function correctly without these cookies.</p>

        <SubHeading>Performance and analytics cookies</SubHeading>
        <p>These cookies help us understand how visitors interact with Bridge.</p>
        <p>Examples may include:</p>
        <ul>
          <li>Page visits</li>
          <li>Navigation patterns</li>
          <li>Device and browser information</li>
          <li>Error reporting</li>
          <li>General usage trends</li>
        </ul>
        <p>
          This information helps us improve performance, usability, and reliability.
        </p>

        <SubHeading>Preference cookies</SubHeading>
        <p>These cookies help remember choices you make while using Bridge.</p>
        <p>Examples may include:</p>
        <ul>
          <li>Language preferences</li>
          <li>Cookie preferences</li>
          <li>Display settings</li>
          <li>Accessibility settings</li>
        </ul>

        <SubHeading>Functional cookies</SubHeading>
        <p>These cookies support optional features that improve the user experience.</p>
        <p>Examples may include:</p>
        <ul>
          <li>Embedded content</li>
          <li>Interactive experiences</li>
          <li>User interface preferences</li>
        </ul>
      </SectionBlock>

      <SectionBlock id="analytics" number="04" title="Analytics and performance technologies">
        <p>
          Bridge may use analytics and performance monitoring tools to better understand
          how the website and services are used.
        </p>
        <p>These tools help us:</p>
        <ul>
          <li>Improve user experience</li>
          <li>Diagnose technical issues</li>
          <li>Measure feature usage</li>
          <li>Improve website performance</li>
          <li>Understand general engagement patterns</li>
        </ul>
        <Callout>
          Where required by applicable law, analytics technologies will only be activated
          after appropriate consent has been obtained.
        </Callout>
      </SectionBlock>

      <SectionBlock id="managing" number="05" title="Managing cookies">
        <p>
          Most web browsers allow you to control, restrict, or delete cookies through
          browser settings.
        </p>
        <p>You can usually:</p>
        <ul>
          <li>View stored cookies</li>
          <li>Delete cookies</li>
          <li>Block cookies</li>
          <li>Configure cookie permissions for specific websites</li>
        </ul>
        <Callout tone="warn">
          Please note that disabling certain cookies may affect the functionality,
          security, or performance of Bridge.
        </Callout>
        <p>
          Where required by law, Bridge may also provide cookie preference controls
          directly on the website.
        </p>
      </SectionBlock>

      <SectionBlock id="third-party" number="06" title="Third-party services">
        <p>
          Bridge may use carefully selected third-party services that place or access
          cookies and similar technologies.
        </p>
        <p>Examples may include services used for:</p>
        <ThirdPartyFlow />
        <p>These providers operate under their own privacy policies and terms.</p>
        <p>
          We encourage users to review the privacy information of any third-party
          services they interact with.
        </p>
      </SectionBlock>

      <SectionBlock id="changes" number="07" title="Changes to this Cookie Policy">
        <p>We may update this Cookie Policy from time to time to reflect:</p>
        <ul>
          <li>Changes in technology</li>
          <li>Changes in our services</li>
          <li>Legal or regulatory developments</li>
          <li>Changes in third-party providers</li>
        </ul>
        <p>Material changes will be communicated where appropriate.</p>
      </SectionBlock>

      <SectionBlock id="contact" number="08" title="Contact">
        <p>
          If you have questions about this Cookie Policy or our use of cookies, please
          contact:
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
      </SectionBlock>

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
    <h3 className="not-prose mt-10 mb-3 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
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

/* ---------- Cookie category cards (section 03) ---------- */
function CookieCategoryGrid() {
  const categories: { label: string; sub: string; icon: React.ReactNode }[] = [
    {
      label: "Strictly necessary",
      sub: "Required to operate the site",
      icon: (
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      ),
    },
    {
      label: "Performance & analytics",
      sub: "Usage, errors, and reliability",
      icon: (
        <>
          <path d="M3 20h18" />
          <path d="M6 16v-5" />
          <path d="M11 16V8" />
          <path d="M16 16v-3" />
        </>
      ),
    },
    {
      label: "Preference",
      sub: "Language, display, accessibility",
      icon: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9c.6.5 1.3.9 2 1.2L10 21h4l.5-2.5c.7-.3 1.4-.7 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z" />
        </>
      ),
    },
    {
      label: "Functional",
      sub: "Embedded and optional features",
      icon: (
        <>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
        </>
      ),
    },
  ];
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2">
      {categories.map((c) => (
        <div
          key={c.label}
          className="rounded-xl border border-border bg-surface/50 p-4 flex items-start gap-3"
        >
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-accent-green shrink-0">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {c.icon}
            </svg>
          </span>
          <div className="text-sm">
            <div className="text-ink font-medium">{c.label}</div>
            <div className="text-muted-ink mt-0.5">{c.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Third-party flow (section 06) ---------- */
function ThirdPartyFlow() {
  const items = [
    "Hosting and infrastructure",
    "Authentication",
    "Analytics",
    "Error monitoring",
    "Security",
    "Video delivery",
    "Content delivery",
  ];
  return (
    <figure className="not-prose my-8 rounded-2xl border border-border bg-surface/40 p-6 md:p-8">
      <div className="flex items-center gap-3">
        <BridgeIcon className="h-9 w-9 rounded-[22%]" />
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
            Bridge website
          </div>
          <div className="text-sm text-ink">Routes selected requests to providers</div>
        </div>
      </div>
      <svg
        aria-hidden
        viewBox="0 0 40 24"
        className="ml-4 mt-2 mb-1 h-6 w-10 text-accent-green/60"
      >
        <path
          d="M20 0 V22 M14 16 L20 22 L26 16"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((label) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-ink"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-5 text-[12px] text-faint-ink">
        Each provider operates under its own privacy policy and terms.
      </figcaption>
    </figure>
  );
}
