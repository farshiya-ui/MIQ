import { useState } from "react";
import "./Sidebar.css";

function Sidebar({
  isOpen,
  onClose,
  onDashboard,
  onMockInterview,
  onQuestionBank,
  onCertificates,
  onScoreboard,
  onSettings,
  onLogout,
}) {
  const [shareMessage, setShareMessage] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: "MIQ - Mock Interview Simulator & Question Bank",
      text: "Prepare, practice and improve your interview skills with MIQ.",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);

        setShareMessage("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(
          window.location.origin
        );

        setShareMessage("MIQ link copied!");
      }

      setTimeout(() => {
        setShareMessage("");
      }, 2500);
    } catch (error) {
      // User cancelled the native share window.
      if (error.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(
            window.location.origin
          );

          setShareMessage("MIQ link copied!");

          setTimeout(() => {
            setShareMessage("");
          }, 2500);
        } catch {
          setShareMessage("Unable to share link.");

          setTimeout(() => {
            setShareMessage("");
          }, 2500);
        }
      }
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`miq-sidebar-overlay ${
          isOpen ? "active" : ""
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`miq-sidebar ${
          isOpen ? "open" : ""
        }`}
      >

        {/* Header */}
        <div className="miq-sidebar-header">

          <div className="miq-sidebar-logo">
            <span>M</span>
            <span>I</span>
            <span>Q</span>
          </div>

          <button
            className="miq-sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>

        </div>

        {/* Menu */}
        <nav className="miq-sidebar-menu">

          <button onClick={onDashboard}>
            <span className="sidebar-icon">⌂</span>
            <span>Dashboard</span>
          </button>

          <button onClick={onMockInterview}>
            <span className="sidebar-icon">◉</span>
            <span>Mock Interview</span>
          </button>

          <button onClick={onQuestionBank}>
            <span className="sidebar-icon">▣</span>
            <span>Question Bank</span>
          </button>

          <button onClick={onCertificates}>
            <span className="sidebar-icon">◆</span>
            <span>Certificates</span>
          </button>

          <button onClick={onScoreboard}>
            <span className="sidebar-icon">▥</span>
            <span>Scoreboard</span>
          </button>

          <button onClick={onSettings}>
            <span className="sidebar-icon">⚙</span>
            <span>Settings</span>
          </button>

          {/* SHARE */}
          <button onClick={handleShare}>
            <span className="sidebar-icon">↗</span>
            <span>Share</span>
          </button>

        </nav>

        {/* Share Message */}
        {shareMessage && (
          <div className="sidebar-share-message">
            {shareMessage}
          </div>
        )}

        {/* Bottom */}
        <div className="miq-sidebar-bottom">

          <button
            className="sidebar-logout"
            onClick={onLogout}
          >
            <span className="sidebar-icon">↪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;