import type { Metadata } from "next";
import { IntegrationEnquiry } from "@/components/integration-enquiry";
export const metadata: Metadata = {
  title: "Platform integrations | Edveo",
  description:
    "Discuss adding live classrooms to your website or LMS. Integration pilot planning and enquiries.",
};
export default function IntegrationsPage() {
  return <IntegrationEnquiry />;
}
