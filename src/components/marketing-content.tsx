import { SiteHeader } from "./site-header";
import { IntegrationExample } from "./integration-example";
import { ProductPaths } from "./product-paths";
import { UsageCalculator } from "./usage-calculator";
import { CopyrightYear, DemoButton, InfoButton } from "./website-provider";

export function MarketingContent() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot"></span> ONLINE CLASSROOMS FOR 1:1 TEACHING
            </div>
            <h1>
              One teacher.
              <br />
              One student.
              <br />
              <span className="serif-word">Their pace.</span>
            </h1>
            <p className="hero-description">
              A dedicated online classroom for private tutors and institutes
              offering one-to-one lessons. Schedule each student’s session,
              explain at their pace, and keep the lesson connected.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="/get-started/">
                Start teaching 1:1 <span aria-hidden="true">↗</span>
              </a>
              <DemoButton className="text-link">
                Explore the classroom <span aria-hidden="true">→</span>
              </DemoButton>
            </div>
            <div className="hero-footnote">
              <span className="small-check">✓</span> One teacher + one student{" "}
              <span className="footnote-divider">/</span> Built on Edveo
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Illustrative 1:1 classroom with one teacher and one student, not an active class"
          >
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="floating-note note-top">
              <span className="note-icon">✦</span>
              <span>
                Their pace. Their questions.
                <br />
                <strong>Your undivided attention.</strong>
              </span>
            </div>
            <div className="classroom-window">
              <div className="window-top">
                <div className="window-dots">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <span>
                  edveo live <span className="window-separator">/</span>{" "}
                  Mathematics
                </span>
                <span className="demo-tag">DEMO</span>
              </div>
              <div className="classroom-title">
                <div>
                  <span className="class-live">
                    <span className="live-dot"></span> 1:1 LESSON PREVIEW
                  </span>
                  <h2>Ananya &amp; Sara · Mathematics</h2>
                </div>
                <span className="class-time">10:24</span>
              </div>
              <div className="classroom-main">
                <div className="whiteboard">
                  <div className="board-toolbar">
                    <span className="tool-active">↖</span>
                    <span>✎</span>
                    <span>T</span>
                    <span>□</span>
                    <span>○</span>
                    <span className="tool-color"></span>
                  </div>
                  <div className="board-content">
                    <span className="board-label">TODAY, LET’S FIGURE OUT</span>
                    <h3>The shape of a quadratic.</h3>
                    <div className="math-equation">y = x² − 4</div>
                    <svg
                      className="graph"
                      viewBox="0 0 350 180"
                      role="img"
                      aria-label="Parabola y equals x squared minus four, crossing the x-axis at minus two and two"
                    >
                      <defs>
                        <pattern
                          id="grid"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M20 0H0V20"
                            fill="none"
                            stroke="#e9e9e3"
                            strokeWidth="1"
                          ></path>
                        </pattern>
                      </defs>
                      <rect width="350" height="180" fill="url(#grid)"></rect>
                      <path
                        d="M25 83H330M175 12V168"
                        stroke="#a5aaa1"
                        strokeWidth="1.3"
                      ></path>
                      <path
                        d="M96 12Q175 256 254 12"
                        fill="none"
                        stroke="#e56840"
                        strokeWidth="3.5"
                      ></path>
                      <circle
                        cx="130.6"
                        cy="83"
                        r="4.5"
                        fill="#e56840"
                      ></circle>
                      <circle
                        cx="219.4"
                        cy="83"
                        r="4.5"
                        fill="#e56840"
                      ></circle>
                      <text x="113" y="104">
                        −2
                      </text>
                      <text x="219" y="104">
                        2
                      </text>
                      <text x="183" y="159">
                        −4
                      </text>
                      <text x="322" y="76">
                        x
                      </text>
                      <text x="185" y="21">
                        y
                      </text>
                    </svg>
                    <div className="board-note">
                      Where does the curve meet the x-axis? <span>↗</span>
                    </div>
                  </div>
                </div>
                <aside className="student-strip" aria-label="One teacher and one student">
                  <div className="person-tile teacher-tile">
                    <div className="avatar-art teacher-avatar">AM</div>
                    <span>Ananya · Teacher</span>
                    <i className="audio-bars">▂▆▃</i>
                  </div>
                  <div className="person-tile student-two">
                    <div className="avatar-art">SJ</div>
                    <span>Sara · Student</span>
                    <i>⌁</i>
                  </div>
                  <div className="lesson-pair-note">
                    <strong>1 teacher</strong>
                    <span>+</span>
                    <strong>1 student</strong>
                  </div>
                </aside>
              </div>
              <div className="classroom-controls">
                <div className="control-group">
                  <span>♩</span>
                  <span>▣</span>
                  <span>↥</span>
                  <span className="selected-control">✎</span>
                </div>
                <span className="classroom-safe">
                  A lesson at Sara’s pace.
                </span>
                <DemoButton className="try-room">
                  Try it <span aria-hidden="true">↗</span>
                </DemoButton>
              </div>
            </div>
            <div className="floating-note note-bottom">
              <span className="attendance-icon">✓</span>
              <span>
                <strong>Every lesson starts with one learner.</strong>
                <br />
                Make space for their next breakthrough.
              </span>
              <span className="little-spark">✧</span>
            </div>
          </div>
        </section>
        <div className="benefit-ribbon">
          <span>Built around one learner</span>
          <div>
            <span>↗ Private tutoring</span>
            <span>▦ Individual academic support</span>
            <span>⌘ Personal mentoring</span>
          </div>
        </div>

        <section className="section-wrap journey-section" id="classroom">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PERSONAL ATTENTION. ROOM TO UNDERSTAND.</p>
              <h2>
                Help one student
                <br />
                find their way forward.
              </h2>
            </div>
            <p>
              Slow down where they need help. Go deeper where they’re curious.
              Give every explanation, question, and worked example the attention
              it deserves.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card board-card">
              <div className="card-topline">
                <span className="feature-number">01 / THINK TOGETHER</span>
                <span className="feature-symbol">✎</span>
              </div>
              <h3>
                Work through it.
                <br />Together.
              </h3>
              <p>
                Work through a problem with your student on the whiteboard.
                Share your screen and explain each step at their pace.
              </p>
              <div className="mini-board" aria-hidden="true">
                <span className="sticky-note">
                  What if we
                  <br />
                  tried it
                  <br />
                  this way? ✦
                </span>
                <svg viewBox="0 0 250 100">
                  <path
                    d="M15 75Q60 15 105 70T195 30"
                    fill="none"
                    stroke="#71917b"
                    strokeWidth="3"
                  ></path>
                  <path
                    d="m185 30 12-4-2 13"
                    fill="none"
                    stroke="#71917b"
                    strokeWidth="3"
                  ></path>
                  <text x="30" y="30">
                    a little curiosity →
                  </text>
                </svg>
                <span className="drawing-cursor">↖ Ananya</span>
              </div>
            </article>
            <article className="feature-card conversation-card">
              <div className="card-topline">
                <span className="feature-number">02 / FOLLOW THEIR THINKING</span>
                <span className="feature-symbol">☏</span>
              </div>
              <h3>
                Their questions.
                <br />
                Your full attention.
              </h3>
              <p>
                Keep the conversation between teacher and student. Use lesson
                chat to share a question, a link, or the next example.
              </p>
              <div className="chat-preview">
                <div>
                  <span className="chat-avatar">S</span>
                  <p>
                    Could we try another example?
                    <small>Sara · Demo student</small>
                  </p>
                </div>
                <div>
                  <span className="chat-avatar teacher-chat">A</span>
                  <p>
                    Absolutely. Let’s work through it.
                    <small>Ananya · Demo teacher</small>
                  </p>
                </div>
                <span className="hand-note">
                  ✋ A question is always welcome.
                </span>
              </div>
            </article>
            <article className="feature-card replay-card">
              <div className="card-topline">
                <span className="feature-number">03 / KEEP LEARNING</span>
                <span className="feature-symbol">↻</span>
              </div>
              <h3>
                The lesson ends.
                <br />
                Learning carries on.
              </h3>
              <p>
                Review the student’s attendance and revisit available lesson
                recordings, ready for your next session together.
              </p>
              <div className="replay-preview">
                <div className="replay-thumb">
                  <span className="play-symbol">▶</span>
                  <span>Quadratics, made simple</span>
                </div>
                <div className="replay-details">
                  <span>Illustrative recording</span>
                  <strong>
                    Ready for another look <span>↗</span>
                  </strong>
                </div>
              </div>
            </article>
          </div>
          <p className="caption">
            Product concept preview. Feature availability and recording limits
            will be confirmed for the pilot.
          </p>
        </section>

        <section className="ways-section" id="your-way">
          <div className="section-wrap">
            <div className="center-heading">
              <p className="eyebrow">FOR TUTORS AND 1:1 TEACHING TEAMS</p>
              <h2>
                Every student.
                <br />
                <span className="serif-word">Their own lesson.</span>
              </h2>
              <p>
                Teach independently or coordinate a team of tutors. Each session
                brings one teacher and one student together.
              </p>
            </div>
            <ProductPaths />
          </div>
        </section>

        <section className="section-wrap workflow-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FROM “SEE YOU IN CLASS” TO “GOT IT.”</p>
              <h2>
                One connected
                <br />
                1:1 teaching journey.
              </h2>
            </div>
            <p>
              The classroom is the centre.
              <br />
              Everything around it should make teaching easier.
            </p>
          </div>
          <ol className="workflow">
            <li>
              <span>01</span>
              <h3>Schedule</h3>
              <p>Choose one teacher, one student, and a lesson time.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Join</h3>
              <p>Bring the teacher and student into their lesson.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Teach</h3>
              <p>Explain, share, and practise at the student’s pace.</p>
            </li>
            <li>
              <span>04</span>
              <h3>Follow through</h3>
              <p>Review attendance and revisit available recordings.</p>
            </li>
          </ol>
        </section>

        <section className="integration-section" id="integrations">
          <div className="section-wrap integration-inner">
            <div className="integration-copy">
              <p className="eyebrow">FOR THE PEOPLE BUILDING THE CONNECTION</p>
              <h2>
                Your platform.
                <br />
                Your 1:1 classroom.
                <br />
                <span className="serif-word">A thoughtful handoff.</span>
              </h2>
              <p>
                Already run a tutoring platform? Discuss a planned integration
                for individual lessons: schedule a teacher and student, launch
                their classroom, and receive lesson updates in your system.
              </p>
              <div className="integration-points">
                <span>
                  <i>01</i> Create the class
                </span>
                <span>
                  <i>02</i> Launch with the right role
                </span>
                <span>
                  <i>03</i> Receive class updates
                </span>
              </div>
              <a className="button button-light" href="/integrations/">
                Plan an integration <span>↗</span>
              </a>
              <p className="integration-status">
                Integration pilot planned. Public live-class endpoints and
                webhooks are not yet available.
              </p>
            </div>
            <div className="code-window">
              <div className="code-header">
                <span>
                  <i></i> The shape of an integration
                </span>
                <span>CONCEPT</span>
              </div>
              <div className="code-tabs">
                <span className="code-tab-active">Create</span>
                <span>Launch</span>
                <span>Follow up</span>
              </div>
              <IntegrationExample />
              <div className="code-footer">
                <span className="live-dot"></span> Keep institute credentials on
                your server.
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap pricing-section" id="pricing">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A SETUP THAT FITS YOUR TIMETABLE</p>
              <h2>
                Start with how you teach.
                <br />
                Build the right plan.
              </h2>
            </div>
            <p>
              Every lesson has one teacher and one student. Estimate your
              monthly teaching hours, then discuss room and recording needs
              for your tutoring business.
            </p>
          </div>
          <UsageCalculator />
          <div className="pricing-footnotes">
            <span>↗ Pilot pricing to be confirmed</span>
            <span>↗ Concurrent rooms scoped separately</span>
            <span>↗ Recording retention agreed per setup</span>
          </div>
        </section>

        <section className="faq-section section-wrap">
          <div className="faq-intro">
            <p className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</p>
            <h2>
              Good questions.
              <br />
              Clear answers.
            </h2>
            <p>Let’s make the next step a little easier.</p>
          </div>
          <div className="faqs">
            <details open>
              <summary>
                Who is Edveo Live for?<span>+</span>
              </summary>
              <p>
                Private tutors, online tutoring businesses, and institutes
                delivering one-to-one lessons. Each lesson is designed around
                one teacher and one student, including individual mentoring
                and academic support.
              </p>
            </details>
            <details>
              <summary>
                Can we try a classroom here?<span>+</span>
              </summary>
              <p>
                Yes. The interactive demo lets you draw on a sample whiteboard
                and explore example classroom chat. It runs locally in your
                browser and does not create a real class, connect participants,
                or access your camera.
              </p>
              <DemoButton className="text-link">
                Open the classroom demo ↗
              </DemoButton>
            </details>
            <details>
              <summary>
                Is this for group classes or webinars?<span>+</span>
              </summary>
              <p>
                This offering is focused on 1:1 lessons: one teacher and one
                student in each classroom. A tutoring team can run several
                individual lessons at the same time, within its plan’s room
                and usage limits.
              </p>
            </details>
            <details>
              <summary>
                Can our tutoring platform connect to it?<span>+</span>
              </summary>
              <p>
                Visit Integrations to discuss the planned 1:1 classroom API.
                Secure teacher and student entry, identity mapping, and lesson
                updates will need pilot validation. Public integration endpoints
                are not yet available.
              </p>
            </details>
            <details>
              <summary>
                Are recordings and attendance included?<span>+</span>
              </summary>
              <p>
                Attendance and available lesson recordings help you follow up
                with each student. Recording access, capacity, and retention
                depend on your plan and will be confirmed for the pilot.
              </p>
            </details>
            <details>
              <summary>
                Is this service accepting signups?<span>+</span>
              </summary>
              <p>
                Get started uses Google sign-in with no institute questionnaire.
                When registration is available, your teaching workspace is
                created automatically. Returning users open the same workspace.
                Session access and limits depend on your plan.
              </p>
            </details>
          </div>
        </section>

        <section className="closing-section">
          <div className="section-wrap closing-inner">
            <div className="closing-spark" aria-hidden="true">
              ✳
            </div>
            <p className="eyebrow">ONE LEARNER. YOUR FULL ATTENTION.</p>
            <h2>
              Make your next lesson
              <br />
              <span className="serif-word">a personal one.</span>
            </h2>
            <p>
              For the tutor teaching one student at a time.
              <br />
              And the institute doing it across a whole team.
            </p>
            <a className="button button-primary" href="/get-started/">
              Start teaching 1:1 <span>↗</span>
            </a>
            <span className="closing-note">
              Continue with Google. No setup questionnaire.
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer section-wrap">
        <div>
          <a className="brand" href="#">
            <span className="brand-mark" aria-hidden="true">
              e<span></span>
            </span>
            <span>
              edveo<span className="brand-live">live</span>
            </span>
          </a>
          <p>
            One teacher. One student.
            <br />A place to learn together.
          </p>
        </div>
        <div className="footer-links">
          <a href="#classroom">The 1:1 classroom</a>
          <a href="#your-way">For tutors &amp; institutes</a>
          <a href="/integrations/">Integrations for developers</a>
          <a href="#pricing">Usage planner</a>
          <InfoButton kind="privacy">Privacy in this preview</InfoButton>
          <InfoButton kind="about">About this preview</InfoButton>
        </div>
        <div className="footer-bottom">
          <span>
            © <CopyrightYear /> Edveo Live · Product preview
          </span>
          <span>Built for one-to-one teaching.</span>
        </div>
      </footer>
    </>
  );
}
