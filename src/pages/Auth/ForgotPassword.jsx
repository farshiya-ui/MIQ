import { useState } from "react";
import "./ForgotPassword.css";

const API_URL = import.meta.env.VITE_API_URL;

function ForgotPassword({ onBackToLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    collegeName: "",
    branch: "",
    year: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (
      !form.username ||
      !form.email ||
      !form.collegeName ||
      !form.branch ||
      !form.year
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/verify-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Account verification failed."
        );
      }

      localStorage.setItem(
        "miqResetSession",
        JSON.stringify({
          resetToken: data.resetToken,
          user: data.user,
        })
      );

      localStorage.removeItem("miqResetUser");

      setMessage(
        "Account verified successfully. You can now create a new password."
      );

      setTimeout(() => {
        window.location.href = "/reset-password";
      }, 1500);
    } catch (err) {
      setError(
        err.message || "Unable to verify your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-logo">MIQ</div>

        <h1>Forgot Password?</h1>

        <p className="forgot-subtitle">
          Verify your account details to create a new password.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={form.collegeName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
          />

          <input
            type="text"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
          />

          {error && (
            <div className="forgot-error">
              {error}
            </div>
          )}

          {message && (
            <div className="forgot-success">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>

        <button
          type="button"
          className="back-login-btn"
          onClick={() => {
            if (onBackToLogin) {
              onBackToLogin();
            } else {
              window.location.href = "/";
            }
          }}
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;