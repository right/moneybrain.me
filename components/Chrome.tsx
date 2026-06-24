'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneLandingPage = pathname === '/final-expense';

  if (isStandaloneLandingPage) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <a className="mobile-call" href={site.phoneHref}>Call now: {site.phone}</a>
      <Footer />
    </>
  );
}
