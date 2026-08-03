'use client';

import { useT } from '@/lib/i18n/I18nProvider';

export function PageHeader({
  eyebrowKey,
  titleKey,
  subtitleKey,
  eyebrowVars
}: {
  eyebrowKey: string;
  titleKey: string;
  subtitleKey: string;
  eyebrowVars?: Record<string, string | number>;
}) {
  const t = useT();
  return (
    <div className="mb-8 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-100/80 backdrop-blur-md">
        {t(eyebrowKey, eyebrowVars)}
      </span>
      <h1 className="mt-4 text-3xl font-black sm:text-4xl">{t(titleKey)}</h1>
      <p className="mt-2 text-ink-100/60">{t(subtitleKey)}</p>
    </div>
  );
}

export function CommitteeHero() {
  const t = useT();
  return (
    <div className="glass mb-8 rounded-2xl px-6 py-8 text-center sm:px-10 sm:py-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-100/70">
        {t('committeePage.heroHostedBy')}
      </p>
      <h1 className="mt-3 text-3xl font-black sm:text-4xl">
        {t('committeePage.heroTitle')}
      </h1>
      <p className="mt-3 text-base font-medium text-ink-100/80">
        {t('committeePage.heroDate')}
      </p>
      <div className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-accent-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
        </span>
        {t('committeePage.heroLive')}
      </div>
    </div>
  );
}