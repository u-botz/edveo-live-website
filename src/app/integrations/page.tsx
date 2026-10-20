import type { Metadata } from "next";
import { IntegrationEnquiry } from "@/components/integration-enquiry";
export const metadata: Metadata = {
  title: "1:1 classroom integrations | Edveo Live",
  description:
    "Discuss adding one-to-one classrooms to your tutoring website or LMS. Integration pilot planning for one teacher and one student per lesson.",
};
export default function IntegrationsPage() {
  return <IntegrationEnquiry />;
}
