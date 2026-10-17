"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT_EMAIL, SIGNIN_URL, LIVE_GOOGLE_AUTH_URL } from "@/lib/onboarding";

const errors: Record<string, string> = {
  cancelled: "Sign-in cancelled. You can try again whenever you’re ready.",
  session_expired: "Your sign-in expired. Please try again.",
  unverified_email: "Choose a Google account with a verified email address.",
  account_unavailable: "We couldn’t open your classroom. Please contact support.",
  unavailable: "Google sign-in isn’t available yet. Please try again later.",
  sign_in_failed: "We couldn’t sign you in. Please try again.",
};

export function OnboardingWorkflow() {
  const [message, setMessage] = useState("");
  const [leaving, setLeaving] = useState(false);
  const [availability, setAvailability] = useState<"checking" | "ready" | "unavailable">("checking");
  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) setMessage(Object.hasOwn(errors, error) ? errors[error] : errors.sign_in_failed);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    async function checkAvailability() {
      try {
        if (!LIVE_GOOGLE_AUTH_URL) throw new Error("Unavailable");
        const response = await fetch(new URL("status", LIVE_GOOGLE_AUTH_URL), {
          credentials: "omit", cache: "no-store", signal: controller.signal,
        });
        if (!response.ok) throw new Error("Unavailable");
        const result: unknown = await response.json();
        const available = typeof result === "object" && result !== null && "data" in result
          && typeof result.data === "object" && result.data !== null && "available" in result.data
          && result.data.available === true;
        setAvailability(available ? "ready" : "unavailable");
      } catch {
        setAvailability("unavailable");
      } finally {
        window.clearTimeout(timeout);
      }
    }
    void checkAvailability();
    const reset = () => setLeaving(false);
    window.addEventListener("pageshow", reset);
    return () => {
      controller.abort();
      window.clearTimeout(timeout);
      window.removeEventListener("pageshow", reset);
    };
  }, []);
  return (
    <div className="onboarding-page simple-access-page">
      <a className="skip-link" href="#onboarding-main">
        Skip to sign in
      </a>
      <header className="onboarding-header">
        <Link className="brand" href="/" aria-label="Edveo home">
          <span className="brand-mark" aria-hidden="true">
            e<span />
          </span>
          <span>edveo</span>
        </Link>
        <p>
          <Link href="/">Back to home ↗</Link>
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
          <h1 id="access-title">
            Your classroom awaits.
          </h1>
          <p className="simple-access-description">
            Sign in with Google and start your next class.
          </p>
          <button
            className="google-signin-button"
            disabled={availability !== "ready" || leaving}
            aria-describedby="google-signin-note"
            onClick={() => {
              if (availability !== "ready" || leaving) return;
              setLeaving(true);
              window.location.assign(LIVE_GOOGLE_AUTH_URL);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C44.4 38.02 46.98 31.86 46.98 24.55Z" />
              <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
            </svg>
            {leaving ? "Opening Google…" : "Continue with Google"}
          </button>
          <p id="google-signin-note" className="simple-access-methods" role="status">
            {availability === "unavailable"
              ? "Google sign-in is temporarily unavailable. Please try again later."
              : availability === "checking" ? "Checking sign-in availability…"
              : "New here? Your classroom is created automatically."}
          </p>
          {message && <p className="live-signin-error" role="alert">{message}</p>}
        </section>
        <p className="simple-access-existing">Using an institute account? <a href={SIGNIN_URL}>Institute sign in ↗</a></p>
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
