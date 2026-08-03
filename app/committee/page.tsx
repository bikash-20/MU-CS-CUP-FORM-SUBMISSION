import type { Metadata } from 'next';
import { CommitteeForm } from '@/components/CommitteeForm';
import { CommitteeHero } from '@/components/PageHeader';

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
        <CommitteeHero />

        <CommitteeForm />
      </div>
    </section>
  );
}