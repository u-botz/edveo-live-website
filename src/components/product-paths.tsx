export function ProductPaths() {
  return (
    <div className="path-panel" id="dashboard-panel">
      <div className="path-copy">
        <span className="path-label">FOR PRIVATE TUTORS AND TUTORING INSTITUTES</span>
        <h3>
          A day of 1:1 lessons.
          <br />
          All in one place.
        </h3>
        <p>
          Keep each student’s lesson on the timetable. Coordinate your tutors,
          schedule individual teaching or mentoring sessions, and follow up on
          attendance and available recordings.
        </p>
        <ul className="check-list">
          <li>One teacher and one student in each lesson</li>
          <li>Individual schedules across your teaching team</li>
          <li>Attendance and available replays for each student</li>
        </ul>
        <a className="text-link" href="/get-started/">
          Open your 1:1 teaching workspace <span>↗</span>
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
              <small>YOUR 1:1 TEACHING WORKSPACE</small>
              <h4>Every student has their time.</h4>
            </div>
            <span className="dashboard-user">AK</span>
          </div>
          <div className="dashboard-stats">
            <div>
              <span>1:1 lessons today</span>
              <strong>03</strong>
            </div>
            <div>
              <span>Demo tutors</span>
              <strong>03</strong>
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
              <small>Ananya → Sara · 1:1 teaching</small>
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
              <small>Kabir → Rohan · 1:1 teaching</small>
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
              <small>Meera → Aisha · 1:1 mentoring</small>
            </div>
            <span className="status-chip">Upcoming</span>
          </div>
          <div className="demo-caption">
            1:1 TIMETABLE PREVIEW · SAMPLE DATA
          </div>
        </div>
      </div>
    </div>
  );
}
