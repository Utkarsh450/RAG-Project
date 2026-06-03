import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <div
      className="
            w-72
            border-r
            bg-white
            p-4
            flex
            flex-col
        "
    >
      <button
        className="
                w-full
                bg-black
                text-white
                rounded-lg
                py-3
            "
      >
        Upload PDF
      </button>

      <div
        className="
                mt-6
                flex-1
            "
      >
        <h2
          className="
                    font-semibold
                    mb-3
                "
        >
          Uploaded Files
        </h2>

        <div
          className="
                    text-sm
                    text-gray-500
                "
        >
          No files uploaded
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="
                mt-auto
                rounded-lg
                py-3
            "
      >
        Logout
      </button>
    </div>
  );
}
