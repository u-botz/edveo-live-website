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
    page.getByRole("heading", { name: "Your next class starts here." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Create your account" }),
  ).toHaveAttribute("href", "https://edveo.co/signup");
  await expect(
    page.getByRole("link", { name: /Sign in/ }).first(),
  ).toHaveAttribute("href", "https://app.edveo.co/auth/login");
  await expect(page.locator("form,input,select,[role=tablist]")).toHaveCount(0);
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
    "Simplified onboarding checks passed: one account CTA, no chooser or questionnaire, separate integration page, validation/edit, handoff URLs, mobile overflow, no API writes/storage.",
  );
} finally {
  await browser.close();
}
