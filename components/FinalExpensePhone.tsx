'use client';

import type { MouseEvent } from 'react';

function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

export function FinalExpensePhone({
  className,
}: {
  className?: string;
  label?: 'call' | 'callNow' | 'orCall' | 'freeConsultation';
}) {
  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');
    const url = fbclid ? `/api/dni?fbclid=${encodeURIComponent(fbclid)}` : '/api/dni';

    try {
      const response = await fetch(url, { cache: 'no-store' });
      const data = response.ok ? await response.json() : null;

      if (data?.number) {
        window.location.href = `tel:+1${digitsOnly(String(data.number)).replace(/^1/, '')}`;
      }
    } catch {
      // If the number lookup fails, leave the visitor on the page instead of exposing a fallback number in the markup.
    }
  }

  return (
    <a className={className} href="#" onClick={handleClick} role="button">
      CALL NOW
    </a>
  );
}
