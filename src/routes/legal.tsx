import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { BridgeIcon, BridgePauseGlyph } from "@/components/site/BridgeMark";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal Notice — Bridge" },
      {
        name: "description",
        content:
          "Legal notice and company information for Bridge, a product of Emergize AG, registered in Switzerland.",
      },
      { property: "og:title", content: "Legal Notice — Bridge" },
      {
        property: "og:description",
        content: "Legal notice and company information for Bridge by Emergize AG.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/legal" }],
  }),
  component: LegalPage,
});

type Section = { id: string; number: string; title: string };

const sections: Section[] = [
  { id: "company", number: "01", title: "Company" },
  { id: "register", number: "02", title: "Commercial Register" },
  { id: "service", number: "03", title: "Service" },
  { id: "ip", number: "04", title: "Intellectual Property" },
  { id: "links", number: "05", title: "Liability for External Links" },
  { id: "law", number: "06", title: "Governing Law" },
  { id: "contact", number: "07", title: "Contact" },
];

function LegalPage() {
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
          Legal Notice
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-ink max-w-xl">
          Bridge · A product of Emergize AG.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-faint-ink">
          <span className="inline-flex items-center gap-2">
            <BridgePauseGlyph className="h-[6px] w-5 text-faint-ink" />
            Bridge
          </span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Emergize AG</span>
          <span aria-hidden className="h-px w-6 bg-border" />
          <span>Altenrhein · Switzerland</span>
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
                      layoutId="toc-indicator-legal"
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
              <a href="mailto:hello@emergize.ch" className="hover:text-ink">
                hello@emergize.ch
              </a>
            </p>
            <div className="mt-4 space-y-1">
              <Link to="/privacy" className="block hover:text-ink underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block hover:text-ink underline underline-offset-4">
                Terms &amp; Conditions
              </Link>
              <Link to="/cookies" className="block hover:text-ink underline underline-offset-4">
                Cookie Policy
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
      <SectionBlock id="company" number="01" title="Company">
        <CompanyCard />
        <p>
          Bridge is a product of Emergize AG, a company registered in Switzerland.
        </p>
      </SectionBlock>

      <SectionBlock id="register" number="02" title="Commercial Register">
        <p>Registered in Switzerland.</p>
        <SubHeading>UID / Commercial Registration Number</SubHeading>
        <p className="not-prose">
          <span className="inline-flex items-center gap-3 rounded-lg border border-border bg-surface/60 px-4 py-2.5 font-mono text-sm text-ink">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            CHE-334.768.129
          </span>
        </p>
      </SectionBlock>

      <SectionBlock id="service" number="03" title="Service">
        <p>Bridge is a product developed and operated by Emergize AG.</p>
        <p>
          Bridge provides short guided crossings, audio experiences, video experiences,
          and other moment-based interactions designed to support composure, steadiness,
          and presence during everyday work transitions.
        </p>
      </SectionBlock>

      <SectionBlock id="ip" number="04" title="Intellectual Property">
        <p>
          Unless otherwise stated, all content available through Bridge and related
          websites, including text, designs, logos, audio content, video content,
          software, and brand assets, remains the property of Emergize AG or its
          licensors and is protected by applicable intellectual property laws.
        </p>
      </SectionBlock>

      <SectionBlock id="links" number="05" title="Liability for External Links">
        <p>The Bridge website may contain links to third-party websites or services.</p>
        <Callout>
          Responsibility for external content lies solely with the respective operators.
        </Callout>
      </SectionBlock>

      <SectionBlock id="law" number="06" title="Governing Law">
        <p>
          Unless otherwise required by applicable law, this website and related services
          are governed by the laws of Switzerland.
        </p>
      </SectionBlock>

      <SectionBlock id="contact" number="07" title="Contact">
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
                  href="mailto:hello@emergize.ch"
                  className="text-accent-green hover:underline underline-offset-4"
                >
                  hello@emergize.ch
                </a>
              </p>
              <p className="mt-1">
                <a
                  href="https://emergize.ch"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted-ink hover:text-ink underline underline-offset-4"
                >
                  emergize.ch
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
        End of notice · Emergize AG · Switzerland
      </p>
    </article>
  );
}

function CompanyCard() {
  return (
    <div className="not-prose my-6 rounded-2xl border border-border bg-surface/50 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <BridgeIcon className="h-10 w-10 rounded-[22%] shrink-0" />
        <div className="text-sm leading-relaxed text-ink">
          <p className="font-medium">Emergize AG</p>
          <p className="text-muted-ink">Seestrasse 3</p>
          <p className="text-muted-ink">CH-9423 Altenrhein</p>
          <p className="text-muted-ink">Switzerland</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="not-prose my-6 rounded-xl border p-5 md:p-6 text-sm leading-relaxed border-accent-green/30 bg-soft-green/40 text-ink">
      <div className="flex items-start gap-3">
        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 bg-accent-green" />
        <div>{children}</div>
      </div>
    </aside>
  );
}
