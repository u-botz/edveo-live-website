import { SiteHeader } from "./site-header";
import { IntegrationExample } from "./integration-example";
import { ProductPaths } from "./product-paths";
import { UsageCalculator } from "./usage-calculator";
import {
  CopyrightYear,
  DemoButton,
  InfoButton,
  PlannerButton,
} from "./website-provider";

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
              <span className="live-dot"></span> A NEW SPACE FOR LIVE LEARNING
            </div>
            <h1>
              Great teaching.
              <br />
              Now, <span className="serif-word">live.</span>
              <svg
                className="underline"
                viewBox="0 0 205 19"
                aria-hidden="true"
              >
                <path d="M3 13Q92-5 201 8M25 17Q102 5 179 13"></path>
              </svg>
            </h1>
            <p className="hero-description">
              Bring your teachers, students, and ideas together. A focused
              classroom for your institute, with a dashboard of its own—or a
              place in your platform.
            </p>
            <div className="hero-actions">
              <DemoButton className="button button-primary">
                Explore the classroom <span aria-hidden="true">↗</span>
              </DemoButton>
              <a className="text-link" href="#your-way">
                Find your way to teach <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span className="small-check">✓</span> Teaching tools, together{" "}
              <span className="footnote-divider">/</span> Built on Edveo
            </div>
          </div>
          <div
            className="hero-visual"
            aria-label="Illustrative Edveo Live classroom, not an active class"
          >
            <div className="orb orb-one"></div>
            <div className="orb orb-two"></div>
            <div className="floating-note note-top">
              <span className="note-icon">✦</span>
              <span>
                A little more interaction.
                <br />
                <strong>A lot more possibility.</strong>
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
                    <span className="live-dot"></span> CLASSROOM PREVIEW
                  </span>
                  <h2>Every question is a new beginning.</h2>
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
                <aside className="student-strip">
                  <div className="person-tile teacher-tile">
                    <div className="avatar-art teacher-avatar">AM</div>
                    <span>Ananya · Teacher</span>
                    <i className="audio-bars">▂▆▃</i>
                  </div>
                  <div className="person-tile student-one">
                    <div className="avatar-art">RK</div>
                    <span>Rohan</span>
                    <i>⌁</i>
                  </div>
                  <div className="person-tile student-two">
                    <div className="avatar-art">SJ</div>
                    <span>Sara</span>
                    <i>⌁</i>
                  </div>
                  <div className="more-students">
                    <span className="mini-avatar">A</span>
                    <span className="mini-avatar">N</span>
                    <span>+ demo learners</span>
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
                  A space to think out loud.
                </span>
                <DemoButton className="try-room">
                  Try it <span aria-hidden="true">↗</span>
                </DemoButton>
              </div>
            </div>
            <div className="floating-note note-bottom">
              <span className="attendance-icon">✓</span>
              <span>
                <strong>Present. Participating. Learning.</strong>
                <br />
                Keep the class journey connected.
              </span>
              <span className="little-spark">✧</span>
            </div>
          </div>
        </section>
        <div className="benefit-ribbon">
          <span>Made for the way you teach</span>
          <div>
            <span>↗ Interactive classrooms</span>
            <span>▦ A focused workspace</span>
            <span>⌘ Your platform, connected</span>
          </div>
        </div>

        <section className="section-wrap journey-section" id="classroom">
          <div className="section-heading">
            <div>
              <p className="eyebrow">LESS SWITCHING. MORE TEACHING.</p>
              <h2>
                A good class is more
                <br />
                than a video call.
              </h2>
            </div>
            <p>
              Make room for the explanation, the raised hand, and the moment it
              clicks. Bring the class journey together, from the first invite to
              the next revision.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card board-card">
              <div className="card-topline">
                <span className="feature-number">01 / THINK TOGETHER</span>
                <span className="feature-symbol">✎</span>
              </div>
              <h3>
                Ideas deserve
                <br />a bigger canvas.
              </h3>
              <p>
                Explain on a whiteboard, share your screen, and bring learning
                materials into the conversation.
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
                <span className="feature-number">02 / HEAR EVERY VOICE</span>
                <span className="feature-symbol">☏</span>
              </div>
              <h3>
                Make participation
                <br />
                part of the lesson.
              </h3>
              <p>
                Keep questions close with classroom chat, hand raises, and
                teacher controls.
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
                Bring attendance and recording access into the class workflow,
                so follow-up has a place.
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
              <p className="eyebrow">ONE CLASSROOM. TWO WAYS IN.</p>
              <h2>
                Your institute.
                <br />
                <span className="serif-word">Your way to teach.</span>
              </h2>
              <p>
                Starting fresh or building on what you have?
                <br />
                Choose the path that fits your team.
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
                teaching journey.
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
              <p>Give each class a teacher, time, and audience.</p>
            </li>
            <li>
              <span>02</span>
              <h3>Join</h3>
              <p>Help the right people get into the right room.</p>
            </li>
            <li>
              <span>03</span>
              <h3>Teach</h3>
              <p>Explain, share, question, and work things out.</p>
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
                Our classroom.
                <br />
                <span className="serif-word">A thoughtful handoff.</span>
              </h2>
              <p>
                A planned external API built around the teaching lifecycle.
                Create a class, request access for an authorised participant,
                and bring class records back to your system.
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
              <PlannerButton className="button button-light" mode="integration">
                Plan an integration <span>↗</span>
              </PlannerButton>
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
              Class size, simultaneous rooms, and recording needs shape your
              setup. Explore your usage before discussing pilot pricing.
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
                Do we need to move our institute to Edveo?<span>+</span>
              </summary>
              <p>
                The product is being designed with two paths: a live-only
                dashboard, or classrooms connected to your existing platform.
                The integration path is planned for a pilot, so you can evaluate
                it against your current workflow.
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
                How many classes can run at once?<span>+</span>
              </summary>
              <p>
                Concurrency will be scoped and validated for the pilot.
                Simultaneous teaching rooms and simultaneous recordings require
                separate capacity checks. This preview does not promise a
                participant limit or unlimited rooms.
              </p>
            </details>
            <details>
              <summary>
                Will our students need a second login?<span>+</span>
              </summary>
              <p>
                The integration goal is an authorised launch from your platform
                without a separate classroom login. External identity mapping
                and secure launch access still need implementation and pilot
                validation.
              </p>
            </details>
            <details>
              <summary>
                Are recordings and attendance included?<span>+</span>
              </summary>
              <p>
                Existing Edveo code provides a foundation for recording and
                attendance workflows. Availability, recording capacity, replay
                access, and retention will be confirmed for each pilot setup.
              </p>
            </details>
            <details>
              <summary>
                Is this service accepting signups?<span>+</span>
              </summary>
              <p>
                This is a product website preview. The setup planner creates a
                downloadable brief on your device; it does not register an
                account or submit an enquiry. Live-only onboarding and public
                integration access are not connected here.
              </p>
            </details>
          </div>
        </section>

        <section className="closing-section">
          <div className="section-wrap closing-inner">
            <div className="closing-spark" aria-hidden="true">
              ✳
            </div>
            <p className="eyebrow">MAKE SPACE FOR THE NEXT GREAT LESSON</p>
            <h2>
              Your next classroom
              <br />
              starts with <span className="serif-word">a conversation.</span>
            </h2>
            <p>
              Map out your teaching needs. Find your path.
              <br />
              Give your institute a focused place to go live.
            </p>
            <PlannerButton className="button button-primary">
              Plan your Edveo Live setup <span>↗</span>
            </PlannerButton>
            <span className="closing-note">
              A local planning brief. No signup required.
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
            A little more connected.
            <br />A lot more room to teach.
          </p>
        </div>
        <div className="footer-links">
          <a href="#classroom">The classroom</a>
          <a href="#your-way">For institutes</a>
          <a href="#integrations">Integration plan</a>
          <a href="#pricing">Usage planner</a>
          <InfoButton kind="privacy">Privacy in this preview</InfoButton>
          <InfoButton kind="about">About this preview</InfoButton>
        </div>
        <div className="footer-bottom">
          <span>
            © <CopyrightYear /> Edveo Live · Product preview
          </span>
          <span>Thoughtfully built for teaching.</span>
        </div>
      </footer>
    </>
  );
}
