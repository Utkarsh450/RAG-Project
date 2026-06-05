import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { pdfService } from "../services/pdfService";
import { toast } from "react-hot-toast";

// File type accent colors
const fileColor = (name = "") => {
  const ext = name.split(".").pop().toLowerCase();
  const map = { pdf: "#e25c5c", docx: "#4a9cf6", pptx: "#f07c3a", txt: "#6eb56e" };
  return map[ext] || "#9b8dca";
};
const fileExt = (name = "") => name.split(".").pop().toUpperCase();

export default function UploadPanel({
  pdfs,
  setPdfs,
  selectedPdf,
  setSelectedPdf,
  uploading,
  setUploading,
}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  // ── All original logic preserved exactly ─────────────────────────────────
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const response = await pdfService.uploadPdf(file);

      const newPdf = {
        id: Date.now(),
        name: response.document,
      };

      setPdfs((prev) => [...prev, newPdf]);
      setSelectedPdf(newPdf);

      toast.success("PDF Uploaded");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  // ─────────────────────────────────────────────────────────────────────────

  // Drag-and-drop wrapper (UI enhancement, calls same handleFileChange logic)
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange({ target: { files: [file] } });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "rgba(255,255,255,0.025)",
        borderRight: "0.5px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
      }}
    >
      {/* ── Logo ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          padding: "18px 18px 15px",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 10,
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
            <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
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
          <p style={{ color: "rgba(255,255,255,0.28)", fontSize: 10, margin: 0 }}>
            AI Document Assistant
          </p>
        </div>
      </div>

      {/* ── Upload zone ──────────────────────────────────────────────────── */}
      <div style={{ padding: "14px 14px 8px" }}>
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            display: "block",
            border: `0.5px dashed ${dragOver ? "rgba(108,99,255,0.7)" : "rgba(255,255,255,0.13)"}`,
            borderRadius: 12,
            padding: "18px 12px",
            textAlign: "center",
            cursor: uploading ? "wait" : "pointer",
            background: dragOver
              ? "rgba(108,99,255,0.1)"
              : "rgba(255,255,255,0.02)",
            transition: "all .2s",
          }}
        >
          {uploading ? (
            <>
              <style>{`@keyframes upSpin{to{transform:rotate(360deg)}}`}</style>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 18,
                    height: 18,
                    border: "2px solid rgba(108,99,255,0.3)",
                    borderTopColor: "#a78bfa",
                    borderRadius: "50%",
                    animation: "upSpin .7s linear infinite",
                    display: "block",
                  }}
                />
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: 12,
                    margin: 0,
                  }}
                >
                  Uploading…
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "rgba(108,99,255,0.14)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 8px",
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 12,
                  fontWeight: 500,
                  margin: "0 0 3px",
                }}
              >
                Drop file or click to upload
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.22)",
                  fontSize: 10.5,
                  margin: 0,
                }}
              >
                PDF · DOCX · PPTX · TXT
              </p>
            </>
          )}

          {/* Hidden file input — original accept list preserved */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.docx,.pptx"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
      </div>

      {/* ── File list ────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "4px 10px 8px",
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
            margin: "6px 2px 8px",
            paddingLeft: 2,
          }}
        >
          {pdfs.length > 0
            ? `${pdfs.length} Document${pdfs.length !== 1 ? "s" : ""}`
            : "Documents"}
        </p>

        {/* ── Original logic: empty state ── */}
        {pdfs.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 12px",
              gap: 8,
              border: "0.5px dashed rgba(255,255,255,0.08)",
              borderRadius: 10,
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
              No documents yet.
              <br />
              Upload one to begin.
            </p>
          </div>
        )}

        {/* ── Original logic: map over pdfs ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {pdfs.map((pdf) => {
            const color = fileColor(pdf.name);
            const ext = fileExt(pdf.name);
            const basename = pdf.name.replace(/\.[^.]+$/, "");
            const isSelected = selectedPdf?.id === pdf.id;

            return (
              <button
                key={pdf.id}
                onClick={() => setSelectedPdf(pdf)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 9px",
                  borderRadius: 9,
                  border: isSelected
                    ? "0.5px solid rgba(108,99,255,0.42)"
                    : "0.5px solid transparent",
                  background: isSelected
                    ? "rgba(108,99,255,0.14)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "all .16s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isSelected)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {/* File type badge */}
                <div
                  style={{
                    width: 30,
                    height: 34,
                    borderRadius: 7,
                    background: `${color}18`,
                    border: `0.5px solid ${color}38`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: ext.length > 3 ? 6.5 : 7.5,
                      fontWeight: 700,
                      color,
                      letterSpacing: "0.3px",
                    }}
                  >
                    {ext}
                  </span>
                </div>

                {/* File name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      color: isSelected
                        ? "rgba(200,185,255,0.95)"
                        : "rgba(255,255,255,0.7)",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {basename}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.27)",
                      margin: "2px 0 0",
                    }}
                  >
                    .{ext.toLowerCase()}
                  </p>
                </div>

                {/* Active dot */}
                {isSelected && (
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#a78bfa",
                      flexShrink: 0,
                    }}
                  />
                )}
              </button>
            );
          })}
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