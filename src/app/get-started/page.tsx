import type { Metadata } from "next";
import { OnboardingWorkflow } from "@/components/onboarding-workflow";

export const metadata: Metadata = {
  title: "Get started with live teaching | Edveo",
  description:
    "Create your Edveo account or sign in to your existing institute. A simple starting point for live teaching.",
};

export default function GetStartedPage() {
  return <OnboardingWorkflow />;
}
