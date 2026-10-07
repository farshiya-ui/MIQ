import { useState } from "react";
import "./Auth.css";

const API_URL = import.meta.env.VITE_API_URL;

function Login({
  onBack,
  onSignup,
  onForgotPassword,
  onLoginSuccess,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // =====================================================
  // NORMAL LOGIN
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Login failed."
        );
        return;
      }

      localStorage.setItem(
        "miqToken",
        data.token
      );

      localStorage.setItem(
        "miqUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "miqLoggedIn",
        "true"
      );

      setMessage("Login successful!");

      setTimeout(() => {
        onLoginSuccess(data.user);
      }, 700);
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setMessage(
        "Unable to connect to MIQ server. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = () => {
    window.location.href =
      `${API_URL}/api/auth/google`;
  };

  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  return (
    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-brand">
          <span>M</span>
          <span>I</span>
          <span>Q</span>
        </div>

        <div className="auth-heading">

          <span className="auth-label">
            WELCOME BACK
          </span>

          <h1>
            Login to MIQ
          </h1>

          <p>
            Continue your interview preparation journey.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

          </div>

          <div className="auth-field">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

          </div>

          {/* =================================================
              FORGOT PASSWORD
          ================================================= */}

          <div className="auth-forgot">

            <button
              type="button"
              onClick={() => {
                if (onForgotPassword) {
                  onForgotPassword();
                }
              }}
            >
              Forgot Password?
            </button>

          </div>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-primary-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* =================================================
            GOOGLE LOGIN
        ================================================= */}

        <button
          type="button"
          className="google-auth-button"
          onClick={handleGoogleLogin}
        >
          <span>G</span>
          Continue with Google
        </button>

        <p className="auth-switch">

          Don't have an account?

          <button
            type="button"
            onClick={onSignup}
          >
            Create Account
          </button>

        </p>

        <button
          type="button"
          className="auth-back-button"
          onClick={onBack}
        >
          ← Back to MIQ
        </button>

      </div>

    </main>
  );
}

export default Login;