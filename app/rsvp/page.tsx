import type { Metadata } from 'next';
import { RsvpForm } from '@/components/RsvpForm';

export const metadata: Metadata = {
  title: "RSVP · MU CSE CUP '26",
  description: 'Anonymous RSVP for the MU CSE CUP inter-batch tournament.'
};

export default function RsvpPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div
        aria-hidden
        className="liquid-blob left-[-15%] top-[10%] h-[420px] w-[420px] bg-accent-700/60"
      />
      <div
        aria-hidden
        className="liquid-blob right-[-10%] bottom-[10%] h-[460px] w-[460px] bg-accent-500/50"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-100/80 backdrop-blur-md">
            Form 1 · Anonymous
          </span>
          <h1 className="mt-4 text-3xl font-black sm:text-4xl">
            RSVP for MU CSE CUP &apos;26
          </h1>
          <p className="mt-2 text-ink-100/60">
            Pick your batch and tell us if you&apos;re in. No account needed.
          </p>
        </div>

        <RsvpForm />
      </div>
    </section>
  );
}