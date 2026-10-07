import { useState } from "react";
import "./AdminLogin.css";

const API_URL = import.meta.env.VITE_API_URL;

function AdminLogin({ onBack }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username || !password) {
      setError("Please enter admin username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/admin-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Admin login failed."
        );
      }

      localStorage.setItem(
        "miqAdminToken",
        data.token
      );

      localStorage.setItem(
        "miqAdmin",
        JSON.stringify(data.admin)
      );

      window.location.href = "/admin-dashboard";
    } catch (err) {
      setError(
        err.message ||
          "Unable to login as admin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          MIQ
        </div>

        <div className="admin-login-label">
          ADMINISTRATOR ACCESS
        </div>

        <h1>
          Admin Login
        </h1>

        <p className="admin-login-subtitle">
          Sign in to manage the MIQ platform.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Admin Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In as Admin"}
          </button>

        </form>

        <button
          type="button"
          className="admin-back-button"
          onClick={onBack}
        >
          ← Back to MIQ
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;