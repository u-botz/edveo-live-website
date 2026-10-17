import { MarketingContent } from "@/components/marketing-content";
import { WebsiteProvider } from "@/components/website-provider";
import { ClassroomDemo } from "@/components/classroom-demo";
import { SetupPlanner } from "@/components/setup-planner";
import { InfoDialog } from "@/components/info-dialog";

export default function HomePage() {
  return (
    <WebsiteProvider>
      <MarketingContent />
      <ClassroomDemo />
      <SetupPlanner />
      <InfoDialog />
    </WebsiteProvider>
  );
}
