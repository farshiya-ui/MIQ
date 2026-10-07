import { useEffect, useRef, useState } from "react";
import "./MockInterview.css";
import mockInterviewQuestions from "../../data/mockInterviewQuestions";

const languages = [
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

function MockInterview({ onBack }) {
  /* =========================================================
     MAIN STAGE
  ========================================================= */

  const [stage, setStage] = useState("language");

  /* =========================================================
     LANGUAGE
  ========================================================= */

  const [selectedLanguage, setSelectedLanguage] = useState("");

  /* =========================================================
     CANDIDATE DETAILS
  ========================================================= */

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    branch: "",
    year: "",
    collegeId: "",
  });

  /* =========================================================
     CAMERA
  ========================================================= */

  const [cameraStarted, setCameraStarted] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [capturedImage, setCapturedImage] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  /* =========================================================
     INTERVIEW
  ========================================================= */

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [interviewScore, setInterviewScore] = useState(0);
  const [interviewStartedAt, setInterviewStartedAt] =
    useState(null);

  /* =========================================================
     BACKEND INTERVIEW
  ========================================================= */

  const [interviewId, setInterviewId] = useState("");
  const [savingInterview, setSavingInterview] =
    useState(false);

  const [submitError, setSubmitError] = useState("");

  /* =========================================================
     QUESTIONS
  ========================================================= */

  const questions =
    mockInterviewQuestions[selectedLanguage] || [];

  /* =========================================================
     RESET WHEN LANGUAGE CHANGES
  ========================================================= */

  useEffect(() => {
    if (!selectedLanguage) {
      return;
    }

    const selectedQuestions =
      mockInterviewQuestions[selectedLanguage] || [];

    setAnswers(
      Array(selectedQuestions.length).fill("")
    );

    setCurrentQuestion(0);
    setInterviewScore(0);
    setCapturedImage("");
    setCameraError("");
    setInterviewId("");
    setSubmitError("");
    setSavingInterview(false);
  }, [selectedLanguage]);

  /* =========================================================
     STOP CAMERA
  ========================================================= */

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setCameraStarted(false);
  };

  /* =========================================================
     CAMERA CLEANUP WHEN COMPONENT UNMOUNTS
  ========================================================= */

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });

        streamRef.current = null;
      }
    };
  }, []);

  /* =========================================================
     ATTACH STREAM AFTER VIDEO ELEMENT EXISTS
  ========================================================= */

  useEffect(() => {
    if (
      cameraStarted &&
      videoRef.current &&
      streamRef.current
    ) {
      const video = videoRef.current;

      video.srcObject = streamRef.current;

      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log(
            "Video playback requires user interaction:",
            error
          );
        }
      };

      playVideo();
    }
  }, [cameraStarted]);

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     LANGUAGE CONTINUE
  ========================================================= */

  const handleLanguageContinue = () => {
    if (!selectedLanguage) {
      alert("Please select a language first.");
      return;
    }

    setStage("verification");
  };

  /* =========================================================
     START CAMERA
  ========================================================= */

  const handleCamera = async () => {
    setCameraError("");

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setCameraError(
          "Camera access is not supported by this browser."
        );

        return;
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: {
              ideal: 1280,
            },
            height: {
              ideal: 720,
            },
          },
          audio: false,
        });

      streamRef.current = stream;

      setCapturedImage("");
      setCameraStarted(true);
      setCameraError("");
    } catch (error) {
      console.error(
        "Camera access error:",
        error
      );

      let message =
        "Camera access was denied or unavailable.";

      if (error?.name === "NotAllowedError") {
        message =
          "Camera permission was denied. Please allow camera access in Chrome and try again.";
      } else if (error?.name === "NotFoundError") {
        message =
          "No camera was found on this device.";
      } else if (error?.name === "NotReadableError") {
        message =
          "The camera is already being used by another application.";
      } else if (error?.name === "OverconstrainedError") {
        message =
          "The requested camera settings are not available. Please try again.";
      } else if (error?.name === "SecurityError") {
        message =
          "Camera access was blocked by browser security settings.";
      }

      setCameraError(message);
      setCameraStarted(false);
    }
  };

  /* =========================================================
     CAPTURE PHOTO
  ========================================================= */

  const capturePhoto = () => {
    console.log("CAPTURE BUTTON CLICKED");

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video) {
      setCameraError(
        "Camera preview is not available."
      );

      return;
    }

    if (!canvas) {
      setCameraError(
        "Unable to capture the camera frame."
      );

      return;
    }

    if (!streamRef.current) {
      setCameraError(
        "Camera stream is not available."
      );

      return;
    }

    if (
      video.readyState <
      HTMLMediaElement.HAVE_CURRENT_DATA
    ) {
      setCameraError(
        "Camera is still starting. Please wait a moment and try again."
      );

      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;

    if (!width || !height) {
      setCameraError(
        "Camera frame is not ready. Please wait 2 seconds and try again."
      );

      return;
    }

    try {
      canvas.width = width;
      canvas.height = height;

      const context =
        canvas.getContext("2d");

      if (!context) {
        setCameraError(
          "Unable to access the image canvas."
        );

        return;
      }

      context.drawImage(
        video,
        0,
        0,
        width,
        height
      );

      const imageData =
        canvas.toDataURL(
          "image/jpeg",
          0.92
        );

      if (
        !imageData ||
        imageData === "data:,"
      ) {
        setCameraError(
          "Photo capture failed. Please try again."
        );

        return;
      }

      setCapturedImage(imageData);
      setCameraError("");

      console.log(
        "PHOTO CAPTURED SUCCESSFULLY"
      );
    } catch (error) {
      console.error(
        "Photo capture error:",
        error
      );

      setCameraError(
        "Unable to capture the photo. Please try again."
      );
    }
  };

  /* =========================================================
     RETAKE PHOTO
  ========================================================= */

  const retakePhoto = () => {
    console.log("RETAKE PHOTO CLICKED");

    setCapturedImage("");
    setCameraError("");

    if (
      !cameraStarted ||
      !streamRef.current
    ) {
      handleCamera();
    }
  };

  /* =========================================================
     VALIDATE CANDIDATE DETAILS
  ========================================================= */

  const validateCandidateDetails = () => {
    if (!formData.name.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!formData.college.trim()) {
      alert("Please enter your college name.");
      return false;
    }

    if (!formData.branch) {
      alert("Please select your branch.");
      return false;
    }

    if (!formData.year) {
      alert("Please select your academic year.");
      return false;
    }

    if (!formData.collegeId.trim()) {
      alert("Please enter your college ID number.");
      return false;
    }

    return true;
  };

  /* =========================================================
     START INTERVIEW + SAVE ATTEMPT
  ========================================================= */

  const handleContinue = async (event) => {
    event.preventDefault();

    if (!validateCandidateDetails()) {
      return;
    }

    if (
      !cameraStarted ||
      !streamRef.current
    ) {
      alert(
        "Please enable the camera before continuing."
      );

      return;
    }

    if (!capturedImage) {
      alert(
        "Please capture your photo before starting the interview."
      );

      return;
    }

    const selectedQuestions =
      mockInterviewQuestions[selectedLanguage] || [];

    if (
      selectedQuestions.length === 0
    ) {
      alert(
        "Questions are not available for the selected language."
      );

      return;
    }

    /* =====================================================
       GET LOGIN TOKEN
    ===================================================== */

    const token =
      localStorage.getItem("miqToken");

    if (!token) {
      alert(
        "Please login to your MIQ account before starting a mock interview."
      );

      return;
    }

    setSavingInterview(true);
    setSubmitError("");

    try {
      /* ===================================================
         SAVE NEW MOCK ATTEMPT
      =================================================== */

      const response = await fetch(
        "http://127.0.0.1:5000/api/mock-interviews/start",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: formData.name.trim(),

            college:
              formData.college.trim(),

            branch:
              formData.branch,

            year:
              formData.year,

            collegeId:
              formData.collegeId.trim(),

            language:
              selectedLanguage,

            questions:
              selectedQuestions,

            capturedImage:
              capturedImage,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to start mock interview."
        );
      }

      if (
        !data.interview ||
        !data.interview._id
      ) {
        throw new Error(
          "Mock interview ID was not returned by the server."
        );
      }

      /* ===================================================
         STORE INTERVIEW ID
      =================================================== */

      setInterviewId(
        data.interview._id
      );

      /* ===================================================
         RESET QUESTIONS
      =================================================== */

      setAnswers(
        Array(selectedQuestions.length).fill("")
      );

      setCurrentQuestion(0);
      setInterviewScore(0);
      setInterviewStartedAt(
        new Date()
      );

      /* ===================================================
         STOP CAMERA AFTER VERIFICATION
      =================================================== */

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }

      setCameraStarted(false);

      /* ===================================================
         OPEN INTERVIEW
      =================================================== */

      setStage("interview");

    } catch (error) {
      console.error(
        "Start mock interview error:",
        error
      );

      setSubmitError(
        error.message ||
          "Unable to start mock interview."
      );

      alert(
        error.message ||
          "Unable to start mock interview."
      );

    } finally {
      setSavingInterview(false);
    }
  };

  /* =========================================================
     ANSWER CHANGE
  ========================================================= */

  const handleAnswerChange = (event) => {
    const value =
      event.target.value;

    setAnswers((previous) => {
      const updated = [
        ...previous,
      ];

      updated[currentQuestion] =
        value;

      return updated;
    });
  };

  /* =========================================================
     NEXT QUESTION
  ========================================================= */

  const handleNextQuestion = () => {
    const currentAnswer =
      answers[currentQuestion]
        ?.trim() || "";

    if (!currentAnswer) {
      alert(
        "Please answer the question before continuing."
      );

      return;
    }

    if (
      currentQuestion <
      questions.length - 1
    ) {
      setCurrentQuestion(
        (previous) =>
          previous + 1
      );

      return;
    }

    finishInterview();
  };

  /* =========================================================
     PREVIOUS QUESTION
  ========================================================= */

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) =>
          previous - 1
      );
    }
  };

  /* =========================================================
     CALCULATE SCORE
  ========================================================= */

  const calculateScore = () => {
    let score = 0;

    answers.forEach((answer) => {
      const cleanedAnswer =
        answer?.trim() || "";

      if (
        cleanedAnswer.length >= 100
      ) {
        score += 10;
      } else if (
        cleanedAnswer.length >= 60
      ) {
        score += 8;
      } else if (
        cleanedAnswer.length >= 30
      ) {
        score += 6;
      } else if (
        cleanedAnswer.length >= 10
      ) {
        score += 4;
      } else if (
        cleanedAnswer.length > 0
      ) {
        score += 2;
      }
    });

    return Math.min(
      100,
      Math.max(0, score)
    );
  };

  /* =========================================================
     FINISH INTERVIEW + SAVE RESULT
  ========================================================= */

  const finishInterview = async () => {
    const score =
      calculateScore();

    const percentage =
      score;

    const performance =
      percentage >= 85
        ? "Excellent"
        : percentage >= 70
        ? "Very Good"
        : percentage >= 50
        ? "Good"
        : "Needs Improvement";

    /* =====================================================
       CHECK INTERVIEW ID
    ===================================================== */

    if (!interviewId) {
      alert(
        "Mock interview session was not created. Please restart the interview."
      );

      return;
    }

    /* =====================================================
       GET TOKEN
    ===================================================== */

    const token =
      localStorage.getItem("miqToken");

    if (!token) {
      alert(
        "Your login session is missing. Please login again."
      );

      return;
    }

    setSavingInterview(true);
    setSubmitError("");

    try {
      /* ===================================================
         SUBMIT TO BACKEND
      =================================================== */

      const response = await fetch(
        `http://127.0.0.1:5000/api/mock-interviews/${interviewId}/submit`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            answers,
            score,
            percentage,
            performance,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to submit mock interview."
        );
      }

      /* ===================================================
         USE SERVER RESULT
      =================================================== */

      if (
        data.interview
      ) {
        setInterviewScore(
          data.interview.score || 0
        );

        if (
          data.interview.capturedImage
        ) {
          setCapturedImage(
            data.interview.capturedImage
          );
        }
      } else {
        setInterviewScore(score);
      }

      setStage("result");

    } catch (error) {
      console.error(
        "Submit mock interview error:",
        error
      );

      setSubmitError(
        error.message ||
          "Failed to submit mock interview."
      );

      alert(
        error.message ||
          "Failed to submit mock interview."
      );

    } finally {
      setSavingInterview(false);
    }
  };

  /* =========================================================
     RESTART
  ========================================================= */

  const handleRestart = () => {
    stopCamera();

    setSelectedLanguage("");

    setFormData({
      name: "",
      college: "",
      branch: "",
      year: "",
      collegeId: "",
    });

    setCapturedImage("");
    setCurrentQuestion(0);
    setAnswers([]);
    setInterviewScore(0);
    setInterviewStartedAt(null);
    setInterviewId("");
    setCameraError("");
    setSubmitError("");
    setSavingInterview(false);

    setStage("language");
  };

  /* =========================================================
     PERFORMANCE
  ========================================================= */

  const percentage =
    interviewScore;

  const getPerformance = () => {
    if (percentage >= 85) {
      return "Excellent";
    }

    if (percentage >= 70) {
      return "Very Good";
    }

    if (percentage >= 50) {
      return "Good";
    }

    return "Needs Improvement";
  };

  /* =========================================================
     LANGUAGE SCREEN
  ========================================================= */

  if (stage === "language") {
    return (
      <main className="mock-interview-page">

        <section className="mock-interview-hero">

          <span className="mock-interview-label">
            MIQ MOCK INTERVIEW
          </span>

          <h1>
            Choose Your
            <span> Interview.</span>
          </h1>

          <p>
            Select the technology you want to
            practice before starting your mock
            interview.
          </p>

        </section>

        <section className="mock-verification-container">

          <div className="mock-verification-card">

            <div className="mock-verification-heading">

              <div className="mock-interview-icon">
                MIQ
              </div>

              <div>
                <span>
                  STEP 01
                </span>

                <h2>
                  Select Technology
                </h2>

                <p>
                  Choose one subject for your
                  10-question mock interview.
                </p>
              </div>

            </div>

            <div
              className="mock-form-grid"
              style={{
                marginTop: "25px",
              }}
            >

              {languages.map(
                (language) => (
                  <button
                    key={language}
                    type="button"
                    className="mock-continue-button"
                    onClick={() =>
                      setSelectedLanguage(
                        language
                      )
                    }
                    style={{
                      opacity:
                        selectedLanguage ===
                        language
                          ? 1
                          : 0.8,

                      border:
                        selectedLanguage ===
                        language
                          ? "2px solid #38bdf8"
                          : "1px solid rgba(148, 163, 184, 0.25)",

                      background:
                        selectedLanguage ===
                        language
                          ? "rgba(56, 189, 248, 0.14)"
                          : "rgba(15, 23, 42, 0.75)",

                      color: "#ffffff",

                      minHeight:
                        "58px",

                      cursor:
                        "pointer",
                    }}
                  >
                    {language}
                  </button>
                )
              )}

            </div>

            {selectedLanguage && (
              <div
                className="mock-verification-notice"
                style={{
                  marginTop:
                    "25px",
                }}
              >

                <span>
                  ✓
                </span>

                <p>
                  Selected interview:{" "}
                  <strong>
                    {selectedLanguage}
                  </strong>{" "}
                  — 10 questions
                </p>

              </div>
            )}

            <div className="mock-verification-actions">

              <button
                type="button"
                className="mock-interview-back-button"
                onClick={onBack}
              >
                ← Back to MIQ
              </button>

              <button
                type="button"
                className="mock-continue-button"
                onClick={
                  handleLanguageContinue
                }
              >
                Continue
                <span>
                  →
                </span>
              </button>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     VERIFICATION SCREEN
  ========================================================= */

  if (stage === "verification") {
    return (
      <main className="mock-interview-page">

        <section className="mock-interview-hero">

          <span className="mock-interview-label">
            MIQ MOCK INTERVIEW
          </span>

          <h1>
            Candidate
            <span> Verification.</span>
          </h1>

          <p>
            Verify your details and capture your
            current photo before starting the
            interview.
          </p>

        </section>

        <section className="mock-verification-container">

          <form
            className="mock-verification-card"
            onSubmit={handleContinue}
          >

            <div className="mock-verification-heading">

              <div className="mock-interview-icon">
                MIQ
              </div>

              <div>

                <span>
                  STEP 02
                </span>

                <h2>
                  Verify Your Details
                </h2>

                <p>
                  Interview:{" "}
                  <strong>
                    {selectedLanguage}
                  </strong>
                </p>

              </div>

            </div>

            {/* =================================================
                DETAILS
            ================================================= */}

            <div className="mock-form-grid">

              <div className="mock-form-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

              </div>

              <div className="mock-form-field">

                <label>
                  College Name
                </label>

                <input
                  type="text"
                  name="college"
                  value={
                    formData.college
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your college name"
                  autoComplete="organization"
                />

              </div>

              <div className="mock-form-field">

                <label>
                  Branch
                </label>

                <select
                  name="branch"
                  value={
                    formData.branch
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select your branch
                  </option>

                  <option value="CSE">
                    Computer Science and Engineering
                  </option>

                  <option value="ECE">
                    Electronics and Communication Engineering
                  </option>

                  <option value="EEE">
                    Electrical and Electronics Engineering
                  </option>

                  <option value="IT">
                    Information Technology
                  </option>

                  <option value="MECH">
                    Mechanical Engineering
                  </option>

                  <option value="CIVIL">
                    Civil Engineering
                  </option>

                  <option value="OTHER">
                    Other
                  </option>

                </select>

              </div>

              <div className="mock-form-field">

                <label>
                  Academic Year
                </label>

                <select
                  name="year"
                  value={
                    formData.year
                  }
                  onChange={
                    handleChange
                  }
                >

                  <option value="">
                    Select your year
                  </option>

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>

                </select>

              </div>

              <div className="mock-form-field mock-full-field">

                <label>
                  College ID Number
                </label>

                <input
                  type="text"
                  name="collegeId"
                  value={
                    formData.collegeId
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your college ID number"
                  autoComplete="off"
                />

              </div>

            </div>

            {/* =================================================
                CAMERA
            ================================================= */}

            <div className="mock-camera-section">

              <div className="mock-camera-header">

                <div>

                  <span>
                    IDENTITY CHECK
                  </span>

                  <h3>
                    Face Verification
                  </h3>

                  <p>
                    Enable your camera and capture
                    your current photo.
                  </p>

                </div>

                <div className="mock-camera-status">

                  {capturedImage
                    ? "PHOTO CAPTURED"
                    : cameraStarted
                    ? "CAMERA ACTIVE"
                    : "NOT VERIFIED"}

                </div>

              </div>

              <div
                className="mock-camera-box"
                style={{
                  minHeight:
                    "350px",
                }}
              >

                {cameraStarted ? (

                  <div
                    className="mock-camera-live"
                    style={{
                      width:
                        "100%",
                      display:
                        "flex",
                      flexDirection:
                        "column",
                      alignItems:
                        "center",
                      gap:
                        "18px",
                    }}
                  >

                    <video
                      ref={
                        videoRef
                      }
                      autoPlay
                      playsInline
                      muted
                      onLoadedMetadata={() => {
                        console.log(
                          "CAMERA VIDEO READY",
                          videoRef.current?.videoWidth,
                          videoRef.current?.videoHeight
                        );
                      }}
                      className="mock-camera-video"
                      style={{
                        width:
                          "100%",
                        maxWidth:
                          "520px",
                        minHeight:
                          "280px",
                        borderRadius:
                          "16px",
                        display:
                          "block",
                        objectFit:
                          "cover",
                        background:
                          "#020617",
                      }}
                    />

                    <div className="mock-camera-live-status">
                      CAMERA ACTIVE
                    </div>

                    <div
                      style={{
                        display:
                          "flex",
                        gap:
                          "12px",
                        flexWrap:
                          "wrap",
                        justifyContent:
                          "center",
                        width:
                          "100%",
                      }}
                    >

                      {!capturedImage ? (

                        <button
                          type="button"
                          onClick={
                            capturePhoto
                          }
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            gap:
                              "10px",
                            minWidth:
                              "190px",
                            minHeight:
                              "52px",
                            padding:
                              "12px 24px",
                            border:
                              "1px solid #38bdf8",
                            borderRadius:
                              "12px",
                            background:
                              "#38bdf8",
                            color:
                              "#020617",
                            fontSize:
                              "15px",
                            fontWeight:
                              "700",
                            cursor:
                              "pointer",
                            visibility:
                              "visible",
                            opacity:
                              1,
                            position:
                              "relative",
                            zIndex:
                              9999,
                          }}
                        >
                          Capture Photo
                          <span>
                            ●
                          </span>
                        </button>

                      ) : (

                        <button
                          type="button"
                          onClick={
                            retakePhoto
                          }
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            minWidth:
                              "190px",
                            minHeight:
                              "52px",
                            padding:
                              "12px 24px",
                            border:
                              "1px solid #38bdf8",
                            borderRadius:
                              "12px",
                            background:
                              "#0f172a",
                            color:
                              "#ffffff",
                            fontSize:
                              "15px",
                            fontWeight:
                              "700",
                            cursor:
                              "pointer",
                            visibility:
                              "visible",
                            opacity:
                              1,
                            position:
                              "relative",
                            zIndex:
                              9999,
                          }}
                        >
                          Retake Photo
                        </button>

                      )}

                    </div>

                  </div>

                ) : (

                  <div className="mock-camera-placeholder">

                    <div className="mock-camera-icon">
                      MIQ
                    </div>

                    <h3>
                      Camera Verification
                    </h3>

                    <p>
                      Allow camera access to
                      continue.
                    </p>

                    <button
                      type="button"
                      className="mock-camera-button"
                      onClick={
                        handleCamera
                      }
                    >
                      Enable Camera
                    </button>

                  </div>

                )}

              </div>

              {/* =================================================
                  CAPTURED IMAGE
              ================================================= */}

              {capturedImage && (

                <div
                  style={{
                    marginTop:
                      "22px",
                    padding:
                      "20px",
                    borderRadius:
                      "18px",
                    border:
                      "1px solid rgba(56, 189, 248, 0.25)",
                    background:
                      "rgba(15, 23, 42, 0.65)",
                  }}
                >

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      marginBottom:
                        "15px",
                      gap:
                        "10px",
                      flexWrap:
                        "wrap",
                    }}
                  >

                    <div>

                      <span
                        style={{
                          color:
                            "#38bdf8",
                          fontSize:
                            "12px",
                          fontWeight:
                            "700",
                          letterSpacing:
                            "1.5px",
                        }}
                      >
                        CURRENT CAPTURE
                      </span>

                      <h3
                        style={{
                          margin:
                            "5px 0 0",
                          color:
                            "#ffffff",
                        }}
                      >
                        Verification Photo
                      </h3>

                    </div>

                    <span
                      style={{
                        color:
                          "#86efac",
                        fontWeight:
                          "700",
                      }}
                    >
                      ✓ Captured
                    </span>

                  </div>

                  <img
                    src={
                      capturedImage
                    }
                    alt="Current captured verification"
                    style={{
                      width:
                        "100%",
                      maxWidth:
                        "420px",
                      display:
                        "block",
                      margin:
                        "0 auto",
                      borderRadius:
                        "16px",
                      border:
                        "2px solid rgba(56, 189, 248, 0.4)",
                      objectFit:
                        "cover",
                    }}
                  />

                </div>

              )}

              <canvas
                ref={
                  canvasRef
                }
                style={{
                  display:
                    "none",
                }}
              />

              {cameraError && (

                <p
                  className="mock-camera-error"
                  style={{
                    marginTop:
                      "15px",
                    color:
                      "#fca5a5",
                    textAlign:
                      "center",
                  }}
                >
                  {cameraError}
                </p>

              )}

            </div>

            {/* =================================================
                BACKEND ERROR
            ================================================= */}

            {submitError && (

              <div
                className="mock-verification-notice"
                style={{
                  marginTop:
                    "18px",
                }}
              >

                <span>
                  !
                </span>

                <p>
                  {submitError}
                </p>

              </div>

            )}

            {/* =================================================
                NOTICE
            ================================================= */}

            <div className="mock-verification-notice">

              <span>
                ✓
              </span>

              <p>
                Your verification information will
                be used only for your MIQ mock
                interview session.
              </p>

            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="mock-verification-actions">

              <button
                type="button"
                className="mock-interview-back-button"
                onClick={() => {
                  stopCamera();
                  setCapturedImage("");
                  setStage("language");
                }}
                disabled={
                  savingInterview
                }
              >
                ← Change Language
              </button>

              <button
                type="submit"
                className="mock-continue-button"
                disabled={
                  savingInterview
                }
              >
                {savingInterview
                  ? "Starting..."
                  : "Start Interview"}

                <span>
                  →
                </span>
              </button>

            </div>

          </form>

        </section>

      </main>
    );
  }

  /* =========================================================
     INTERVIEW SCREEN
  ========================================================= */

  if (stage === "interview") {
    const question =
      questions[currentQuestion];

    const progress =
      questions.length > 0
        ? ((currentQuestion + 1) /
            questions.length) *
          100
        : 0;

    return (
      <main className="mock-interview-page">

        <section className="mock-interview-hero">

          <span className="mock-interview-label">
            MIQ MOCK INTERVIEW
          </span>

          <h1>
            {selectedLanguage}
            <span> Interview.</span>
          </h1>

          <p>
            Answer each question clearly and
            professionally.
          </p>

        </section>

        <section className="mock-question-container">

          <div className="mock-question-card">

            <div className="mock-question-top">

              <div>

                <span>
                  {selectedLanguage.toUpperCase()}
                  {" "}
                  INTERVIEW QUESTION
                </span>

                <h2>
                  Question{" "}
                  {currentQuestion + 1}{" "}
                  of{" "}
                  {questions.length}
                </h2>

              </div>

              <div className="mock-question-progress-text">
                {Math.round(
                  progress
                )}
                %
              </div>

            </div>

            <div className="mock-question-progress">

              <div
                className="mock-question-progress-fill"
                style={{
                  width:
                    `${progress}%`,
                }}
              />

            </div>

            <div className="mock-question-number">
              {String(
                currentQuestion + 1
              ).padStart(
                2,
                "0"
              )}
            </div>

            <h3 className="mock-question-text">
              {question}
            </h3>

            <textarea
              className="mock-answer-input"
              value={
                answers[
                  currentQuestion
                ] || ""
              }
              onChange={
                handleAnswerChange
              }
              placeholder={`Type your ${selectedLanguage} answer here...`}
              rows="8"
            />

            {submitError && (

              <div
                className="mock-verification-notice"
                style={{
                  marginTop:
                    "18px",
                }}
              >

                <span>
                  !
                </span>

                <p>
                  {submitError}
                </p>

              </div>

            )}

            <div className="mock-question-actions">

              <button
                type="button"
                className="mock-interview-back-button"
                onClick={
                  handlePreviousQuestion
                }
                disabled={
                  currentQuestion ===
                    0 ||
                  savingInterview
                }
              >
                ← Previous
              </button>

              <button
                type="button"
                className="mock-continue-button"
                onClick={
                  handleNextQuestion
                }
                disabled={
                  savingInterview
                }
              >
                {savingInterview
                  ? "Submitting..."
                  : currentQuestion ===
                    questions.length - 1
                  ? "Finish Interview"
                  : "Next Question"}

                <span>
                  →
                </span>

              </button>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     RESULT SCREEN
  ========================================================= */

  return (
    <main className="mock-interview-page">

      <section className="mock-interview-hero">

        <span className="mock-interview-label">
          MIQ MOCK INTERVIEW
        </span>

        <h1>
          Interview
          <span> Completed.</span>
        </h1>

        <p>
          Your {selectedLanguage} mock interview
          session has been completed successfully.
        </p>

      </section>

      <section className="mock-result-container">

        <div className="mock-result-card">

          <div className="mock-result-badge">
            MIQ
          </div>

          <span className="mock-result-label">
            FINAL PERFORMANCE
          </span>

          <h2>
            {interviewScore} / 100
          </h2>

          <h3>
            {getPerformance()}
          </h3>

          <p>
            Well done,{" "}
            {formData.name}.
            You completed all{" "}
            {questions.length}{" "}
            {selectedLanguage} interview
            questions.
          </p>

          {/* =================================================
              VERIFIED PHOTO
          ================================================= */}

          {capturedImage && (

            <div
              style={{
                margin:
                  "25px auto",
                textAlign:
                  "center",
              }}
            >

              <span
                style={{
                  display:
                    "block",
                  color:
                    "#38bdf8",
                  fontSize:
                    "12px",
                  fontWeight:
                    "700",
                  letterSpacing:
                    "1.5px",
                  marginBottom:
                    "10px",
                }}
              >
                VERIFIED CANDIDATE
              </span>

              <img
                src={
                  capturedImage
                }
                alt="Verified candidate"
                style={{
                  width:
                    "120px",
                  height:
                    "120px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "50%",
                  border:
                    "3px solid #38bdf8",
                }}
              />

            </div>

          )}

          {/* =================================================
              RESULT DETAILS
          ================================================= */}

          <div className="mock-result-details">

            <div>

              <span>
                Candidate
              </span>

              <strong>
                {formData.name}
              </strong>

            </div>

            <div>

              <span>
                Interview
              </span>

              <strong>
                {selectedLanguage}
              </strong>

            </div>

            <div>

              <span>
                College
              </span>

              <strong>
                {formData.college}
              </strong>

            </div>

            <div>

              <span>
                Branch
              </span>

              <strong>
                {formData.branch}
              </strong>

            </div>

            <div>

              <span>
                Questions
              </span>

              <strong>
                {questions.length}
              </strong>

            </div>

          </div>

          {/* =================================================
              SAVE CONFIRMATION
          ================================================= */}

          <div
            className="mock-verification-notice"
            style={{
              marginTop:
                "25px",
            }}
          >

            <span>
              ✓
            </span>

            <p>
              Your mock interview result and
              verification photo have been saved
              to your MIQ account.
            </p>

          </div>

          {/* =================================================
              RESULT ACTIONS
          ================================================= */}

          <div className="mock-result-actions">

            <button
              type="button"
              className="mock-interview-back-button"
              onClick={
                onBack
              }
            >
              ← Back to MIQ
            </button>

            <button
              type="button"
              className="mock-continue-button"
              onClick={
                handleRestart
              }
            >
              Start Again
              <span>
                ↻
              </span>
            </button>

          </div>

          {interviewStartedAt && (

            <p className="mock-result-date">
              Session started{" "}
              {interviewStartedAt.toLocaleString(
                "en-IN"
              )}
            </p>

          )}

        </div>

      </section>

    </main>
  );
}

export default MockInterview;