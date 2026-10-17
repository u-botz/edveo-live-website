"use client";

import { PlannerButton, useWebsite } from "./website-provider";

export function UsageCalculator() {
  const { usage, setUsage } = useWebsite();
  const minutes = (usage.students + 1) * usage.classes * 60;
  return (
    <div className="usage-card">
      <div className="usage-controls">
        <label htmlFor="students">
          Students per class{" "}
          <output id="students-value" htmlFor="students">
            {usage.students}
          </output>
        </label>
        <input
          id="students"
          type="range"
          min={1}
          max={100}
          value={usage.students}
          onChange={(event) =>
            setUsage({ ...usage, students: Number(event.target.value) })
          }
        />
        <div className="range-ends">
          <span>1 student</span>
          <span>100 students</span>
        </div>
        <label htmlFor="classes">
          Classes per month{" "}
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
          <span>5 classes</span>
          <span>100 classes</span>
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
          Assumes one teacher, full attendance, and 60-minute classes. This
          estimates usage, not price or supported capacity.
        </p>
        <PlannerButton className="button button-primary">
          Plan around this usage <span>↗</span>
        </PlannerButton>
      </div>
    </div>
  );
}
