export default function TypingIndicator() {
  return (
    <div
      className="
            flex
            items-center
            gap-2
            bg-white
            border
            rounded-xl
            px-4
            py-3
            w-fit
        "
    >
      <div
        className="
                w-2
                h-2
                bg-gray-400
                rounded-full
                animate-bounce
            "
      />

      <div
        className="
                w-2
                h-2
                bg-gray-400
                rounded-full
                animate-bounce
            "
      />

      <div
        className="
                w-2
                h-2
                bg-gray-400
                rounded-full
                animate-bounce
            "
      />
    </div>
  );
}
