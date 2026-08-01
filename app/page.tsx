import { Hero } from '@/components/Hero';
import { Counter } from '@/components/Counter';
import { EventInfo } from '@/components/EventInfo';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <Counter />
        <EventInfo />

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/rsvp"
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent-500 to-accent-700 px-8 py-4 text-base font-semibold text-ink-900 shadow-glow transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(124,247,255,0.7)]"
          >
            RSVP Now
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/committee"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-white/40 hover:bg-white/10"
          >
            Join Organizing Committee
          </Link>
        </div>
      </section>
    </>
  );
}