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
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ink-100/80 backdrop-blur-md">
            Form 2 · Organizing Batch 62
          </span>
          <h1 className="mt-4 text-3xl font-black sm:text-4xl">
            Join the Organizing Committee
          </h1>
          <p className="mt-2 text-ink-100/60">
            Internal accountability form — name + ID required.
          </p>
        </div>

        <CommitteeForm />
      </div>
    </section>
  );
}