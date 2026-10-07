import { useState, useRef } from "react";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import "./Home.css";

function Home({
  onLogoClick,
  onLogin,
  onSignup,
  onDashboard,
  onQuestionBank,
  onCertificates,
  onScoreboard,
  onMockInterview,
  onSettings,
  onLogout,
  user,
  isLoggedIn,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================================================
  // ADMIN LOGO CLICK DETECTION
  // =========================================================

  const logoClickCount = useRef(0);
  const logoClickTimer = useRef(null);

  const handleLogoClick = () => {
    logoClickCount.current += 1;

    if (logoClickTimer.current) {
      clearTimeout(logoClickTimer.current);
    }

    logoClickTimer.current = setTimeout(() => {
      logoClickCount.current = 0;
    }, 1200);

    if (logoClickCount.current === 3) {
      logoClickCount.current = 0;

      clearTimeout(logoClickTimer.current);

      window.history.pushState(
        {},
        document.title,
        "/admin-login"
      );

      window.location.reload();
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("miqToken");
    localStorage.removeItem("miqUser");
    localStorage.removeItem("miqLoggedIn");

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}

        onLogoClick={handleLogoClick}

        onLogin={onLogin}

        onSignup={onSignup}

        user={user}

        isLoggedIn={isLoggedIn}

        onLogout={handleLogout}
      />


      {/* ================= SIDEBAR ================= */}

      <Sidebar
        isOpen={sidebarOpen}

        onClose={() => {
          setSidebarOpen(false);
        }}

        onDashboard={() => {
          setSidebarOpen(false);
          onDashboard();
        }}

        onMockInterview={() => {
          setSidebarOpen(false);
          onMockInterview();
        }}

        onQuestionBank={() => {
          setSidebarOpen(false);
          onQuestionBank();
        }}

        onCertificates={() => {
          setSidebarOpen(false);
          onCertificates();
        }}

        onScoreboard={() => {
          setSidebarOpen(false);
          onScoreboard();
        }}

        onSettings={() => {
          setSidebarOpen(false);
          onSettings();
        }}

        onInviteFriends={() => {
          setSidebarOpen(false);
          console.log("Invite Friends");
        }}

        onLogout={() => {
          setSidebarOpen(false);
          handleLogout();
        }}
      />


      {/* ================= MAIN ================= */}

      <main className="home-main">

        {/* ================= HERO ================= */}

        <section className="home-hero">

          <div className="home-hero-badge">
            SMART INTERVIEW PREPARATION
          </div>

          <h1>
            Prepare.
            <span> Practice.</span>
            <br />
            Perform.
          </h1>

          <p>
            Build your technical knowledge, practice mock interviews,
            improve your confidence, and track your interview journey
            with MIQ.
          </p>

          <div className="home-hero-buttons">

            <button
              className="home-primary-button"
              onClick={onQuestionBank}
            >
              Start Practicing
              <span>→</span>
            </button>

            <button
              className="home-secondary-button"
              onClick={onQuestionBank}
            >
              Explore Question Bank
            </button>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="home-features">

          <div className="home-section-heading">

            <span>
              WHAT MIQ OFFERS
            </span>

            <h2>
              Everything you need to
              <span> prepare better.</span>
            </h2>

          </div>


          <div className="home-feature-grid">

            {/* MOCK INTERVIEW */}

            <div className="home-feature-card">

              <div className="home-feature-number">
                01
              </div>

              <div className="home-feature-icon">
                🎤
              </div>

              <h3>
                Mock Interview
              </h3>

              <p>
                Experience realistic interview sessions
                with challenging questions.
              </p>

              <button
                onClick={onMockInterview}
              >
                Explore →
              </button>

            </div>


            {/* QUESTION BANK */}

            <div className="home-feature-card">

              <div className="home-feature-number">
                02
              </div>

              <div className="home-feature-icon">
                🧠
              </div>

              <h3>
                Question Bank
              </h3>

              <p>
                Learn from carefully selected technical
                questions with answers and explanations.
              </p>

              <button
                onClick={onQuestionBank}
              >
                Explore →
              </button>

            </div>


            {/* TRACK PROGRESS */}

            <div className="home-feature-card">

              <div className="home-feature-number">
                03
              </div>

              <div className="home-feature-icon">
                📊
              </div>

              <h3>
                Track Progress
              </h3>

              <p>
                Monitor your scores, attempts, completed
                levels, and interview performance.
              </p>

              <button
                onClick={onDashboard}
              >
                View Progress →
              </button>

            </div>


            {/* CERTIFICATES */}

            <div className="home-feature-card">

              <div className="home-feature-number">
                04
              </div>

              <div className="home-feature-icon">
                🏆
              </div>

              <h3>
                Earn Certificates
              </h3>

              <p>
                Complete your learning journey and earn
                professional MIQ certificates.
              </p>

              <button
                onClick={onCertificates}
              >
                View Certificates →
              </button>

            </div>

          </div>

        </section>


        {/* ================= QUOTE ================= */}

        <section className="home-quote">

          <div className="home-quote-line"></div>

          <p>
            "Your preparation today creates your confidence tomorrow."
          </p>

          <span>
            — MIQ
          </span>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="home-footer">

        <div>

          <strong>
            MIQ
          </strong>

          <span>
            Mock Interview Simulator & Question Bank
          </span>

        </div>

        <p>
          Test Your Ability. Master Your Interview.
        </p>

      </footer>

    </div>
  );
}

export default Home;