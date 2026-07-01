'use client';

import { FormEvent, useState } from 'react';
import { site } from '@/lib/site';

export function LeadForm({ compact = false, finalExpense = false }: { compact?: boolean; finalExpense?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submitFinalExpenseLead(event: FormEvent<HTMLFormElement>) {
    if (!finalExpense) return;

    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/final-expense-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          zip: formData.get('zip'),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || 'Please call us instead.');
      }

      form.reset();
      setStatus('success');
      setMessage('Thanks — your request was received. Someone will follow up shortly.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Please call us instead.');
    }
  }

  return (
    <form
      className="lead-card"
      action={finalExpense ? undefined : `mailto:${site.email}`}
      method={finalExpense ? undefined : 'post'}
      encType={finalExpense ? undefined : 'text/plain'}
      onSubmit={finalExpense ? submitFinalExpenseLead : undefined}
    >
      <div>
        <p className="eyebrow">{finalExpense ? 'Free final expense consultation' : 'Free quote check'}</p>
        <h2>{compact ? 'Start here' : 'See how much you could save'}</h2>
        <p className="muted">
          {finalExpense
            ? 'Request a free phone consultation with a licensed agent today. No obligation.'
            : 'Tell us what you need. We’ll help match you with an expert for a free consultation and quote.'}
        </p>
      </div>
      <label>Name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
      <label>Phone<input name="phone" autoComplete="tel" placeholder="(555) 123-4567" required /></label>
      <label>Email<input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required /></label>
      {finalExpense ? (
        <>
          <label>Zip Code<input name="zip" inputMode="numeric" autoComplete="postal-code" placeholder="90210" required /></label>
          <input type="hidden" name="interest" value="Final Expense" />
        </>
      ) : (
        <label>What can we help with?
          <select name="interest" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Insurance</option><option>Home services</option><option>Loans</option><option>Not sure yet</option>
          </select>
        </label>
      )}
      <button className="btn primary" type="submit" disabled={status === 'submitting' || status === 'success'}>
        {status === 'success' ? 'Request submitted' : status === 'submitting' ? 'Submitting…' : 'Submit'}
      </button>
      {message ? <p className={status === 'error' ? 'fine error' : 'fine'}>{message}</p> : null}
      <p className="fine">No spam. No pressure. By submitting, you agree we may contact you about your request.</p>
    </form>
  );
}
