'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';
import { en } from './dictionaries/en';
import { bn } from './dictionaries/bn';

export type Locale = 'en' | 'bn';

// Structural dictionary type — both EN and BN must share the same key shape.
// We use a recursive index signature so translations can have arbitrary strings.
export type Dictionary = {
  readonly [path: string]: string | Dictionary;
};

const DICTIONARIES: Record<Locale, Dictionary> = {
  en: en as unknown as Dictionary,
  bn: bn as unknown as Dictionary
};

const STORAGE_KEY = 'mu-cse-cup:locale';
const DEFAULT_LOCALE: Locale = 'en';

type InterpolationValues = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
  t: (key: string, values?: InterpolationValues) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function interpolate(template: string, values?: InterpolationValues): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    values[name] === undefined ? `{${name}}` : String(values[name])
  );
}

function lookup(dict: Dictionary, key: string): string | undefined {
  const parts = key.split('.');
  let cursor: unknown = dict;
  for (const part of parts) {
    if (cursor && typeof cursor === 'object' && part in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof cursor === 'string' ? cursor : undefined;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate locale from localStorage + browser preference on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'en' || stored === 'bn') {
        setLocaleState(stored);
      } else if (typeof navigator !== 'undefined') {
        const nav = navigator.language?.toLowerCase() ?? '';
        if (nav.startsWith('bn')) setLocaleState('bn');
      }
    } catch {
      // ignore storage errors (Safari private mode etc.)
    }
    setHydrated(true);
  }, []);

  // Reflect locale on <html lang> for accessibility/SEO.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'bn' : 'en');
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, values?: InterpolationValues) => {
      const dict = DICTIONARIES[locale];
      const fallback = DICTIONARIES[DEFAULT_LOCALE];
      const primary = lookup(dict, key);
      const resolved = primary ?? lookup(fallback, key) ?? key;
      return interpolate(resolved, values);
    },
    [locale]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t]
  );

  // Avoid SSR/CSR mismatch: render children with default locale until hydrated.
  return (
    <I18nContext.Provider value={value}>
      <div data-locale={hydrated ? locale : DEFAULT_LOCALE} suppressHydrationWarning>
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within <I18nProvider>');
  }
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export function useLocale(): Locale {
  return useI18n().locale;
}
