import Image from 'next/image';
import { FinalExpenseQualify } from '@/components/FinalExpenseQualify';

export const metadata = {
  title: '2026 Final Expense Coverage Eligibility | Money Brain',
  description: 'Answer one quick question to see what final expense coverage options you may qualify for.',
};

export default function FinalExpenseQualifyPage() {
  return (
    <main className="fe-page fe-qualify-page">
      <div className="fe-qualify-topbar"><span />Last Call For Seniors — 2026 Enrollment Ends Friday</div>

      <div className="fe-qualify-wrap">
        <header className="fe-qualify-head">
          <h1>
            <span>Attention Seniors:</span> You Can Now Get 2026 Final Expense Coverage of <strong>$25,000–$40,000</strong> <em>For Less Than A Tank Of Gas</em>
          </h1>
        </header>

        <div className="fe-qualify-hero">
          <Image src="/images/senior-year-choices-hero.jpg" alt="Cash in hand" width={900} height={600} priority />
        </div>

        <p className="fe-qualify-lead">It only takes about 60 seconds to see what you may qualify for. Answer the few quick questions below and find out right now.</p>

        <div className="fe-qualify-chev" aria-hidden="true">⌄</div>

        <FinalExpenseQualify />
      </div>

      <footer className="fe-qualify-footer">
        <p>
          This site is not connected to, endorsed by, or operated by any government agency or program. All information provided on this page is for general educational purposes only and does not guarantee coverage. Available plans, benefit amounts, and pricing vary by carrier, age, and state. Final eligibility and rates are determined by the insurance provider after an application is submitted. Coverage examples shown are for illustration and are not an offer of insurance.
        </p>
        <div>
          <a href="/terms">Terms &amp; Conditions</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </footer>
    </main>
  );
}
