export default function EmptyState() {
  const suggestions = [
    "Summarize this document",
    "What are the key points?",
    "Explain the main concepts",
    "List important dates or figures",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full px-6 py-16">
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: "rgba(99,102,241,0.12)", border: "0.5px solid rgba(99,102,241,0.25)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" style={{ color: "#818cf8" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      </div>

      <h2
        className="text-xl font-normal mb-2 text-center"
        style={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Georgia', serif", letterSpacing: "-0.3px" }}
      >
        Ask anything about your PDF
      </h2>
      <p className="text-sm text-center mb-8 max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
        Upload a document and start a conversation. I'll answer questions based on its content.
      </p>

      {/* Suggestion chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {suggestions.map((s, i) => (
          <button
            key={i}
            className="px-3.5 py-1.5 rounded-full text-xs transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(99,102,241,0.12)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
              e.currentTarget.style.color = "#a5b4fc";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}