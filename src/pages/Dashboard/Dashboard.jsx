import { useEffect, useState } from "react";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard({ onBack }) {
  const [profile, setProfile] = useState(null);

  const [summary, setSummary] = useState({
    questionsAttempted: 0,
    quizzesCompleted: 0,
    mockInterviews: 0,
    certificates: 0,
    completedLevels: 0,
    levelProgress: {},
  });

  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);

  // =====================================================
  // MIQ LANGUAGES
  // =====================================================

  const miqLanguages = [
    "C",
    "C++",
    "Java",
    "Python",
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Data Structures",
    "SQL",
  ];

  // =====================================================
  // LOAD PROFILE + ACTIVITY
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("miqToken");

    if (!token) {
      setLoading(false);
      setActivityLoading(false);
      return;
    }

    // ===================================================
    // LOAD PROFILE
    // ===================================================

    fetch(`${API_URL}/api/profile/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile."
          );
        }

        return data;
      })
      .then((data) => {
        setProfile(data.user);
      })
      .catch((error) => {
        console.error(
          "Dashboard profile loading error:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });

    // ===================================================
    // LOAD ACTIVITY SUMMARY
    // ===================================================

    fetch(`${API_URL}/api/activity/summary`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load activity summary."
          );
        }

        return data;
      })
      .then((data) => {
        setSummary(
          data.summary || {
            questionsAttempted: 0,
            quizzesCompleted: 0,
            mockInterviews: 0,
            certificates: 0,
            completedLevels: 0,
            levelProgress: {},
          }
        );
      })
      .catch((error) => {
        console.error(
          "Dashboard activity loading error:",
          error
        );
      })
      .finally(() => {
        setActivityLoading(false);
      });
  }, []);

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const username =
    profile?.username || "MIQ User";

  const email =
    profile?.email || "Not available";

  const college =
    profile?.profile?.collegeName ||
    "Not added yet";

  const branch =
    profile?.profile?.branch ||
    "Not added yet";

  const year =
    profile?.profile?.year ||
    "Not added yet";

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const questionsAttempted =
    summary.questionsAttempted || 0;

  const quizzesCompleted =
    summary.quizzesCompleted || 0;

  const mockInterviews =
    summary.mockInterviews || 0;

  const certificates =
    summary.certificates || 0;

  const completedLevels =
    summary.completedLevels || 0;

  const levelProgress =
    summary.levelProgress || {};

  // =====================================================
  // OVERALL LEVEL PROGRESS
  // =====================================================

  const totalLevels =
    miqLanguages.length * 3;

  const overallProgress =
    Math.min(
      Math.round(
        (completedLevels / totalLevels) * 100
      ),
      100
    );

  // =====================================================
  // CREATE COMPLETE LANGUAGE LIST
  // =====================================================

  const languages = miqLanguages;

  return (
    <div className="dashboard-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="dashboard-header">

        <button
          className="dashboard-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="dashboard-title">

          <span>DASHBOARD</span>

          <h1>Your MIQ Journey</h1>

          <p>
            Track your learning, practice,
            and interview progress.
          </p>

        </div>

      </div>

      {/* =================================================
          PROFILE
      ================================================= */}

      <section
        style={{
          marginBottom: "30px",
          padding: "25px",
          borderRadius: "18px",
          background:
            "rgba(255, 255, 255, 0.035)",
          border:
            "1px solid rgba(120, 180, 255, 0.18)",
        }}
      >

        <div
          style={{
            marginBottom: "20px",
          }}
        >

          <span
            style={{
              fontSize: "12px",
              letterSpacing: "1.5px",
              fontWeight: "700",
              color: "#8fffd0",
            }}
          >
            MIQ PROFILE
          </span>

          <h2
            style={{
              margin: "8px 0 5px",
              color: "#ffffff",
            }}
          >
            {loading
              ? "Loading profile..."
              : `Welcome, ${username}`}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#9daec4",
            }}
          >
            Your personal MIQ learning space
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
          }}
        >

          {/* EMAIL */}

          <div
            style={{
              padding: "15px",
              borderRadius: "12px",
              background:
                "rgba(255, 255, 255, 0.025)",
            }}
          >

            <span
              style={{
                display: "block",
                fontSize: "11px",
                color: "#8fffd0",
                letterSpacing: "1px",
                marginBottom: "6px",
              }}
            >
              EMAIL
            </span>

            <strong
              style={{
                color: "#ffffff",
                wordBreak: "break-word",
              }}
            >
              {loading
                ? "Loading..."
                : email}
            </strong>

          </div>

          {/* COLLEGE */}

          <div
            style={{
              padding: "15px",
              borderRadius: "12px",
              background:
                "rgba(255, 255, 255, 0.025)",
            }}
          >

            <span
              style={{
                display: "block",
                fontSize: "11px",
                color: "#8fffd0",
                letterSpacing: "1px",
                marginBottom: "6px",
              }}
            >
              COLLEGE
            </span>

            <strong
              style={{
                color: "#ffffff",
              }}
            >
              {loading
                ? "Loading..."
                : college}
            </strong>

          </div>

          {/* BRANCH */}

          <div
            style={{
              padding: "15px",
              borderRadius: "12px",
              background:
                "rgba(255, 255, 255, 0.025)",
            }}
          >

            <span
              style={{
                display: "block",
                fontSize: "11px",
                color: "#8fffd0",
                letterSpacing: "1px",
                marginBottom: "6px",
              }}
            >
              BRANCH
            </span>

            <strong
              style={{
                color: "#ffffff",
              }}
            >
              {loading
                ? "Loading..."
                : branch}
            </strong>

          </div>

          {/* YEAR */}

          <div
            style={{
              padding: "15px",
              borderRadius: "12px",
              background:
                "rgba(255, 255, 255, 0.025)",
            }}
          >

            <span
              style={{
                display: "block",
                fontSize: "11px",
                color: "#8fffd0",
                letterSpacing: "1px",
                marginBottom: "6px",
              }}
            >
              YEAR
            </span>

            <strong
              style={{
                color: "#ffffff",
              }}
            >
              {loading
                ? "Loading..."
                : year}
            </strong>

          </div>

        </div>

      </section>

      {/* =================================================
          DASHBOARD STATS
      ================================================= */}

      <section className="dashboard-stats">

        <div className="dashboard-card">

          <span>
            QUESTIONS ATTEMPTED
          </span>

          <strong>
            {activityLoading
              ? "..."
              : questionsAttempted}
          </strong>

          <p>
            Questions you have attempted
          </p>

        </div>

        <div className="dashboard-card">

          <span>
            QUIZZES COMPLETED
          </span>

          <strong>
            {activityLoading
              ? "..."
              : quizzesCompleted}
          </strong>

          <p>
            Languages fully completed
          </p>

        </div>

        <div className="dashboard-card">

          <span>
            MOCK INTERVIEWS
          </span>

          <strong>
            {activityLoading
              ? "..."
              : mockInterviews}
          </strong>

          <p>
            Mock interviews completed
          </p>

        </div>

        <div className="dashboard-card">

          <span>
            CERTIFICATES
          </span>

          <strong>
            {activityLoading
              ? "..."
              : certificates}
          </strong>

          <p>
            Certificates earned
          </p>

        </div>

      </section>

      {/* =================================================
          OVERALL PROGRESS
      ================================================= */}

      <section className="dashboard-progress">

        <div className="dashboard-progress-header">

          <div>

            <span>
              OVERALL LEVEL PROGRESS
            </span>

            <h2>
              Keep moving forward
            </h2>

          </div>

          <div className="dashboard-progress-percent">

            {activityLoading
              ? "..."
              : `${overallProgress}%`}

          </div>

        </div>

        <div className="dashboard-progress-bar">

          <div
            style={{
              width: `${overallProgress}%`,
            }}
          ></div>

        </div>

        <p>

          {activityLoading
            ? "Loading your level progress..."
            : `${completedLevels} of ${totalLevels} levels completed.`}

        </p>

      </section>

      {/* =================================================
          LANGUAGE LEVEL PROGRESS
      ================================================= */}

      <section
        style={{
          marginTop: "30px",
        }}
      >

        <div
          style={{
            marginBottom: "18px",
          }}
        >

          <span
            style={{
              fontSize: "12px",
              letterSpacing: "1.5px",
              fontWeight: "700",
              color: "#8fffd0",
            }}
          >
            LEVEL PROGRESS
          </span>

          <h2
            style={{
              margin: "8px 0 5px",
              color: "#ffffff",
            }}
          >
            Your Learning Levels
          </h2>

          <p
            style={{
              margin: 0,
              color: "#9daec4",
            }}
          >
            Complete Beginner, Intermediate,
            and Advanced levels to earn a certificate.
          </p>

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >

          {languages.map(
            (language) => {

              const progress =
                levelProgress[language] || {};

              const beginner =
                Boolean(
                  progress.beginner
                );

              const intermediate =
                Boolean(
                  progress.intermediate
                );

              const advanced =
                Boolean(
                  progress.advanced
                );

              const languageLevels =
                [
                  beginner,
                  intermediate,
                  advanced,
                ].filter(
                  Boolean
                ).length;

              const languagePercent =
                Math.round(
                  (languageLevels / 3) * 100
                );

              return (
                <div
                  key={language}
                  style={{
                    padding: "22px",
                    borderRadius: "18px",
                    background:
                      "rgba(255, 255, 255, 0.035)",
                    border:
                      "1px solid rgba(120, 180, 255, 0.18)",
                  }}
                >

                  {/* LANGUAGE NAME */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "14px",
                    }}
                  >

                    <h3
                      style={{
                        margin: 0,
                        color: "#ffffff",
                      }}
                    >
                      {language}
                    </h3>

                    <strong
                      style={{
                        color: "#8fffd0",
                      }}
                    >
                      {languagePercent}%
                    </strong>

                  </div>

                  {/* PROGRESS BAR */}

                  <div
                    style={{
                      height: "7px",
                      background:
                        "rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginBottom: "20px",
                    }}
                  >

                    <div
                      style={{
                        width:
                          `${languagePercent}%`,
                        height: "100%",
                        background: "#61bfff",
                        borderRadius: "10px",
                        transition:
                          "width 0.4s ease",
                      }}
                    />

                  </div>

                  {/* BEGINNER */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 0",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.07)",
                    }}
                  >

                    <span
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      Beginner
                    </span>

                    <span
                      style={{
                        color:
                          beginner
                            ? "#8fffd0"
                            : "#8190a5",
                        fontWeight: "700",
                      }}
                    >
                      {beginner
                        ? "Completed"
                        : "Locked"}
                    </span>

                  </div>

                  {/* INTERMEDIATE */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 0",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.07)",
                    }}
                  >

                    <span
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      Intermediate
                    </span>

                    <span
                      style={{
                        color:
                          intermediate
                            ? "#8fffd0"
                            : beginner
                              ? "#61bfff"
                              : "#8190a5",
                        fontWeight: "700",
                      }}
                    >
                      {intermediate
                        ? "Completed"
                        : beginner
                          ? "Available"
                          : "Locked"}
                    </span>

                  </div>

                  {/* ADVANCED */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "11px 0",
                    }}
                  >

                    <span
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      Advanced
                    </span>

                    <span
                      style={{
                        color:
                          advanced
                            ? "#8fffd0"
                            : intermediate
                              ? "#61bfff"
                              : "#8190a5",
                        fontWeight: "700",
                      }}
                    >
                      {advanced
                        ? "Completed"
                        : intermediate
                          ? "Available"
                          : "Locked"}
                    </span>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>

      {/* =================================================
          JOURNEY MESSAGE
      ================================================= */}

      <section className="dashboard-empty">

        <div className="dashboard-empty-icon">
          MIQ
        </div>

        <h2>

          {completedLevels === 0
            ? "Your journey starts here"
            : overallProgress === 100
              ? "Excellent work"
              : "Keep building your MIQ journey"}

        </h2>

        <p>

          {completedLevels === 0
            ? "Explore the Question Bank and start your first learning level."
            : overallProgress === 100
              ? "You have completed all 30 levels. Keep practicing and prepare for your mock interview."
              : "Continue completing your levels to improve your progress and earn certificates."}

        </p>

      </section>

    </div>
  );
}

export default Dashboard;