'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n/I18nProvider';

export function Footer() {
  const t = useT();

  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-ink-900">
              <span className="text-xs font-black">26</span>
            </span>
            <span className="font-semibold">{t('brand.short')}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-100/60">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t('footer.quickLinks')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-100/70">
            <li><Link href="/rsvp" className="hover:text-white">{t('footer.rsvp')}</Link></li>
            <li><Link href="/committee" className="hover:text-white">{t('footer.committee')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t('footer.contact')}</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-100/70">
            <li>
              <a href="mailto:mucse62@gmail.com" className="hover:text-white">
                mucse62@gmail.com
              </a>
            </li>
            <li>{t('footer.organizingBatch')}</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 border-t border-white/5 py-5 text-center text-xs text-ink-100/40">
        <p>{t('footer.credit')}</p>
        <a
          href="https://github.com/bikash-20"
          target="_blank"
          rel="noopener noreferrer"
          className="text-shimmer text-sm font-extrabold tracking-[0.35em] transition-transform duration-300 hover:scale-110 sm:text-base font-bn"
          aria-label={t('footer.author')}
        >
          {t('footer.author')}
        </a>
      </div>
    </footer>
  );
}