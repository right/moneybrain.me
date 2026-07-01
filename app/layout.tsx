import type { Metadata } from 'next';
import './globals.css';
import { site } from '@/lib/site';
import { Chrome } from '@/components/Chrome';
import { MetaPixel } from '@/components/MetaPixel';
import { MicrosoftClarity } from '@/components/MicrosoftClarity';

export const metadata: Metadata = { title: `${site.name} | Smarter quotes, less hassle`, description: 'Money Brain helps everyday people compare options and save money on insurance, home services, and loans.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><MetaPixel /><MicrosoftClarity /><Chrome>{children}</Chrome></body></html>;
}
