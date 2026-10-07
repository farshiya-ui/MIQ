import { useEffect, useState } from "react";
import "./AdminMockInterviews.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminMockInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const loadInterviews = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("miqAdminToken");

      if (!token) {
        window.location.href = "/admin-login";
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/mock-interviews`,
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
          localStorage.removeItem("miqAdminToken");
          localStorage.removeItem("miqAdmin");
          window.location.href = "/admin-login";
          return;
        }

        throw new Error(
          data.message ||
            "Unable to load mock interview results."
        );
      }

      setInterviews(
        data.mockInterviewResults ||
          data.mockInterviews ||
          data.interviews ||
          data.results ||
          []
      );
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while loading results."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleBack = () => {
    window.location.href =
      "/admin-dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("miqAdminToken");
    localStorage.removeItem("miqAdmin");
    window.location.href = "/";
  };

  const getParticipantName = (interview) => {
    return (
      interview?.participant?.username ||
      interview?.user?.username ||
      interview?.username ||
      interview?.name ||
      "Unknown"
    );
  };

  const getEmail = (interview) => {
    return (
      interview?.participant?.email ||
      interview?.user?.email ||
      interview?.email ||
      "—"
    );
  };

  const getCollege = (interview) => {
    return (
      interview?.college ||
      interview?.participant?.college ||
      interview?.user?.profile?.collegeName ||
      "—"
    );
  };

  const getBranch = (interview) => {
    return (
      interview?.branch ||
      interview?.participant?.branch ||
      interview?.user?.profile?.branch ||
      "—"
    );
  };

  const getYear = (interview) => {
    return (
      interview?.year ||
      interview?.participant?.year ||
      interview?.user?.profile?.year ||
      "—"
    );
  };

  const getLanguage = (interview) => {
    return interview?.language || "—";
  };

  const getScore = (interview) => {
    return interview?.score ?? 0;
  };

  const getPercentage = (interview) => {
    if (
      interview?.percentage !== undefined &&
      interview?.percentage !== null
    ) {
      return interview.percentage;
    }

    return interview?.score ?? 0;
  };

  const getPerformance = (interview) => {
    return interview?.performance || "—";
  };

  const getAttempted = (interview) => {
    return (
      interview?.questionsAttempted ??
      interview?.questions?.filter(
        (question) =>
          question?.answer?.trim()
      )?.length ??
      0
    );
  };

  const getCertificateId = (interview) => {
    return (
      interview?.certificateId ||
      "Not issued"
    );
  };

  const getStatus = (interview) => {
    return interview?.status || "—";
  };

  const getDate = (interview) => {
    const date =
      interview?.completedAt ||
      interview?.certificateIssuedAt ||
      interview?.createdAt;

    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getCapturedImage = (interview) => {
    return (
      interview?.capturedImage ||
      interview?.interview?.capturedImage ||
      ""
    );
  };

  if (loading) {
    return (
      <div className="admin-mock-page">
        <div className="admin-mock-loading">
          <div className="admin-mock-loading-logo">
            MIQ
          </div>

          <h2>
            Loading Mock Interview Results...
          </h2>

          <p>
            Please wait while MIQ loads the interview records.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-mock-page">

        <header className="admin-mock-header">

          <div className="admin-mock-brand">
            MIQ
          </div>

          <button
            className="admin-mock-back-button"
            onClick={handleBack}
          >
            ← Dashboard
          </button>

        </header>

        <main className="admin-mock-content">

          <div className="admin-mock-error">

            <div className="admin-mock-error-logo">
              MIQ
            </div>

            <h1>
              Unable to Load Results
            </h1>

            <p>
              {error}
            </p>

            <div className="admin-mock-error-actions">

              <button
                onClick={loadInterviews}
              >
                Try Again
              </button>

              <button
                className="secondary"
                onClick={handleBack}
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        </main>

      </div>
    );
  }

  return (
    <div className="admin-mock-page">

      {/* ================= HEADER ================= */}

      <header className="admin-mock-header">

        <div className="admin-mock-header-left">

          <button
            className="admin-mock-back-button"
            onClick={handleBack}
          >
            ← Dashboard
          </button>

          <div className="admin-mock-brand">
            MIQ
          </div>

          <div>

            <span className="admin-mock-label">
              ADMINISTRATION
            </span>

            <h1>
              Mock Interview Results
            </h1>

          </div>

        </div>

        <div className="admin-mock-header-right">

          <button
            className="admin-mock-refresh"
            onClick={loadInterviews}
          >
            Refresh
          </button>

          <button
            className="admin-mock-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* ================= CONTENT ================= */}

      <main className="admin-mock-content">

        {/* INTRO */}

        <section className="admin-mock-intro">

          <div>

            <span>
              MIQ MOCK INTERVIEW SYSTEM
            </span>

            <h2>
              Interview Performance
            </h2>

            <p>
              View completed mock interview attempts,
              candidate information, verification photos,
              scores, performance, and certificate details.
            </p>

          </div>

          <div className="admin-mock-total">

            <strong>
              {interviews.length}
            </strong>

            <span>
              Total Interviews
            </span>

          </div>

        </section>

        {/* STATISTICS */}

        <section className="admin-mock-stats">

          <div className="admin-mock-stat">

            <span>
              Completed
            </span>

            <strong>
              {
                interviews.filter(
                  (item) =>
                    item.status ===
                      "completed" ||
                    !item.status
                ).length
              }
            </strong>

          </div>

          <div className="admin-mock-stat">

            <span>
              Certificates
            </span>

            <strong>
              {
                interviews.filter(
                  (item) =>
                    item.certificateIssued ||
                    item.certificateId
                ).length
              }
            </strong>

          </div>

          <div className="admin-mock-stat">

            <span>
              Languages
            </span>

            <strong>
              {
                new Set(
                  interviews
                    .map(
                      (item) =>
                        item.language
                    )
                    .filter(Boolean)
                ).size
              }
            </strong>

          </div>

          <div className="admin-mock-stat">

            <span>
              Average Score
            </span>

            <strong>
              {interviews.length > 0
                ? Math.round(
                    interviews.reduce(
                      (total, item) =>
                        total +
                        Number(
                          item.score || 0
                        ),
                      0
                    ) /
                      interviews.length
                  )
                : 0}
              /100
            </strong>

          </div>

        </section>

        {/* RESULTS */}

        <section className="admin-mock-results-card">

          <div className="admin-mock-results-heading">

            <div>

              <span>
                INTERVIEW RECORDS
              </span>

              <h3>
                All Mock Interviews
              </h3>

            </div>

            <span className="admin-mock-count">
              {interviews.length} records
            </span>

          </div>

          {interviews.length === 0 ? (

            <div className="admin-mock-empty">

              <div className="admin-mock-empty-logo">
                MIQ
              </div>

              <h3>
                No Mock Interviews Yet
              </h3>

              <p>
                Completed mock interviews will appear here.
              </p>

            </div>

          ) : (

            <div className="admin-mock-table-wrapper">

              <table className="admin-mock-table">

                <thead>

                  <tr>

                    <th>
                      Photo
                    </th>

                    <th>
                      Candidate
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
                      Language
                    </th>

                    <th>
                      Score
                    </th>

                    <th>
                      Percentage
                    </th>

                    <th>
                      Performance
                    </th>

                    <th>
                      Attempted
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Certificate ID
                    </th>

                    <th>
                      Completed
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {interviews.map(
                    (interview) => {

                      const participantName =
                        getParticipantName(
                          interview
                        );

                      const capturedImage =
                        getCapturedImage(
                          interview
                        );

                      return (

                        <tr
                          key={
                            interview._id ||
                            interview.id
                          }
                        >

                          {/* ================= PHOTO ================= */}

                          <td>

                            {capturedImage ? (

                              <button
                                type="button"
                                className="admin-mock-photo-button"
                                onClick={() =>
                                  setSelectedPhoto(
                                    capturedImage
                                  )
                                }
                                title="View candidate photo"
                              >

                                <img
                                  src={
                                    capturedImage
                                  }
                                  alt={`${participantName} verification`}
                                  className="admin-mock-photo"
                                />

                              </button>

                            ) : (

                              <div className="admin-mock-photo-placeholder">
                                No Photo
                              </div>

                            )}

                          </td>

                          {/* ================= CANDIDATE ================= */}

                          <td>

                            <div className="admin-mock-candidate">

                              <div className="admin-mock-avatar">

                                {participantName
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>

                              <strong>
                                {participantName}
                              </strong>

                            </div>

                          </td>

                          {/* ================= EMAIL ================= */}

                          <td>
                            {getEmail(
                              interview
                            )}
                          </td>

                          {/* ================= COLLEGE ================= */}

                          <td>
                            {getCollege(
                              interview
                            )}
                          </td>

                          {/* ================= BRANCH ================= */}

                          <td>
                            {getBranch(
                              interview
                            )}
                          </td>

                          {/* ================= YEAR ================= */}

                          <td>
                            {getYear(
                              interview
                            )}
                          </td>

                          {/* ================= LANGUAGE ================= */}

                          <td>

                            <span className="admin-language-badge">

                              {getLanguage(
                                interview
                              )}

                            </span>

                          </td>

                          {/* ================= SCORE ================= */}

                          <td>

                            <strong className="admin-score">

                              {getScore(
                                interview
                              )}/100

                            </strong>

                          </td>

                          {/* ================= PERCENTAGE ================= */}

                          <td>

                            <strong className="admin-percentage">

                              {getPercentage(
                                interview
                              )}%

                            </strong>

                          </td>

                          {/* ================= PERFORMANCE ================= */}

                          <td>

                            <span className="admin-performance">

                              {getPerformance(
                                interview
                              )}

                            </span>

                          </td>

                          {/* ================= ATTEMPTED ================= */}

                          <td>

                            <span>

                              {getAttempted(
                                interview
                              )}
                              /
                              {interview?.totalQuestions ||
                                10}

                            </span>

                          </td>

                          {/* ================= STATUS ================= */}

                          <td>

                            <span
                              className={`admin-status ${
                                getStatus(
                                  interview
                                ) ===
                                "completed"
                                  ? "completed"
                                  : ""
                              }`}
                            >

                              {getStatus(
                                interview
                              )}

                            </span>

                          </td>

                          {/* ================= CERTIFICATE ================= */}

                          <td>

                            <span className="admin-certificate-id">

                              {getCertificateId(
                                interview
                              )}

                            </span>

                          </td>

                          {/* ================= DATE ================= */}

                          <td>

                            {getDate(
                              interview
                            )}

                          </td>

                        </tr>

                      );

                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </main>

      {/* =====================================================
          CANDIDATE PHOTO MODAL
      ===================================================== */}

      {selectedPhoto && (

        <div
          className="admin-photo-modal"
          onClick={() =>
            setSelectedPhoto("")
          }
        >

          <div
            className="admin-photo-modal-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="admin-photo-modal-close"
              onClick={() =>
                setSelectedPhoto("")
              }
              aria-label="Close photo"
            >
              ×
            </button>

            <img
              src={selectedPhoto}
              alt="Candidate verification"
              className="admin-photo-modal-image"
            />

            <p>
              Candidate Verification Photo
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminMockInterviews;