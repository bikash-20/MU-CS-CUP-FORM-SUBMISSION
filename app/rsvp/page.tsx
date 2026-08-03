import type { Metadata } from 'next';
import { RsvpForm } from '@/components/RsvpForm';
import { PageHeader } from '@/components/PageHeader';

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
        <PageHeader
          eyebrowKey="rsvpPage.eyebrow"
          titleKey="rsvpPage.heroTitle"
          subtitleKey="rsvpPage.heroSubtitle"
        />

        <RsvpForm />
      </div>
    </section>
  );
}