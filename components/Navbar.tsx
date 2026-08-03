'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useT } from '@/lib/i18n/I18nProvider';
import { LanguageToggle } from '@/components/LanguageToggle';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useT();

  const links = [
    { href: '/', key: 'nav.home' },
    { href: '/rsvp', key: 'nav.rsvp' },
    { href: '/committee', key: 'nav.committee' }
  ] as const;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="glass flex items-center justify-between gap-3 rounded-2xl px-5 py-3">
          <Link href="/" className="group flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 text-ink-900 shadow-glow transition-transform group-hover:rotate-6">
              <span className="text-sm font-black">26</span>
            </span>
            <span className="hidden text-sm font-semibold tracking-wide sm:inline">
              {t('brand.short')}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-ink-100/80 transition-all hover:bg-white/10 hover:text-white"
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageToggle size="sm" />
            <Link
              href="/rsvp"
              className="rounded-full bg-gradient-to-r from-accent-500 to-accent-700 px-5 py-2 text-sm font-semibold text-ink-900 shadow-glow transition-transform hover:scale-105"
            >
              {t('nav.rsvp')}
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg text-white/80 hover:bg-white/10 md:hidden"
            aria-label={t('nav.openMenu')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-2 grid gap-1 rounded-2xl p-2 md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2 text-sm text-ink-100/90 hover:bg-white/10"
              >
                {t(l.key)}
              </Link>
            ))}
            <div className="mt-1 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <span className="text-xs uppercase tracking-widest text-ink-100/60">
                {t('lang.bn')}
              </span>
              <LanguageToggle size="sm" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}