import "./Scoreboard.css";

function Scoreboard({ onBack }) {
  return (
    <main className="scoreboard-page">

      <section className="scoreboard-hero">

        <span className="scoreboard-label">
          MIQ PERFORMANCE
        </span>

        <h1>
          Scoreboard
        </h1>

        <p>
          Track your quiz scores, completed levels,
          and mock interview performance in one place.
        </p>

      </section>

      <section className="scoreboard-grid">

        <div className="scoreboard-card">
          <span>QUIZ ATTEMPTS</span>
          <strong>0</strong>
          <p>Total quizzes attempted</p>
        </div>

        <div className="scoreboard-card">
          <span>BEST SCORE</span>
          <strong>0%</strong>
          <p>Your highest quiz score</p>
        </div>

        <div className="scoreboard-card">
          <span>LEVELS COMPLETED</span>
          <strong>0</strong>
          <p>Learning levels completed</p>
        </div>

        <div className="scoreboard-card">
          <span>INTERVIEWS</span>
          <strong>0</strong>
          <p>Mock interviews completed</p>
        </div>

      </section>

      <section className="scoreboard-empty">

        <div className="scoreboard-icon">
          📊
        </div>

        <h2>
          Your performance will appear here
        </h2>

        <p>
          Complete quizzes and mock interviews to build
          your MIQ performance history.
        </p>

      </section>

      <button
        className="scoreboard-back-button"
        onClick={onBack}
      >
        ← Back to MIQ
      </button>

    </main>
  );
}

export default Scoreboard;