import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "MU CSE CUP '26 — Inter-Batch Football & Girls' Indoor Tournament",
  description:
    "MU CSE CUP '26 — the annual inter-batch 5-a-side football tournament plus girls' indoor tournament. RSVP and join the organizing committee.",
  keywords: [
    "MU CSE CUP",
    "Metropolitan University",
    "CSE Football",
    "Inter Batch Tournament",
    "Boys 5-a-side",
    "Girls Indoor",
    "Batch 62 63 64 65 66"
  ],
  authors: [{ name: 'bikashtalukder040@gmail.com' }],
  openGraph: {
    title: "MU CSE CUP '26",
    description: "Inter-batch 5-a-side + girls' indoor tournament. RSVP now.",
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#06070d'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}