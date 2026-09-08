'use client';

import { useState } from 'react';
import { FinalExpensePhone } from '@/components/FinalExpensePhone';

const ageRanges = ['50 - 64', '65 - 79', 'Over 80'];

export function FinalExpenseQualify() {
  const [qualified, setQualified] = useState(false);

  function qualify() {
    setQualified(true);
    window.setTimeout(() => {
      document.getElementById('qualify-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  return (
    <section className="fe-qualify-quiz" aria-live="polite">
      {!qualified ? (
        <div id="qualify-select">
          <div className="fe-qualify-banner">Answer The Question Below To Proceed:</div>
          <div className="fe-qualify-box">
            <h2>What&apos;s Your Age Range?</h2>
            {ageRanges.map((range) => (
              <button className="fe-qualify-age-btn" type="button" key={range} onClick={qualify}>
                {range}
              </button>
            ))}
            <div className="fe-qualify-safe">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M12 2 4 5v6c0 5 3.4 8.3 8 11 4.6-2.7 8-6 8-11V5l-8-3Z" /></svg>
              100% Free. No obligation. Your information stays private.
            </div>
          </div>
        </div>
      ) : (
        <div className="fe-qualify-result" id="qualify-result">
          <div className="fe-qualify-cg">Congratulations!<br />You May Qualify!</div>
          <p>
            Based on your age, coverage options are available in your area. <b>Tap the button below to speak with a licensed agent now</b> and lock in your rate. This only takes a couple of minutes.
          </p>
          <FinalExpensePhone className="fe-qualify-call" fbclidDniOnly />
          <FinalExpensePhone className="fe-qualify-num" showNumber fbclidDniOnly />
          <div className="fe-qualify-urg">
            <span aria-hidden="true">◷</span>
            Due to high call volume, an agent can only hold your spot for the next 3 minutes.
          </div>
        </div>
      )}
    </section>
  );
}
