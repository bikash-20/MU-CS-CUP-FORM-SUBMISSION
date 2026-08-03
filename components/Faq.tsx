'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { useT } from '@/lib/i18n/I18nProvider';

type FaqKey =
  | 'teams'
  | 'anonymous'
  | 'security'
  | 'data'
  | 'duplicate'
  | 'edit';

type FaqEntry = {
  key: FaqKey;
  render: (t: (k: string, v?: Record<string, string | number>) => string) => ReactNode;
};

const ORG_EMAIL = 'mucse62@gmail.com';

const ITEMS: FaqEntry[] = [
  {
    key: 'teams',
    render: (t) => (
      <>
        <p>
          <strong>{t('faq.items.teams.a')}</strong>
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            <strong>{t('faq.items.teams.bullets.squad')}</strong>
          </li>
          <li>
            <strong>{t('faq.items.teams.bullets.crossBatch')}</strong>
          </li>
          <li>
            <strong>{t('faq.items.teams.bullets.window')}</strong>
          </li>
          <li>
            <strong>{t('faq.items.teams.bullets.walkins')}</strong>
          </li>
        </ul>
        <p className="mt-3">
          {t('faq.items.teams.tail', { email: '' }).split(ORG_EMAIL)[0]}
          <a
            href={`mailto:${ORG_EMAIL}`}
            className="font-semibold text-accent-400 underline-offset-2 hover:underline"
          >
            {ORG_EMAIL}
          </a>
          {t('faq.items.teams.tail', { email: '' }).split(ORG_EMAIL)[1]}
        </p>
      </>
    )
  },
  {
    key: 'anonymous',
    render: (t) => <>{t('faq.items.anonymous.a')}</>
  },
  {
    key: 'security',
    render: (t) => <>{t('faq.items.security.a')}</>
  },
  {
    key: 'data',
    render: (t) => <>{t('faq.items.data.a')}</>
  },
  {
    key: 'duplicate',
    render: (t) => <>{t('faq.items.duplicate.a')}</>
  },
  {
    key: 'edit',
    render: (t) => <>{t('faq.items.edit.a')}</>
  }
];

export function Faq() {
  const t = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mt-24 scroll-mt-28"
      aria-labelledby="faq-heading"
    >
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-100/80 backdrop-blur-md">
          {t('faq.badge')}
        </span>
        <h2
          id="faq-heading"
          className="mt-4 text-3xl font-black sm:text-4xl"
        >
          {t('faq.title')}
        </h2>
        <p className="mt-2 text-sm text-ink-100/60">{t('faq.subtitle')}</p>
      </div>

      <div className="glass-strong mx-auto max-w-3xl overflow-hidden rounded-3xl">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.key}
              className={
                'border-b border-white/10 last:border-b-0 ' +
                (isOpen ? 'bg-white/[0.04]' : '')
              }
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/5 sm:px-8"
              >
                <span className="text-sm font-semibold text-white sm:text-base">
                  {t(`faq.items.${item.key}.q`)}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-accent-400"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm leading-relaxed text-ink-100/70 sm:px-8 sm:text-base">
                      {item.render(t)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}