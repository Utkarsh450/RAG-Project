import { useState } from "react";

import Header from "../components/Header";
import UploadPanel from "../components/UploadPanel";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

export default function Chat() {
  const [pdfs, setPdfs] = useState([]);

  const [selectedPdf, setSelectedPdf] = useState(null);

  const [messages, setMessages] = useState([]);

  const [uploading, setUploading] = useState(false);

  const [asking, setAsking] = useState(false);
  return (
    <div
      className="
            min-h-screen
            bg-[#f6f5f0]
        "
    >
      <Header />

      <main
        className="
                max-w-7xl
                mx-auto
                p-6
                grid
                grid-cols-[320px_1fr]
                gap-6
            "
      >
        <UploadPanel
          pdfs={pdfs}
          setPdfs={setPdfs}
          selectedPdf={selectedPdf}
          setSelectedPdf={setSelectedPdf}
          uploading={uploading}
          setUploading={setUploading}
        />

        <div
          className="
                    bg-white
                    rounded-xl
                    flex
                    flex-col
                    h-[750px]
                "
        >
          <ChatMessages messages={messages} asking={asking} />

       <ChatInput
    selectedPdf={selectedPdf}
    setMessages={setMessages}
    asking={asking}
    setAsking={setAsking}
/>
        </div>
      </main>
    </div>
  );
  
  
  
}