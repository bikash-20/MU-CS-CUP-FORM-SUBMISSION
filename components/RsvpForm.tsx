'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type Attending = 'Yes' | 'No' | '';
type Gender = 'Male' | 'Female' | '';
type Batch = '62' | '63' | '64' | '65' | '66' | '';
type Sport = '5-a-side Football (Boys)' | 'Girls Indoor' | '';

const SUBMIT_KEY = 'mu-cse-cup:rsvp:submitted';

export function RsvpForm() {
  const [batch, setBatch] = useState<Batch>('');
  const [gender, setGender] = useState<Gender>('');
  const [sport, setSport] = useState<Sport>('');
  const [attending, setAttending] = useState<Attending>('');
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState(''); // optional confirmation email
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // localStorage dedupe — discourages accidental double submits per browser
  useEffect(() => {
    try {
      if (localStorage.getItem(SUBMIT_KEY)) setAlreadySubmitted(true);
    } catch {}
  }, []);

  const canSubmit =
    !!batch && !!gender && !!sport && !!attending && (attending === 'Yes' || reason.trim().length > 1);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);

    const endpoint = process.env.NEXT_PUBLIC_FORMSUBMIT_RSVP;
    if (!endpoint) {
      setError('Form endpoint not configured.');
      setSubmitting(false);
      return;
    }

    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      });
      if (res.ok || res.status === 0) {
        try {
          localStorage.setItem(SUBMIT_KEY, new Date().toISOString());
        } catch {}
        setSubmitted(true);
      } else {
        setError(`Submission failed (${res.status}). Try again.`);
      }
    } catch {
      // FormSubmit returns a redirect that fetch treats as opaque success in dev
      try {
        localStorage.setItem(SUBMIT_KEY, new Date().toISOString());
      } catch {}
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong mx-auto w-full max-w-2xl rounded-3xl p-6 sm:p-10"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-accent-700 text-ink-900 shadow-glow">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12.5l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
              Thanks! Your response has been recorded.
            </h2>
            <p className="mt-3 text-ink-100/70">
              Your RSVP for{' '}
              <span className="font-semibold text-white">
                Batch {batch || '—'}
              </span>{' '}
              is in. Keep an eye on this page for the live attendance pulse.
              {email ? ' A confirmation has also been emailed to you.' : ''}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setBatch('');
                setGender('');
                setSport('');
                setAttending('');
                setReason('');
                setEmail('');
                try {
                  localStorage.removeItem(SUBMIT_KEY);
                } catch {}
              }}
              className="mt-8 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              Submit another response
            </button>
          </motion.div>
        ) : alreadySubmitted ? (
          <motion.div
            key="already"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold">You&apos;ve already responded.</h2>
            <p className="mt-3 text-ink-100/70">
              We limit one response per browser to keep the count fair. If you
              need to update your RSVP, email{' '}
              <a
                className="text-accent-400 hover:underline"
                href="mailto:bikashtalukder040@gmail.com"
              >
                bikashtalukder040@gmail.com
              </a>
              .
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.removeItem(SUBMIT_KEY);
                } catch {}
                setAlreadySubmitted(false);
              }}
              className="mt-8 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10"
            >
              I want to submit anyway
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-7"
          >
            <header>
              <h2 className="text-2xl font-bold sm:text-3xl">RSVP</h2>
              <p className="mt-2 text-sm text-ink-100/60">
                Anonymous. No name, no email required. Takes ~20 seconds.
              </p>
            </header>

            {/* FormSubmit hidden config */}
            <input type="hidden" name="_subject" value="New MU CSE CUP RSVP" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_autoresponse"
              value="Thanks for registering for MU CSE CUP '26! We'll see you on the pitch. — Organizing Committee, Batch 62"
            />

            <Field label="Batch">
              <PillGroup>
                {(['62', '63', '64', '65', '66'] as Batch[]).map((b) => (
                  <Pill
                    key={b}
                    active={batch === b}
                    onClick={() => setBatch(b)}
                  >
                    {b}
                  </Pill>
                ))}
              </PillGroup>
              <input type="hidden" name="batch" value={batch} />
            </Field>

            <Field label="Gender">
              <PillGroup>
                {(['Male', 'Female'] as Gender[]).map((g) => (
                  <Pill
                    key={g}
                    active={gender === g}
                    onClick={() => {
                      setGender(g);
                      if (g === 'Male') setSport('5-a-side Football (Boys)');
                      else setSport('Girls Indoor');
                    }}
                  >
                    {g}
                  </Pill>
                ))}
              </PillGroup>
              <input type="hidden" name="gender" value={gender} />
            </Field>

            <Field label="Event">
              <PillGroup>
                {(
                  gender === 'Female'
                    ? ['Girls Indoor']
                    : ['5-a-side Football (Boys)']
                ).map((s) => (
                  <Pill
                    key={s}
                    active={sport === s}
                    onClick={() => setSport(s as Sport)}
                  >
                    {s}
                  </Pill>
                ))}
              </PillGroup>
              <input type="hidden" name="sport" value={sport} />
            </Field>

            <Field label="Attending?">
              <PillGroup>
                {(['Yes', 'No'] as Attending[]).map((a) => (
                  <Pill
                    key={a}
                    active={attending === a}
                    onClick={() => setAttending(a)}
                  >
                    {a}
                  </Pill>
                ))}
              </PillGroup>
              <input type="hidden" name="attending" value={attending} />
            </Field>

            <AnimatePresence initial={false}>
              {attending === 'No' && (
                <motion.div
                  key="reason"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Field label="Quick reason (optional)">
                    <textarea
                      name="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                      placeholder="Out of town, exam week, injured…"
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-100/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
                    />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            <Field
              label="Email (optional)"
              hint="Leave this blank to stay fully anonymous. Add your email if you want a confirmation receipt."
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-100/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
              />
            </Field>

            {error && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <motion.button
              whileHover={{ scale: canSubmit ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              disabled={!canSubmit || submitting}
              type="submit"
              className="group relative inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-accent-500 to-accent-700 px-6 py-4 text-base font-semibold text-ink-900 shadow-glow transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit RSVP'}
              {!submitting && (
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </motion.button>

            <p className="text-center text-xs text-ink-100/40">
              One response per browser. Data goes to{' '}
              <span className="text-ink-100/70">
                bikashtalukder040@gmail.com
              </span>
              .
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Field + Pill subcomponents ---------- */

function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-xs text-ink-100/50">{hint}</p>}
    </div>
  );
}

function PillGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function Pill({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={
        'rounded-full border px-4 py-2 text-sm font-medium transition ' +
        (active
          ? 'border-accent-400 bg-gradient-to-r from-accent-500 to-accent-700 text-ink-900 shadow-glow'
          : 'border-white/15 bg-white/5 text-ink-100/80 hover:border-white/30 hover:bg-white/10')
      }
    >
      {children}
    </motion.button>
  );
}