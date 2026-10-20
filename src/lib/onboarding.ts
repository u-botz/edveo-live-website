export type OnboardingPath = "dashboard" | "integration";
export type OnboardingSetup = {
  path: OnboardingPath;
  institute: string;
  platform: string;
};
// Public redirect endpoint, never a client secret. Status is checked without cookies before enabling.
export const LIVE_GOOGLE_AUTH_URL = process.env.NEXT_PUBLIC_LIVE_GOOGLE_AUTH_URL ?? "https://api.edveo.co/api/auth/live/google/redirect";
export const SIGNIN_URL = "https://app.edveo.co/auth/login";
export const CONTACT_EMAIL = "sayanth@edveo.co";
export function setupSummary(setup: OnboardingSetup): string {
  return [
    "EDVEO — ONE-TO-ONE CLASSROOM INTEGRATION",
    "",
    `Path: ${setup.path === "dashboard" ? "Use the Edveo dashboard" : "Connect an existing platform"}`,
    `Institute: ${setup.institute.trim() || "Not provided"}`,
    "Lesson format: 1:1 teaching and personal mentoring",
    "Participants per lesson: 1 teacher + 1 student",
    ...(setup.path === "integration"
      ? [`Platform: ${setup.platform.trim() || "To be discussed"}`]
      : []),
    "",
    "Next: discuss 1:1 classroom integration availability and pilot requirements with the team.",
    "This summary has not been submitted. No account, class, booking or API credential has been created.",
    "Access, capacity, recording retention and prices require confirmation.",
  ].join("\n");
}
export function integrationEmail(setup: OnboardingSetup): string {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("1:1 classroom integration enquiry")}&body=${encodeURIComponent(setupSummary(setup))}`;
}
