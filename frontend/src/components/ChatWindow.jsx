export default function ChatWindow() {
  return (
    <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
      <div className="max-w-3xl mx-auto space-y-5">

        {/* Assistant message */}
        <div className="flex items-end gap-3 justify-start">
          <div
            className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div
            className="px-4 py-3 text-sm leading-relaxed"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.85)",
              borderRadius: "4px 18px 18px 18px",
              backdropFilter: "blur(10px)",
            }}
          >
            Hello 👋
          </div>
        </div>

        {/* User message */}
        <div className="flex items-end gap-3 justify-end">
          <div
            className="px-4 py-3 text-sm leading-relaxed text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: "18px 18px 4px 18px",
              boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
              maxWidth: "28rem",
            }}
          >
            Ask me about your PDF
          </div>
          <div
            className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-semibold"
            style={{ background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
          >
            U
          </div>
        </div>

      </div>
    </div>
  );
}