'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BATCHES = ['62', '63', '64', '65', '66'] as const;
type Batch = (typeof BATCHES)[number];

type Counts = Record<Batch, { attending: number; declined: number; total: number }>;

const EMPTY: Counts = {
  '62': { attending: 0, declined: 0, total: 0 },
  '63': { attending: 0, declined: 0, total: 0 },
  '64': { attending: 0, declined: 0, total: 0 },
  '65': { attending: 0, declined: 0, total: 0 },
  '66': { attending: 0, declined: 0, total: 0 }
};

type RsvpRow = {
  batch?: string;
  attending?: 'Yes' | 'No';
  sport?: string;
};

export function Counter() {
  const [counts, setCounts] = useState<Counts>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = async () => {
    try {
      const res = await fetch(
        'https://formsubmit.co/ajax/bikashtalukder040@gmail.com.json',
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`status ${res.status}`);
      const rows = (await res.json()) as RsvpRow[];

      const next: Counts = {
        '62': { attending: 0, declined: 0, total: 0 },
        '63': { attending: 0, declined: 0, total: 0 },
        '64': { attending: 0, declined: 0, total: 0 },
        '65': { attending: 0, declined: 0, total: 0 },
        '66': { attending: 0, declined: 0, total: 0 }
      };

      for (const r of rows || []) {
        const b = r.batch as Batch | undefined;
        if (!b || !(b in next)) continue;
        if (r.attending === 'Yes') next[b].attending += 1;
        else if (r.attending === 'No') next[b].declined += 1;
        next[b].total += 1;
      }

      setCounts(next);
      setLastUpdated(new Date());
    } catch {
      setCounts(EMPTY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
  }, []);

  const totalAttending = BATCHES.reduce((s, b) => s + counts[b].attending, 0);
  const totalRsvps = BATCHES.reduce((s, b) => s + counts[b].total, 0);

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
              {totalRsvps > 0
                ? `${totalAttending} confirmed across all batches. Updates every 30 seconds.`
                : 'Be the first to RSVP — numbers will appear here in real-time.'}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-ink-100/70">
            <span
              className={
                'h-2 w-2 rounded-full ' +
                (loading
                  ? 'bg-yellow-400 animate-pulse'
                  : totalRsvps > 0
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-white/30')
              }
            />
            {loading ? 'Connecting' : totalRsvps > 0 ? 'Live' : 'Waiting'}
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
                {loading ? '—' : counts[b].attending}
              </div>
              <div className="text-xs text-ink-100/50">
                {counts[b].declined > 0
                  ? `${counts[b].attending} in · ${counts[b].declined} out`
                  : 'attending'}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink-100/40">
          {lastUpdated
            ? `Last refreshed ${lastUpdated.toLocaleTimeString()}.`
            : 'Live data from the RSVP form.'}
        </p>
      </motion.div>
    </section>
  );
}