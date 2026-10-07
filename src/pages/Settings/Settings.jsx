import { useEffect, useState } from "react";
import "./Settings.css";

const API_URL = import.meta.env.VITE_API_URL;

function Settings({ onBack }) {
  const [activeSection, setActiveSection] = useState(null);

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const [editForm, setEditForm] = useState({
    collegeName: "",
    branch: "",
    year: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  // LOAD PROFILE FROM BACKEND
  useEffect(() => {
    const token = localStorage.getItem("miqToken");

    if (!token) {
      setProfileLoading(false);
      return;
    }

    fetch(`${API_URL}/api/profile/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile."
          );
        }

        return data;
      })
      .then((data) => {
        setProfile(data.user);

        setEditForm({
          collegeName:
            data.user?.profile?.collegeName || "",
          branch:
            data.user?.profile?.branch || "",
          year:
            data.user?.profile?.year || "",
        });
      })
      .catch((error) => {
        console.error(
          "Profile loading error:",
          error
        );
      })
      .finally(() => {
        setProfileLoading(false);
      });
  }, []);

  const user = JSON.parse(
    localStorage.getItem("miqUser") || "null"
  );

  const username =
    profile?.username ||
    user?.username ||
    "MIQ User";

  const email =
    profile?.email ||
    user?.email ||
    "Not available";

  // HANDLE FORM INPUT
  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // SAVE PROFILE TO BACKEND
  const handleSaveProfile = async () => {
    const token = localStorage.getItem("miqToken");

    if (!token) {
      setProfileMessage(
        "Please login again before updating your profile."
      );
      return;
    }

    setSavingProfile(true);
    setProfileMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/profile/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update profile."
        );
      }

      setProfile(data.user);

      setEditForm({
        collegeName:
          data.user?.profile?.collegeName || "",
        branch:
          data.user?.profile?.branch || "",
        year:
          data.user?.profile?.year || "",
      });

      setProfileMessage(
        "Profile updated successfully."
      );

      setActiveSection("account");

    } catch (error) {
      console.error(
        "Profile update error:",
        error
      );

      setProfileMessage(
        error.message ||
          "Something went wrong while updating your profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <main className="settings-page">

      {/* HEADER */}

      <header className="settings-header">

        <button
          className="settings-back-button"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="settings-title-area">

          <span className="settings-label">
            MIQ SETTINGS
          </span>

          <h1>
            Settings
          </h1>

          <p>
            Manage your MIQ preferences and account settings.
          </p>

        </div>

      </header>


      {/* SETTINGS CONTENT */}

      <section className="settings-content">

        {/* ACCOUNT */}

        <div className="settings-card">

          <div className="settings-card-icon">
            👤
          </div>

          <div className="settings-card-content">

            <span className="settings-card-label">
              ACCOUNT
            </span>

            <h2>
              Account Information
            </h2>

            <p>
              Manage your MIQ account information and profile details.
            </p>

          </div>

          <button
            className="settings-action-button"
            onClick={() =>
              setActiveSection(
                activeSection === "account"
                  ? null
                  : "account"
              )
            }
          >
            {activeSection === "account"
              ? "Close"
              : "Manage →"}
          </button>

        </div>


        {/* ACCOUNT DETAILS */}

        {activeSection === "account" && (

          <div className="settings-detail-card">

            <div className="settings-detail-header">

              <span>
                ACCOUNT DETAILS
              </span>

              <h2>
                Your MIQ Profile
              </h2>

            </div>


            {profileMessage && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background:
                    "rgba(120, 255, 200, 0.08)",
                  border:
                    "1px solid rgba(120, 255, 200, 0.3)",
                  color: "#8fffd0",
                  fontSize: "14px",
                }}
              >
                {profileMessage}
              </div>
            )}


            <div className="settings-profile-grid">

              <div className="settings-profile-item">

                <span>
                  USERNAME
                </span>

                <strong>
                  {profileLoading
                    ? "Loading..."
                    : username}
                </strong>

              </div>


              <div className="settings-profile-item">

                <span>
                  EMAIL
                </span>

                <strong>
                  {profileLoading
                    ? "Loading..."
                    : email}
                </strong>

              </div>


              <div className="settings-profile-item">

                <span>
                  COLLEGE
                </span>

                <strong>
                  {profileLoading
                    ? "Loading..."
                    : profile?.profile?.collegeName ||
                      "Not added yet"}
                </strong>

              </div>


              <div className="settings-profile-item">

                <span>
                  BRANCH
                </span>

                <strong>
                  {profileLoading
                    ? "Loading..."
                    : profile?.profile?.branch ||
                      "Not added yet"}
                </strong>

              </div>


              <div className="settings-profile-item">

                <span>
                  YEAR
                </span>

                <strong>
                  {profileLoading
                    ? "Loading..."
                    : profile?.profile?.year ||
                      "Not added yet"}
                </strong>

              </div>

            </div>


            {/* EDIT PROFILE BUTTON */}

            <div
              style={{
                marginTop: "25px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >

              <button
                className="settings-action-button"
                onClick={() => {
                  setProfileMessage("");

                  setEditForm({
                    collegeName:
                      profile?.profile?.collegeName ||
                      "",
                    branch:
                      profile?.profile?.branch ||
                      "",
                    year:
                      profile?.profile?.year ||
                      "",
                  });

                  setActiveSection(
                    "edit-profile"
                  );
                }}
              >
                Edit Profile
              </button>

            </div>

          </div>

        )}


        {/* EDIT PROFILE */}

        {activeSection === "edit-profile" && (

          <div className="settings-detail-card">

            <div className="settings-detail-header">

              <span>
                EDIT PROFILE
              </span>

              <h2>
                Update Your MIQ Profile
              </h2>

            </div>


            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                marginTop: "20px",
              }}
            >

              {/* COLLEGE */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    fontWeight: "700",
                    color: "#8fffd0",
                  }}
                >
                  COLLEGE NAME
                </label>

                <input
                  type="text"
                  name="collegeName"
                  value={
                    editForm.collegeName
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Enter your college name"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 15px",
                    borderRadius: "10px",
                    border:
                      "1px solid rgba(120, 180, 255, 0.25)",
                    background:
                      "rgba(255, 255, 255, 0.04)",
                    color: "#ffffff",
                    outline: "none",
                    fontSize: "15px",
                  }}
                />

              </div>


              {/* BRANCH */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    fontWeight: "700",
                    color: "#8fffd0",
                  }}
                >
                  BRANCH
                </label>

                <input
                  type="text"
                  name="branch"
                  value={
                    editForm.branch
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Example: Computer Science and Engineering"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 15px",
                    borderRadius: "10px",
                    border:
                      "1px solid rgba(120, 180, 255, 0.25)",
                    background:
                      "rgba(255, 255, 255, 0.04)",
                    color: "#ffffff",
                    outline: "none",
                    fontSize: "15px",
                  }}
                />

              </div>


              {/* YEAR */}

              <div>

                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontSize: "12px",
                    letterSpacing: "1px",
                    fontWeight: "700",
                    color: "#8fffd0",
                  }}
                >
                  YEAR
                </label>

                <input
                  type="text"
                  name="year"
                  value={
                    editForm.year
                  }
                  onChange={
                    handleProfileChange
                  }
                  placeholder="Example: 3rd Year"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "13px 15px",
                    borderRadius: "10px",
                    border:
                      "1px solid rgba(120, 180, 255, 0.25)",
                    background:
                      "rgba(255, 255, 255, 0.04)",
                    color: "#ffffff",
                    outline: "none",
                    fontSize: "15px",
                  }}
                />

              </div>


              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "8px",
                  flexWrap: "wrap",
                }}
              >

                <button
                  className="settings-action-button"
                  onClick={() =>
                    setActiveSection(
                      "account"
                    )
                  }
                >
                  Cancel
                </button>


                <button
                  className="settings-action-button"
                  onClick={
                    handleSaveProfile
                  }
                  disabled={
                    savingProfile
                  }
                  style={{
                    opacity: savingProfile
                      ? 0.6
                      : 1,
                    cursor: savingProfile
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {savingProfile
                    ? "Saving..."
                    : "Save Profile"}
                </button>

              </div>

            </div>

          </div>

        )}


        {/* APPEARANCE */}

        <div className="settings-card">

          <div className="settings-card-icon">
            🎨
          </div>

          <div className="settings-card-content">

            <span className="settings-card-label">
              APPEARANCE
            </span>

            <h2>
              Interface Theme
            </h2>

            <p>
              MIQ currently uses the dark navy, blue and mint interface.
            </p>

          </div>

          <button
            className="settings-status settings-clickable"
            onClick={() =>
              setActiveSection(
                activeSection === "appearance"
                  ? null
                  : "appearance"
              )
            }
          >
            DARK
          </button>

        </div>


        {/* APPEARANCE DETAILS */}

        {activeSection === "appearance" && (

          <div className="settings-detail-card">

            <div className="settings-detail-header">

              <span>
                APPEARANCE
              </span>

              <h2>
                Interface Theme
              </h2>

            </div>

            <div className="settings-theme-options">

              <button className="settings-theme-option active">

                <span>
                  🌙
                </span>

                <strong>
                  Dark
                </strong>

                <small>
                  MIQ dark interface
                </small>

              </button>


              <button className="settings-theme-option">

                <span>
                  ☀️
                </span>

                <strong>
                  Light
                </strong>

                <small>
                  Coming soon
                </small>

              </button>

            </div>

          </div>

        )}


        {/* SECURITY */}

        <div className="settings-card">

          <div className="settings-card-icon">
            🔐
          </div>

          <div className="settings-card-content">

            <span className="settings-card-label">
              SECURITY
            </span>

            <h2>
              Account Security
            </h2>

            <p>
              Your MIQ account uses secure password authentication.
            </p>

          </div>

          <button
            className="settings-status settings-status-secure settings-clickable"
            onClick={() =>
              setActiveSection(
                activeSection === "security"
                  ? null
                  : "security"
              )
            }
          >
            SECURE
          </button>

        </div>


        {/* SECURITY DETAILS */}

        {activeSection === "security" && (

          <div className="settings-detail-card">

            <div className="settings-detail-header">

              <span>
                SECURITY
              </span>

              <h2>
                Account Security
              </h2>

            </div>

            <div className="settings-security-info">

              <div>

                <strong>
                  Password Authentication
                </strong>

                <p>
                  Your account is protected by your MIQ password.
                </p>

              </div>


              <div>

                <strong>
                  JWT Authentication
                </strong>

                <p>
                  MIQ uses secure authentication tokens for logged-in sessions.
                </p>

              </div>

            </div>

          </div>

        )}


        {/* NOTIFICATIONS */}

        <div className="settings-card">

          <div className="settings-card-icon">
            🔔
          </div>

          <div className="settings-card-content">

            <span className="settings-card-label">
              NOTIFICATIONS
            </span>

            <h2>
              Notifications
            </h2>

            <p>
              Notification preferences will be available here.
            </p>

          </div>

          <button
            className="settings-status settings-clickable"
            onClick={() =>
              setActiveSection(
                activeSection === "notifications"
                  ? null
                  : "notifications"
              )
            }
          >
            SOON
          </button>

        </div>


        {/* NOTIFICATION DETAILS */}

        {activeSection === "notifications" && (

          <div className="settings-detail-card">

            <div className="settings-detail-header">

              <span>
                NOTIFICATIONS
              </span>

              <h2>
                Notification Preferences
              </h2>

            </div>

            <p className="settings-coming-soon">
              MIQ notifications will be available in a future update.
            </p>

          </div>

        )}

      </section>


      {/* FOOTER */}

      <footer className="settings-footer">

        <div>

          <strong>
            MIQ
          </strong>

          <span>
            Mock Interview Simulator & Question Bank
          </span>

        </div>

      </footer>

    </main>
  );
}

export default Settings;