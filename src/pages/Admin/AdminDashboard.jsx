import { useEffect, useState } from "react";
import "./AdminDashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("miqAdminToken");

      if (!token) {
        window.location.href =
          "/admin-login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem(
            "miqAdminToken"
          );

          localStorage.removeItem(
            "miqAdmin"
          );

          window.location.href =
            "/admin-login";

          return;
        }

        throw new Error(
          data.message ||
            "Unable to load admin dashboard."
        );
      }

      setDashboard(data);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while loading the dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "miqAdminToken"
    );

    localStorage.removeItem(
      "miqAdmin"
    );

    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-loading">
          <div className="admin-loading-logo">
            MIQ
          </div>

          <p>
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-error-card">
          <div className="admin-error-logo">
            MIQ
          </div>

          <h1>
            Unable to Load Dashboard
          </h1>

          <p>{error}</p>

          <button onClick={loadDashboard}>
            Try Again
          </button>

          <button
            className="admin-error-back"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back to MIQ
          </button>
        </div>
      </div>
    );
  }

  const statistics =
    dashboard?.statistics || {};

  const authentication =
    dashboard?.authentication || {};

  const recentParticipants =
    dashboard?.recentParticipants || [];

  const admin =
    dashboard?.admin ||
    JSON.parse(
      localStorage.getItem(
        "miqAdmin"
      ) || "{}"
    );

  return (
    <div className="admin-dashboard-page">

      {/* ================= HEADER ================= */}

      <header className="admin-dashboard-header">

        <div className="admin-header-left">

          <div className="admin-dashboard-logo">
            MIQ
          </div>

          <div>
            <p className="admin-header-label">
              ADMINISTRATOR
            </p>

            <h1>
              MIQ Admin Dashboard
            </h1>
          </div>

        </div>

        <div className="admin-header-right">

          <div className="admin-profile">

            <div className="admin-profile-icon">
              {admin?.username
                ? admin.username
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </div>

            <div>
              <span>Admin</span>

              <strong>
                {admin?.username ||
                  "Administrator"}
              </strong>
            </div>

          </div>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ================= MAIN CONTENT ================= */}

      <main className="admin-dashboard-content">

        {/* ================= WELCOME ================= */}

        <section className="admin-welcome-section">

          <div>
            <p className="admin-section-label">
              MIQ MANAGEMENT
            </p>

            <h2>
              Welcome to the Admin Panel
            </h2>

            <p>
              Monitor participants, authentication,
              learning activity and MIQ progress.
            </p>
          </div>

          <button
            className="admin-refresh-button"
            onClick={loadDashboard}
          >
            Refresh Data
          </button>

        </section>


        {/* ================= ADMIN NAVIGATION ================= */}

        <section className="admin-section-card">

          <div className="admin-card-heading">

            <div>
              <p className="admin-section-label">
                MANAGEMENT
              </p>

              <h3>
                Admin Management
              </h3>
            </div>

          </div>

          <div
            className="admin-navigation-buttons"
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >

            {/* PARTICIPANTS */}

            <button
              className="admin-nav-btn"
              onClick={() => {
                window.location.href =
                  "/admin-participants";
              }}
            >
              Participants
            </button>


            {/* QUIZ RESULTS */}

            <button
              className="admin-nav-btn"
              onClick={() => {
                window.location.href =
                  "/admin-quiz-results";
              }}
            >
              Quiz Results
            </button>


            {/* MOCK INTERVIEW RESULTS */}

            <button
              className="admin-nav-btn"
              onClick={() => {
                window.location.href =
                  "/admin-mock-interviews";
              }}
            >
              Mock Interview Results
            </button>

          </div>

        </section>


        {/* ================= STATISTICS ================= */}

        <section className="admin-statistics-grid">

          <div className="admin-stat-card">

            <span>
              Total Participants
            </span>

            <strong>
              {statistics.totalParticipants ?? 0}
            </strong>

            <small>
              Registered MIQ users
            </small>

          </div>


          <div className="admin-stat-card">

            <span>
              Active Participants
            </span>

            <strong>
              {statistics.activeParticipants ?? 0}
            </strong>

            <small>
              Currently active users
            </small>

          </div>


          <div className="admin-stat-card">

            <span>
              Quiz Attempts
            </span>

            <strong>
              {statistics.totalQuizAttempts ?? 0}
            </strong>

            <small>
              Recorded quiz attempts
            </small>

          </div>


          <div className="admin-stat-card">

            <span>
              Questions Attempted
            </span>

            <strong>
              {statistics.totalQuestionsAttempted ?? 0}
            </strong>

            <small>
              Learning questions attempted
            </small>

          </div>


          <div className="admin-stat-card">

            <span>
              Mock Interviews
            </span>

            <strong>
              {statistics.totalMockInterviews ?? 0}
            </strong>

            <small>
              Completed interviews
            </small>

          </div>


          <div className="admin-stat-card">

            <span>
              Certificates
            </span>

            <strong>
              {statistics.totalCertificates ?? 0}
            </strong>

            <small>
              Certificates earned
            </small>

          </div>


          <div className="admin-stat-card">

            <span>
              Completed Levels
            </span>

            <strong>
              {statistics.completedLevels ?? 0}
            </strong>

            <small>
              Learning levels completed
            </small>

          </div>

        </section>


        {/* ================= AUTHENTICATION ================= */}

        <section className="admin-section-card">

          <div className="admin-card-heading">

            <div>
              <p className="admin-section-label">
                AUTHENTICATION
              </p>

              <h3>
                Participant Login Methods
              </h3>
            </div>

          </div>


          <div className="authentication-grid">

            <div className="authentication-box">

              <div className="authentication-number">
                {authentication.emailParticipants ?? 0}
              </div>

              <div>

                <strong>
                  Email Accounts
                </strong>

                <p>
                  Participants using email and password
                  authentication.
                </p>

              </div>

            </div>


            <div className="authentication-box">

              <div className="authentication-number">
                {authentication.googleParticipants ?? 0}
              </div>

              <div>

                <strong>
                  Google Accounts
                </strong>

                <p>
                  Participants using Google authentication.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ================= RECENT PARTICIPANTS ================= */}

        <section className="admin-section-card">

          <div className="admin-card-heading">

            <div>

              <p className="admin-section-label">
                PARTICIPANTS
              </p>

              <h3>
                Recent Participants
              </h3>

            </div>

            <span className="participant-count">
              {recentParticipants.length} shown
            </span>

          </div>


          {recentParticipants.length === 0 ? (

            <div className="admin-empty-state">

              <div className="empty-state-logo">
                MIQ
              </div>

              <h4>
                No participants yet
              </h4>

              <p>
                Registered participants will appear here.
              </p>

            </div>

          ) : (

            <div className="participants-table-wrapper">

              <table className="participants-table">

                <thead>

                  <tr>

                    <th>
                      Participant
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      College
                    </th>

                    <th>
                      Branch
                    </th>

                    <th>
                      Year
                    </th>

                    <th>
                      Login Type
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {recentParticipants.map(
                    (participant) => (

                      <tr
                        key={
                          participant.id
                        }
                      >

                        <td>

                          <div className="participant-name">

                            <div className="participant-avatar">

                              {participant.username
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}

                            </div>

                            <strong>
                              {participant.username}
                            </strong>

                          </div>

                        </td>


                        <td>
                          {participant.email}
                        </td>


                        <td>
                          {participant.college ||
                            "—"}
                        </td>


                        <td>
                          {participant.branch ||
                            "—"}
                        </td>


                        <td>
                          {participant.year ||
                            "—"}
                        </td>


                        <td>

                          <span
                            className={
                              participant.authType ===
                              "google"
                                ? "auth-badge google"
                                : "auth-badge email"
                            }
                          >

                            {participant.authType ===
                            "google"
                              ? "Google"
                              : "Email"}

                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ================= ADMIN NOTICE ================= */}

        <section className="admin-information-card">

          <div className="admin-information-line"></div>

          <div>

            <p className="admin-section-label">
              ADMIN ACCESS
            </p>

            <h3>
              MIQ Administration
            </h3>

            <p>
              This dashboard displays participant
              information retrieved securely from the
              MIQ backend. Passwords and private
              authentication credentials are never displayed.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;