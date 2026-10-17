import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const next = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const result = spawnSync(process.execPath, [next, "build"], {
  env: { ...process.env, EDVEO_STATIC_EXPORT: "1" },
  stdio: "inherit",
});
process.exit(result.status ?? 1);
