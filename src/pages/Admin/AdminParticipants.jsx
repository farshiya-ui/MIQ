import { useEffect, useState } from "react";
import "./AdminParticipants.css";

function AdminParticipants() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [error, setError] = useState("");

  const adminToken =
    localStorage.getItem("miqAdminToken");

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    try {
      setLoading(true);
      setError("");

      if (!adminToken) {
        window.location.href = "/admin-login";
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:5000/api/admin/participants",
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("miqAdminToken");
        localStorage.removeItem("miqAdminUser");

        window.location.href = "/admin-login";
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load participants."
        );
      }

      setParticipants(
        data.participants || []
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to load participants."
      );
    } finally {
      setLoading(false);
    }
  };


  const openParticipant = async (id) => {
    try {
      setDetailsLoading(true);
      setError("");

      const response = await fetch(
        `http://127.0.0.1:5000/api/admin/participants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem(
          "miqAdminToken"
        );

        localStorage.removeItem(
          "miqAdminUser"
        );

        window.location.href =
          "/admin-login";

        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to load participant details."
        );
      }

      setSelectedParticipant(data);
    } catch (err) {
      setError(
        err.message ||
          "Unable to load participant details."
      );
    } finally {
      setDetailsLoading(false);
    }
  };


  const closeParticipant = () => {
    setSelectedParticipant(null);
  };


  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };


  if (loading) {
    return (
      <div className="admin-participants-page">
        <div className="participants-loading">
          Loading participants...
        </div>
      </div>
    );
  }


  return (
    <div className="admin-participants-page">

      <div className="participants-header">

        <div>
          <p className="admin-small-label">
            MIQ ADMIN
          </p>

          <h1>
            Participants
          </h1>

          <p>
            View registered participants and
            their MIQ activity.
          </p>
        </div>

        <button
          className="refresh-participants"
          onClick={loadParticipants}
        >
          Refresh
        </button>

      </div>


      {error && (
        <div className="participants-error">
          {error}
        </div>
      )}


      <div className="participants-summary">

        <div className="participant-summary-card">
          <span>Total Participants</span>

          <strong>
            {participants.length}
          </strong>
        </div>

        <div className="participant-summary-card">
          <span>Email Accounts</span>

          <strong>
            {
              participants.filter(
                (participant) =>
                  participant.authType ===
                  "local"
              ).length
            }
          </strong>
        </div>

        <div className="participant-summary-card">
          <span>Google Accounts</span>

          <strong>
            {
              participants.filter(
                (participant) =>
                  participant.authType ===
                  "google"
              ).length
            }
          </strong>
        </div>

      </div>


      <div className="participants-table-card">

        <div className="table-title">
          <h2>
            Registered Participants
          </h2>

          <span>
            {participants.length} accounts
          </span>
        </div>


        {participants.length === 0 ? (
          <div className="empty-participants">
            No participants found.
          </div>
        ) : (
          <div className="participants-table-wrapper">

            <table className="participants-table">

              <thead>
                <tr>
                  <th>Participant</th>
                  <th>Email</th>
                  <th>College</th>
                  <th>Branch</th>
                  <th>Year</th>
                  <th>Login Type</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {participants.map(
                  (participant) => (
                    <tr
                      key={
                        participant.id
                      }
                    >

                      <td>
                        <div className="participant-name">
                          {participant.username}
                        </div>

                        <div className="participant-status">
                          {participant.accountStatus}
                        </div>
                      </td>

                      <td>
                        {participant.email}
                      </td>

                      <td>
                        {participant.college ||
                          "Not added"}
                      </td>

                      <td>
                        {participant.branch ||
                          "Not added"}
                      </td>

                      <td>
                        {participant.year ||
                          "Not added"}
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

                      <td>
                        <button
                          className="view-participant-btn"
                          onClick={() =>
                            openParticipant(
                              participant.id
                            )
                          }
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>


      {detailsLoading && (
        <div className="participant-overlay">

          <div className="participant-modal loading-modal">
            Loading participant details...
          </div>

        </div>
      )}


      {selectedParticipant && (
        <div className="participant-overlay">

          <div className="participant-modal">

            <div className="participant-modal-header">

              <div>
                <p className="admin-small-label">
                  PARTICIPANT DETAILS
                </p>

                <h2>
                  {
                    selectedParticipant
                      .participant
                      .username
                  }
                </h2>
              </div>

              <button
                className="close-participant"
                onClick={
                  closeParticipant
                }
              >
                ×
              </button>

            </div>


            <div className="participant-profile-grid">

              <div>
                <span>Email</span>
                <strong>
                  {
                    selectedParticipant
                      .participant
                      .email
                  }
                </strong>
              </div>

              <div>
                <span>College</span>
                <strong>
                  {
                    selectedParticipant
                      .participant
                      .college ||
                    "Not added"
                  }
                </strong>
              </div>

              <div>
                <span>Branch</span>
                <strong>
                  {
                    selectedParticipant
                      .participant
                      .branch ||
                    "Not added"
                  }
                </strong>
              </div>

              <div>
                <span>Year</span>
                <strong>
                  {
                    selectedParticipant
                      .participant
                      .year ||
                    "Not added"
                  }
                </strong>
              </div>

              <div>
                <span>Login Type</span>
                <strong>
                  {
                    selectedParticipant
                      .participant
                      .authType ===
                    "google"
                      ? "Google"
                      : "Email"
                  }
                </strong>
              </div>

              <div>
                <span>Account Created</span>
                <strong>
                  {formatDate(
                    selectedParticipant
                      .participant
                      .accountCreated
                  )}
                </strong>
              </div>

            </div>


            <div className="participant-activity-grid">

              <div className="activity-stat">
                <span>
                  Quiz Results
                </span>

                <strong>
                  {
                    selectedParticipant
                      .quizResults
                      ?.length || 0
                  }
                </strong>
              </div>

              <div className="activity-stat">
                <span>
                  Mock Interviews
                </span>

                <strong>
                  {
                    selectedParticipant
                      .mockInterviewResults
                      ?.length || 0
                  }
                </strong>
              </div>

              <div className="activity-stat">
                <span>
                  Certificates
                </span>

                <strong>
                  {
                    selectedParticipant
                      .certificates
                      ?.length || 0
                  }
                </strong>
              </div>

              <div className="activity-stat">
                <span>
                  Total Activity
                </span>

                <strong>
                  {
                    selectedParticipant
                      .activity
                      ?.length || 0
                  }
                </strong>
              </div>

            </div>


            <div className="participant-sections">

              <div className="participant-section">

                <h3>
                  Quiz Results
                </h3>

                {selectedParticipant
                  .quizResults
                  ?.length ? (
                  selectedParticipant
                    .quizResults
                    .map(
                      (
                        quiz,
                        index
                      ) => (
                        <div
                          className="activity-row"
                          key={
                            quiz._id ||
                            index
                          }
                        >
                          <div>
                            <strong>
                              {quiz.language ||
                                quiz.subject ||
                                "Quiz"}
                            </strong>

                            <span>
                              {quiz.level ||
                                "Level"}
                            </span>
                          </div>

                          <div>
                            <strong>
                              {quiz.score ??
                                "—"}
                              {" / "}
                              {quiz.totalQuestions ??
                                quiz.questionCount ??
                                "—"}
                            </strong>

                            <span>
                              {formatDate(
                                quiz.createdAt
                              )}
                            </span>
                          </div>
                        </div>
                      )
                    )
                ) : (
                  <p className="no-activity">
                    No quiz results yet.
                  </p>
                )}

              </div>


              <div className="participant-section">

                <h3>
                  Mock Interview Results
                </h3>

                {selectedParticipant
                  .mockInterviewResults
                  ?.length ? (
                  selectedParticipant
                    .mockInterviewResults
                    .map(
                      (
                        interview,
                        index
                      ) => (
                        <div
                          className="activity-row"
                          key={
                            interview._id ||
                            index
                          }
                        >
                          <div>
                            <strong>
                              Mock Interview
                            </strong>

                            <span>
                              {interview.level ||
                                "Completed"}
                            </span>
                          </div>

                          <div>
                            <strong>
                              {interview.score ??
                                "—"}
                            </strong>

                            <span>
                              {formatDate(
                                interview.createdAt
                              )}
                            </span>
                          </div>
                        </div>
                      )
                    )
                ) : (
                  <p className="no-activity">
                    No mock interviews yet.
                  </p>
                )}

              </div>


              <div className="participant-section">

                <h3>
                  Certificates
                </h3>

                {selectedParticipant
                  .certificates
                  ?.length ? (
                  selectedParticipant
                    .certificates
                    .map(
                      (
                        certificate,
                        index
                      ) => (
                        <div
                          className="activity-row"
                          key={
                            certificate._id ||
                            index
                          }
                        >
                          <div>
                            <strong>
                              {certificate.language ||
                                "MIQ Certificate"}
                            </strong>

                            <span>
                              Certificate
                            </span>
                          </div>

                          <div>
                            <strong>
                              {certificate.score ??
                                "Completed"}
                            </strong>

                            <span>
                              {formatDate(
                                certificate.createdAt
                              )}
                            </span>
                          </div>
                        </div>
                      )
                    )
                ) : (
                  <p className="no-activity">
                    No certificates yet.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminParticipants;