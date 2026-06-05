export default function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: "11px 16px",
        background: "rgba(255,255,255,0.055)",
        border: "0.5px solid rgba(255,255,255,0.09)",
        borderRadius: "4px 18px 18px 18px",
        backdropFilter: "blur(12px)",
        width: "fit-content",
      }}
    >
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            animation: "typingBounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}