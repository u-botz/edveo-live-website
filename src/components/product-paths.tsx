"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { PlannerButton } from "./website-provider";

export function ProductPaths() {
  const [path, setPath] = useState<"dashboard" | "platform">("dashboard");
  const dashboardTab = useRef<HTMLButtonElement>(null);
  const platformTab = useRef<HTMLButtonElement>(null);
  function navigate(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home"
        ? "dashboard"
        : event.key === "End"
          ? "platform"
          : path === "dashboard"
            ? "platform"
            : "dashboard";
    setPath(next);
    (next === "dashboard" ? dashboardTab : platformTab).current?.focus();
  }
  return (
    <>
      <div
        className="path-tabs"
        role="tablist"
        aria-label="Choose a product path"
      >
        <button
          ref={dashboardTab}
          id="dashboard-tab"
          role="tab"
          aria-selected={path === "dashboard"}
          aria-controls="dashboard-panel"
          tabIndex={path === "dashboard" ? 0 : -1}
          onKeyDown={navigate}
          onClick={() => setPath("dashboard")}
        >
          ▦ Use our dashboard
        </button>
        <button
          ref={platformTab}
          id="platform-tab"
          role="tab"
          aria-selected={path === "platform"}
          aria-controls="platform-panel"
          tabIndex={path === "platform" ? 0 : -1}
          onKeyDown={navigate}
          onClick={() => setPath("platform")}
        >
          ⌘ Connect your platform
        </button>
      </div>
      <div
        className="path-panel"
        id="dashboard-panel"
        hidden={path !== "dashboard"}
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      >
        <div className="path-copy">
          <span className="path-label">FOR INSTITUTE TEAMS</span>
          <h3>
            Your live teaching day.
            <br />
            All in one place.
          </h3>
          <p>
            A focused workspace for scheduling classes, organising teacher
            access, and following up on attendance and recordings.
          </p>
          <ul className="check-list">
            <li>A home for upcoming and past classes</li>
            <li>Clear teacher and student roles</li>
            <li>A connected class-to-replay workflow</li>
          </ul>
          <PlannerButton className="text-link" mode="dashboard">
            Plan your dashboard setup <span>↗</span>
          </PlannerButton>
        </div>
        <div className="dashboard-preview">
          <div className="dashboard-sidebar">
            <span className="tiny-brand">e.</span>
            <span className="sidebar-active">▦</span>
            <span>▤</span>
            <span>♧</span>
            <span>◷</span>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-greeting">
              <div>
                <small>YOUR TEACHING WORKSPACE</small>
                <h4>A good day to inspire.</h4>
              </div>
              <span className="dashboard-user">AK</span>
            </div>
            <div className="dashboard-stats">
              <div>
                <span>Upcoming classes</span>
                <strong>03</strong>
              </div>
              <div>
                <span>Demo teachers</span>
                <strong>04</strong>
              </div>
              <div>
                <span>Recording preview</span>
                <strong>02</strong>
              </div>
            </div>
            <div className="schedule-head">
              <h5>On the timetable</h5>
              <span>Illustrative day</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">
                09:00
                <br />
                <small>60 min</small>
              </span>
              <span className="schedule-line peach-line"></span>
              <div>
                <strong>Mathematics · Quadratics</strong>
                <small>Ananya Mehta · Foundation batch</small>
              </div>
              <span className="status-chip">Upcoming</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">
                11:00
                <br />
                <small>45 min</small>
              </span>
              <span className="schedule-line green-line"></span>
              <div>
                <strong>Physics · Motion &amp; forces</strong>
                <small>Kabir Shah · Revision group</small>
              </div>
              <span className="status-chip">Upcoming</span>
            </div>
            <div className="schedule-row">
              <span className="schedule-time">
                14:00
                <br />
                <small>60 min</small>
              </span>
              <span className="schedule-line purple-line"></span>
              <div>
                <strong>English · The art of expression</strong>
                <small>Meera Rao · Language lab</small>
              </div>
              <span className="status-chip">Upcoming</span>
            </div>
            <div className="demo-caption">
              LIVE-ONLY DASHBOARD CONCEPT · SAMPLE DATA
            </div>
          </div>
        </div>
      </div>
      <div
        className="path-panel"
        id="platform-panel"
        hidden={path !== "platform"}
        role="tabpanel"
        aria-labelledby="platform-tab"
      >
        <div className="path-copy">
          <span className="path-label">FOR TEAMS WITH A PLATFORM</span>
          <h3>
            Keep your platform.
            <br />
            Add a place to teach.
          </h3>
          <p>
            The planned integration lets your server schedule classes and
            request secure launch access, while your team keeps its existing
            student experience.
          </p>
          <ul className="check-list">
            <li>Scoped credentials for your server</li>
            <li>Role-aware classroom launch</li>
            <li>Attendance and recording events</li>
          </ul>
          <a className="text-link" href="#integrations">
            Explore the integration plan <span>↗</span>
          </a>
          <span className="availability-note">
            Live-class API: planned for integration pilot.
          </span>
        </div>
        <div className="integration-map">
          <div className="map-node">
            <span className="map-icon">▦</span>
            <strong>Your website or LMS</strong>
            <small>Your students. Your experience.</small>
          </div>
          <div className="map-connection">
            <span>Secure server connection</span>
            <i></i>
          </div>
          <div className="map-node map-edveo">
            <span className="tiny-brand">e.</span>
            <strong>Edveo Live classroom</strong>
            <small>Teaching, interaction, and class records.</small>
          </div>
          <div className="map-return">
            ↳ Attendance &amp; recording updates ↵
          </div>
        </div>
      </div>
    </>
  );
}
