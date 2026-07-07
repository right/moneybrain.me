'use client';

import { useEffect, useState, type MouseEvent } from 'react';

type PhoneState = {
  display: string;
  href: string;
};

function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

function toPhoneState(data: { number?: unknown; display?: unknown } | null): PhoneState | null {
  if (!data?.number) return null;

  return {
    display: data.display ? String(data.display) : String(data.number),
    href: `tel:+1${digitsOnly(String(data.number)).replace(/^1/, '')}`,
  };
}

async function fetchPhone(): Promise<PhoneState | null> {
  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get('fbclid');
  const url = fbclid ? `/api/dni?fbclid=${encodeURIComponent(fbclid)}` : '/api/dni';
  const response = await fetch(url, { cache: 'no-store' });
  const data = response.ok ? await response.json() : null;

  return toPhoneState(data);
}

export function FinalExpensePhone({
  className,
  showNumber = false,
}: {
  className?: string;
  label?: 'call' | 'callNow' | 'orCall' | 'freeConsultation';
  showNumber?: boolean;
}) {
  const [phone, setPhone] = useState<PhoneState | null>(null);

  useEffect(() => {
    if (!showNumber) return;

    fetchPhone()
      .then(setPhone)
      .catch(() => {
        // Keep button generic if lookup fails.
      });
  }, [showNumber]);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (phone?.href) return;

    event.preventDefault();

    try {
      const nextPhone = await fetchPhone();
      if (nextPhone?.href) {
        window.location.href = nextPhone.href;
      }
    } catch {
      // If the number lookup fails, leave the visitor on the page instead of exposing a fallback number in the markup.
    }
  }

  return (
    <a className={className} href={phone?.href || '#'} onClick={handleClick} role="button">
      {showNumber && phone?.display ? `Call ${phone.display}` : 'CALL NOW'}
    </a>
  );
}
