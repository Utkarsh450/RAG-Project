import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages, asking }) {
  if (messages.length === 0) {
    return (
      <div className="flex-1">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
      <div className="max-w-4xl mx-auto space-y-5">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {/* Assistant avatar */}
            {message.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mb-0.5"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
            )}

            <div
              className="max-w-2xl px-4 py-3 text-sm leading-relaxed"
              style={
                message.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      color: "white",
                      borderRadius: "18px 18px 4px 18px",
                      boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      border: "0.5px solid rgba(255,255,255,0.1)",
                      color: "black",
                      borderRadius: "4px 18px 18px 18px",
                      backdropFilter: "blur(10px)",
                    }
              }
            >
              {message.content}
            </div>

            {/* User avatar */}
            {message.role === "user" && (
              <div
                className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mb-0.5 text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
              >
                U
              </div>
            )}
          </div>
        ))}

        {asking && (
          <div className="flex items-end gap-3 justify-start">
            <div
              className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
}