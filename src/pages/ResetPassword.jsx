import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to reset password."
        );
      }

      setMessage(
        "Password reset successfully. You can now login."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setError(
        err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">

        <div className="reset-logo">
          MIQ
        </div>

        <h1>Reset Password</h1>

        <p>
          Create a new password for your MIQ account.
        </p>

        <form onSubmit={handleResetPassword}>

          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          {error && (
            <div className="reset-error">
              {error}
            </div>
          )}

          {message && (
            <div className="reset-success">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

        <button
          className="back-login-button"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;