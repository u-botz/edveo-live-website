import Link from "next/link";
import { CONTACT_EMAIL, SIGNIN_URL, SIGNUP_URL } from "@/lib/onboarding";

export function OnboardingWorkflow() {
  return (
    <div className="onboarding-page simple-access-page">
      <a className="skip-link" href="#onboarding-main">
        Skip to account setup
      </a>
      <header className="onboarding-header">
        <Link className="brand" href="/" aria-label="Edveo home">
          <span className="brand-mark" aria-hidden="true">
            e<span />
          </span>
          <span>edveo</span>
        </Link>
        <p>
          Already with Edveo? <a href={SIGNIN_URL}>Sign in ↗</a>
        </p>
      </header>
      <main id="onboarding-main" className="simple-access-main">
        <section className="simple-access-card" aria-labelledby="access-title">
          <div className="simple-access-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            >
              <rect x="3" y="5" width="12" height="14" rx="3" />
              <path d="m15 10 6-3v10l-6-3" />
            </svg>
          </div>
          <p className="simple-access-eyebrow">LET’S GET YOU TEACHING</p>
          <h1 id="access-title">
            Your next class
            <br />
            starts here.
          </h1>
          <p className="simple-access-description">
            Create your Edveo account, then bring your teachers and students
            together.
          </p>
          <a
            className="button button-primary simple-access-cta"
            href={SIGNUP_URL}
          >
            Create your account <span aria-hidden="true">→</span>
          </a>
          <p className="simple-access-methods">
            Google and email signup are available in Edveo account setup.
          </p>
          <div className="simple-access-existing">
            Have an institute account? <a href={SIGNIN_URL}>Sign in</a>
          </div>
          <ol className="simple-access-steps" aria-label="Getting started">
            <li>
              <span>1</span>Sign up
            </li>
            <li>
              <span>2</span>Set up your institute
            </li>
            <li>
              <span>3</span>Create a session
            </li>
          </ol>
        </section>
        <p className="simple-access-note">
          You’ll continue to Edveo’s secure account setup. Live features depend
          on your account access.
        </p>
        <details className="onboarding-student">
          <summary>Joining a class or accepting an invitation?</summary>
          <p>
            Use the class or invitation link your institute sent you. You do not
            need to create a separate institute account.
          </p>
        </details>
      </main>
      <footer className="onboarding-footer">
        <span>Edveo · Built around your teaching.</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>Need help?</a>
      </footer>
    </div>
  );
}
