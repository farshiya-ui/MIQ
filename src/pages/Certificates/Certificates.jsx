import { useEffect, useState } from "react";
import "./Certificates.css";

function Certificates({ onBack }) {
  const [certificates, setCertificates] = useState([]);
  const [mockCertificates, setMockCertificates] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD PROFILE + QUIZ CERTIFICATES + MOCK INTERVIEWS
  ===================================================== */

  useEffect(() => {
    const loadCertificateData = async () => {
      try {
        const token = localStorage.getItem("miqToken");

        if (!token) {
          setLoading(false);
          return;
        }

        /* =================================================
           LOAD USER PROFILE
        ================================================= */

        const profileResponse = await fetch(
          "http://127.0.0.1:5000/api/profile/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = await profileResponse.json();

        if (profileResponse.ok) {
          setUser(profileData.user);
        }

        /* =================================================
           LOAD EXISTING QUIZ CERTIFICATES
        ================================================= */

        const activityResponse = await fetch(
          "http://127.0.0.1:5000/api/activity",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const activityData =
          await activityResponse.json();

        if (!activityResponse.ok) {
          throw new Error(
            activityData.message ||
              "Failed to load certificates."
          );
        }

        /*
          Existing quiz certificate logic
          remains separate.
        */

        const certificateActivities =
          activityData.activities.filter(
            (activity) =>
              activity.type === "certificate"
          );

        setCertificates(
          certificateActivities
        );

        /* =================================================
           LOAD LOGGED-IN USER'S MOCK INTERVIEWS
        ================================================= */

        const mockResponse = await fetch(
          "http://127.0.0.1:5000/api/mock-interviews/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mockData =
          await mockResponse.json();

        if (mockResponse.ok) {
          /*
            Only completed mock interviews
            become certificates.
          */

          const completedMockInterviews =
            (mockData.interviews || []).filter(
              (interview) =>
                interview.status === "completed"
            );

          setMockCertificates(
            completedMockInterviews
          );
        } else {
          console.error(
            "Mock interview loading error:",
            mockData.message
          );
        }
      } catch (error) {
        console.error(
          "Certificate loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadCertificateData();
  }, []);

  /* =====================================================
     PRINT / DOWNLOAD
  ===================================================== */

  const handlePrint = (certificateId) => {
    const certificate =
      document.getElementById(
        `certificate-${certificateId}`
      );

    if (!certificate) {
      return;
    }

    const originalTitle =
      document.title;

    document.title =
      `MIQ Certificate - ${certificateId}`;

    window.print();

    document.title =
      originalTitle;
  };

  /* =====================================================
     DATE FORMAT
  ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     MOCK SCORE
  ===================================================== */

  const getMockScore = (score) => {
    const numericScore =
      Number(score) || 0;

    /*
      Current MockInterview frontend
      uses score out of 100.

      Convert it to marks out of 10.
    */

    return Math.round(
      numericScore / 10
    );
  };

  const getMockPercentage = (score) => {
    const numericScore =
      Number(score) || 0;

    return Math.round(
      numericScore
    );
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="certificates-page">

        <button
          className="certificates-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <section className="certificates-hero">

          <span className="certificates-label">
            MIQ ACHIEVEMENTS
          </span>

          <h1>
            Certificates
          </h1>

          <p>
            Loading your MIQ certificates...
          </p>

        </section>

        <section className="certificates-empty">

          <h2>
            Loading Certificates
          </h2>

          <p>
            Please wait while we retrieve
            your achievements.
          </p>

        </section>

      </main>
    );
  }

  /* =====================================================
     MAIN PAGE
  ===================================================== */

  return (
    <main className="certificates-page">

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      <button
        className="certificates-back-button"
        onClick={onBack}
      >
        ← Back
      </button>


      {/* =================================================
          PAGE HEADING
      ================================================= */}

      <section className="certificates-hero">

        <span className="certificates-label">
          MIQ ACHIEVEMENTS
        </span>

        <h1>
          Certificates
        </h1>

        <p>
          Your completed MIQ learning and
          mock interview achievements are
          stored here.
        </p>

      </section>


      {/* =================================================
          QUIZ CERTIFICATES
      ================================================= */}

      <section className="certificate-category-section">

        <div className="certificate-category-heading">

          <span className="certificates-label">
            LEARNING
          </span>

          <h2>
            Quiz Certificates
          </h2>

          <p>
            Certificates earned by completing
            Beginner, Intermediate and Advanced
            quiz levels.
          </p>

        </div>


        {certificates.length === 0 ? (

          <section className="certificates-empty">

            <h3>
              No Quiz Certificates Yet
            </h3>

            <p>
              Complete all three quiz levels
              in a technology to earn a
              certificate.
            </p>

          </section>

        ) : (

          <section className="certificates-list">

            {certificates.map(
              (certificate) => {

                /* ========================================
                   EXISTING QUIZ CERTIFICATE
                   DATA LOGIC UNCHANGED
                ======================================== */

                const participantName =
                  user?.username ||
                  "MIQ Participant";

                const completionDate =
                  formatDate(
                    certificate.createdAt
                  );

                return (
                  <div
                    className="certificate-wrapper"
                    key={certificate._id}
                  >

                    <article
                      id={`certificate-${certificate._id}`}
                      className="real-certificate"
                    >

                      {/* ================================
                          TOP BRAND
                      ================================= */}

                      <div className="certificate-logo">

                        <span className="certificate-logo-main">
                          MIQ
                        </span>

                        <span className="certificate-logo-sub">
                          MOCK INTERVIEW
                        </span>

                      </div>


                      {/* ================================
                          OFFICIAL CERTIFICATION
                      ================================= */}

                      <div className="certificate-official-row">

                        <span className="certificate-top-label">
                          OFFICIAL MIQ CERTIFICATION
                        </span>

                      </div>


                      {/* ================================
                          TITLE
                      ================================= */}

                      <h2 className="certificate-main-title">
                        CERTIFICATE
                      </h2>

                      <h3 className="certificate-achievement">
                        OF ACHIEVEMENT
                      </h3>


                      {/* ================================
                          PRESENTED TEXT
                      ================================= */}

                      <p className="certificate-presented">
                        This certificate is proudly
                        presented to
                      </p>


                      {/* ================================
                          PARTICIPANT
                      ================================= */}

                      <h1 className="certificate-participant-name">
                        {participantName}
                      </h1>

                      <div className="certificate-name-decoration">
                      </div>


                      {/* ================================
                          DESCRIPTION
                      ================================= */}

                      <p className="certificate-description">

                        This certificate recognizes the
                        successful completion of the MIQ
                        learning and assessment journey
                        in{" "}

                        <strong>
                          {certificate.language}
                        </strong>

                        , including Beginner,
                        Intermediate and Advanced levels.

                      </p>


                      {/* ================================
                          COMPLETION
                      ================================= */}

                      <div className="certificate-completion">

                        Successfully completed Beginner,
                        Intermediate & Advanced levels

                      </div>


                      {/* ================================
                          DETAILS
                      ================================= */}

                      <div className="certificate-info-grid">

                        <div className="certificate-info-box">

                          <span>
                            TECHNOLOGY / LANGUAGE
                          </span>

                          <strong>
                            {certificate.language}
                          </strong>

                        </div>


                        <div className="certificate-info-box">

                          <span>
                            SCORE
                          </span>

                          <strong>
                            {certificate.score}/25
                          </strong>

                        </div>


                        <div className="certificate-info-box">

                          <span>
                            COMPLETION DATE
                          </span>

                          <strong>
                            {completionDate}
                          </strong>

                        </div>


                        <div className="certificate-info-box">

                          <span>
                            CERTIFICATE ID
                          </span>

                          <strong>
                            {certificate.certificateId ||
                              certificate._id}
                          </strong>

                        </div>

                      </div>


                      {/* ================================
                          SIGNATURE AREA
                      ================================= */}

                      <div className="certificate-bottom">

                        <div className="certificate-signature-area">

                          <div className="miq-signature">
                            MiQ
                          </div>

                          <div className="signature-line">
                          </div>

                          <strong>
                            Founder, MIQ
                          </strong>

                          <span>
                            AUTHORIZED SIGNATURE
                          </span>

                        </div>


                        <div className="miq-verification">

                          <div className="miq-signature-small">
                            MIQ
                          </div>

                          <div className="verification-line">
                          </div>

                          <strong>
                            MIQ VERIFIED
                          </strong>

                          <span>
                            CERTIFICATION
                          </span>

                        </div>


                        <div className="certificate-issued-area">

                          <span>
                            ISSUED
                          </span>

                          <strong>
                            {completionDate}
                          </strong>

                          <div className="issued-line">
                          </div>

                          <small>
                            MIQ CERTIFICATION BOARD
                          </small>

                        </div>

                      </div>


                      {/* ================================
                          FOOTER
                      ================================= */}

                      <div className="certificate-footer">

                        MIQ • MOCK INTERVIEW
                        SIMULATOR & QUESTION BANK
                        &nbsp; | &nbsp;
                        VERIFIED ACHIEVEMENT

                      </div>

                    </article>


                    <button
                      className="certificate-download-button"
                      onClick={() =>
                        handlePrint(
                          certificate._id
                        )
                      }
                    >
                      ↓ Download / Print Certificate
                    </button>

                  </div>
                );
              }
            )}

          </section>

        )}

      </section>


      {/* =================================================
          MOCK INTERVIEW CERTIFICATES
      ================================================= */}

      <section className="certificate-category-section mock-certificate-section">

        <div className="certificate-category-heading">

          <span className="certificates-label">
            MOCK INTERVIEW
          </span>

          <h2>
            Mock Interview Certificates
          </h2>

          <p>
            Every completed mock interview has
            its own certificate and verification
            record.
          </p>

        </div>


        {mockCertificates.length === 0 ? (

          <section className="certificates-empty">

            <h3>
              No Mock Interview Certificates Yet
            </h3>

            <p>
              Complete a mock interview to
              generate your certificate.
            </p>

          </section>

        ) : (

          <section className="certificates-list">

            {mockCertificates.map(
              (interview) => {

                /*
                  IMPORTANT:
                  Use the persistent certificate ID
                  generated by the backend.

                  Old records without a certificateId
                  fall back to the interview ID so
                  they remain printable.
                */

                const certificateId =
                  interview.certificateId ||
                  `MIQ-MOCK-${String(
                    interview._id
                  )
                    .slice(-8)
                    .toUpperCase()}`;

                const participantName =
                  interview.name ||
                  user?.username ||
                  "MIQ Participant";

                const completionDate =
                  formatDate(
                    interview.certificateIssuedAt ||
                    interview.completedAt ||
                    interview.updatedAt ||
                    interview.createdAt
                  );

                const marks =
                  getMockScore(
                    interview.score
                  );

                const percentage =
                  Number(
                    interview.percentage
                  ) || getMockPercentage(
                    interview.score
                  );

                return (
                  <div
                    className="certificate-wrapper"
                    key={certificateId}
                  >

                    {/* ==================================
                        MOCK CERTIFICATE
                    ================================== */}

                    <article
                      id={`certificate-${certificateId}`}
                      className="real-certificate mock-interview-certificate"
                    >

                      {/* ==================================
                          MIQ BRAND
                      ================================== */}

                      <div className="certificate-logo">

                        <span className="certificate-logo-main">
                          MIQ
                        </span>

                        <span className="certificate-logo-sub">
                          MOCK INTERVIEW
                        </span>

                      </div>


                      {/* ==================================
                          OFFICIAL LABEL
                      ================================== */}

                      <div className="certificate-official-row">

                        <span className="certificate-top-label">
                          OFFICIAL MIQ MOCK INTERVIEW CERTIFICATION
                        </span>

                      </div>


                      {/* ==================================
                          TITLE
                      ================================== */}

                      <h2 className="certificate-main-title">
                        CERTIFICATE
                      </h2>

                      <h3 className="certificate-achievement">
                        OF MOCK INTERVIEW
                      </h3>


                      {/* ==================================
                          PRESENTED
                      ================================== */}

                      <p className="certificate-presented">
                        This certificate is proudly
                        presented to
                      </p>


                      {/* ==================================
                          NAME
                      ================================== */}

                      <h1 className="certificate-participant-name">
                        {participantName}
                      </h1>

                      <div className="certificate-name-decoration">
                      </div>


                      {/* ==================================
                          DESCRIPTION
                      ================================== */}

                      <p className="certificate-description">

                        This certificate recognizes the
                        successful completion of an MIQ
                        mock interview assessment in{" "}

                        <strong>
                          {interview.language}
                        </strong>.

                      </p>


                      {/* ==================================
                          CANDIDATE DETAILS
                      ================================== */}

                      <div className="certificate-mock-details">

                        <div className="certificate-mock-detail-item">

                          <span>
                            COLLEGE
                          </span>

                          <strong>
                            {interview.college || "—"}
                          </strong>

                        </div>


                        <div className="certificate-mock-detail-item">

                          <span>
                            BRANCH
                          </span>

                          <strong>
                            {interview.branch || "—"}
                          </strong>

                        </div>


                        <div className="certificate-mock-detail-item">

                          <span>
                            YEAR
                          </span>

                          <strong>
                            {interview.year || "—"}
                          </strong>

                        </div>


                        <div className="certificate-mock-detail-item">

                          <span>
                            INTERVIEW LANGUAGE
                          </span>

                          <strong>
                            {interview.language || "—"}
                          </strong>

                        </div>

                      </div>


                      {/* ==================================
                          PHOTO + RESULT
                      ================================== */}

                      <div className="mock-certificate-verification-area">

                        {/* PHOTO */}

                        <div className="mock-certificate-photo-area">

                          <span className="mock-certificate-section-title">
                            CANDIDATE VERIFICATION
                          </span>

                          {interview.capturedImage ? (

                            <img
                              src={
                                interview.capturedImage
                              }
                              alt="Candidate verification"
                              className="mock-certificate-photo"
                            />

                          ) : (

                            <div className="mock-certificate-photo-placeholder">

                              No verification
                              photo available

                            </div>

                          )}

                        </div>


                        {/* RESULT */}

                        <div className="mock-certificate-result-area">

                          <span className="mock-certificate-section-title">
                            INTERVIEW RESULT
                          </span>

                          <div className="mock-result-score">

                            <strong>
                              {marks}/10
                            </strong>

                            <span>
                              {percentage}%
                            </span>

                          </div>


                          <div className="mock-result-performance">

                            <span>
                              PERFORMANCE
                            </span>

                            <strong>
                              {interview.performance ||
                                "Completed"}
                            </strong>

                          </div>


                          <div className="mock-result-questions">

                            <span>
                              QUESTIONS ATTEMPTED
                            </span>

                            <strong>
                              {interview.questionsAttempted || 0}
                              /10
                            </strong>

                          </div>

                        </div>

                      </div>


                      {/* ==================================
                          CERTIFICATE DETAILS
                      ================================== */}

                      <div className="certificate-info-grid">

                        <div className="certificate-info-box">

                          <span>
                            SCORE
                          </span>

                          <strong>
                            {marks}/10
                          </strong>

                        </div>


                        <div className="certificate-info-box">

                          <span>
                            PERCENTAGE
                          </span>

                          <strong>
                            {percentage}%
                          </strong>

                        </div>


                        <div className="certificate-info-box">

                          <span>
                            COMPLETION DATE
                          </span>

                          <strong>
                            {completionDate}
                          </strong>

                        </div>


                        <div className="certificate-info-box">

                          <span>
                            CERTIFICATE ID
                          </span>

                          <strong>
                            {certificateId}
                          </strong>

                        </div>

                      </div>


                      {/* ==================================
                          SIGNATURE
                      ================================== */}

                      <div className="certificate-bottom">

                        <div className="certificate-signature-area">

                          <div className="miq-signature">
                            MiQ
                          </div>

                          <div className="signature-line">
                          </div>

                          <strong>
                            Founder, MIQ
                          </strong>

                          <span>
                            AUTHORIZED SIGNATURE
                          </span>

                        </div>


                        <div className="miq-verification">

                          <div className="miq-signature-small">
                            MIQ
                          </div>

                          <div className="verification-line">
                          </div>

                          <strong>
                            MIQ VERIFIED
                          </strong>

                          <span>
                            MOCK INTERVIEW
                          </span>

                        </div>


                        <div className="certificate-issued-area">

                          <span>
                            ISSUED
                          </span>

                          <strong>
                            {completionDate}
                          </strong>

                          <div className="issued-line">
                          </div>

                          <small>
                            MIQ CERTIFICATION BOARD
                          </small>

                        </div>

                      </div>


                      {/* ==================================
                          FOOTER
                      ================================== */}

                      <div className="certificate-footer">

                        MIQ • MOCK INTERVIEW
                        SIMULATOR & QUESTION BANK
                        &nbsp; | &nbsp;
                        VERIFIED MOCK INTERVIEW

                      </div>

                    </article>


                    {/* ==================================
                        DOWNLOAD
                    ================================== */}

                    <button
                      className="certificate-download-button"
                      onClick={() =>
                        handlePrint(
                          certificateId
                        )
                      }
                    >
                      ↓ Download / Print Certificate
                    </button>

                  </div>
                );
              }
            )}

          </section>

        )}

      </section>

    </main>
  );
}

export default Certificates;