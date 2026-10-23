import type { Metadata, Viewport } from 'next';
import { DM_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ variable: '--font-manrope', subsets: ['latin'], weight: ['400', '700', '800'] });
const dmMono = DM_Mono({ variable: '--font-dm-mono', subsets: ['latin'], weight: ['400', '500'] });

const description =
  'Muhammad Sultan Khalid, an aspiring AI engineer in Lahore, Pakistan. Building LLM-powered apps end to end with Python, FastAPI, Claude and Next.js.';

export const metadata: Metadata = {
  metadataBase: new URL('https://skportfolio-sigma.vercel.app'),
  title: 'Muhammad Sultan Khalid | Aspiring AI Engineer',
  description,
  authors: [{ name: 'Muhammad Sultan Khalid' }],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    title: 'Muhammad Sultan Khalid | Aspiring AI Engineer',
    description: 'LLM-powered apps, end to end: retrieval, streaming and multi-provider backends in Python, with a UI people actually use.',
  },
  twitter: { card: 'summary' },
};

export const viewport: Viewport = { themeColor: '#0b0c0e' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
