import type { Metadata } from "next";
import { OnboardingWorkflow } from "@/components/onboarding-workflow";

export const metadata: Metadata = {
  title: "Get started with 1:1 teaching | Edveo Live",
  description:
    "Continue with Google to open your one-to-one teaching workspace. One teacher, one student, and no institute setup questionnaire.",
};

export default function GetStartedPage() {
  return <OnboardingWorkflow />;
}
