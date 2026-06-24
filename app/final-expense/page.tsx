import { LeadForm } from '@/components/LeadForm';
import { site } from '@/lib/site';

const benefits = [
  'Help protect your family from funeral and burial costs',
  'Options commonly available for ages 50–85',
  'No medical exam required for many options',
  'Coverage that can stay with you for life',
  'Affordable monthly payments for fixed incomes',
];

export const metadata = {
  title: 'Final Expense Insurance | Money Brain',
  description: 'Speak with a real person about affordable final expense insurance options. No medical exam required for many plans.',
};

export default function FinalExpensePage() {
  return (
    <main className="fe-page">
      <section className="fe-hero"><div className="fe-wrap fe-hero-grid"><div>
        <p className="fe-kicker">Final expense insurance</p>
        <h1>Help protect your family from funeral costs.</h1>
        <p className="fe-subhead">Get simple, affordable burial insurance options for adults who want to plan ahead. Speak with a real person who can help you understand your choices.</p>
        <div className="fe-call-card"><p>Prefer to talk? Call now for free help.</p><a className="fe-call-btn" href={site.finalExpensePhoneHref}>Call {site.finalExpensePhone}</a><span>No pressure. No obligation.</span></div>
      </div><a className="fe-sticky-call" href={site.finalExpensePhoneHref}>Call now: {site.finalExpensePhone}</a><div className="fe-hero-image" aria-label="Older family planning ahead for final expenses" /></div></section>
      <section className="fe-section fe-wrap"><h2>A simple way to plan ahead</h2><p>Funeral and end-of-life expenses can be difficult for families. Final expense insurance is designed to help cover those costs, so your loved ones have one less thing to worry about.</p><ul className="fe-checks">{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></section>
      <section className="fe-section fe-band"><div className="fe-wrap"><h2>How it works</h2><div className="fe-steps"><div><strong>1. Call us</strong><p>Tell us a little about what you need.</p></div><div><strong>2. Review options</strong><p>We explain available plans in plain English.</p></div><div><strong>3. Choose calmly</strong><p>You decide if a plan makes sense for your family.</p></div></div></div></section>
      <section className="fe-section fe-wrap fe-form-block"><div><h2>Not ready to call?</h2><p>Send your information and someone can follow up. Calling is still the fastest way to get help.</p><a className="fe-secondary-call" href={site.finalExpensePhoneHref}>Or call {site.finalExpensePhone}</a></div><LeadForm compact /></section>
      <section className="fe-section fe-wrap fe-fineprint"><h2>Questions people ask</h2><details open><summary>Do I need a medical exam?</summary><p>Many final expense options do not require a medical exam. Availability depends on your age, state, and health answers.</p></details><details><summary>Is this only for funeral costs?</summary><p>Benefits are commonly used for funeral, burial, cremation, medical bills, or other final expenses.</p></details><details><summary>Can I afford this on a fixed income?</summary><p>Plans are often built around smaller coverage amounts and monthly payments. A licensed representative can help review options.</p></details></section>
    </main>
  );
}
