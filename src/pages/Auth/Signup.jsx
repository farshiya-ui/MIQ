import { useState } from "react";
import "./Auth.css";

const API_URL = import.meta.env.VITE_API_URL;

function Signup({ onBack, onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeName: "",
    branch: "",
    year: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.collegeName ||
      !formData.branch ||
      !formData.year
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            collegeName: formData.collegeName,
            branch: formData.branch,
            year: formData.year,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Signup failed.");
        return;
      }

      setMessage(
        "Account created successfully! Please login."
      );

      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        collegeName: "",
        branch: "",
        year: "",
      });

      setTimeout(() => {
        onLogin();
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        "Unable to connect to MIQ server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href =
      `${API_URL}/api/auth/google`;
  };

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
            JOIN MIQ
          </span>

          <h1>
            Create your account
          </h1>

          <p>
            Start your interview preparation journey with MIQ.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="auth-field">
            <label>
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

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
              College Name
            </label>

            <input
              type="text"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="Enter your college name"
            />
          </div>

          <div className="auth-field">
            <label>
              Branch
            </label>

            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Enter your branch"
            />
          </div>

          <div className="auth-field">
            <label>
              Year
            </label>

            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Example: 3rd Year"
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
              placeholder="Create a password"
            />
          </div>

          <div className="auth-field">
            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
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
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button
          type="button"
          className="google-auth-button"
          onClick={handleGoogleSignup}
        >
          <span>G</span>
          Continue with Google
        </button>

        <p className="auth-switch">
          Already have an account?

          <button
            type="button"
            onClick={onLogin}
          >
            Login
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

export default Signup;