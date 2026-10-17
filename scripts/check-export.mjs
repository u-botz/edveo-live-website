import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";

const html = await readFile(
  new URL("../out/index.html", import.meta.url),
  "utf8",
);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
assert.equal(ids.length, new Set(ids).size, "Duplicate HTML IDs");
for (const match of html.matchAll(/href="#([^"]+)"/g))
  assert.ok(ids.includes(match[1]), `Missing anchor ${match[1]}`);
for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]+)(?:\?[^"#]*)?"/g))
  await access(
    new URL("../out" + match[1].replaceAll("&amp;", "&"), import.meta.url),
  );
for (const match of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g))
  for (const id of match[1].split(" "))
    assert.ok(ids.includes(id), `Missing accessibility target ${id}`);
assert.ok(
  html.includes("not yet available"),
  "Integration availability disclosure is missing",
);
assert.ok(html.includes("/_next/"), "Next.js client assets are missing");
const onboarding = await readFile(
  new URL("../out/get-started/index.html", import.meta.url),
  "utf8",
);
assert.ok(
  html.includes("/get-started/"),
  "Homepage onboarding entry is missing",
);
assert.ok(
  onboarding.includes("How would you like to teach?"),
  "Onboarding route was not exported",
);
assert.ok(
  onboarding.includes("https://app.edveo.co/auth/login"),
  "Existing-user handoff is missing",
);
const onboardingIds = [...onboarding.matchAll(/\bid="([^"]+)"/g)].map(
  (match) => match[1],
);
assert.equal(
  onboardingIds.length,
  new Set(onboardingIds).size,
  "Duplicate onboarding HTML IDs",
);
for (const match of onboarding.matchAll(
  /(?:src|href)="(\/[^"#?]+)(?:\?[^"#]*)?"/g,
))
  await access(
    new URL("../out" + match[1].replaceAll("&amp;", "&"), import.meta.url),
  );
console.log(
  "Next.js export checks passed: assets, anchors, IDs, accessibility targets, and availability disclosure.",
);
