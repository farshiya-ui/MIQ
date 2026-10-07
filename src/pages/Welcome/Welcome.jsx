import "./Welcome.css";

function Welcome({ onEnter }) {
  return (
    <div className="welcome-page">
      <div className="welcome-orb orb-one"></div>
      <div className="welcome-orb orb-two"></div>
      <div className="welcome-orb orb-three"></div>

      <div className="welcome-grid"></div>

      <main className="welcome-content">
        <div className="welcome-logo">
          <span className="logo-m">M</span>
          <span className="logo-i">I</span>
          <span className="logo-q">Q</span>
        </div>

        <p className="welcome-small-title">
          MOCK INTERVIEW SIMULATOR
        </p>

        <h1>
          Welcome to <span>MIQ</span>
        </h1>

        <div className="welcome-line"></div>

        <h2>
          Test Your Ability.
          <br />
          <span>Master Your Interview.</span>
        </h2>

        <p className="welcome-description">
          Practice smarter, challenge yourself, improve your skills,
          and build confidence for your next interview.
        </p>

        <button className="enter-miq-button" onClick={onEnter}>
          <span>Enter MIQ</span>
          <span className="button-arrow">→</span>
        </button>

        <p className="welcome-footer">
          Learn • Practice • Perform
        </p>
      </main>

      <div className="welcome-corner top-left"></div>
      <div className="welcome-corner bottom-right"></div>
    </div>
  );
}

export default Welcome;