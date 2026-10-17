# Live onboarding

The website is a focused entrance to Edveo's existing dashboard and backend. `/get-started/` uses
Google only; there is no institute questionnaire, password form, local account store, or separate
dashboard. Integrations remain at `/integrations/`.

`NEXT_PUBLIC_LIVE_GOOGLE_AUTH_URL` is the public redirect endpoint, defaulting to
`https://api.edveo.co/api/auth/live/google/redirect`. No secret belongs in this variable.

On load, the page checks the adjacent `/status` endpoint using `credentials: omit`, no cache, and an
eight-second timeout. Until the backend is activated it shows a short availability message and keeps
sign-in disabled. Once the backend is active, no extra website deployment is needed to enable it.
Cancel/expired/error callbacks return a fixed, friendly error message. Unknown query text is not rendered.

Successful authentication sets the existing Edveo httpOnly cookie on the API and navigates to the
existing `app.edveo.co/admin/live-sessions/quick-start` route. New users get an existing Edveo online
workspace automatically; returning users reuse it. Existing institute sign-in and invitation links stay available.

Production hostname target: `live.edveo.co`. DNS/TLS and Google Console setup are separate activation
steps. Backend configuration and deployment details are in `backend/docs/LIVE_GOOGLE_ONBOARDING.md`
in the parent workspace. The website's published preview does not deploy or activate the Laravel API.

Checks:

```sh
node scripts/export.mjs
node scripts/check-export.mjs
node scripts/check-onboarding.mjs
```

Browser checks use the existing sibling frontend Playwright installation, a local static server on
`127.0.0.1:4191` (override via `ONBOARDING_PREVIEW_URL`), and fixtures for readiness and Google handoff.
They cover mobile layout, readiness failures, cancellation/expiry/unknown error recovery, browser back,
existing sign-in links, and absence of browser token storage. They do not perform a real Google login.
