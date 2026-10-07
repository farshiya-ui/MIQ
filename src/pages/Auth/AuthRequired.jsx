import "./AuthRequired.css";

function AuthRequired({ onLogin, onSignup, onBack }) {
  return (
    <main className="auth-required-page">

      <div className="auth-required-card">

        <div className="auth-required-icon">
          🔐
        </div>

        <span className="auth-required-label">
          MIQ ACCOUNT REQUIRED
        </span>

        <h1>
          Login to Continue
        </h1>

        <p>
          Please login or create an MIQ account to access
          this feature and continue your interview preparation.
        </p>

        <div className="auth-required-actions">

          <button
            className="auth-required-login"
            onClick={onLogin}
          >
            Login
            <span>→</span>
          </button>

          <button
            className="auth-required-signup"
            onClick={onSignup}
          >
            Create Account
          </button>

        </div>

        <button
          className="auth-required-back"
          onClick={onBack}
        >
          ← Back to MIQ
        </button>

      </div>

    </main>
  );
}

export default AuthRequired;