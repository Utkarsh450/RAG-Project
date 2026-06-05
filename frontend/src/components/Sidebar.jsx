import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  // ── All original logic preserved exactly ──────────────────────────────────
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        width: 260,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "rgba(255,255,255,0.025)",
        borderRight: "0.5px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        flexShrink: 0,
      }}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "18px 18px 15px",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <div>
          <p
            style={{
              color: "#fff",
              fontSize: 13.5,
              fontWeight: 650,
              margin: 0,
              letterSpacing: "-0.3px",
            }}
          >
            DocChat
          </p>
          <p
            style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, margin: 0 }}
          >
            AI Document Assistant
          </p>
        </div>
      </div>

      {/* ── Upload button ────────────────────────────────────────────────── */}
      <div style={{ padding: "14px 14px 8px" }}>
        <button
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "10px",
            borderRadius: 11,
            background: "linear-gradient(135deg, #6c63ff, #a78bfa)",
            border: "none",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(108,99,255,0.28)",
            transition: "box-shadow .2s, transform .15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 28px rgba(108,99,255,0.48)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(108,99,255,0.28)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload File
        </button>
      </div>

      {/* ── Files section ────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          padding: "4px 10px 8px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.06) transparent",
        }}
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.8px",
            color: "rgba(255,255,255,0.22)",
            textTransform: "uppercase",
            margin: "8px 2px 10px",
            paddingLeft: 2,
          }}
        >
          Uploaded Files
        </p>

        {/* Empty placeholder */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 12px",
            border: "0.5px dashed rgba(255,255,255,0.08)",
            borderRadius: 10,
            gap: 8,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <p
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: 12,
              textAlign: "center",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            No files uploaded yet
          </p>
        </div>
      </div>

      {/* ── Logout ───────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "10px 14px 14px",
          borderTop: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            padding: "9px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.07)",
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all .18s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.25)";
            e.currentTarget.style.color = "rgba(252,165,165,0.85)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
            e.currentTarget.style.color = "rgba(255,255,255,0.4)";
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}