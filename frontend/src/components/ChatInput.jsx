import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { chatService } from "../services/chatService";

export default function ChatInput({
  selectedPdf,
  setMessages,
  asking,
  setAsking,
}) {
  const [question, setQuestion] = useState("");
  const inputRef = useRef(null);

  // ── All original logic preserved exactly ──────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    if (!selectedPdf) {
      toast.error("Please upload and select a PDF first.");
      return;
    }

    const currentQuestion = question;
    setQuestion("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: currentQuestion },
    ]);

    try {
      setAsking(true);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      const response = await chatService.streamQuestion(
        currentQuestion,
        selectedPdf.name
      );

      if (!response.ok) {
        throw new Error("Failed to stream response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullAnswer += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: fullAnswer,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error(error);

      toast.error(error?.message || "Failed to get response");

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong while processing your request.",
        };
        return updated;
      });
    } finally {
      setAsking(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };
  // ─────────────────────────────────────────────────────────────────────────

  const isDisabled = asking || !question.trim() || !selectedPdf;

  return (
    <div
      style={{
        padding: "14px 20px 16px",
        borderTop: "0.5px solid rgba(255,255,255,0.07)",
        background: "rgba(0,0,0,0.14)",
        flexShrink: 0,
      }}
    >
      <style>{`
        @keyframes inputSpin { to { transform: rotate(360deg); } }
      `}</style>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 760,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Input wrapper */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            borderRadius: 14,
            background: "rgba(255,255,255,0.055)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            padding: "0 14px",
            transition: "border-color .2s",
          }}
          onFocusCapture={(e) =>
            (e.currentTarget.style.borderColor = "rgba(108,99,255,0.5)")
          }
          onBlurCapture={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
          }
        >
          <input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              selectedPdf
                ? `Ask about "${selectedPdf.name}"…`
                : "Select a document first…"
            }
            disabled={asking || !selectedPdf}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              padding: "13px 0",
              caretColor: "#a78bfa",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={isDisabled}
          style={{
            width: 42,
            height: 42,
            borderRadius: 13,
            border: "none",
            cursor: isDisabled ? "not-allowed" : "pointer",
            background: isDisabled
              ? "rgba(108,99,255,0.2)"
              : "linear-gradient(135deg, #6c63ff, #a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all .2s",
            boxShadow: isDisabled ? "none" : "0 4px 16px rgba(108,99,255,0.3)",
          }}
          onMouseEnter={(e) => {
            if (!isDisabled) e.currentTarget.style.transform = "scale(1.07)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {asking ? (
            <span
              style={{
                width: 14,
                height: 14,
                border: "2px solid rgba(255,255,255,0.25)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "inputSpin 0.7s linear infinite",
                display: "block",
              }}
            />
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDisabled ? "rgba(255,255,255,0.25)" : "#fff"}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: 8,
          fontSize: 11,
          color: "rgba(255,255,255,0.18)",
          letterSpacing: "0.2px",
        }}
      >
        Responses are based on your uploaded document content
      </p>
    </div>
  );
}