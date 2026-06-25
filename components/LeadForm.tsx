import { site } from '@/lib/site';

export function LeadForm({ compact = false, finalExpense = false }: { compact?: boolean; finalExpense?: boolean }) {
  return (
    <form className="lead-card" action={`mailto:${site.email}`} method="post" encType="text/plain">
      <div>
        <p className="eyebrow">{finalExpense ? 'Free final expense consultation' : 'Free quote check'}</p>
        <h2>{compact ? 'Start here' : 'See how much you could save'}</h2>
        <p className="muted">
          {finalExpense
            ? 'Request a free phone consultation with a licensed agent today. No obligation.'
            : 'Tell us what you need. We’ll help match you with a quote option in plain English.'}
        </p>
      </div>
      <label>Name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
      <label>Phone<input name="phone" autoComplete="tel" placeholder="(555) 123-4567" required /></label>
      {finalExpense && <label>Email<input name="email" type="email" autoComplete="email" placeholder="jane@example.com" required /></label>}
      {finalExpense ? (
        <input type="hidden" name="interest" value="Final Expense" />
      ) : (
        <label>What can we help with?
          <select name="interest" defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Insurance</option><option>Home services</option><option>Loans</option><option>Not sure yet</option>
          </select>
        </label>
      )}
      <button className="btn primary" type="submit">{finalExpense ? 'Submit' : 'Get my free quote'}</button>
      <p className="fine">No spam. No pressure. By submitting, you agree we may contact you about your request.</p>
    </form>
  );
}
