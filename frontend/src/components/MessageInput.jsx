export default function MessageInput() {
  return (
    <div
      className="
            border-t
            p-4
            bg-white
        "
    >
      <form
        className="
                flex
                gap-3
            "
      >
        <input
          type="text"
          placeholder="Ask a question..."
          className="
                    flex-1
                    border
                    rounded-lg
                    px-4
                    py-3
                "
        />

        <button
          className="
                    bg-black
                    text-white
                    px-6
                    rounded-lg
                "
        >
          Send
        </button>
      </form>
    </div>
  );
}
