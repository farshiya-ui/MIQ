import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function GoogleSuccess({ onLoginSuccess }) {
  useEffect(() => {
    const finishGoogleLogin = async () => {
      try {
        const params = new URLSearchParams(
          window.location.search
        );

        const token = params.get("token");

        console.log(
          "Google token received:",
          !!token
        );

        if (!token) {
          console.error(
            "No Google token found."
          );

          window.location.href = "/";
          return;
        }

        localStorage.setItem(
          "miqToken",
          token
        );

        localStorage.setItem(
          "miqLoggedIn",
          "true"
        );

        const response = await fetch(
          `${API_URL}/api/profile/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log(
          "Profile response:",
          data
        );

        if (!response.ok || !data.user) {
          throw new Error(
            data.message ||
              "Unable to load user profile."
          );
        }

        localStorage.setItem(
          "miqUser",
          JSON.stringify(data.user)
        );

        console.log(
          "Google login successful"
        );

        onLoginSuccess(data.user);

        window.history.replaceState(
          {},
          document.title,
          "/"
        );
      } catch (error) {
        console.error(
          "Google login failed:",
          error
        );

        localStorage.removeItem(
          "miqToken"
        );

        localStorage.removeItem(
          "miqLoggedIn"
        );

        localStorage.removeItem(
          "miqUser"
        );

        alert(
          "Google login could not be completed. Please try again."
        );

        window.location.href = "/";
      }
    };

    finishGoogleLogin();
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
          Please wait while MIQ completes your
          Google login.
        </p>
      </div>
    </main>
  );
}

export default GoogleSuccess;