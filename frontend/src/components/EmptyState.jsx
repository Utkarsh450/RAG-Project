export default function EmptyState() {
  return (
    <div
      className="
            flex
            flex-col
            items-center
            justify-center
            h-full
            text-center
        "
    >
      <div
        className="
                text-6xl
                mb-4
            "
      >
        📄
      </div>

      <h2
        className="
                text-2xl
                font-semibold
            "
      >
        Upload a PDF
      </h2>

      <p
        className="
                text-gray-500
                mt-2
            "
      >
        Upload a document and start asking questions.
      </p>
    </div>
  );
}
