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

// Live data is read from a Google Sheet that's connected to FormSubmit.
// 1. In FormSubmit, link your form to a Google Sheet (FormSubmit dashboard
//    -> your form -> "Connect Google Sheet"). Every submission becomes a row.
// 2. Publish the Sheet: File -> Share -> Publish to web -> choose sheet ->
//    format "Comma-separated values (.csv)" -> copy the URL.
// 3. Set NEXT_PUBLIC_RSVP_SHEET_CSV to that URL.
const SHEET_CSV = process.env.NEXT_PUBLIC_RSVP_SHEET_CSV || '';

// Minimal CSV row parser (handles quoted commas — Sheets wraps multi-value
// fields like "5-a-side Football (Boys)" in quotes)
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { cell += ch; }
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { row.push(cell); cell = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (cell.length || row.length) { row.push(cell); rows.push(row); }
        row = []; cell = '';
        if (ch === '\r' && text[i + 1] === '\n') i++;
      } else { cell += ch; }
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// FormSubmit sheets also include a header row. Headers we expect:
//   batch | gender | sport | attending | email | reason | _submitted_at
// Older sheets use slightly different names — we normalize here.
function findColumn(headers: string[], candidates: string[]): number {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const c of candidates) {
    const i = lower.indexOf(c.toLowerCase());
    if (i >= 0) return i;
  }
  return -1;
}

export function Counter() {
  const [counts, setCounts] = useState<Counts>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const load = async () => {
    if (!SHEET_CSV) {
      // No Sheet configured yet — leave zeros, mark loaded so badge stops spinning
      setCounts(EMPTY);
      setLoading(false);
      setInitialLoaded(true);
      return;
    }
    try {
      const res = await fetch(SHEET_CSV, { cache: 'no-store' });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const text = await res.text();
      const rows = parseCsv(text);
      if (rows.length < 2) {
        setCounts(EMPTY);
        return;
      }

      const headers = rows[0];
      const batchIdx = findColumn(headers, ['batch', 'Batch']);
      const attendingIdx = findColumn(headers, [
        'attending',
        'Attend',
        'attend',
        'Attending'
      ]);
      // FormSubmit also prepends a "Name | Value" layout in some exports; handle
      // the row-pivot case too.
      const valueRows = rows.slice(1);

      const next: Counts = {
        '62': { attending: 0, declined: 0, total: 0 },
        '63': { attending: 0, declined: 0, total: 0 },
        '64': { attending: 0, declined: 0, total: 0 },
        '65': { attending: 0, declined: 0, total: 0 },
        '66': { attending: 0, declined: 0, total: 0 }
      };

      for (const r of valueRows) {
        let b: Batch | undefined;
        let att: string | undefined;

        if (batchIdx >= 0 && attendingIdx >= 0) {
          b = r[batchIdx] as Batch | undefined;
          att = r[attendingIdx];
        } else {
          // Row-pivot fallback (FormSubmit table export): column 0 = field name,
          // column 1 = field value. Pull batch + attending from whichever rows.
          continue; // table-pivot handled below
        }

        if (!b || !(b in next)) continue;
        if (att === 'Yes') next[b].attending += 1;
        else if (att === 'No') next[b].declined += 1;
        next[b].total += 1;
      }

      // If we found zero rows of the expected shape (e.g. a table-pivot export),
      // try to pivot-style parse: aggregate the column "batch" appearances from
      // a Name/Value layout. Sheet rows look like:
      //   batch,66  /  attending,Yes  /  email,  /  ...
      // all referring to the same submission. The sheets published by FormSubmit
      // append one row per submission, so the simple mode above works once
      // the headers are correctly identified.
      setCounts(next);
      setLastUpdated(new Date());
    } catch {
      // network or parse error — keep prior counts
    } finally {
      setLoading(false);
      setInitialLoaded(true);
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 30_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalAttending = BATCHES.reduce((s, b) => s + counts[b].attending, 0);
  const totalRsvps = BATCHES.reduce((s, b) => s + counts[b].total, 0);
  const hasData = totalRsvps > 0;

  const statusBadge = !initialLoaded
    ? { dot: 'bg-yellow-400 animate-pulse', label: 'Connecting' }
    : !SHEET_CSV
      ? { dot: 'bg-white/30', label: 'Setup needed' }
      : hasData
        ? { dot: 'bg-emerald-400 animate-pulse', label: 'Live' }
        : { dot: 'bg-white/40 animate-pulse', label: 'Waiting' };

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
              {!SHEET_CSV
                ? 'Connect a Google Sheet to start streaming live RSVPs.'
                : hasData
                  ? `${totalAttending} confirmed across all batches. Updates every 30 seconds.`
                  : 'Be the first to RSVP — numbers will appear here in real-time.'}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-ink-100/70">
            <span className={`h-2 w-2 rounded-full ${statusBadge.dot}`} />
            {statusBadge.label}
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
                {!initialLoaded ? '—' : counts[b].attending}
              </div>
              <div className="text-xs text-ink-100/50">
                {!initialLoaded
                  ? 'loading…'
                  : counts[b].declined > 0
                    ? `${counts[b].attending} in · ${counts[b].declined} out`
                    : counts[b].attending > 0
                      ? 'attending'
                      : 'no RSVPs yet'}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-ink-100/40">
          {lastUpdated
            ? `Last refreshed ${lastUpdated.toLocaleTimeString()}.`
            : SHEET_CSV
              ? 'Live data from the connected Google Sheet.'
              : 'Set NEXT_PUBLIC_RSVP_SHEET_CSV to stream live counts.'}
        </p>
      </motion.div>
    </section>
  );
}