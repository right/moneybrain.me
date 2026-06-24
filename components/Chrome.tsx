'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneLandingPage = pathname === '/final-expense';

  if (isStandaloneLandingPage) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
