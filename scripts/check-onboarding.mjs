import {
  chromium,
  expect,
} from "../../frontend/node_modules/@playwright/test/index.mjs";
import { mkdir } from "node:fs/promises";
const origin = process.env.ONBOARDING_PREVIEW_URL ?? "http://127.0.0.1:4190";
const browser = await chromium.launch({ headless: true });
await mkdir("qa", { recursive: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const errors = [];
  const writes = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (
      request.method() !== "GET" &&
      request.method() !== "HEAD" &&
      !new URL(request.url()).pathname.startsWith("/__nextjs_")
    )
      writes.push(request.url());
  });
  await page.goto(`${origin}/get-started/`, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await expect(
    page.getByRole("heading", { name: "How would you like to teach?" }),
  ).toBeVisible({ timeout: 60000 });
  await expect(page.locator(".onboarding-page")).toHaveAttribute(
    "data-ready",
    "true",
  );
  await expect(page.getByRole("link", { name: /Sign in/ })).toHaveAttribute(
    "href",
    "https://app.edveo.co/auth/login",
  );
  await page.screenshot({ path: "qa/onboarding-desktop.png", fullPage: true });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel(/Institute name/).fill("Bright Academy");
  await page.getByRole("checkbox", { name: "Group classes" }).uncheck();
  await page.getByRole("button", { name: "See my next steps" }).click();
  await expect(page.locator("#onboarding-type-error")).toHaveText(
    "Choose at least one type of teaching.",
  );
  await page.getByRole("checkbox", { name: "1:1 teaching" }).check();
  await page.getByRole("checkbox", { name: "Mentoring" }).check();
  await page.getByLabel("Typical students per class").selectOption("1 student");
  await page.getByRole("button", { name: "See my next steps" }).click();
  await expect(
    page.getByRole("heading", { name: "Your next stop: account setup." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Continue to Edveo signup" }),
  ).toHaveAttribute("href", "https://edveo.co/signup");
  await expect(page.getByText("Bright Academy", { exact: true })).toBeVisible();
  await page.screenshot({
    path: "qa/onboarding-dashboard-next.png",
    fullPage: true,
  });
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download summary" }).click();
  const file = await download;
  if (file.suggestedFilename() !== "edveo-teaching-setup.txt")
    throw new Error("Missing setup summary download");
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await expect(page.getByLabel(/Institute name/)).toHaveValue("Bright Academy");
  await expect(page.getByRole("checkbox", { name: "Mentoring" })).toBeChecked();
  await page.goto(`${origin}/get-started/?path=integration`);
  await expect(
    page.getByRole("radio", { name: /Connect our own platform/ }),
  ).toBeChecked();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: "qa/onboarding-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel(/Institute name/).fill("Sample Institute");
  await page.getByLabel(/Your platform/).fill("Custom LMS");
  await page.getByRole("button", { name: "See my next steps" }).click();
  await expect(
    page.getByRole("heading", { name: "Let’s plan your connection." }),
  ).toBeVisible();
  const email = await page
    .getByRole("link", { name: "Open email request" })
    .getAttribute("href");
  if (
    !email?.startsWith("mailto:sayanth@edveo.co?") ||
    !decodeURIComponent(email).includes("Custom LMS")
  )
    throw new Error(
      "Integration request did not include the visitor’s summary",
    );
  await expect(
    page.getByText("Integration planning · live-class API not yet public", {
      exact: true,
    }),
  ).toBeVisible();
  await page.screenshot({
    path: "qa/onboarding-integration-mobile.png",
    fullPage: true,
  });
  if (
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
  )
    throw new Error("Mobile page overflows horizontally");
  if (
    await page.evaluate(
      () =>
        Object.keys(localStorage).length || Object.keys(sessionStorage).length,
    )
  )
    throw new Error("Guide unexpectedly persisted personal input");
  await page.goto(`${origin}/`);
  await expect(page.locator(".header-cta")).toHaveAttribute(
    "href",
    "/get-started/",
  );
  if (errors.length) throw new Error(errors.join("\n"));
  if (writes.length)
    throw new Error(`Unexpected write request: ${writes.join(", ")}`);
  console.log(
    "Onboarding checks passed: both paths, validation, back/edit, real handoff URLs, summary download, mobile layout, no storage or API writes.",
  );
} finally {
  await browser.close();
}
