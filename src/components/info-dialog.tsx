"use client";

import { Dialog } from "./dialog";
import { useWebsite } from "./website-provider";

const information = {
  privacy: {
    title: "Privacy in this preview",
    paragraphs: [
      "The classroom demo, setup planner and onboarding guide run in your browser. This site does not submit those inputs, save them in browser storage, or request access to your microphone or camera. Following the signup link takes you to Edveo’s separate account service. Opening an integration email request prepares a draft in your email app; you decide whether to send it.",
      "Choosing Download creates a text file on your device. Refreshing the page clears the demo data. The page loads fonts from Google Fonts; your browser contacts that provider when loading them. The hosting service may process access logs and authentication independently of this page.",
      "This preview notice is not a privacy policy for the future live-classroom service. Its data handling, retention, and terms must be established before customer onboarding.",
    ],
  },
  about: {
    title: "A preview of Edveo Live",
    paragraphs: [
      "Edveo Live is a proposed focused live-teaching product for institutes, with a live-only dashboard and a planned integration path for existing learning platforms.",
      "People, classes, attendance and recording examples are illustrative. Get started provides a setup guide and links to existing Edveo signup and sign-in. It does not create an account, activate a live-only plan, issue API credentials or book a demo. The external live-class API is still planned.",
      "The product builds on existing Edveo classroom code. Pilot capabilities, capacity, availability, branding, pricing, and support arrangements remain to be confirmed.",
    ],
  },
};

export function InfoDialog() {
  const { modal, setModal } = useWebsite();
  const content = information[modal === "privacy" ? "privacy" : "about"];
  return (
    <Dialog
      open={modal === "privacy" || modal === "about"}
      onClose={() => setModal(null)}
      id="info-dialog"
      className="info-dialog"
      title={content.title}
      closeLabel="Close information"
    >
      <div id="info-content">
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Dialog>
  );
}
