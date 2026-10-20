import type { ProductMode } from "../components/website-provider";

const modeNames: Record<ProductMode, string> = {
  dashboard: "Edveo teaching workspace",
  integration: "1:1 classroom integration",
  both: "Explore both paths",
};
export type SetupBrief = {
  institute: string;
  mode: ProductMode;
  concurrent: number;
  classes: number;
  retention: string;
  notes: string;
  recording: boolean;
};

export function buildSetupBrief(data: SetupBrief): string {
  return [
    "EDVEO LIVE — ONE-TO-ONE TEACHING BRIEF",
    "Created locally in the product website preview.",
    "",
    `Tutor or institute: ${data.institute.trim()}`,
    `Preferred path: ${modeNames[data.mode]}`,
    "Lesson format: 1 teacher + 1 student",
    `Simultaneous 1:1 lessons requested: ${data.concurrent}`,
    `1:1 lessons per month: ${data.classes}`,
    `Recording preference: ${data.recording ? "Include recordings" : "No recordings requested"}`,
    `Requested replay retention: ${data.retention}`,
    "",
    "ILLUSTRATIVE USAGE (one teacher + one student, 60-minute lessons)",
    `Participant-minutes per month: ${2 * data.classes * 60}`,
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
