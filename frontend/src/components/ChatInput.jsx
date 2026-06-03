import { useState } from "react";
import { toast } from "react-hot-toast";
import { chatService } from "../services/chatService";

export default function ChatInput({
  selectedPdf,
  setMessages,
  asking,
  setAsking,
}) {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    if (!selectedPdf) {
      toast.error(
        "Please upload and select a PDF first."
      );
      return;
    }

    const currentQuestion = question;

    setQuestion("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    try {
      setAsking(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "",
        },
      ]);

      const response =
        await chatService.streamQuestion(
          currentQuestion,
          selectedPdf.name
        );

      if (!response.ok) {
        throw new Error(
          "Failed to stream response"
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let fullAnswer = "";

      while (true) {
        const {
          done,
          value,
        } = await reader.read();

        if (done) {
          break;
        }

        const chunk =
          decoder.decode(value);

        fullAnswer += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[
            updated.length - 1
          ] = {
            role: "assistant",
            content: fullAnswer,
          };

          return updated;
        });
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.message ||
          "Failed to get response"
      );

      setMessages((prev) => {
        const updated = [...prev];

        updated[
          updated.length - 1
        ] = {
          role: "assistant",
          content:
            "Sorry, something went wrong while processing your request.",
        };

        return updated;
      });
    } finally {
      setAsking(false);
    }
  };

  return (
    <div
      className="px-4 py-4"
      style={{
        borderTop:
          "0.5px solid rgba(255,255,255,0.07)",
        background:
          "rgba(255,255,255,0.02)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="
          max-w-4xl
          mx-auto
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex-1
            flex
            items-center
            gap-2
            rounded-2xl
            px-4
            py-2.5
            transition-all
          "
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "0.5px solid rgba(255,255,255,0.1)",
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            placeholder="Ask a question about your PDF..."
            disabled={asking}
            className="
              flex-1
              p-2
              bg-zinc-50
              shadow
              shadow-md
              text-sm
              outline-none
              text-zinc-800
              disabled:opacity-50
            "
          />
        </div>

        <button
          type="submit"
          disabled={
            asking ||
            !question.trim()
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            px-5
            py-2.5
            rounded-2xl
            text-sm
            font-medium
            text-white
            transition-all
          "
          style={{
            background:
              asking ||
              !question.trim()
                ? "rgba(99,102,241,0.3)"
                : "linear-gradient(135deg,#6366f1,#8b5cf6)",
          }}
        >
          {asking
            ? "Streaming..."
            : "Send"}
        </button>
      </form>

      <p
        className="
          text-center
          mt-2
          text-xs
        "
        style={{
          color:
            "rgba(255,255,255,0.2)",
        }}
      >
        Responses are based on your uploaded PDF content
      </p>
    </div>
  );
}