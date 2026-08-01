'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type FaqItem = {
  q: string;
  a: React.ReactNode;
};

const ITEMS: FaqItem[] = [
  {
    q: 'How many teams are allowed?',
    a: (
      <>
        <p>
          <strong>There is no limit.</strong> Every batch of the CSE Department
          is welcome to field one (or more) teams in both the boys&apos;
          5-a-side and the girls&apos; indoor events. The more teams, the
          better the day.
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>
            <strong>Squad size:</strong> 5 players on the field + up to 3
            rolling substitutes per boys&apos; team; 5 + 2 for girls&apos;
            indoor.
          </li>
          <li>
            <strong>Cross-batch mix:</strong> not allowed — each team must
            belong to a single batch so the standings stay fair.
          </li>
          <li>
            <strong>Registration window:</strong> open from announcement day
            until 24 hours before kickoff. The RSVP form locks after that.
          </li>
          <li>
            <strong>Walk-ins on match day:</strong> not accepted for players
            (squads must be pre-registered), but spectators can drop in any
            time.
          </li>
        </ul>
        <p className="mt-3">
          Need to add a teammate or rename your squad after submitting? Ping the
          organizing committee on{' '}
          <a
            href="mailto:mucse62@gmail.com"
            className="font-semibold text-accent-400 underline-offset-2 hover:underline"
          >
            mucse62@gmail.com
          </a>{' '}
          and they&apos;ll update the Sheet for you.
        </p>
      </>
    )
  },
  {
    q: 'Is the RSVP really anonymous?',
    a: (
      <>
        Yes. Form 1 doesn&apos;t ask for your name, ID, or any identifier — only
        batch, gender, event, and whether you&apos;re attending. Your email is
        optional and only used if you want a confirmation receipt.
      </>
    )
  },
  {
    q: 'Who handles security at the event?',
    a: (
      <>
        All security matters are reserved and handled by the organizing committee.
        On-site arrangements, crowd control, medical standby, and player welfare
        are managed end-to-end by the Batch 62 organizing committee. Players
        and spectators don&apos;t need to worry about a thing — just show up
        and play.
      </>
    )
  },
  {
    q: 'How is my data stored?',
    a: (
      <>
        Form submissions are emailed to the organizer via FormSubmit.co and
        mirrored to a private Google Sheet for live attendance counts. No
        third-party trackers, no analytics, no public database.
      </>
    )
  },
  {
    q: 'What if I submit twice?',
    a: (
      <>
        The RSVP form remembers your browser via localStorage and blocks a
        second submission. If you need to correct your response, clear the
        site&apos;s data or use the &ldquo;I want to submit anyway&rdquo; link
        on the form page.
      </>
    )
  },
  {
    q: 'Can I edit my RSVP after submitting?',
    a: (
      <>
        Not directly from the site — to keep the form zero-backend and fully
        anonymous, there&apos;s no lookup step. If something needs to change,
        email the organizing committee and they&apos;ll update the Sheet for
        you.
      </>
    )
  }
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mt-24 scroll-mt-28"
      aria-labelledby="faq-heading"
    >
      <div className="mb-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-100/80 backdrop-blur-md">
          FAQ
        </span>
        <h2
          id="faq-heading"
          className="mt-4 text-3xl font-black sm:text-4xl"
        >
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-ink-100/60">
          Quick answers about privacy, data, and on-day logistics.
        </p>
      </div>

      <div className="glass-strong mx-auto max-w-3xl overflow-hidden rounded-3xl">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
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
                  {item.q}
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
                      {item.a}
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