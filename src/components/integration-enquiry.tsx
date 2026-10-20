"use client";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  CONTACT_EMAIL,
  integrationEmail,
  setupSummary,
  type OnboardingSetup,
} from "@/lib/onboarding";

export function IntegrationEnquiry() {
  const [setup, setSetup] = useState<OnboardingSetup>({
    path: "integration",
    institute: "",
    platform: "",
  });
  const [prepared, setPrepared] = useState(false);
  const [notice, setNotice] = useState("");
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPrepared(true);
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(setupSummary(setup));
      setNotice("Summary copied. Nothing has been submitted.");
    } catch {
      setNotice("Copy was unavailable. You can select the summary text below.");
    }
  }
  return (
    <div className="onboarding-page integration-enquiry-page">
      <a className="skip-link" href="#integration-main">
        Skip to integration enquiry
      </a>
      <header className="onboarding-header">
        <Link className="brand" href="/" aria-label="Edveo home">
          <span className="brand-mark" aria-hidden="true">
            e<span />
          </span>
          <span>edveo</span>
        </Link>
        <Link className="text-link" href="/get-started/">
          Start teaching 1:1 ↗
        </Link>
      </header>
      <main id="integration-main" className="integration-enquiry-main">
        <Link className="integration-back" href="/">
          ← Back to website
        </Link>
        <div className="integration-enquiry-layout">
          <section className="integration-enquiry-intro">
            <p className="simple-access-eyebrow">FOR PLATFORM TEAMS</p>
            <h1>
              Your platform.
              <br />A place for 1:1.
            </h1>
            <p>
              Bring a dedicated teacher-and-student classroom to your tutoring
              website or LMS. Plan the connection with our team before committing
              developer time.
            </p>
            <span className="integration-pilot-label">
              1:1 classroom API · pilot planning
            </span>
            <ol>
              <li>
                <strong>Scope the connection</strong>
                <p>Confirm your tutoring workflow, simultaneous lessons, and access needs.</p>
              </li>
              <li>
                <strong>Prepare a test integration</strong>
                <p>
                  Once access is available, approve developer permissions and
                  keep credentials on your server.
                </p>
              </li>
              <li>
                <strong>Validate a real class</strong>
                <p>
                  Test teacher/student entry, attendance, and recording delivery
                  before rollout.
                </p>
              </li>
            </ol>
            <p className="integration-availability">
              Public live-class API endpoints and webhooks are not yet
              available. This page does not issue credentials.
            </p>
          </section>
          <section
            className="integration-enquiry-card"
            aria-label="Prepare an integration enquiry"
          >
            {!prepared ? (
              <form onSubmit={prepare}>
                <h2>Tell us about your platform.</h2>
                <p className="integration-card-description">
                  Prepare a short enquiry. No account setup required.
                </p>
                <div className="onboarding-fields">
                  <label htmlFor="integration-institute">
                    Tutor or institute name
                    <input
                      id="integration-institute"
                      autoComplete="organization"
                      maxLength={120}
                      value={setup.institute}
                      onChange={(event) =>
                        setSetup({ ...setup, institute: event.target.value })
                      }
                      placeholder="Your tutoring business or institute"
                    />
                  </label>
                  <label htmlFor="integration-platform">
                    Website or LMS
                    <input
                      id="integration-platform"
                      maxLength={160}
                      value={setup.platform}
                      onChange={(event) =>
                        setSetup({ ...setup, platform: event.target.value })
                      }
                      placeholder="e.g. your website, Moodle, or a custom LMS"
                    />
                    <small>
                      A name is enough. Do not enter passwords or API keys.
                    </small>
                  </label>
                  <div className="one-to-one-usage">
                    <span className="path-label">ONE-TO-ONE ONLY</span>
                    <strong>1 teacher + 1 student per lesson</strong>
                    <p>For private teaching, individual academic support, and personal mentoring.</p>
                  </div>
                </div>
                <button
                  className="button button-primary integration-prepare"
                  type="submit"
                >
                  Prepare enquiry →
                </button>
                <p className="integration-card-note">
                  Answers stay on this page and clear when you reload. Nothing
                  is submitted automatically.
                </p>
              </form>
            ) : (
              <div className="integration-prepared">
                <h2>Your enquiry is ready to review.</h2>
                <p>
                  This prepares an email draft. You decide whether to send it.
                </p>
                <pre tabIndex={0} aria-label="Integration enquiry summary">
                  {setupSummary(setup)}
                </pre>
                <a
                  className="button button-primary"
                  href={integrationEmail(setup)}
                >
                  Open email request →
                </a>
                <button
                  className="integration-copy"
                  type="button"
                  onClick={copy}
                >
                  Copy summary
                </button>
                <p className="integration-card-note">
                  Email not opening? Contact{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                  Nothing has been submitted.
                </p>
                <p role="status">{notice}</p>
                <button
                  className="integration-back"
                  type="button"
                  onClick={() => setPrepared(false)}
                >
                  ← Edit enquiry
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="onboarding-footer">
        <span>Edveo · Platform integrations</span>
        <a href={`mailto:${CONTACT_EMAIL}`}>Contact our team</a>
      </footer>
    </div>
  );
}
