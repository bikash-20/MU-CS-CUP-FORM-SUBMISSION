'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      {/* Abstract liquid blobs that echo the reference image */}
      <div
        aria-hidden
        className="liquid-blob left-[-10%] top-[10%] h-[420px] w-[420px] bg-gradient-to-br from-accent-700 to-accent-500"
      />
      <div
        aria-hidden
        className="liquid-blob right-[-10%] top-[30%] h-[520px] w-[520px] bg-gradient-to-br from-accent-500 to-accent-700"
      />
      <div
        aria-hidden
        className="liquid-blob bottom-[-10%] left-[30%] h-[380px] w-[380px] bg-accent-400/60"
      />

      {/* Reference photo as a glassmorphic backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          maskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-100/80 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
            Registrations Open · Aug 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl"
          >
            <span className="text-shimmer">MU CSE CUP</span>
            <br />
            <span className="text-white">&apos;26</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-ink-100/75"
          >
            The annual inter-batch 5-a-side football tournament for boys plus a
            girls&apos; indoor tournament — open to batches{' '}
            <span className="font-semibold text-white">62, 63, 64, 65 & 66</span>.
            Pick your batch, RSVP anonymously, or join the organizing committee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/rsvp"
              className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-accent-700 px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(124,247,255,0.7)]"
            >
              RSVP now
              <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/committee"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:bg-white/10"
            >
              Organizing committee
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {[
              { k: '5', v: 'Batches' },
              { k: '2', v: 'Events' },
              { k: '1', v: 'CUP' }
            ].map((s) => (
              <div
                key={s.v}
                className="glass rounded-2xl px-4 py-3 text-center"
              >
                <div className="text-2xl font-black text-white">{s.k}</div>
                <div className="text-xs uppercase tracking-widest text-ink-100/60">
                  {s.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Reference image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          whileHover={{ scale: 1.02, rotate: -1 }}
          className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl"
        >
          <img
            src="/hero.jpg"
            alt="MU CSE CUP '26"
            className="block h-auto w-full rounded-3xl object-cover"
          />
        </motion.div>

        {/* Custom glassmorphic card — Hosted by */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="glass-strong relative mx-auto mt-6 w-full max-w-lg overflow-hidden rounded-3xl p-6 sm:p-7"
        >
          {/* top hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-accent-400/80 to-transparent"
          />
          {/* corner glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-500/20 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-accent-700/20 blur-3xl"
          />

          <div className="relative flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-ink-900 shadow-glow">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 2l2.6 5.6 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 8.5l6-.9L12 2z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-accent-400">
                Hosted by
              </div>
              <div className="mt-1 truncate text-lg font-extrabold text-white sm:text-xl">
                CSE Department · Batch 62
              </div>
              <div className="mt-0.5 text-sm text-ink-100/70">
                August · 2026
              </div>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-400/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-accent-300 sm:inline-flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" />
              Live · Aug 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}