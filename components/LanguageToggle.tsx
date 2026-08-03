'use client';

import { motion } from 'framer-motion';
import { useLocale, useI18n } from '@/lib/i18n/I18nProvider';

type Size = 'sm' | 'md';

export function LanguageToggle({ size = 'md' }: { size?: Size }) {
  const locale = useLocale();
  const { setLocale, t } = useI18n();

  const isBn = locale === 'bn';
  const isSm = size === 'sm';

  return (
    <div
      role="group"
      aria-label={t('nav.switchLanguage')}
      className={
        'relative inline-flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 text-xs ' +
        (isSm ? 'h-8 text-[11px]' : 'h-9')
      }
    >
      <motion.span
        aria-hidden
        layout
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        className={
          'absolute inset-y-0.5 rounded-full bg-gradient-to-r from-accent-500 to-accent-700 shadow-glow ' +
          (isBn ? 'right-0.5 left-1/2' : 'left-0.5 right-1/2')
        }
      />
      {(['en', 'bn'] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={code === 'bn' ? t('lang.bn') : t('lang.en')}
            className={
              'relative z-10 inline-flex items-center justify-center rounded-full px-3 font-semibold transition-colors ' +
              (isSm ? 'min-w-[2.25rem]' : 'min-w-[2.5rem]') +
              ' ' +
              (active ? 'text-ink-900' : 'text-ink-100/80 hover:text-white')
            }
          >
            <span className={code === 'bn' ? 'font-bn' : ''}>
              {code === 'bn' ? t('lang.shortBn') : t('lang.shortEn')}
            </span>
          </button>
        );
      })}
    </div>
  );
}