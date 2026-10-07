import { useEffect, useState } from "react";
import "./AdminQuizResults.css";

function AdminQuizResults() {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        const token =
          localStorage.getItem("miqAdminToken");

        if (!token) {
          window.location.href =
            "/admin-login";
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:5000/api/admin/quiz-results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem(
            "miqAdminToken"
          );

          window.location.href =
            "/admin-login";

          return;
        }

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to load quiz results."
          );
        }

        setQuizResults(
          data.quizResults || []
        );
      } catch (err) {
        console.error(
          "Admin quiz results error:",
          err
        );

        setError(
          err.message ||
            "Unable to load quiz results."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, []);

  const getScorePercentage = (
    score,
    total
  ) => {
    if (!total) return 0;

    return Math.round(
      (Number(score) /
        Number(total)) *
        100
    );
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(
      date
    ).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="admin-quiz-page">
        <div className="admin-quiz-loading">
          Loading quiz results...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-quiz-page">

      {/* HEADER */}

      <div className="admin-quiz-header">

        <div>
          <div className="admin-quiz-logo">
            MIQ
          </div>

          <h1>
            Quiz Results
          </h1>

          <p>
            View participant quiz
            performance and progress.
          </p>
        </div>

        <button
          className="admin-quiz-back-btn"
          onClick={() => {
            window.location.href =
              "/admin-dashboard";
          }}
        >
          ← Dashboard
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="admin-quiz-error">
          {error}
        </div>
      )}

      {/* SUMMARY */}

      <div className="admin-quiz-summary">

        <div className="admin-quiz-summary-card">
          <span>
            Total Attempts
          </span>

          <strong>
            {quizResults.length}
          </strong>
        </div>

        <div className="admin-quiz-summary-card">
          <span>
            Questions Attempted
          </span>

          <strong>
            {quizResults.reduce(
              (
                total,
                activity
              ) =>
                total +
                Number(
                  activity.questionsAttempted ||
                    activity.totalQuestions ||
                    0
                ),
              0
            )}
          </strong>
        </div>

        <div className="admin-quiz-summary-card">
          <span>
            Completed Levels
          </span>

          <strong>
            {
              quizResults.filter(
                (activity) =>
                  activity.level
              ).length
            }
          </strong>
        </div>

      </div>

      {/* RESULTS */}

      <div className="admin-quiz-card">

        <div className="admin-quiz-card-header">
          <div>
            <h2>
              Participant Results
            </h2>

            <p>
              Valid quiz attempts recorded
              by MIQ.
            </p>
          </div>
        </div>

        {quizResults.length === 0 ? (
          <div className="admin-quiz-empty">
            No quiz results available yet.
          </div>
        ) : (
          <div className="admin-quiz-table-wrapper">

            <table className="admin-quiz-table">

              <thead>
                <tr>
                  <th>
                    Participant
                  </th>

                  <th>
                    Language
                  </th>

                  <th>
                    Level
                  </th>

                  <th>
                    Score
                  </th>

                  <th>
                    Questions
                  </th>

                  <th>
                    Performance
                  </th>

                  <th>
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>

                {quizResults.map(
                  (activity) => {

                    const total =
                      Number(
                        activity.totalQuestions ||
                          0
                      );

                    const score =
                      Number(
                        activity.score ||
                          0
                      );

                    const percentage =
                      getScorePercentage(
                        score,
                        total
                      );

                    return (
                      <tr
                        key={
                          activity._id
                        }
                      >

                        <td>
                          <div className="admin-quiz-participant">
                            <strong>
                              {activity.user?.username ||
                                activity.username ||
                                "Participant"}
                            </strong>

                            <span>
                              {activity.user?.email ||
                                activity.email ||
                                "—"}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="admin-quiz-language">
                            {activity.language ||
                              "—"}
                          </span>
                        </td>

                        <td>
                          <span className="admin-quiz-level">
                            {activity.level ||
                              "—"}
                          </span>
                        </td>

                        <td>
                          <strong className="admin-quiz-score">
                            {score} / {total}
                          </strong>
                        </td>

                        <td>
                          {Number(
                            activity.questionsAttempted ||
                              total
                          )}
                        </td>

                        <td>
                          <div className="admin-quiz-performance">

                            <div className="admin-quiz-progress">
                              <div
                                className="admin-quiz-progress-fill"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              />
                            </div>

                            <span>
                              {percentage}%
                            </span>

                          </div>
                        </td>

                        <td>
                          <span className="admin-quiz-date">
                            {formatDate(
                              activity.createdAt
                            )}
                          </span>
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AdminQuizResults;