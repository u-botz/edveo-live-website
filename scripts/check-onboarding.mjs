import {
  chromium,
  expect,
} from "../../frontend/node_modules/@playwright/test/index.mjs";
import { mkdir } from "node:fs/promises";
const origin = process.env.ONBOARDING_PREVIEW_URL ?? "http://127.0.0.1:4191";
const browser = await chromium.launch({ headless: true });
await mkdir("qa", { recursive: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  const writes = [];
  let available = false;
  const authUrl = process.env.NEXT_PUBLIC_LIVE_GOOGLE_AUTH_URL ?? "https://api.edveo.co/api/auth/live/google/redirect";
  const statusUrl = new URL("status", authUrl).href;
  const availabilityRequests = [];
  await page.route(statusUrl, async (route) => {
    availabilityRequests.push(route.request());
    await route.fulfill({
      status: 200, contentType: "application/json",
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ data: { available } }),
    });
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (
      !["GET", "HEAD"].includes(request.method()) &&
      !new URL(request.url()).pathname.startsWith("/__nextjs_")
    )
      writes.push(request.url());
  });
  await page.goto(`${origin}/get-started/`, {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await expect(
    page.getByRole("heading", { name: "Your classroom awaits." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Continue with Google" }),
  ).toBeDisabled();
  await expect(page.getByRole("status")).toHaveText("Google sign-in is temporarily unavailable. Please try again later.");
  available = true;
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Continue with Google" })).toBeEnabled();
  await expect(
    page.getByRole("link", { name: /Institute sign in/ }),
  ).toHaveAttribute("href", "https://app.edveo.co/auth/login");
  await expect(page.locator("form,input,select,[role=tablist]")).toHaveCount(0);
  await expect(page.locator('a[href="https://edveo.co/signup"]')).toHaveCount(0);
  await expect(page.getByText("Set up your institute", { exact: true })).toHaveCount(0);
  await expect(
    page.getByText("Connect our own platform", { exact: true }),
  ).toHaveCount(0);
  await expect(page.getByText("Choose your path", { exact: true })).toHaveCount(
    0,
  );
  await page.screenshot({
    path: "qa/onboarding-simple-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({
    path: "qa/onboarding-simple-mobile.png",
    fullPage: true,
  });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Account entry overflows on mobile");
  await page.route(authUrl, (route) => route.fulfill({
    status: 200, contentType: "text/html", body: "<h1>Authentication handoff verified</h1>",
  }));
  await page.getByRole("button", { name: "Continue with Google" }).click();
  await expect(page).toHaveURL(authUrl);
  await expect(page.getByRole("heading", { name: "Authentication handoff verified" })).toBeVisible();
  await page.goBack({ waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Continue with Google" })).toBeEnabled();
  for (const [code, message] of [
    ["cancelled", "Sign-in cancelled."],
    ["session_expired", "Your sign-in expired."],
    ["unverified_email", "verified email address"],
    ["__proto__", "We couldn’t sign you in."],
  ]) {
    await page.goto(`${origin}/get-started/?error=${code}`, { waitUntil: "networkidle" });
    await expect(page.locator(".live-signin-error[role=alert]")).toContainText(message);
    await expect(page.getByRole("button", { name: "Continue with Google" })).toBeEnabled();
  }
  await page.unroute(statusUrl);
  await page.route(statusUrl, (route) => route.fulfill({ status: 404, body: "Not deployed" }));
  await page.goto(`${origin}/get-started/`, { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Continue with Google" })).toBeDisabled();
  await expect(page.getByRole("status")).toContainText("temporarily unavailable");
  if (availabilityRequests.some((request) => request.headers().cookie))
    throw new Error("Availability check unexpectedly sent a cookie");
  await page.goto(`${origin}/integrations/`, { waitUntil: "networkidle" });
  await expect(
    page.getByRole("heading", { name: "Your platform. A place to teach." }),
  ).toBeVisible();
  await page.getByLabel("Institute name").fill("Sample Institute");
  await page.getByLabel("Website or LMS").fill("Custom LMS");
  await page.getByRole("checkbox", { name: "Group classes" }).uncheck();
  await page.getByRole("button", { name: /Prepare enquiry/ }).click();
  await expect(page.locator("#integration-type-error")).toHaveText(
    "Select at least one session type.",
  );
  await page.getByRole("checkbox", { name: "1:1 teaching" }).check();
  await page.getByRole("button", { name: /Prepare enquiry/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your enquiry is ready to review." }),
  ).toBeVisible();
  const email = await page
    .getByRole("link", { name: /Open email request/ })
    .getAttribute("href");
  if (
    !email?.startsWith("mailto:sayanth@edveo.co?") ||
    !decodeURIComponent(email).includes("Custom LMS")
  )
    throw new Error("Enquiry draft is incomplete");
  await page.getByRole("button", { name: /Edit enquiry/ }).click();
  await expect(page.getByLabel("Website or LMS")).toHaveValue("Custom LMS");
  await page.screenshot({ path: "qa/integrations-mobile.png", fullPage: true });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Integration form overflows on mobile");
  if (
    await page.evaluate(
      () =>
        Object.keys(localStorage).length || Object.keys(sessionStorage).length,
    )
  )
    throw new Error("Unexpected browser storage");
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/`);
  await expect(
    page
      .locator("#main-nav")
      .getByRole("link", { name: "Integrations", exact: true }),
  ).toHaveAttribute("href", "/integrations/");
  await expect(
    page.getByRole("tablist", { name: "Choose a product path" }),
  ).toHaveCount(0);
  await expect(page.locator(".header-cta")).toHaveAttribute(
    "href",
    "/get-started/",
  );
  if (errors.length || writes.length)
    throw new Error([...errors, ...writes].join("\n"));
  console.log(
    "Google onboarding checks passed: readiness gating, dedicated auth handoff, return navigation, cancellation/expiry/error recovery, no questionnaire, separate integration page, mobile layout, no API writes or browser token storage. Google itself is stubbed; no real account created.",
  );
} finally {
  await browser.close();
}
