export default function MessageInput() {
  return (
    <div
      className="px-4 py-4"
      style={{ borderTop: "0.5px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
    >
      <form className="max-w-4xl mx-auto flex items-center gap-3">
        <div
          className="flex-1 flex items-center gap-2 rounded-2xl px-4 py-2.5"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "rgba(255,255,255,0.85)", caretColor: "#818cf8" }}
          />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium text-white flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
            minWidth: "90px",
            justifyContent: "center",
          }}
        >
          <span>Send</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>
      <p className="text-center mt-2 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
        Responses are based on your uploaded PDF content
      </p>
    </div>
  );
}