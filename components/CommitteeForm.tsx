'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function CommitteeForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');

  const canSubmit =
    name.trim().length > 1 &&
    studentId.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    fileName.length > 0;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setError(null);

    const endpoint = process.env.NEXT_PUBLIC_FORMSUBMIT_COMMITTEE;
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
        setSubmitted(true);
      } else {
        setError(`Submission failed (${res.status}). Try again.`);
      }
    } catch {
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
              Application received.
            </h2>
            <p className="mt-3 text-ink-100/70">
              A confirmation has been sent to{' '}
              <span className="font-semibold text-white">{email}</span>. The
              organizing committee will review your receipt and reach out within
              48 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            encType="multipart/form-data"
            className="space-y-7"
          >
            <header>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Committee application
              </h2>
              <p className="mt-2 text-sm text-ink-100/60">
                For Batch 62 organizers only. We use your name + ID for internal
                accountability — your receipt stays private.
              </p>
            </header>

            {/* FormSubmit hidden config */}
            <input
              type="hidden"
              name="_subject"
              value="New MU CSE CUP Committee Application"
            />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input
              type="hidden"
              name="_autoresponse"
              value="Your MU CSE CUP '26 committee application has been received. The organizers will review your beton receipt and reply within 48 hours. — Batch 62 Organizing Committee"
            />
            <input type="hidden" name="organizing_batch" value="62" />

            <Field label="Full name">
              <input
                type="text"
                name="full_name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bikash Talukder"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-100/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
              />
            </Field>

            <Field label="Student ID">
              <input
                type="text"
                name="student_id"
                required
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. 22210001"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-100/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
              />
            </Field>

            <Field label="Email">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-100/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
              />
            </Field>

            <Field
              label="Beton / contribution receipt"
              hint="Photo or PDF of last month's beton payment. Uploaded privately to FormSubmit."
            >
              <FileDrop fileName={fileName} setFileName={setFileName} />
            </Field>

            <Field
              label="Previous experience"
              hint="Events organized, committees served, anything relevant. Optional but helps us assign roles."
            >
              <textarea
                name="experience"
                rows={4}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Helped run the CSE Week '24 hackathon, led logistics for batch tour…"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-ink-100/40 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30"
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
              className="group inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-accent-500 to-accent-700 px-6 py-4 text-base font-semibold text-ink-900 shadow-glow transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit application'}
              {!submitting && (
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              )}
            </motion.button>

            <p className="text-center text-xs text-ink-100/40">
              Confirmation will be sent to your email. Receipt goes to{' '}
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

/* ---------- Subcomponents ---------- */

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

function FileDrop({
  fileName,
  setFileName
}: {
  fileName: string;
  setFileName: (s: string) => void;
}) {
  return (
    <label className="group relative flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm text-ink-100/70 transition hover:border-accent-400 hover:bg-white/10">
      <span className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-accent-400 transition group-hover:bg-white/20">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M5 20h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="truncate">
          {fileName || 'Click to upload — JPG, PNG or PDF (max 10 MB)'}
        </span>
      </span>
      <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-ink-100/70">
        Browse
      </span>
      <input
        type="file"
        name="receipt"
        required
        accept="image/*,application/pdf"
        onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
        className="absolute inset-0 cursor-pointer opacity-0"
      />
    </label>
  );
}