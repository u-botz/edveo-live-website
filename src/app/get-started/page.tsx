import type { Metadata } from "next";
import { OnboardingWorkflow } from "@/components/onboarding-workflow";

export const metadata: Metadata = {
  title: "Get started with live teaching | Edveo",
  description:
    "Find the right setup for your institute, continue to Edveo signup, or prepare an integration request.",
};

export default function GetStartedPage() {
  return <OnboardingWorkflow />;
}
