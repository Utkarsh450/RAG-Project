import { useState, useEffect, useRef } from "react";

// ── Original imports preserved exactly ───────────────────────────────────────
import Header from "../components/Header";
import UploadPanel from "../components/UploadPanel";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { chatService } from "../services/chatService";
import { documentService } from "../services/documentService";

export default function Chat() {
  // ── All original state preserved exactly ───────────────────────────────────
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [messages, setMessages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);

  // ── Responsive UI states ───────────────────────────────────────────────────
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 768 : false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const triggerSendRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── All original logic preserved exactly ───────────────────────────────────
  const loadHistory = async (documentName) => {
    try {
      const history = await chatService.getHistory(documentName);
      setMessages(history);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDocuments = async () => {
    try {
      const docs = await documentService.getDocuments();
      const formattedDocs = docs.map((doc) => ({
        id: doc._id,
        name: doc.document_name,
      }));
      setPdfs(formattedDocs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
  if (selectedPdf) {
    loadHistory(selectedPdf.name);
  } else {
    loadHistory(null);
  }
}, [selectedPdf]);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        background: "#0f0e17",
        fontFamily: "satoshi",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 18% 55%, rgba(108,99,255,0.07) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 82% 18%, rgba(167,139,250,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Backdrop for mobile sidebar */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 45,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* ── Sidebar / UploadPanel ─────────────────────────────────────────── */}
      <UploadPanel
        pdfs={pdfs}
        setPdfs={setPdfs}
        selectedPdf={selectedPdf}
        setSelectedPdf={setSelectedPdf}
        uploading={uploading}
        setUploading={setUploading}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      {/* ── Main chat area ───────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header — shows active document name */}
        <Header
          selectedPdf={selectedPdf}
          onClearChat={() => setMessages([])}
          isMobile={isMobile}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Messages — grows to fill space */}
        <ChatMessages
          messages={messages}
          asking={asking}
          selectedPdf={selectedPdf}
          isMobile={isMobile}
          triggerSend={triggerSendRef}
        />

        {/* Input — pinned to bottom */}
        <ChatInput
          selectedPdf={selectedPdf}
          setMessages={setMessages}
          asking={asking}
          setAsking={setAsking}
          isMobile={isMobile}
          triggerSend={triggerSendRef}
        />
      </div>
    </div>
  );
  
  
}