import type { ProductMode } from "../components/website-provider";

const modeNames: Record<ProductMode, string> = {
  dashboard: "Live-only dashboard",
  integration: "Existing-platform integration",
  both: "Explore both paths",
};
export type SetupBrief = {
  institute: string;
  mode: ProductMode;
  students: number;
  concurrent: number;
  classes: number;
  retention: string;
  notes: string;
  recording: boolean;
};

export function buildSetupBrief(data: SetupBrief): string {
  return [
    "EDVEO LIVE — INSTITUTE SETUP BRIEF",
    "Created locally in the product website preview.",
    "",
    `Institute: ${data.institute.trim()}`,
    `Preferred path: ${modeNames[data.mode]}`,
    `Students per class: ${data.students}`,
    `Simultaneous classes requested: ${data.concurrent}`,
    `Classes per month: ${data.classes}`,
    `Recording preference: ${data.recording ? "Include recordings" : "No recordings requested"}`,
    `Requested replay retention: ${data.retention}`,
    "",
    "ILLUSTRATIVE USAGE (one teacher, 60-minute classes, full attendance)",
    `Participant-minutes per month: ${(data.students + 1) * data.classes * 60}`,
    `Teaching hours per month: ${data.classes}`,
    `Recording hours per month: ${data.recording ? data.classes : 0}`,
    "",
    "NOTES",
    data.notes.trim() || "No additional notes.",
    "",
    "This brief has not been sent to Edveo or any other party.",
    "It does not create an account, confirm pricing, or reserve capacity.",
    "Pilot availability, external APIs, retention, and class limits require confirmation.",
  ].join("\n");
}
