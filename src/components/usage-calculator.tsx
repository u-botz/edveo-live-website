"use client";

import { PlannerButton, useWebsite } from "./website-provider";

export function UsageCalculator() {
  const { usage, setUsage } = useWebsite();
  const minutes = 2 * usage.classes * 60;
  return (
    <div className="usage-card">
      <div className="usage-controls">
        <div className="one-to-one-usage">
          <span className="path-label">EVERY LESSON IS 1:1</span>
          <strong>1 teacher + 1 student</strong>
          <p>Two participants. One student’s learning.</p>
        </div>
        <label htmlFor="classes">
          1:1 lessons per month{" "}
          <output id="classes-value" htmlFor="classes">
            {usage.classes}
          </output>
        </label>
        <input
          id="classes"
          type="range"
          min={5}
          max={100}
          step={5}
          value={usage.classes}
          onChange={(event) =>
            setUsage({ ...usage, classes: Number(event.target.value) })
          }
        />
        <div className="range-ends">
          <span>5 lessons</span>
          <span>100 lessons</span>
        </div>
        <label className="recording-toggle">
          <input
            id="recording"
            type="checkbox"
            checked={usage.recording}
            onChange={(event) =>
              setUsage({ ...usage, recording: event.target.checked })
            }
          />
          <span className="toggle-track" /> Include class recordings
        </label>
      </div>
      <div className="usage-results" aria-live="polite" aria-atomic="true">
        <span className="path-label">YOUR ILLUSTRATIVE MONTH</span>
        <div className="usage-total">
          <strong id="participant-minutes">
            {minutes.toLocaleString("en-IN")}
          </strong>
          <span>participant-minutes</span>
        </div>
        <div className="usage-subtotal">
          <span>Teaching time</span>
          <strong id="teaching-hours">{usage.classes} hours</strong>
        </div>
        <div className="usage-subtotal">
          <span>Recording time</span>
          <strong id="recording-hours">
            {usage.recording ? `${usage.classes} hours` : "Not included"}
          </strong>
        </div>
        <p>
          A 60-minute lesson uses 120 participant-minutes: 60 for the teacher
          and 60 for the student. This estimates usage, not a price or room limit.
        </p>
        <PlannerButton className="button button-primary">
          Plan around this usage <span>↗</span>
        </PlannerButton>
      </div>
    </div>
  );
}
