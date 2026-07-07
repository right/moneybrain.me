import { FinalExpensePhone } from '@/components/FinalExpensePhone';

export const metadata = {
  title: 'Final Expense Life Insurance | Money Brain',
  description: 'Speak with a real person about affordable final expense life insurance options. Free, no-obligation phone consultation',
};

export default function FinalExpenseCallOnlyPage() {
  return (
    <main className="fe-page fe-simple-page">
      <section className="fe-simple-hero">
        <div className="fe-simple-wrap">
          <p className="fe-kicker">Life Insurance &gt;&gt; Final Expense</p>
          <h1>Give one last loving gift to your family.</h1>
          <p className="fe-subhead">
            Get simple, affordable final expense life insurance options for adults who want to plan ahead.
            <br />
            <br />
            Speak with a real person who can help you understand your choices, and provide you with options.
          </p>
          <div className="fe-call-card fe-simple-call-card">
            <p>Talk to a specialist</p>
            <FinalExpensePhone className="fe-call-btn" label="callNow" />
            <span>Free, no-obligation phone consultation</span>
          </div>
        </div>
      </section>
    </main>
  );
}
