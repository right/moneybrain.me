'use client';

import { useEffect, useState, type MouseEvent } from 'react';

const DEFAULT_PHONE = {
  number: '18773691725',
  display: '(877) 369-1725',
};

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

function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    fbclid: params.get('fbclid'),
    s1: params.get('s1'),
  };
}

async function fetchPhone(tracking?: { fbclid?: string | null; s1?: string | null }): Promise<PhoneState | null> {
  const params = new URLSearchParams();
  if (tracking?.fbclid) params.set('fbclid', tracking.fbclid);
  if (tracking?.s1) params.set('s1', tracking.s1);

  const url = params.toString() ? `/api/dni?${params.toString()}` : '/api/dni';
  const response = await fetch(url, { cache: 'no-store' });
  const data = response.ok ? await response.json() : null;

  return toPhoneState(data);
}

const defaultPhone = toPhoneState(DEFAULT_PHONE);

export function FinalExpensePhone({
  className,
  showNumber = false,
  fbclidDniOnly = false,
}: {
  className?: string;
  label?: 'call' | 'callNow' | 'orCall' | 'freeConsultation';
  showNumber?: boolean;
  fbclidDniOnly?: boolean;
}) {
  const [phone, setPhone] = useState<PhoneState | null>(fbclidDniOnly ? defaultPhone : null);

  useEffect(() => {
    if (fbclidDniOnly) {
      const tracking = getTrackingParams();
      if (!tracking.fbclid) return;

      fetchPhone(tracking)
        .then((nextPhone) => {
          if (nextPhone) setPhone(nextPhone);
        })
        .catch(() => {
          // Keep the default number if DNI lookup fails.
        });
      return;
    }

    fetchPhone(getTrackingParams())
      .then(setPhone)
      .catch(() => {
        // Keep button generic if lookup fails.
      });
  }, [fbclidDniOnly]);

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (phone?.href) return;

    event.preventDefault();

    try {
      const nextPhone = await fetchPhone(getTrackingParams());
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
