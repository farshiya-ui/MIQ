import "./AboutMIQ.css";

function AboutMIQ({ onBack }) {
  return (
    <div className="about-page">

      <div className="about-glow about-glow-one"></div>
      <div className="about-glow about-glow-two"></div>

      <header className="about-header">
        <button className="about-back-button" onClick={onBack}>
          ← Back
        </button>

        <div className="about-logo">
          <span>M</span>
          <span>I</span>
          <span>Q</span>
        </div>
      </header>

      <main className="about-content">

        <div className="about-badge">
          ABOUT MIQ
        </div>

        <h1>
          Meet <span>MIQ</span>
        </h1>

        <p className="about-intro">
          Mock Interview Simulator & Question Bank
        </p>

        <p className="about-description">
          MIQ is an interactive interview preparation platform designed
          to help students improve their technical knowledge, interview
          skills, confidence, and problem-solving ability through
          structured practice.
        </p>

        <section className="about-cards">

          <div className="about-card">
            <div className="about-card-icon">🎯</div>
            <h2>Practice</h2>
            <p>
              Practice technical questions and mock interviews
              in a structured environment.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🧠</div>
            <h2>Learn</h2>
            <p>
              Explore important questions with answers and
              explanations across different technologies.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">📊</div>
            <h2>Improve</h2>
            <p>
              Track your performance, identify weak areas,
              and improve your preparation.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">🏆</div>
            <h2>Achieve</h2>
            <p>
              Complete learning levels, mock interviews and
              earn professional certificates.
            </p>
          </div>

        </section>

        <section className="about-mission">
          <div>
            <span>OUR MISSION</span>
            <h2>
              Prepare with confidence.
              <br />
              Perform with clarity.
            </h2>
          </div>

          <p>
            MIQ brings question practice, mock interviews,
            performance tracking and certification together
            in one platform.
          </p>
        </section>

      </main>

      <footer className="about-footer">
        <span>MIQ</span>
        <p>Test Your Ability. Master Your Interview.</p>
      </footer>

    </div>
  );
}

export default AboutMIQ;