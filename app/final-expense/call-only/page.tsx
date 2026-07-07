import { FinalExpensePhone } from '@/components/FinalExpensePhone';

export const metadata = {
  title: 'Final Expense Insurance | Money Brain',
  description: 'Speak with a real person about affordable final expense insurance options. No pressure. No obligation.',
};

export default function FinalExpenseCallOnlyPage() {
  return (
    <main className="fe-page fe-simple-page">
      <section className="fe-simple-hero">
        <div className="fe-simple-wrap">
          <p className="fe-kicker">Final expense insurance</p>
          <h1>Help protect your family from funeral costs.</h1>
          <p className="fe-subhead">
            Get simple, affordable burial insurance options for adults who want to plan ahead. Speak with a real person who can help you understand your choices.
          </p>
          <div className="fe-call-card fe-simple-call-card">
            <p>Get free help from a licensed agent today.</p>
            <FinalExpensePhone className="fe-call-btn" label="callNow" />
            <span>No pressure. No obligation.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
