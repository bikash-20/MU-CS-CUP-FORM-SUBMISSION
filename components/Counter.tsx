'use client';

import { motion } from 'framer-motion';

const BATCHES = ['62', '63', '64', '65', '66'] as const;

export function Counter() {
  return (
    <section className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass rounded-3xl p-6 sm:p-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Live attendance pulse
            </h2>
            <p className="mt-1 text-sm text-ink-100/60">
              RSVPs streamed in from across the batches. Numbers refresh in
              real-time as students register.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-ink-100/70">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {BATCHES.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-strong rounded-2xl p-4 text-center"
            >
              <div className="text-xs uppercase tracking-widest text-ink-100/60">
                Batch {b}
              </div>
              <div className="mt-2 text-3xl font-black text-white">
                {Math.max(0, 12 + i * 7 + (i % 2 === 0 ? 3 : 0))}
              </div>
              <div className="text-xs text-ink-100/50">attending</div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink-100/40">
          Counts are illustrative until the RSVP backend is wired to live data.
        </p>
      </motion.div>
    </section>
  );
}