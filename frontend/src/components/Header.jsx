export default function Header({ selectedPdf, onClearChat }) {
  const fileColor = (name = "") => {
    const ext = name?.split(".").pop().toLowerCase();
    const map = { pdf: "#e25c5c", docx: "#4a9cf6", pptx: "#f07c3a", txt: "#6eb56e" };
    return map[ext] || "#9b8dca";
  };

  const color = selectedPdf ? fileColor(selectedPdf.name) : "#6c63ff";

  return (
    <div
      style={{
        padding: "12px 20px",
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(0,0,0,0.12)",
        flexShrink: 0,
      }}
    >
      {/* File icon */}
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: `${color}18`,
          border: `0.5px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke={selectedPdf ? color : "rgba(108,99,255,0.6)"}
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

      {/* Title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            color: selectedPdf
              ? "rgba(255,255,255,0.88)"
              : "rgba(255,255,255,0.4)",
            fontSize: 13.5,
            fontWeight: 600,
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.2px",
          }}
        >
          {selectedPdf ? selectedPdf.name : "No document selected"}
        </p>
        <p
          style={{
            color: selectedPdf
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.2)",
            fontSize: 11.5,
            margin: 0,
          }}
        >
          {selectedPdf
            ? "Ready to answer questions"
            : "Upload or select a file from the sidebar"}
        </p>
      </div>

      {/* Clear chat button — only when doc is active */}
      {selectedPdf && onClearChat && (
        <button
          onClick={onClearChat}
          title="Clear chat"
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.3)",
            transition: "all .15s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.09)";
            e.currentTarget.style.color = "rgba(255,255,255,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.3)";
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}