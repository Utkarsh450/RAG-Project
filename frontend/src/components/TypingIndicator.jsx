export default function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl w-fit"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "0.5px solid rgba(255,255,255,0.1)",
        borderRadius: "4px 18px 18px 18px",
      }}
    >
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            animation: "typingBounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}