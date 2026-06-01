<script>
const API_URL = "http://127.0.0.1:8000/api";

let selectedFile = null;
let isPdfReady = false;

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("pdfFile");
const fileCard = document.getElementById("fileCard");
const changeFileBtn = document.getElementById("changeFileBtn");

const askBtn = document.getElementById("askBtn");
const questionInput =
  document.getElementById("question");

const chatContainer =
  document.getElementById("chatContainer");

const welcomeScreen =
  document.getElementById("welcomeScreen");

const typingLoader =
  document.getElementById("typingLoader");

const pdfPreview =
  document.getElementById("pdfPreview");

const pdfPreviewContainer =
  document.getElementById(
    "pdfPreviewContainer"
  );

const statusDot =
  document.getElementById("statusDot");

const statusText =
  document.getElementById("statusText");


// --------------------------
// FILE PICKER
// --------------------------

dropzone.onclick = () => {
  fileInput.click();
};

changeFileBtn.onclick = (e) => {
  e.stopPropagation();

  fileInput.value = "";
  fileInput.click();
};

fileInput.onchange = (e) => {
  selectedFile = e.target.files[0];

  if (!selectedFile) return;

  showSelectedFile();
  uploadPDF();
};


// --------------------------
// DRAG DROP
// --------------------------

dropzone.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();

    dropzone.classList.add(
      "border-indigo-500"
    );
  }
);

dropzone.addEventListener(
  "dragleave",
  () => {
    dropzone.classList.remove(
      "border-indigo-500"
    );
  }
);

dropzone.addEventListener(
  "drop",
  (e) => {

    e.preventDefault();

    dropzone.classList.remove(
      "border-indigo-500"
    );

    selectedFile =
      e.dataTransfer.files[0];

    if (!selectedFile) return;

    showSelectedFile();
    uploadPDF();
  }
);


// --------------------------
// STATUS
// --------------------------

function setStatus(state) {

  if (state === "uploading") {

    statusDot.className =
      "w-2 h-2 rounded-full bg-yellow-400 animate-pulse";

    statusText.className =
      "text-yellow-400 text-sm";

    statusText.innerText =
      "Uploading document...";
  }

  else if (state === "success") {

    statusDot.className =
      "w-2 h-2 rounded-full bg-green-400";

    statusText.className =
      "text-green-400 text-sm";

    statusText.innerText =
      "PDF uploaded successfully";
  }

  else if (state === "error") {

    statusDot.className =
      "w-2 h-2 rounded-full bg-red-400";

    statusText.className =
      "text-red-400 text-sm";

    statusText.innerText =
      "Upload failed";
  }
}


// --------------------------
// SHOW FILE
// --------------------------

function showSelectedFile() {

  dropzone.classList.add(
    "hidden"
  );

  fileCard.classList.remove(
    "hidden"
  );

  document.getElementById(
    "fileName"
  ).innerText =
    selectedFile.name;

  document.getElementById(
    "fileSize"
  ).innerText =
    (
      selectedFile.size /
      1024 /
      1024
    ).toFixed(2) + " MB";

  const pdfUrl =
    URL.createObjectURL(
      selectedFile
    );

  pdfPreview.src =
    pdfUrl;

  pdfPreviewContainer
    .classList.remove(
      "hidden"
    );

  setStatus(
    "uploading"
  );
}


// --------------------------
// SYSTEM MESSAGE
// --------------------------

function addSystemMessage(
  html
) {

  if (welcomeScreen)
    welcomeScreen.remove();

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "flex justify-center fade-up";

  div.innerHTML = `
    <div
      class="
      bg-slate-900
      border
      border-slate-800
      text-slate-300
      px-5
      py-3
      rounded-2xl
      max-w-lg
      text-center
      "
    >
      ${html}
    </div>
  `;

  chatContainer.appendChild(
    div
  );

  scrollBottom();
}


// --------------------------
// USER MESSAGE
// --------------------------

function addUserMessage(
  text
) {

  if (welcomeScreen)
    welcomeScreen.remove();

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "flex justify-end fade-up";

  div.innerHTML = `
    <div
      class="
      bg-indigo-600
      px-5
      py-3
      rounded-2xl
      max-w-xl
      "
    >
      ${text}
    </div>
  `;

  chatContainer.appendChild(
    div
  );

  scrollBottom();
}


// --------------------------
// AI MESSAGE
// --------------------------

function addAIMessage(
  text
) {

  const div =
    document.createElement(
      "div"
    );

  div.className =
    "flex justify-start fade-up";

  div.innerHTML = `
    <div
      class="
      bg-slate-900
      border
      border-slate-800
      px-5
      py-4
      rounded-2xl
      max-w-3xl
      whitespace-pre-wrap
      "
    >
      ${text}
    </div>
  `;

  chatContainer.appendChild(
    div
  );

  scrollBottom();
}


// --------------------------
// LOADER
// --------------------------

function showLoader() {
  typingLoader.classList.remove(
    "hidden"
  );
}

function hideLoader() {
  typingLoader.classList.add(
    "hidden"
  );
}


// --------------------------
// SCROLL
// --------------------------

function scrollBottom() {

  setTimeout(() => {

    chatContainer.scrollTop =
      chatContainer.scrollHeight;

  }, 100);
}


// --------------------------
// PDF UPLOAD
// --------------------------

async function uploadPDF() {

  if (!selectedFile)
    return;

  if (
    selectedFile.type !==
    "application/pdf"
  ) {

    setStatus(
      "error"
    );

    addSystemMessage(
      "❌ Only PDF files are allowed."
    );

    return;
  }

  const formData =
    new FormData();

  formData.append(
    "file",
    selectedFile
  );

  try {

    const response =
      await fetch(
        `${API_URL}/upload`,
        {
          method: "POST",
          body: formData
        }
      );

    if (!response.ok)
      throw new Error();

    const data =
      await response.json();

    isPdfReady = true;

    setStatus(
      "success"
    );

    addSystemMessage(`
      ✅ <strong>${selectedFile.name}</strong><br>
      📚 Indexed Successfully<br>
      📄 ${data.chunks} chunks stored<br>
      🤖 AI is ready to answer questions
    `);

  }

  catch {

    setStatus(
      "error"
    );

    addSystemMessage(`
      ❌ Upload failed.<br>
      Make sure FastAPI backend is running.
    `);
  }
}


// --------------------------
// ASK QUESTION
// --------------------------

askBtn.onclick =
async () => {

  const question =
    questionInput.value.trim();

  if (!question) {

    addSystemMessage(
      "⚠ Please enter a question."
    );

    return;
  }

  if (!isPdfReady) {

    addSystemMessage(
      "📄 Upload a PDF first."
    );

    return;
  }

  addUserMessage(
    question
  );

  questionInput.value =
    "";

  askBtn.disabled =
    true;

  askBtn.innerText =
    "Thinking...";

  showLoader();

  try {

    const response =
      await fetch(
        `${API_URL}/ask`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            question
          })
        }
      );

    if (!response.ok)
      throw new Error();

    const data =
      await response.json();

    hideLoader();

    addAIMessage(
      data.answer ||
      "⚠ No answer returned."
    );
  }

  catch {

    hideLoader();

    addAIMessage(`
⚠ Unable to connect
to backend.

Make sure FastAPI
is running on port 8000.
`);
  }

  finally {

    askBtn.disabled =
      false;

    askBtn.innerText =
      "Ask";
  }
};


// --------------------------
// ENTER TO SEND
// --------------------------

questionInput.addEventListener(
  "keydown",
  (e) => {

    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {

      e.preventDefault();

      askBtn.click();
    }
  }
);
</script>