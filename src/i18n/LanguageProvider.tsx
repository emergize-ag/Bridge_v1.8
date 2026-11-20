import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANG, STORAGE_KEY, type Lang } from "./types";
import { en } from "./en";
import { de } from "./de";

const dicts = { en, de } as const;

export type TranslationKey = keyof typeof en;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

function interpolate(s: string, vars?: Record<string, string | number>): string {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to EN for SSR; hydrate from localStorage on mount.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "de" || stored === "en") {
        setLangState(stored);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }, []);

  const t = useCallback<Ctx["t"]>((key, vars) => {
    const dict = dicts[lang] as Record<string, string>;
    const fallback = dicts.en as Record<string, string>;
    const raw = dict[key as string] ?? fallback[key as string] ?? (key as string);
    return interpolate(raw, vars);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // SSR-safe fallback (provider not mounted): return EN dict.
    return {
      lang: DEFAULT_LANG,
      setLang: () => {},
      t: (key, vars) => interpolate((en as Record<string, string>)[key as string] ?? (key as string), vars),
    };
  }
  return ctx;
}

export function useT() {
  return useLanguage().t;
}

export function useLang() {
  return useLanguage().lang;
}
