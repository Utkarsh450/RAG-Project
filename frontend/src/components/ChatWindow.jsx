export default function ChatWindow() {
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
                max-w-3xl
                mx-auto
                space-y-4
            "
      >
        <div
          className="
                    bg-gray-100
                    p-4
                    rounded-xl
                "
        >
          Hello 👋
        </div>

        <div
          className="
                    bg-black
                    text-white
                    p-4
                    rounded-xl
                    ml-auto
                    max-w-md
                "
        >
          Ask me about your PDF
        </div>
      </div>
    </div>
  );
}
