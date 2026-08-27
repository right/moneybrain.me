'use client';

import { useMemo, useState } from 'react';
import { FinalExpensePhone } from '@/components/FinalExpensePhone';

const steps = [
  {
    eyebrow: 'Step 1 of 3',
    question: 'Who receives the benefits of this policy?',
    helper: 'This helps us understand who you want to protect.',
    field: 'beneficiary',
    options: ['Spouse', 'Kids', 'Both'],
  },
  {
    eyebrow: 'Step 2 of 3',
    question: 'How old are you?',
    helper: 'Final expense options can vary by age.',
    field: 'age',
    options: ['Under 50', '50+ years old'],
  },
] as const;

type Answers = {
  beneficiary?: string;
  age?: string;
  zip?: string;
};

export function FinalExpenseQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [zip, setZip] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewStep, setReviewStep] = useState(0);

  const progress = useMemo(() => Math.min(((step + 1) / 4) * 100, 100), [step]);
  const isResult = step >= 3;

  function selectAnswer(field: keyof Answers, value: string) {
    setAnswers((current) => ({ ...current, [field]: value }));
    setStep((current) => Math.min(current + 1, 3));
  }

  function submitZip(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAnswers((current) => ({ ...current, zip: zip.trim() }));
    setReviewStep(0);
    setIsReviewing(true);

    window.setTimeout(() => setReviewStep(1), 2400);
    window.setTimeout(() => setReviewStep(2), 5200);
    window.setTimeout(() => {
      setIsReviewing(false);
      setStep(3);
    }, 8400);
  }

  return (
    <section className="fe-quiz-card" aria-live="polite">
      <div className="fe-quiz-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {!isResult && step < 2 && (
        <div className="fe-quiz-step">
          <p className="fe-quiz-eyebrow">{steps[step].eyebrow}</p>
          <h2>{steps[step].question}</h2>
          <p>{steps[step].helper}</p>
          <div className="fe-quiz-options">
            {steps[step].options.map((option) => (
              <button
                className="fe-quiz-option"
                type="button"
                key={option}
                onClick={() => selectAnswer(steps[step].field, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && !isReviewing && (
        <form className="fe-quiz-step" onSubmit={submitZip}>
          <p className="fe-quiz-eyebrow">Step 3 of 3</p>
          <h2>What is your ZIP code?</h2>
          <p>We’ll check if final expense options may be available in your area.</p>
          <label className="fe-zip-label">
            ZIP code
            <input
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="Enter ZIP code"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              required
            />
          </label>
          <button className="fe-quiz-submit" type="submit">Check my options</button>
        </form>
      )}

      {isReviewing && (
        <div className="fe-quiz-reviewing">
          <p className="fe-quiz-eyebrow">Please wait</p>
          <h2>Reviewing your answers...</h2>
          <ul>
            <li className={reviewStep >= 0 ? 'is-active' : ''}>Reviewing your answers</li>
            <li className={reviewStep >= 1 ? 'is-active' : ''}>Checking available final expense programs</li>
            <li className={reviewStep >= 2 ? 'is-active' : ''}>Confirming eligibility in your area</li>
          </ul>
        </div>
      )}

      {isResult && (
        <div className="fe-quiz-result">
          <p className="fe-quiz-eyebrow">Congratulations</p>
          <h2>You pre-qualify for this final expense program.</h2>
          <p>
            Last step: call now to confirm your information and speak with a real person who can help you understand your choices.
          </p>
          <div className="fe-call-card fe-quiz-call-card">
            <p>Tap to call and confirm your info</p>
            <FinalExpensePhone className="fe-call-btn" label="callNow" />
            <span>Free, no-obligation phone consultation</span>
            <span className="fe-live-agents"><span aria-hidden="true" /><span className="fe-live-agents-text">Live agents available</span></span>
          </div>
        </div>
      )}
    </section>
  );
}
