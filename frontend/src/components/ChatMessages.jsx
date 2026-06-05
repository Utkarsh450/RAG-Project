import { useEffect, useRef } from "react";
import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({ messages, asking, selectedPdf }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, asking]);

  // ── Original logic: show empty state when no messages ────────────────────
  if (messages.length === 0) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <EmptyState selectedPdf={selectedPdf} />
      </div>
    );
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "24px 20px",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255,255,255,0.08) transparent",
      }}
    >
      <style>{`
        @keyframes msgFadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          maxWidth: 740,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* ── Original logic: map over messages ── */}
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              justifyContent: message.role === "user" ? "flex-end" : "flex-start",
              animation: "msgFadeUp .25s ease both",
            }}
          >
            {/* Assistant avatar */}
            {message.role === "assistant" && (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
            )}

            {/* Message bubble */}
            <div
              style={{
                maxWidth: "72%",
                padding: "11px 16px",
                fontSize: 14,
                lineHeight: 1.65,
                ...(message.role === "user"
                  ? {
                      background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                      color: "#fff",
                      borderRadius: "18px 18px 4px 18px",
                      boxShadow: "0 4px 20px rgba(108,99,255,0.28)",
                    }
                  : {
                      background: "rgba(255,255,255,0.055)",
                      border: "0.5px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.87)",
                      borderRadius: "4px 18px 18px 18px",
                      backdropFilter: "blur(12px)",
                    }),
              }}
            >
              {message.content}
            </div>

            {/* User avatar */}
            {message.role === "user" && (
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  background: "rgba(255,255,255,0.08)",
                  border: "0.5px solid rgba(255,255,255,0.13)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  flexShrink: 0,
                }}
              >
                U
              </div>
            )}
          </div>
        ))}

        {/* ── Original logic: show TypingIndicator while asking ── */}
        {asking && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              justifyContent: "flex-start",
              animation: "msgFadeUp .25s ease both",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 9,
                background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <TypingIndicator />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}