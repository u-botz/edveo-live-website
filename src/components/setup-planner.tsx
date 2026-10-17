"use client";

import { useRef, useState, type FormEvent } from "react";
import { Dialog } from "./dialog";
import { useWebsite, type ProductMode } from "./website-provider";
import { buildSetupBrief } from "@/lib/setup-brief";

export function SetupPlanner() {
  const { modal, setModal, usage, mode } = useWebsite();
  const [result, setResult] = useState("");
  const pendingDownload = useRef<string | null>(null);
  function close() {
    setModal(null);
    setResult("");
  }
  function download(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const fields = new FormData(form);
    const institute = String(fields.get("institute")).trim();
    if (!institute) {
      const input = form.elements.namedItem("institute") as HTMLInputElement;
      input.setCustomValidity("Enter an institute name.");
      input.reportValidity();
      return;
    }
    const text = buildSetupBrief({
      institute,
      mode: String(fields.get("mode")) as ProductMode,
      students: Number(fields.get("students")),
      concurrent: Number(fields.get("concurrent")),
      classes: Number(fields.get("classes")),
      retention: String(fields.get("retention")),
      notes: String(fields.get("notes")),
      recording: fields.get("recording") === "on",
    });
    if (pendingDownload.current) URL.revokeObjectURL(pendingDownload.current);
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    pendingDownload.current = url;
    const link = document.createElement("a");
    link.href = url;
    link.download = "edveo-live-setup-brief.txt";
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
      if (pendingDownload.current === url) pendingDownload.current = null;
    }, 5000);
    setResult(
      "Your brief is ready. Your browser has been asked to download it; nothing was submitted.",
    );
  }
  return (
    <Dialog
      open={modal === "planner"}
      onClose={close}
      id="setup-planner"
      className="planner-dialog"
      title="Let’s map it out."
      eyebrow="YOUR INSTITUTE, YOUR SETUP"
      closeLabel="Close setup planner"
      intro="Create a brief to discuss with your team. Nothing is submitted or sent; the download stays on your device."
    >
      <form
        id="planner-form"
        key={`${mode}-${usage.students}-${usage.classes}-${usage.recording}`}
        onSubmit={download}
      >
        <div className="form-grid">
          <label className="form-wide" htmlFor="institute">
            Institute name
            <input
              id="institute"
              name="institute"
              maxLength={120}
              required
              placeholder="Your institute or academy"
              autoComplete="organization"
              onInput={(event) => event.currentTarget.setCustomValidity("")}
            />
          </label>
          <label className="form-wide" htmlFor="setup-mode">
            How would you like to use Edveo Live?
            <select id="setup-mode" name="mode" defaultValue={mode}>
              <option value="dashboard">Use the live-only dashboard</option>
              <option value="integration">Connect our existing platform</option>
              <option value="both">Explore both options</option>
            </select>
          </label>
          <label htmlFor="setup-students">
            Students per class
            <input
              id="setup-students"
              name="students"
              type="number"
              min={1}
              max={100000}
              defaultValue={usage.students}
              required
            />
          </label>
          <label htmlFor="setup-concurrent">
            Simultaneous classes
            <input
              id="setup-concurrent"
              name="concurrent"
              type="number"
              min={1}
              max={10000}
              defaultValue={2}
              required
            />
          </label>
          <label htmlFor="setup-classes">
            Classes per month
            <input
              id="setup-classes"
              name="classes"
              type="number"
              min={1}
              max={100000}
              defaultValue={usage.classes}
              required
            />
          </label>
          <label htmlFor="setup-retention">
            Replay retention
            <select
              id="setup-retention"
              name="retention"
              defaultValue="To be discussed"
            >
              {[
                "To be discussed",
                "7 days",
                "30 days",
                "90 days",
                "Custom requirement",
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="recording-toggle form-wide">
            <input
              name="recording"
              type="checkbox"
              defaultChecked={usage.recording}
            />
            <span className="toggle-track" /> Include class recordings
          </label>
          <label className="form-wide" htmlFor="setup-notes">
            What matters most?
            <textarea
              id="setup-notes"
              name="notes"
              rows={3}
              maxLength={1500}
              placeholder="Your teaching workflow, integration needs, or questions…"
            />
          </label>
        </div>
        <button className="button button-primary planner-submit" type="submit">
          Download my setup brief <span>↓</span>
        </button>
        <p id="planner-result" role="status">
          {result}
        </p>
        <p className="form-note">
          Planning only. This does not reserve capacity, confirm pricing, or
          create an account.
        </p>
      </form>
    </Dialog>
  );
}
