'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

type PhoneState = {
  display: string;
  href: string;
};

const DEFAULT_PHONE: PhoneState = {
  display: site.finalExpensePhone,
  href: site.finalExpensePhoneHref,
};

function digitsOnly(value: string) {
  return value.replace(/\D/g, '');
}

export function FinalExpensePhone({
  className,
  label = 'call',
}: {
  className?: string;
  label?: 'call' | 'callNow' | 'orCall';
}) {
  const [phone, setPhone] = useState<PhoneState>(DEFAULT_PHONE);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get('fbclid');

    if (!fbclid) return;

    const controller = new AbortController();

    fetch(`/api/dni?fbclid=${encodeURIComponent(fbclid)}`, {
      signal: controller.signal,
      cache: 'no-store',
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.number || !data?.display) return;
        setPhone({
          display: data.display,
          href: `tel:+1${digitsOnly(String(data.number)).replace(/^1/, '')}`,
        });
      })
      .catch(() => {
        // Keep default number if DNI fails.
      });

    return () => controller.abort();
  }, []);

  const text =
    label === 'callNow'
      ? `Call now: ${phone.display}`
      : label === 'orCall'
        ? `Or call ${phone.display}`
        : `Call ${phone.display}`;

  return (
    <a className={className} href={phone.href}>
      {text}
    </a>
  );
}
