import { useState } from "react";

import Settings from "./pages/Settings/Settings";
import Welcome from "./pages/Welcome/Welcome";
import Home from "./pages/Home/Home";
import AboutMIQ from "./pages/About/AboutMIQ";
import Dashboard from "./pages/Dashboard/Dashboard";
import QuestionBank from "./pages/QuestionBank/QuestionBank";
import LanguageQuestions from "./pages/QuestionBank/LanguageQuestions";
import Quiz from "./pages/Quiz/Quiz";
import Certificates from "./pages/Certificates/Certificates";
import Scoreboard from "./pages/Scoreboard/Scoreboard";
import MockInterview from "./pages/MockInterview/MockInterview";

import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import AuthRequired from "./pages/Auth/AuthRequired";
import GoogleSuccess from "./pages/Auth/GoogleSuccess";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminParticipants from "./pages/Admin/AdminParticipants";
import AdminQuizResults from "./pages/Admin/AdminQuizResults";
import AdminMockInterviews from "./pages/Admin/AdminMockInterviews";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] =
    useState("welcome");

  // =========================================================
  // LOGIN STATE
  // =========================================================

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return (
      localStorage.getItem("miqLoggedIn") ===
      "true"
    );
  });

  // =========================================================
  // LOGGED-IN USER
  // =========================================================

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser =
      localStorage.getItem("miqUser");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      return null;
    }
  });

  // =========================================================
  // SELECTED LANGUAGE
  // =========================================================

  const [selectedLanguage, setSelectedLanguage] =
    useState("");

  // =========================================================
  // CERTIFICATE
  // =========================================================

  const [certificate, setCertificate] =
    useState(() => {
      const savedCertificate =
        localStorage.getItem(
          "miqCertificate"
        );

      return savedCertificate
        ? JSON.parse(savedCertificate)
        : null;
    });

  // =========================================================
  // RESET PASSWORD
  // =========================================================

  if (
    window.location.pathname ===
    "/reset-password"
  ) {
    return (
      <ResetPassword
        onBackToLogin={() => {
          window.history.replaceState(
            {},
            document.title,
            "/"
          );

          setCurrentPage("login");
        }}
      />
    );
  }

  // =========================================================
  // GOOGLE LOGIN SUCCESS
  // =========================================================

  if (
    window.location.pathname ===
    "/google-success"
  ) {
    return (
      <GoogleSuccess
        onLoginSuccess={(user) => {
          console.log(
            "Google logged in user:",
            user
          );

          setCurrentUser(user);
          setIsLoggedIn(true);

          localStorage.setItem(
            "miqLoggedIn",
            "true"
          );

          localStorage.setItem(
            "miqUser",
            JSON.stringify(user)
          );

          setCurrentPage("home");
        }}
      />
    );
  }

  // =========================================================
  // ADMIN LOGIN
  // =========================================================

  if (
    window.location.pathname ===
    "/admin-login"
  ) {
    return (
      <AdminLogin
        onBack={() => {
          window.history.replaceState(
            {},
            document.title,
            "/"
          );

          setCurrentPage("home");
        }}
      />
    );
  }

  // =========================================================
  // ADMIN DASHBOARD
  // =========================================================

  if (
    window.location.pathname ===
    "/admin-dashboard"
  ) {
    return <AdminDashboard />;
  }

  // =========================================================
  // ADMIN PARTICIPANTS
  // =========================================================

  if (
    window.location.pathname ===
    "/admin-participants"
  ) {
    return <AdminParticipants />;
  }

  // =========================================================
  // ADMIN QUIZ RESULTS
  // =========================================================

  if (
    window.location.pathname ===
    "/admin-quiz-results"
  ) {
    return <AdminQuizResults />;
  }

  // =========================================================
  // ADMIN MOCK INTERVIEW RESULTS
  // =========================================================

  if (
    window.location.pathname ===
    "/admin-mock-interviews"
  ) {
    return <AdminMockInterviews />;
  }

  // =========================================================
  // WELCOME
  // =========================================================

  if (currentPage === "welcome") {
    return (
      <Welcome
        onEnter={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // ABOUT MIQ
  // =========================================================

  if (currentPage === "about") {
    return (
      <AboutMIQ
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  if (currentPage === "dashboard") {
    if (!isLoggedIn) {
      return (
        <AuthRequired
          onLogin={() =>
            setCurrentPage("login")
          }
          onSignup={() =>
            setCurrentPage("signup")
          }
          onBack={() =>
            setCurrentPage("home")
          }
        />
      );
    }

    return (
      <Dashboard
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // CERTIFICATES
  // =========================================================

  if (
    currentPage ===
    "certificates"
  ) {
    if (!isLoggedIn) {
      return (
        <AuthRequired
          onLogin={() =>
            setCurrentPage("login")
          }
          onSignup={() =>
            setCurrentPage("signup")
          }
          onBack={() =>
            setCurrentPage("home")
          }
        />
      );
    }

    return (
      <Certificates
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // SCOREBOARD
  // =========================================================

  if (
    currentPage ===
    "scoreboard"
  ) {
    if (!isLoggedIn) {
      return (
        <AuthRequired
          onLogin={() =>
            setCurrentPage("login")
          }
          onSignup={() =>
            setCurrentPage("signup")
          }
          onBack={() =>
            setCurrentPage("home")
          }
        />
      );
    }

    return (
      <Scoreboard
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // MOCK INTERVIEW
  // =========================================================

  if (
    currentPage ===
    "mock-interview"
  ) {
    if (!isLoggedIn) {
      return (
        <AuthRequired
          onLogin={() =>
            setCurrentPage("login")
          }
          onSignup={() =>
            setCurrentPage("signup")
          }
          onBack={() =>
            setCurrentPage("home")
          }
        />
      );
    }

    return (
      <MockInterview
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // SETTINGS
  // =========================================================

  if (
    currentPage ===
    "settings"
  ) {
    if (!isLoggedIn) {
      return (
        <AuthRequired
          onLogin={() =>
            setCurrentPage("login")
          }
          onSignup={() =>
            setCurrentPage("signup")
          }
          onBack={() =>
            setCurrentPage("home")
          }
        />
      );
    }

    return (
      <Settings
        onBack={() =>
          setCurrentPage("home")
        }
      />
    );
  }

  // =========================================================
  // QUESTION BANK
  // =========================================================

  if (
    currentPage ===
    "question-bank"
  ) {
    return (
      <QuestionBank
        onBack={() =>
          setCurrentPage("home")
        }
        onLanguageSelect={(language) => {
          setSelectedLanguage(language);

          setCurrentPage(
            "language-questions"
          );
        }}
      />
    );
  }

  // =========================================================
  // LANGUAGE QUESTIONS
  // =========================================================

  if (
    currentPage ===
    "language-questions"
  ) {
    return (
      <LanguageQuestions
        language={
          selectedLanguage
        }

        onBack={() =>
          setCurrentPage(
            "question-bank"
          )
        }

        onStartQuiz={(language) => {
          setSelectedLanguage(
            language
          );

          setCurrentPage("quiz");
        }}
      />
    );
  }

  // =========================================================
  // QUIZ
  // =========================================================

  if (currentPage === "quiz") {
    if (!isLoggedIn) {
      return (
        <AuthRequired
          onLogin={() =>
            setCurrentPage("login")
          }
          onSignup={() =>
            setCurrentPage("signup")
          }
          onBack={() =>
            setCurrentPage("home")
          }
        />
      );
    }

    return (
      <Quiz
        language={
          selectedLanguage
        }

        onBack={() =>
          setCurrentPage(
            "language-questions"
          )
        }

        onCertificate={(newCertificate) => {
          setCertificate(
            newCertificate
          );

          localStorage.setItem(
            "miqCertificate",
            JSON.stringify(
              newCertificate
            )
          );
        }}
      />
    );
  }

  // =========================================================
  // SIGN UP
  // =========================================================

  if (currentPage === "signup") {
    return (
      <Signup
        onBack={() =>
          setCurrentPage("home")
        }

        onLogin={() =>
          setCurrentPage("login")
        }
      />
    );
  }

  // =========================================================
  // FORGOT PASSWORD
  // =========================================================

  if (
    currentPage ===
    "forgot-password"
  ) {
    return (
      <ForgotPassword
        onBackToLogin={() => {
          setCurrentPage("login");
        }}
      />
    );
  }

  // =========================================================
  // LOGIN
  // =========================================================

  if (currentPage === "login") {
    return (
      <Login
        onBack={() =>
          setCurrentPage("home")
        }

        onSignup={() =>
          setCurrentPage("signup")
        }

        onForgotPassword={() =>
          setCurrentPage(
            "forgot-password"
          )
        }

        onLoginSuccess={(user) => {
          console.log(
            "Logged in user:",
            user
          );

          setCurrentUser(user);
          setIsLoggedIn(true);

          localStorage.setItem(
            "miqLoggedIn",
            "true"
          );

          localStorage.setItem(
            "miqUser",
            JSON.stringify(user)
          );

          setCurrentPage("home");
        }}
      />
    );
  }

  // =========================================================
  // HOME
  // =========================================================

  return (
    <Home
      user={currentUser}
      isLoggedIn={isLoggedIn}

      onMenuClick={() => {
        console.log(
          "Menu clicked"
        );
      }}

      onLogoClick={() => {
        setCurrentPage("about");
      }}

      onLogin={() => {
        setCurrentPage("login");
      }}

      onSignup={() => {
        setCurrentPage("signup");
      }}

      onDashboard={() => {
        setCurrentPage("dashboard");
      }}

      onQuestionBank={() => {
        setCurrentPage(
          "question-bank"
        );
      }}

      onCertificates={() => {
        setCurrentPage(
          "certificates"
        );
      }}

      onScoreboard={() => {
        setCurrentPage(
          "scoreboard"
        );
      }}

      onMockInterview={() => {
        console.log(
          "MOCK INTERVIEW BUTTON CONNECTED"
        );

        setCurrentPage(
          "mock-interview"
        );
      }}

      onSettings={() => {
        setCurrentPage("settings");
      }}

      onLogout={() => {
        localStorage.removeItem(
          "miqToken"
        );

        localStorage.removeItem(
          "miqLoggedIn"
        );

        localStorage.removeItem(
          "miqUser"
        );

        setCurrentUser(null);
        setIsLoggedIn(false);
        setCurrentPage("home");
      }}
    />
  );
}

export default App;