import EmptyState from "./EmptyState";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({
  messages,

  asking,
}) {
  if (messages.length === 0) {
    return (
      <div
        className="
                flex-1
            "
      >
        <EmptyState />
      </div>
    );
  }

  return (
    <div
      className="
            flex-1
            overflow-y-auto
            p-6
        "
    >
      <div
        className="
                max-w-4xl
                mx-auto
                space-y-4
            "
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`
                                flex

                                ${
                                  message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }
                            `}
          >
            <div
              className={`
                                    max-w-2xl
                                    px-4
                                    py-3
                                    rounded-2xl

                                    ${
                                      message.role === "user"
                                        ? "bg-violet-600 text-white"
                                        : "bg-gray-100 text-black"
                                    }
                                `}
            >
              {message.content}
            </div>
          </div>
        ))}

        {asking && <TypingIndicator />}
      </div>
    </div>
  );
}
