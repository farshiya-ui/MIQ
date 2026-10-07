import { useState } from "react";
import "./ResetPassword.css";
function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // -----------------------------------------------------
    // GET VERIFIED RESET SESSION
    // -----------------------------------------------------

    const savedResetSession =
      localStorage.getItem("miqResetSession");

    if (!savedResetSession) {
      setError(
        "Your verification session has expired. Please start again."
      );
      return;
    }

    let resetSession;

    try {
      resetSession = JSON.parse(savedResetSession);
    } catch {
      setError(
        "Invalid reset session. Please start again."
      );
      return;
    }

    if (!resetSession.resetToken) {
      setError(
        "Invalid reset session. Please start again."
      );
      return;
    }

    // -----------------------------------------------------
    // RESET PASSWORD
    // -----------------------------------------------------

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            resetToken: resetSession.resetToken,
            password: password,
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

      // ---------------------------------------------------
      // REMOVE RESET SESSION
      // ---------------------------------------------------

      localStorage.removeItem("miqResetSession");
      localStorage.removeItem("miqResetUser");

      setPassword("");
      setConfirmPassword("");

      setMessage(
        "Password reset successfully. You can now login."
      );

      // ---------------------------------------------------
      // RETURN TO LOGIN
      // ---------------------------------------------------

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">

        <div className="reset-logo">
          MIQ
        </div>

        <h1>
          Create New Password
        </h1>

        <p className="reset-subtitle">
          Your account has been verified.
          Create a new password for your MIQ account.
        </p>

        <form onSubmit={handleResetPassword}>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
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
              ? "Updating Password..."
              : "Update Password"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;