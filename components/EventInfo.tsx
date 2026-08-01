'use client';

import { motion } from 'framer-motion';

const CARDS = [
  {
    title: '5-a-side · Boys',
    desc: 'Inter-batch 5-a-side football tournament. Five squads per batch, knockouts, group stage, and a CUP final.',
    badge: 'Football'
  },
  {
    title: 'Indoor · Girls',
    desc: "Girls' indoor tournament — a separate event, equally competitive. Pick your sport at RSVP time.",
    badge: 'Indoor'
  },
  {
    title: 'Committee · Batch 62',
    desc: 'Volunteers from the organizing batch plan logistics, brackets, and broadcast. Apply with your beton receipt.',
    badge: 'Volunteer'
  }
];

export function EventInfo() {
  return (
    <section className="mt-12">
      <h2 className="sr-only">Event details</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-6"
          >
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-ink-100/80">
              {c.badge}
            </span>
            <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-100/70">
              {c.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}