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
    page.getByRole("heading", { name: "Your 1:1 classroom awaits." }),
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
    page.getByRole("heading", { name: "Your platform. A place for 1:1." }),
  ).toBeVisible();
  await page.getByLabel("Tutor or institute name").fill("Sample Institute");
  await page.getByLabel("Website or LMS").fill("Custom LMS");
  await expect(page.locator('select,input[type="checkbox"]')).toHaveCount(0);
  await page.getByRole("button", { name: /Prepare enquiry/ }).click();
  await expect(
    page.getByRole("heading", { name: "Your enquiry is ready to review." }),
  ).toBeVisible();
  const email = await page
    .getByRole("link", { name: /Open email request/ })
    .getAttribute("href");
  if (
    !email?.startsWith("mailto:sayanth@edveo.co?") ||
    !decodeURIComponent(email).includes("Custom LMS") ||
    !decodeURIComponent(email).includes("1 teacher + 1 student")
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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("One teacher.One student.Their pace.");
  await expect(page.locator('.student-strip .person-tile')).toHaveCount(2);
  await expect(page.locator('.more-students,input#students')).toHaveCount(0);
  await expect(page.locator('#participant-minutes')).toHaveText('2,400');
  await page.locator('#classes').fill('40');
  await expect(page.locator('#participant-minutes')).toHaveText('4,800');
  await page.locator('.usage-controls .recording-toggle').click();
  await expect(page.locator('#recording')).not.toBeChecked();
  await expect(page.locator('#recording-hours')).toHaveText('Not included');
  await page.getByRole('button', { name: /Plan around this usage/ }).click();
  await page.getByLabel('Your name or institute', { exact: true }).fill('Sample Tutor');
  await expect(page.getByLabel('1:1 lessons per month', { exact: true })).toHaveValue('40');
  await expect(page.locator('#setup-students')).toHaveCount(0);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Download my setup brief/ }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const brief = Buffer.concat(chunks).toString('utf8');
  if (!brief.includes('Lesson format: 1 teacher + 1 student') || !brief.includes('Participant-minutes per month: 4800') || !brief.includes('Recording hours per month: 0'))
    throw new Error('Downloaded 1:1 usage brief does not match the planner');
  await page.getByRole('button', { name: 'Close setup planner' }).click();
  await page.getByRole('button', { name: /Explore the classroom/ }).click();
  await expect(page.getByRole('heading', { name: 'A lesson for one learner.' })).toBeVisible();
  await page.getByLabel('Add a local demo message', { exact: true }).fill('Can we try that again?');
  await page.getByRole('button', { name: 'Add demo message', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('Can we try that again?');
  await page.getByRole('button', { name: 'Close classroom demo', exact: true }).click();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: 'qa/one-to-one-desktop.png', fullPage: true });
  await page.screenshot({ path: 'qa/one-to-one-hero.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: 'qa/one-to-one-mobile.png', fullPage: true });
  await page.screenshot({ path: 'qa/one-to-one-mobile-hero.png' });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth))
    throw new Error('1:1 homepage overflows on mobile');
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await expect(page.locator('#main-nav').getByRole('link', { name: '1:1 classroom', exact: true })).toBeVisible();
  await page.locator('#main-nav').getByRole('link', { name: '1:1 classroom', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
  if (errors.length || writes.length)
    throw new Error([...errors, ...writes].join("\n"));
  console.log(
    "Google onboarding checks passed: readiness gating, dedicated auth handoff, return navigation, cancellation/expiry/error recovery, no questionnaire, separate integration page, mobile layout, no API writes or browser token storage. Google itself is stubbed; no real account created.",
  );
} finally {
  await browser.close();
}
