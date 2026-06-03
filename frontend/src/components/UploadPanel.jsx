import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { pdfService }
from "../services/pdfService";
import { toast } from "react-hot-toast";

export default function UploadPanel({
   pdfs,
    setPdfs,

    selectedPdf,
    setSelectedPdf,

    uploading,
    setUploading

}) {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleFileChange =
    async (e) => {

        const file =
            e.target.files[0];

        if (!file) {
            return;
        }

        try {

            setUploading(
                true
            );

            const response =
                await pdfService.uploadPdf(
                    file
                );

            const newPdf = {

                id:
                    Date.now(),

                name:
                    response.document
            };

            setPdfs(
                prev => [
                    ...prev,
                    newPdf
                ]
            );

            setSelectedPdf(
                newPdf
            );

            toast.success(
                "PDF Uploaded"
            );

        } catch (
            error
        ) {

            toast.error(
                error?.response?.data?.detail ||
                "Upload Failed"
            );

        } finally {

            setUploading(
                false
            );
        }
    };

  const handleLogout = async () => {
    await logout();

    navigate("/login");
  };

  return (
    <div
      className="
            bg-white
            rounded-xl
            p-5
            flex
            flex-col
            h-[750px]
        "
    >
      <h2
        className="
                text-lg
                font-semibold
                mb-4
            "
      >
        Documents
      </h2>

      <label
        className="
                cursor-pointer
                border-2
                border-dashed
                rounded-xl
                p-8
                text-center
                hover:bg-gray-50
                transition
            "
      >
        <div
          className="
                    text-3xl
                    mb-2
                "
        >
          📄
        </div>

      <p>
    {
        uploading
        ? "Uploading..."
        : "Upload PDF"
    }
</p>

       <input
    type="file"
    accept=".pdf"
    className="hidden"
    onChange={
        handleFileChange
    }
/>
      </label>

      <div
        className="
                mt-6
                flex-1
                overflow-y-auto
            "
      >
        <h3
          className="
                    text-sm
                    font-medium
                    text-gray-500
                    mb-3
                "
        >
          Uploaded PDFs
        </h3>

        {pdfs.length === 0 && (
          <div
            className="
                            text-sm
                            text-gray-400
                        "
          >
            No PDFs uploaded
          </div>
        )}

        <div
          className="
                    space-y-2
                "
        >
          {pdfs.map((pdf) => (
            <button
              key={pdf.id}
              onClick={() => setSelectedPdf(pdf)}
              className={`
                                    w-full
                                    text-left
                                    p-3
                                    rounded-lg
                                    border

                                    ${
                                      selectedPdf?.id === pdf.id
                                        ? "bg-violet-100 border-violet-500"
                                        : "hover:bg-gray-50"
                                    }
                                `}
            >
              <p
                className="
                                        text-sm
                                        font-medium
                                        truncate
                                    "
              >
                {pdf.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="
                mt-4
                rounded-lg
                bg-violet-500
                text-white
                py-3
                hover:bg-violet-600
            "
      >
        Logout
      </button>
    </div>
  );
}
