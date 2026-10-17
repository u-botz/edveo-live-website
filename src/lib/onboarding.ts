export type OnboardingPath = "dashboard" | "integration";
export type TeachingType = "group" | "one-to-one" | "mentoring";
export type OnboardingSetup = {
  path: OnboardingPath;
  institute: string;
  teaching: TeachingType[];
  students: string;
  platform: string;
};
// Public redirect endpoint, never a client secret. Status is checked without cookies before enabling.
export const LIVE_GOOGLE_AUTH_URL = process.env.NEXT_PUBLIC_LIVE_GOOGLE_AUTH_URL ?? "https://api.edveo.co/api/auth/live/google/redirect";
export const SIGNIN_URL = "https://app.edveo.co/auth/login";
export const CONTACT_EMAIL = "sayanth@edveo.co";
export const teachingLabels: Record<TeachingType, string> = {
  group: "Group classes",
  "one-to-one": "1:1 teaching",
  mentoring: "Mentoring",
};
export function setupSummary(setup: OnboardingSetup): string {
  return [
    "EDVEO — LIVE TEACHING SETUP",
    "",
    `Path: ${setup.path === "dashboard" ? "Use the Edveo dashboard" : "Connect an existing platform"}`,
    `Institute: ${setup.institute.trim() || "Not provided"}`,
    `Teaching: ${setup.teaching.map((type) => teachingLabels[type]).join(", ")}`,
    `Students per class: ${setup.students}`,
    ...(setup.path === "integration"
      ? [`Platform: ${setup.platform.trim() || "To be discussed"}`]
      : []),
    "",
    "Next: discuss live-class integration availability and pilot requirements with the team.",
    "This summary has not been submitted. No account, class, booking or API credential has been created.",
    "Access, capacity, recording retention and prices require confirmation.",
  ].join("\n");
}
export function integrationEmail(setup: OnboardingSetup): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Live classroom integration enquiry")}&body=${encodeURIComponent(setupSummary(setup))}`;
}
