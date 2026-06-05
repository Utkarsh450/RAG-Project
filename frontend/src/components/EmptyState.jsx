export default function EmptyState({ selectedPdf }) {
  const suggestions = [
    "Summarize this document",
    "What are the key points?",
    "Explain the main topic",
    "List all important facts",
  ];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "56px 32px",
        textAlign: "center",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 18,
          background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          boxShadow: "0 8px 32px rgba(108,99,255,0.28)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      </div>

      <h2
        style={{
          color: "rgba(255,255,255,0.88)",
          fontSize: 17,
          fontWeight: 600,
          margin: "0 0 8px",
          letterSpacing: "-0.3px",
        }}
      >
        {selectedPdf
          ? `Chat with "${selectedPdf.name}"`
          : "Select a document to begin"}
      </h2>

      <p
        style={{
          color: "rgba(255,255,255,0.32)",
          fontSize: 13,
          lineHeight: 1.65,
          maxWidth: 320,
          margin: "0 0 28px",
        }}
      >
        {selectedPdf
          ? "Ask anything — I'll answer based on your document's content."
          : "Upload a PDF, Word doc, presentation, or text file from the sidebar to get started."}
      </p>

      {/* Suggestion chips — only when a doc is selected */}
      {selectedPdf && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
            maxWidth: 400,
          }}
        >
          {suggestions.map((s) => (
            <button
              key={s}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                padding: "7px 14px",
                fontSize: 12,
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "all .18s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(108,99,255,0.18)";
                e.currentTarget.style.borderColor = "rgba(108,99,255,0.45)";
                e.currentTarget.style.color = "rgba(180,160,255,0.92)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}