import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { LangNotice } from "@/components/site/LangNotice";
import { Footer } from "@/components/site/Footer";
import { BridgeIcon, BridgePauseGlyph } from "@/components/site/BridgeMark";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bridge" },
      {
        name: "description",
        content:
          "Get in touch with the team behind Bridge. Questions, partnerships, organisational use, or simply curious — we'd love to hear from you.",
      },
      { property: "og:title", content: "Contact — Bridge" },
      {
        property: "og:description",
        content:
          "Reach the team at Emergize AG. Questions about Bridge, partnerships, organisations, and conversations welcome.",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const REASONS = [
  "General Enquiry",
  "Bridge for Teams",
  "Partnership",
  "Product Feedback",
  "Press & Media",
  "Technical Support",
  "Other",
] as const;

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  reason: z.enum(REASONS, { errorMap: () => ({ message: "Please choose a reason" }) }),
  message: z.string().trim().min(10, "A short message helps us reply well").max(2000),
});

type ContactValues = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactValues, string>>;

// Provider-agnostic submission. Replace handler later (Resend, Formspree, webhook, etc.)
async function submitContact(values: ContactValues): Promise<void> {
  // Simulated network latency. No provider wired yet.
  await new Promise((r) => setTimeout(r, 900));
  // Intentionally no-op. Hook into provider here:
  //   await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info("[contact] submission staged (no provider wired)");
  }
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Nav />
      <LangNotice />
      <Hero />
      <main className="relative">
        <FormAndAside />
        <TeamsShortcut />
        <Closing />
      </main>
      <Footer />
    </div>
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

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <BridgeIcon className="h-10 w-10 rounded-[22%]" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
                Emergize AG · Contact
              </span>
            </div>
            <h1 className="mt-10 font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1] tracking-tight text-ink">
              Get in touch.
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-ink leading-relaxed">
              Questions about Bridge, partnerships, organisational use, or
              simply curious about what we&apos;re building?
            </p>
            <p className="mt-3 max-w-2xl text-base md:text-lg text-muted-ink leading-relaxed">
              We&apos;d love to hear from you.
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.22em] text-faint-ink lg:justify-end">
              <span className="inline-flex items-center gap-2">
                <BridgePauseGlyph className="h-[6px] w-5 text-faint-ink" />
                Conversations welcome
              </span>
              <span aria-hidden className="h-px w-6 bg-border" />
              <span>Sales calls less so</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Form + Aside ---------------- */

function FormAndAside() {
  return (
    <section className="relative border-t border-border/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
        <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <CompanyCard />
          <PromiseCard />
        </aside>
      </div>
    </section>
  );
}

function CompanyCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-7">
      <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
        Emergize AG
      </div>
      <div className="mt-5 flex items-start gap-4">
        <BridgeIcon className="h-9 w-9 rounded-[22%] shrink-0" />
        <div className="text-sm leading-relaxed">
          <p className="text-ink font-medium">Emergize AG</p>
          <p className="text-muted-ink">Seestrasse 3</p>
          <p className="text-muted-ink">CH-9423 Altenrhein</p>
          <p className="text-muted-ink">Switzerland</p>
        </div>
      </div>
      <div className="mt-6 space-y-3 border-t border-border/60 pt-5">
        <ContactLine label="Email" href="mailto:hello@emergize.ch" text="hello@emergize.ch" />
        <ContactLine label="Website" href="https://emergize.ch" text="emergize.ch" external />
      </div>
    </div>
  );
}

function ContactLine({
  label,
  text,
  href,
  external,
}: {
  label: string;
  text: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-baseline justify-between gap-4"
    >
      <span className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
        {label}
      </span>
      <span className="text-sm text-ink group-hover:text-accent-green transition-colors">
        {text}
      </span>
    </a>
  );
}

