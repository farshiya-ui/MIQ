function MIQLogo({ onClick, size = "normal" }) {
  return (
    <button
      className={`miq-logo ${size}`}
      onClick={onClick}
      aria-label="MIQ Home"
    >
      <span className="miq-logo-m">M</span>
      <span className="miq-logo-i">I</span>
      <span className="miq-logo-q">Q</span>
    </button>
  );
}

export default MIQLogo;