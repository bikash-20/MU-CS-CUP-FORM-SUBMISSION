import type { Metadata } from 'next';
import { CommitteeForm } from '@/components/CommitteeForm';

export const metadata: Metadata = {
  title: "Committee · MU CSE CUP '26",
  description:
    "Apply to join the Batch 62 organizing committee for MU CSE CUP '26."
};

export default function CommitteePage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div
        aria-hidden
        className="liquid-blob right-[-10%] top-[8%] h-[460px] w-[460px] bg-accent-700/60"
      />
      <div
        aria-hidden
        className="liquid-blob bottom-[-10%] left-[-10%] h-[420px] w-[420px] bg-accent-500/50"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24">
        <div className="glass mb-8 rounded-2xl px-6 py-8 text-center sm:px-10 sm:py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-100/70">
            Hosted by
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            CSE Department · Batch 62
          </h1>
          <p className="mt-3 text-base font-medium text-ink-100/80">
            August · 2026
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-accent-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            Live · Aug 2026
          </div>
        </div>

        <CommitteeForm />
      </div>
    </section>
  );
}