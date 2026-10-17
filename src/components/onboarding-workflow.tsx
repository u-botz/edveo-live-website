"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  CONTACT_EMAIL,
  SIGNIN_URL,
  SIGNUP_URL,
  integrationEmail,
  setupSummary,
  teachingLabels,
  type OnboardingPath,
  type OnboardingSetup,
  type TeachingType,
} from "@/lib/onboarding";

function Symbol({
  kind,
}: {
  kind: "dashboard" | "integration" | "arrow" | "check";
}) {
  const paths = {
    dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    integration: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18",
    arrow: "M5 12h14m-6-6 6 6-6 6",
    check: "m5 12 4 4L19 6",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}
const stages = ["Choose your path", "Your teaching setup", "Next steps"];

export function OnboardingWorkflow() {
  const [step, setStep] = useState(0);
  const [setup, setSetup] = useState<OnboardingSetup>({
    path: "dashboard",
    institute: "",
    teaching: ["group"],
    students: "Up to 30",
    platform: "",
  });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [ready, setReady] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const focusOnStep = useRef(false);
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("path");
    if (value === "integration")
      setSetup((current) => ({ ...current, path: value }));
    setReady(true);
  }, []);
  useEffect(() => {
    if (focusOnStep.current) heading.current?.focus();
    focusOnStep.current = true;
  }, [step]);
  function navigate(next: number) {
    setError("");
    setNotice("");
    setStep(next);
  }
  function proceed(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1 && !setup.teaching.length) {
      setError("Choose at least one type of teaching.");
      return;
    }
    navigate(step + 1);
  }
  function chooseTeaching(type: TeachingType) {
    setSetup((current) => ({
      ...current,
      teaching: current.teaching.includes(type)
        ? current.teaching.filter((value) => value !== type)
        : [...current.teaching, type],
    }));
    setError("");
  }
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(setupSummary(setup));
      setNotice("Setup summary copied. Nothing has been submitted.");
    } catch {
      setNotice("Copy was unavailable. Download the setup summary instead.");
    }
  }
  function downloadSummary() {
    const url = URL.createObjectURL(
      new Blob([setupSummary(setup)], { type: "text/plain;charset=utf-8" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "edveo-teaching-setup.txt";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(
      "Your browser has been asked to download the summary. Nothing has been submitted.",
    );
  }
  const integration = setup.path === "integration";
  return (
    <div className="onboarding-page" data-ready={ready}>
      <a className="skip-link" href="#onboarding-main">
        Skip to setup
      </a>
      <header className="onboarding-header">
        <Link className="brand" href="/" aria-label="Edveo home">
          <span className="brand-mark" aria-hidden="true">
            e<span />
          </span>
          <span>edveo</span>
        </Link>
        <p>
          Already with Edveo?{" "}
          <a href={SIGNIN_URL}>
            Sign in <span aria-hidden="true">↗</span>
          </a>
        </p>
      </header>
      <div className="onboarding-layout">
        <aside className="onboarding-sidebar" aria-label="Setup progress">
          <p className="onboarding-kicker">LET’S GET YOU TEACHING</p>
          <h2>
            A clear path to
            <br />
            your first class.
          </h2>
          <ol className="onboarding-progress">
            {stages.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  disabled={index > step}
                  onClick={() => navigate(index)}
                  aria-current={index === step ? "step" : undefined}
                >
                  <span className="onboarding-step-number">
                    {index < step ? <Symbol kind="check" /> : index + 1}
                  </span>
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="onboarding-sidebar-note">
            <p>One institute. One account.</p>
            <span>
              Keep your teachers, students, and sessions together in your
              existing workspace.
            </span>
          </div>
        </aside>
        <main id="onboarding-main" className="onboarding-main">
          <div className="onboarding-step-meta">
            <span>STEP {step + 1} OF 3</span>
            <Link href="/">Back to website</Link>
          </div>
          {step < 2 ? (
            <form onSubmit={proceed}>
              <header className="onboarding-title">
                <h1 ref={heading} tabIndex={-1}>
                  {step === 0
                    ? "How would you like to teach?"
                    : "A little about your setup."}
                </h1>
                <p>
                  {step === 0
                    ? "Use our dashboard, or keep the platform your institute already knows."
                    : "Choose what your team needs. Account details come later, through Edveo signup."}
                </p>
              </header>
              {step === 0 ? (
                <fieldset className="onboarding-paths">
                  <legend className="sr-only">Choose your path</legend>
                  {(
                    [
                      [
                        "dashboard",
                        "Use the Edveo dashboard",
                        "Schedule sessions, invite your team, and teach from one workspace.",
                        "FOR INSTITUTE TEAMS",
                      ],
                      [
                        "integration",
                        "Connect our own platform",
                        "Plan classroom access from your website or learning platform.",
                        "FOR TEAMS WITH DEVELOPERS",
                      ],
                    ] as const
                  ).map(([value, title, description, audience]) => (
                    <label
                      key={value}
                      className={`onboarding-path ${setup.path === value ? "is-selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="path"
                        value={value}
                        checked={setup.path === value}
                        onChange={() =>
                          setSetup({ ...setup, path: value as OnboardingPath })
                        }
                      />
                      <span className="onboarding-path-icon">
                        <Symbol kind={value} />
                      </span>
                      <span className="onboarding-path-content">
                        <small>{audience}</small>
                        <strong>{title}</strong>
                        <span>{description}</span>
                        {value === "integration" && (
                          <em>Live-class API access is planned.</em>
                        )}
                      </span>
                      <span className="onboarding-radio" aria-hidden="true" />
                    </label>
                  ))}
                </fieldset>
              ) : (
                <div className="onboarding-fields">
                  <label htmlFor="onboarding-institute">
                    <span>
                      Institute name{" "}
                      <span className="onboarding-optional">Optional</span>
                    </span>
                    <input
                      id="onboarding-institute"
                      autoComplete="organization"
                      value={setup.institute}
                      maxLength={120}
                      onChange={(event) =>
                        setSetup({ ...setup, institute: event.target.value })
                      }
                      placeholder="Your institute or academy"
                    />
                  </label>
                  <fieldset
                    className="onboarding-teaching"
                    aria-describedby={
                      error ? "onboarding-type-error" : undefined
                    }
                    aria-invalid={error ? true : undefined}
                  >
                    <legend>What will you run?</legend>
                    <p>Select all that apply.</p>
                    <div>
                      {(Object.keys(teachingLabels) as TeachingType[]).map(
                        (type) => (
                          <label key={type}>
                            <input
                              type="checkbox"
                              checked={setup.teaching.includes(type)}
                              onChange={() => chooseTeaching(type)}
                            />
                            {teachingLabels[type]}
                          </label>
                        ),
                      )}
                    </div>
                    {error && (
                      <p
                        id="onboarding-type-error"
                        className="onboarding-error"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}
                  </fieldset>
                  <label htmlFor="onboarding-students">
                    Typical students per class
                    <select
                      id="onboarding-students"
                      value={setup.students}
                      onChange={(event) =>
                        setSetup({ ...setup, students: event.target.value })
                      }
                    >
                      {[
                        "1 student",
                        "2–10",
                        "Up to 30",
                        "31–100",
                        "More than 100",
                        "Not sure yet",
                      ].map((value) => (
                        <option key={value}>{value}</option>
                      ))}
                    </select>
                  </label>
                  {integration && (
                    <label htmlFor="onboarding-platform">
                      <span>
                        Your platform{" "}
                        <span className="onboarding-optional">Optional</span>
                      </span>
                      <input
                        id="onboarding-platform"
                        value={setup.platform}
                        maxLength={160}
                        onChange={(event) =>
                          setSetup({ ...setup, platform: event.target.value })
                        }
                        placeholder="e.g. your website, Moodle, or a custom LMS"
                      />
                      <small>
                        A name is enough. Do not enter passwords or API keys.
                      </small>
                    </label>
                  )}
                  <p className="onboarding-field-note">
                    These answers help you prepare. They do not select a paid
                    plan, reserve capacity, or change your account access.
                  </p>
                </div>
              )}
              <div className="onboarding-actions">
                {step > 0 ? (
                  <button
                    className="button onboarding-back"
                    type="button"
                    onClick={() => navigate(step - 1)}
                  >
                    ← Back
                  </button>
                ) : (
                  <span />
                )}
                <button
                  className="button button-primary"
                  type="submit"
                  disabled={!ready}
                >
                  {step === 0 ? "Continue" : "See my next steps"}
                  <Symbol kind="arrow" />
                </button>
              </div>
              <p className="onboarding-privacy">
                No account is created here. Your answers stay on this page and
                clear when you reload.
              </p>
            </form>
          ) : (
            <>
              <header className="onboarding-title">
                <span className="onboarding-result-icon">
                  <Symbol kind={setup.path} />
                </span>
                <h1 ref={heading} tabIndex={-1}>
                  {integration
                    ? "Let’s plan your connection."
                    : "Your next stop: account setup."}
                </h1>
                <p>
                  {integration
                    ? "Bring your setup to our team before committing developer time."
                    : "Continue in Edveo to verify your email and create your institute workspace."}
                </p>
              </header>
              <div className="onboarding-summary">
                <div>
                  <small>YOUR SETUP</small>
                  <strong>{setup.institute.trim() || "Your institute"}</strong>
                </div>
                <button type="button" onClick={() => navigate(1)}>
                  Edit
                </button>
                <p>
                  {setup.teaching
                    .map((type) => teachingLabels[type])
                    .join(" · ")}
                  <br />
                  {setup.students} per class
                </p>
              </div>
              <ol className="onboarding-next-list">
                {(integration
                  ? [
                      [
                        "Discuss your integration",
                        "Confirm availability, class sizes, access requirements, and your pilot scope with our team.",
                      ],
                      [
                        "Prepare a test connection",
                        "Once access is available, an institute owner approves the developer and permissions. Keep credentials on your server.",
                      ],
                      [
                        "Validate your first class",
                        "Test authorised host/student entry, attendance, and recording delivery before rollout.",
                      ],
                    ]
                  : [
                      [
                        "Create and verify your account",
                        "Choose your organisation type, enter your account details, and complete the email verification in Edveo.",
                      ],
                      [
                        "Set up your institute",
                        "Confirm a plan with the access you need. Invite teachers and students, and finish the setup for your teaching type.",
                      ],
                      [
                        "Create your first session",
                        "Open Live Sessions → Quick start. Schedule teaching, book mentoring, or create a meeting where enabled. Find scheduled sessions in Today.",
                      ],
                    ]
                ).map(([title, description], index) => (
                  <li key={title}>
                    <span>{index + 1}</span>
                    <div>
                      <h2>{title}</h2>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              {integration ? (
                <div className="onboarding-handoff">
                  <p className="onboarding-availability">
                    Integration planning · live-class API not yet public
                  </p>
                  <a
                    className="button button-primary"
                    href={integrationEmail(setup)}
                  >
                    Open email request
                    <Symbol kind="arrow" />
                  </a>
                  <p>
                    This opens your email app with a prepared summary. You
                    review and send it yourself. Nothing has been submitted.
                  </p>
                  <span className="onboarding-email">
                    Email not opening? Contact{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and
                    copy your summary below.
                  </span>
                </div>
              ) : (
                <div className="onboarding-handoff">
                  <a className="button button-primary" href={SIGNUP_URL}>
                    Continue to Edveo signup
                    <Symbol kind="arrow" />
                  </a>
                  <p>
                    You’ll leave this guide for Edveo’s account setup. These
                    planning answers are not transferred. Live access depends on
                    your selected modules and permissions; this guide does not
                    activate a live-only plan.
                  </p>
                </div>
              )}
              <div className="onboarding-summary-actions">
                <button type="button" onClick={copySummary}>
                  Copy setup summary
                </button>
                <button type="button" onClick={downloadSummary}>
                  Download summary
                </button>
                <button type="button" onClick={() => navigate(0)}>
                  Change path
                </button>
              </div>
              <p className="onboarding-notice" role="status">
                {notice}
              </p>
              <div className="onboarding-existing">
                <strong>Already have an institute account?</strong>
                <p>
                  Keep using that account.{" "}
                  <a href={SIGNIN_URL}>Sign in to your dashboard ↗</a>
                </p>
              </div>
            </>
          )}
          <details className="onboarding-student">
            <summary>Joining as a student or an invited teacher?</summary>
            <p>
              Use the class or invitation link your institute sent you. You do
              not need to create another institute. If you do not have a link,
              ask your institute administrator.
            </p>
          </details>
        </main>
      </div>
      <footer className="onboarding-footer">
        <span>Edveo · Built around your teaching.</span>
        <span>
          Need help? <a href={`mailto:${CONTACT_EMAIL}`}>Contact our team</a>
        </span>
      </footer>
    </div>
  );
}
