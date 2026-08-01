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

        {/* Glassmorphic Hosted-by card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="glass-strong relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          {/* top hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-accent-400/80 to-transparent"
          />
          {/* corner glows */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-500/25 blur-3xl"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-accent-700/25 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-ink-900 shadow-glow">
              <svg
                width="28"
                height="28"
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

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.4em] text-accent-400">
                Hosted by
              </div>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                CSE Department
                <br />
                <span className="text-shimmer">Batch 62</span>
              </h2>
              <div className="mt-4 text-base font-medium text-ink-100/75 sm:text-lg">
                August · 2026
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-accent-400/30 bg-accent-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              Live · Aug 2026
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}