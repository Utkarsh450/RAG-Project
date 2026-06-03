import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user } = useAuth();

  return (
    <header
      className="
            h-14
            bg-white
            px-8
            flex
            items-center
            justify-between
        "
    >
      <div
        className="
                flex
                items-center
                gap-3
            "
      >
        <div
          className="
                    w-8
                    h-8
                    rounded-lg
                    bg-violet-600
                    text-white
                    flex
                    items-center
                    justify-center
                "
        >
          📄
        </div>

        <h1
          className="
                    font-semibold
                "
        >
          PDF Chat
        </h1>
      </div>

      <div
        className="
                text-sm
                text-gray-500
            "
      >
        {user?.email}
      </div>
    </header>
  );
}
