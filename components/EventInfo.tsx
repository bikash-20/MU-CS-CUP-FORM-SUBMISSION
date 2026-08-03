'use client';

import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/I18nProvider';

const CARD_KEYS = ['boys', 'girls', 'committee'] as const;

export function EventInfo() {
  const t = useT();

  return (
    <section className="mt-12">
      <h2 className="sr-only">{t('events.title')}</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {CARD_KEYS.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-6"
          >
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-ink-100/80">
              {t(`events.items.${key}.badge`)}
            </span>
            <h3 className="mt-4 text-xl font-bold">{t(`events.items.${key}.title`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-100/70">
              {t(`events.items.${key}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}