function PromiseCard() {
  const items = [
    "We read every message",
    "We reply in working hours, DACH",
    "We don't add you to a list",
  ];
  return (
    <div className="rounded-2xl border border-border bg-background p-6 md:p-7">
      <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
        What to expect
      </div>
      <ul className="mt-5 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-sm text-ink">
            <span aria-hidden className="mt-[7px] h-1 w-3 rounded-full bg-accent-green/70" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Form ---------------- */

const initialValues: ContactValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  reason: "General Enquiry",
  message: "",
};

function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const update = <K extends keyof ContactValues>(key: K, value: ContactValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateField = <K extends keyof ContactValues>(key: K) => {
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === key);
      setErrors((e) => ({ ...e, [key]: issue?.message }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setStatus("submitting");
    setSubmissionError(null);
    try {
      await submitContact(parsed.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setSubmissionError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return <SuccessState onReset={() => { setValues(initialValues); setStatus("idle"); }} />;
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <div className="text-[10px] uppercase tracking-[0.22em] text-faint-ink">
        Write to us
      </div>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl text-ink leading-[1.05]">
        A short message is enough.
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Field
          label="First name"
          name="firstName"
          value={values.firstName}
          onChange={(v) => update("firstName", v)}
          onBlur={() => validateField("firstName")}
          error={errors.firstName}
          autoComplete="given-name"
          required
        />
        <Field
          label="Last name"
          name="lastName"
          value={values.lastName}
          onChange={(v) => update("lastName", v)}
          onBlur={() => validateField("lastName")}
          error={errors.lastName}
          autoComplete="family-name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(v) => update("email", v)}
          onBlur={() => validateField("email")}
          error={errors.email}
          autoComplete="email"
          required
          className="sm:col-span-2"
        />
        <Field
          label="Company or organisation"
          hint="Optional"
          name="company"
          value={values.company ?? ""}
          onChange={(v) => update("company", v)}
          autoComplete="organization"
          className="sm:col-span-2"
        />

        <SelectField
          label="Reason for contact"
          name="reason"
          value={values.reason}
          onChange={(v) => update("reason", v as ContactValues["reason"])}
          options={REASONS as readonly string[]}
          error={errors.reason}
          className="sm:col-span-2"
        />

        <TextareaField
          label="Message"
          name="message"
          value={values.message}
          onChange={(v) => update("message", v)}
          onBlur={() => validateField("message")}
          error={errors.message}
          maxLength={2000}
          required
          className="sm:col-span-2"
        />
      </div>

      {submissionError && (
        <p className="mt-6 text-sm text-red-500" role="alert">
          {submissionError}
        </p>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 rounded-full bg-ink text-background px-6 py-3 text-sm hover:bg-accent-green transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            <>
              Send message <span aria-hidden>→</span>
            </>
          )}
        </button>
        <p className="text-xs text-faint-ink max-w-sm">
          By sending this message you agree to our{" "}
          <Link to="/privacy" className="text-ink underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 rounded-full border-2 border-background/40 border-t-background animate-spin"
    />
  );
}

/* ---------------- Field primitives ---------------- */

const inputBase =
  "w-full bg-transparent border-b border-border px-0 py-3 text-base text-ink placeholder:text-faint-ink/70 focus:outline-none focus:border-accent-green transition-colors";

function FieldLabel({
  htmlFor,
  label,
  hint,
  required,
}: {
  htmlFor: string;
  label: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline justify-between text-[10px] uppercase tracking-[0.22em] text-faint-ink"
    >
      <span>
        {label}
        {required && <span aria-hidden className="text-accent-green/70"> *</span>}
      </span>
      {hint && <span className="normal-case tracking-normal text-[11px]">{hint}</span>}
    </label>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  autoComplete,
  error,
  hint,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={name} label={label} hint={hint} required={required} />
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={inputBase}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={name} label={label} required />
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          className={`${inputBase} appearance-none pr-8`}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-faint-ink">
          ▾
        </span>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function TextareaField({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required,
  maxLength,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
  className?: string;
}) {
  const remaining = maxLength ? maxLength - value.length : null;
  return (
    <div className={className}>
      <FieldLabel
        htmlFor={name}
        label={label}
        hint={remaining !== null ? `${remaining} left` : undefined}
        required={required}
      />
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={6}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${inputBase} resize-none`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- Success state ---------------- */

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border border-border bg-surface/40 p-10 md:p-14"
    >
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-accent-green">
        <BridgePauseGlyph className="h-[6px] w-5 text-accent-green" />
        Message received
      </div>
      <h2 className="mt-6 font-serif text-4xl md:text-5xl leading-[1.05] text-ink">
        Message sent.
      </h2>
      <p className="mt-5 max-w-lg text-base md:text-lg text-muted-ink leading-relaxed">
        Thank you for reaching out. We&apos;ll get back to you as soon as possible.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm hover:bg-accent-green transition-colors"
        >
          Back to Bridge
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full border border-border text-ink px-5 py-2.5 text-sm hover:bg-surface/60 transition-colors"
        >
          Send another message
        </button>
      </div>
    </motion.div>
  );
}

/* ---------------- Teams shortcut ---------------- */

function TeamsShortcut() {
  return (
    <section className="relative border-t border-border/60 py-20 md:py-28">
      <div aria-hidden className="absolute inset-0 ambient-glow opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.22em] text-faint-ink">
              For organisations
            </div>
            <h2 className="mt-5 font-serif text-3xl md:text-5xl leading-[1.05] tracking-tight text-ink max-w-2xl">
              Bridge for Teams.
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-ink leading-relaxed">
              Interested in using Bridge within your organisation? Contact us to
              discuss organisational access, team insights, pilots, and future
              collaboration opportunities.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-background p-6 md:p-7">
              <svg
                aria-hidden
                viewBox="0 0 240 80"
                className="w-full h-14 text-accent-green/60"
              >
                <path d="M10,55 C70,15 170,15 230,55" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <circle cx="10" cy="55" r="4" fill="currentColor" />
                <circle cx="120" cy="23" r="5" fill="currentColor" />
                <circle cx="230" cy="55" r="4" fill="currentColor" />
              </svg>
              <div className="mt-5 text-[10px] uppercase tracking-[0.22em] text-faint-ink">
                Teams contact
              </div>
              <a
                href="mailto:teams@emergize.ch"
                className="mt-2 block font-serif text-2xl md:text-3xl text-ink hover:text-accent-green transition-colors"
              >
                teams@emergize.ch
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="mailto:teams@emergize.ch?subject=Bridge%20for%20Teams"
                  className="inline-flex items-center gap-2 rounded-full bg-ink text-background px-5 py-2.5 text-sm hover:bg-accent-green transition-colors"
                >
                  Contact Teams
                  <span aria-hidden>→</span>
                </a>
                <Link
                  to="/teams"
                  className="inline-flex items-center gap-2 rounded-full border border-border text-ink px-5 py-2.5 text-sm hover:bg-surface/60 transition-colors"
                >
                  Read about Teams
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Closing ---------------- */

function Closing() {
  return (
    <section className="relative border-t border-border/60 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-6 text-[11px] uppercase tracking-[0.22em] text-faint-ink">
          <span className="inline-flex items-center gap-2">
            <BridgeIcon className="h-4 w-4 rounded-[22%]" />
            Emergize AG · Altenrhein, CH
          </span>
          <Link to="/about" className="hover:text-ink">
            About Emergize AG →
          </Link>
        </div>
      </div>
    </section>
  );
}
