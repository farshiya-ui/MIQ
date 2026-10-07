import { useEffect } from "react";

function GoogleSuccess({ onLoginSuccess }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    localStorage.setItem("miqToken", token);
    localStorage.setItem("miqLoggedIn", "true");

    // Get the logged-in user's information from the backend
    const getUser = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/profile/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok || !data.user) {
          throw new Error("Unable to load user profile.");
        }

        localStorage.setItem(
          "miqUser",
          JSON.stringify(data.user)
        );

        onLoginSuccess(data.user);

      } catch (error) {
        console.error(
          "Google login profile error:",
          error
        );

        localStorage.removeItem("miqToken");
        localStorage.removeItem("miqLoggedIn");

        window.location.href = "/";
      }
    };

    getUser();
  }, [onLoginSuccess]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#06111f",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
        <h1>Signing you in...</h1>

        <p>
          Please wait while MIQ completes your Google login.
        </p>
      </div>
    </main>
  );
}

export default GoogleSuccess;