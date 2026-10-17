export function ProductPaths() {
  return (
    <div className="path-panel" id="dashboard-panel">
      <div className="path-copy">
        <span className="path-label">FOR INSTITUTE TEAMS</span>
        <h3>
          Your live teaching day.
          <br />
          All in one place.
        </h3>
        <p>
          A focused workspace for scheduling classes, organising teacher access,
          and following up on attendance and recordings.
        </p>
        <ul className="check-list">
          <li>A home for upcoming and past classes</li>
          <li>Clear teacher and student roles</li>
          <li>A connected class-to-replay workflow</li>
        </ul>
        <a className="text-link" href="/get-started/">
          Set up your teaching workspace <span>↗</span>
        </a>
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
  );
}
