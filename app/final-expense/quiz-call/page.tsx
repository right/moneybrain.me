import { FinalExpenseQuiz } from '@/components/FinalExpenseQuiz';

export const metadata = {
  title: 'Final Expense Quiz | Money Brain',
  description: 'Answer a few quick questions to see if you may qualify for final expense life insurance options.',
};

export default function FinalExpenseQuizCallPage() {
  return (
    <main className="fe-page fe-quiz-page">
      <section className="fe-quiz-hero">
        <div className="fe-quiz-wrap">
          <div className="fe-quiz-copy">
            <p className="fe-kicker">Life Insurance &gt;&gt; Final Expense</p>
            <h1>New Final Expense Benefit Program</h1>
          </div>
          <FinalExpenseQuiz />
          <div className="fe-quiz-supporting-copy">
            <p className="fe-subhead">
              Answer 3 quick questions to see if you qualify, then speak with a real person for program details.
            </p>
            <ul className="fe-quiz-value-list">
              <li>No medical exam required for many plans</li>
              <li>Coverage options commonly start around $10,000+</li>
              <li>Plans may be available from about $1/day</li>
            </ul>
            <p className="fe-quiz-disclaimer">
              Availability, rates, and eligibility vary by age, state, health, and carrier. Not all applicants qualify.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
