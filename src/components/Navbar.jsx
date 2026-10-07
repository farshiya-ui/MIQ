import { useState } from "react";

import "./Navbar.css";

function Navbar({
  onMenuClick,
  onLogoClick,
  onLogin,
  onSignup,
  user,
  isLoggedIn,
  onLogout,
}) {
  const [profileOpen, setProfileOpen] = useState(false);

  const firstLetter =
    user?.username?.charAt(0)?.toUpperCase() || "U";

  const handleProfileClick = () => {
    setProfileOpen((previous) => !previous);
  };

  const handleLogout = () => {
    setProfileOpen(false);

    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="navbar">

      {/* ================= LEFT ================= */}

      <div className="navbar-left">

        <button
          className="navbar-menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <button
          className="navbar-logo-button"
          onClick={onLogoClick}
          aria-label="Open MIQ"
        >
          <span className="navbar-logo-text">
            MIQ
          </span>
        </button>

      </div>


      {/* ================= RIGHT ================= */}

      <div className="navbar-right">

        {!isLoggedIn || !user ? (
          <>
            {/* LOGIN */}

            <button
              className="navbar-login-button"
              onClick={onLogin}
            >
              Login
            </button>


            {/* SIGN UP */}

            <button
              className="navbar-signup-button"
              onClick={onSignup}
            >
              Sign Up
            </button>
          </>
        ) : (
          <div className="navbar-profile">

            {/* ================= PROFILE BUTTON ================= */}

            <button
              className="navbar-profile-button"
              onClick={handleProfileClick}
              aria-label="Open profile"
            >
              {firstLetter}
            </button>


            {/* ================= PROFILE PANEL ================= */}

            {profileOpen && (
              <div className="navbar-profile-panel">

                {/* LARGE AVATAR */}

                <div className="profile-avatar-large">
                  {firstLetter}
                </div>


                {/* ================= USER INFORMATION ================= */}

                <div className="profile-user-info">

                  <span className="profile-label">
                    MIQ MEMBER
                  </span>

                  <h3>
                    {user.username}
                  </h3>

                  <p>
                    {user.email}
                  </p>

                </div>


                {/* ================= PROFILE DETAILS ================= */}

                <div className="profile-details">

                  {/* COLLEGE */}

                  <div className="profile-detail-row">

                    <span className="profile-detail-label">
                      College
                    </span>

                    <span className="profile-detail-value">
                      {user.collegeName ||
                        user.profile?.collegeName ||
                        "Not added"}
                    </span>

                  </div>


                  {/* BRANCH */}

                  <div className="profile-detail-row">

                    <span className="profile-detail-label">
                      Branch
                    </span>

                    <span className="profile-detail-value">
                      {user.branch ||
                        user.profile?.branch ||
                        "Not added"}
                    </span>

                  </div>


                  {/* YEAR */}

                  <div className="profile-detail-row">

                    <span className="profile-detail-label">
                      Year
                    </span>

                    <span className="profile-detail-value">
                      {user.year ||
                        user.profile?.year ||
                        "Not added"}
                    </span>

                  </div>

                </div>


                {/* ================= PROFILE QUOTE ================= */}

                <div className="profile-quote">

                  <span className="profile-quote-mark">
                    “
                  </span>

                  <p>
                    Every question you practice
                    brings you one step closer
                    to your dream interview.
                  </p>

                  <span className="profile-quote-author">
                    — MIQ
                  </span>

                </div>


                {/* ================= LOGOUT ================= */}

                <button
                  className="profile-logout-button"
                  onClick={handleLogout}
                >
                  <span>
                    ↪
                  </span>

                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </div>

    </header>
  );
}

export default Navbar;