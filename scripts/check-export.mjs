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
console.log(
  "Next.js export checks passed: assets, anchors, IDs, accessibility targets, and availability disclosure.",
);
