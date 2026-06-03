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
      className="w-72 flex flex-col h-full"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRight: "0.5px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo Header */}
      <div
        className="flex items-center gap-3 px-5 py-5"
        style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <span className="text-white text-base font-semibold tracking-tight">PDF Chat</span>
      </div>

      {/* Upload Button */}
      <div className="px-4 pt-5">
        <button
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(99,102,241,0.25)",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 28px rgba(99,102,241,0.45)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,0.25)"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          Upload PDF
        </button>
      </div>

      {/* Files Section */}
      <div className="flex-1 px-4 mt-6 overflow-y-auto">
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3 px-1"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Uploaded Files
        </p>

        <div
          className="flex flex-col items-center justify-center py-10 rounded-xl"
          style={{ border: "0.5px dashed rgba(255,255,255,0.1)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-3" style={{ color: "rgba(255,255,255,0.15)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
            No files uploaded yet
          </p>
        </div>
      </div>

      {/* Logout */}
      <div
        className="px-4 py-4"
        style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(239,68,68,0.1)";
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            e.currentTarget.style.color = "rgba(252,165,165,0.9)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}