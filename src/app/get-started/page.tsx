import type { Metadata } from "next";
import { OnboardingWorkflow } from "@/components/onboarding-workflow";

export const metadata: Metadata = {
  title: "Get started with live teaching | Edveo",
  description:
    "Continue with Google to create your classroom or return to live teaching. No institute setup form.",
};

export default function GetStartedPage() {
  return <OnboardingWorkflow />;
}
