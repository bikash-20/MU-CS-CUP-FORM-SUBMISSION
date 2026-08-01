import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-ink-900">
              <span className="text-xs font-black">26</span>
            </span>
            <span className="font-semibold">MU CSE CUP</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-ink-100/60">
            Inter-batch 5-a-side + girls&apos; indoor tournament organized by the
            students of the CSE Department, MU.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-100/70">
            <li><Link href="/rsvp" className="hover:text-white">RSVP</Link></li>
            <li><Link href="/committee" className="hover:text-white">Committee form</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-ink-100/70">
            <li>
              <a href="mailto:bikashtalukder040@gmail.com" className="hover:text-white">
                bikashtalukder040@gmail.com
              </a>
            </li>
            <li>Organizing Batch: 62</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-ink-100/40">
        © 2026 MU CSE CUP. Built by Bikash.
      </div>
    </footer>
  );
}