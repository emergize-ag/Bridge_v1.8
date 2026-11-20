# Bilingual Bridge Website (EN / DE)

A pragmatic, scalable internationalisation system covering every page, the cookie banner, the footer, and metadata — without overhauling the route tree.

---

## Approach

**State-based, not URL-based.** A global language preference stored in `localStorage` (`bridge.lang`) plus a React context (`LanguageProvider`) exposing `{ lang, setLang, t }`. The `<html lang>` attribute is updated live.

Trade-off: keeps the existing route structure (`/teams`, `/about`, etc.) intact and avoids duplicating 12 route files into `/en/*` and `/de/*`. URL-based locales (`/de/teams`) would be cleaner for SEO but require restructuring every route, every internal `<Link>`, and the canonical/hreflang strategy. State-based is the right fit for a small premium site where the DACH audience can be served from one canonical URL with a toggle.

**SEO:** `<html lang>` updates dynamically. `hreflang` self-references on the canonical URL. Metadata translated through `t()` in each route's `head()` — but `head()` runs at build time, so the SSR'd meta is always English; the client updates `document.title` on language change. This is an honest trade-off documented in code; full per-locale SSR metadata would require URL-based routing.

**Translation files:** flat key-value `Record<string, string>` per locale in `src/i18n/`:
- `src/i18n/en.ts`
- `src/i18n/de.ts`
- `src/i18n/index.ts` — `LanguageProvider`, `useT()`, `useLang()`

Keys namespaced by surface: `nav.philosophy`, `hero.title`, `teams.cta`, `footer.legal`, etc.

---

## Implementation Steps

### 1. i18n core
- `src/i18n/types.ts` — `Lang = 'en' | 'de'`, `TranslationKey` derived from EN file.
- `src/i18n/en.ts`, `src/i18n/de.ts` — exhaustive flat dictionaries.
- `src/i18n/LanguageProvider.tsx` — context, localStorage persistence, `useEffect` to set `document.documentElement.lang`.
- `src/i18n/useT.ts` — `t(key, vars?)` with `{var}` interpolation.

### 2. Mount provider
- Wrap `<Outlet />` in `src/routes/__root.tsx` with `<LanguageProvider>`.

### 3. Language toggle component
- `src/components/site/LanguageToggle.tsx` — minimal `EN · DE` pill, current language emphasized, no flags.
- Insert in `Nav.tsx` desktop bar (left of "Sign in") and in mobile menu (above "Sign in").

### 4. Translate every surface
Walk these files and replace hardcoded strings with `t('key')`:

- `src/components/site/Nav.tsx` (sections, Sign in, For Teams, mobile footer)
- `src/components/site/Footer.tsx` (all link labels, copy)
- `src/components/site/CookieConsent.tsx` (banner copy, settings modal, category labels)
- `src/components/site/ReflectWithAI.tsx` (labels, hints, status messages)
- `src/components/site/MomentDeck.tsx`, `MomentExplorer.tsx`, `CrossingJourney.tsx`, `CrossingPreview.tsx`, `PrinciplesManifesto.tsx`, `ResearchGrid.tsx`, `VideoShowcase.tsx`
- `src/routes/index.tsx` (hero + all section copy)
- `src/routes/teams.tsx`
- `src/routes/about.tsx`
- `src/routes/contact.tsx` (form labels, validation messages, success state, reasons dropdown)
- `src/routes/privacy.tsx`, `terms.tsx`, `cookies.tsx`, `legal.tsx`

**Legal pages caveat:** Legal Notice, Privacy Policy, Terms, and Cookie Policy German translations will be provided as faithful, formal Swiss German renditions of the existing English content. They are not legally certified translations — added as a code comment in each file noting that the English version is authoritative.

### 5. Metadata
- `t('meta.<route>.title')` and `t('meta.<route>.description')` for each route.
- Client-side `useEffect` in each route component updates `document.title` and the description meta tag when `lang` changes (SSR'd values remain EN by default).
- `hreflang` tags in `__root.tsx` head: `en` and `de` both pointing to the canonical URL with `x-default = en`.

### 6. Persistence & SSR safety
- Read `localStorage` inside `useEffect` only (SSR-safe).
- Default `lang = 'en'` for first paint; switch on mount if stored preference is `'de'`.

---

## German Voice Guidelines

- Formal "Sie" throughout.
- Swiss-neutral: avoid "ß" where ambiguous → use "ss" (Swiss convention). E.g. "müssen" stays, but "Strasse" not "Straße".
- Neutral, calm, no marketing exclamation marks.
- "Bridge" and "Emergize AG" remain untranslated.
- Product terms like "Crossing", "Moment" — keep English where they function as product nouns, translate descriptive prose around them.

---

## Out of Scope

- URL-based locale routing (`/de/*`).
- Per-locale sitemap entries.
- Auto-detect browser language (default stays EN; user opts into DE explicitly).
- Reflect-with-AI prompt body (`src/lib/moments.ts aiPrompt`) — left in English since it's sent to AI providers and English performs better; UI chrome around it is translated.

---

## Files Created
- `src/i18n/en.ts`, `src/i18n/de.ts`, `src/i18n/LanguageProvider.tsx`, `src/i18n/useT.ts`, `src/i18n/types.ts`
- `src/components/site/LanguageToggle.tsx`

## Files Modified (~15)
Root, Nav, Footer, CookieConsent, ReflectWithAI, all route files, all moment/section components.

---

Shall I proceed with this approach, or would you prefer URL-based locales (`/de/teams`, etc.) despite the larger refactor?