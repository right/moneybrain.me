import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: `${site.name} | Smarter quotes, less hassle`, description: 'Money Brain helps everyday people compare options and save money on insurance, home services, and loans.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header />{children}<a className="mobile-call" href={site.phoneHref}>Call now: {site.phone}</a><Footer /></body></html>;
}
