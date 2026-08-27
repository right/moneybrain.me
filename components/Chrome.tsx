'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandaloneLandingPage = pathname === '/final-expense' || pathname === '/final-expense/call-only' || pathname === '/final-expense/quiz-call';

  if (isStandaloneLandingPage) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
