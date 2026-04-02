let API_KEY = localStorage.getItem("api_key");
const backendUrl = "https://YOUR_BACKEND_URL";

async function signup() {
  const res = await fetch(backendUrl + "/signup", { method: "POST" });
  const data = await res.json();

  API_KEY = data.api_key;
  localStorage.setItem("api_key", API_KEY);

  alert("API Key Created!");
}

async function sendRequest(textInput=null) {
  const text = textInput || document.getElementById('inputBox').value;

  const res = await fetch(backendUrl + "/predict", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text, api_key: API_KEY })
  });

  const data = await res.json();
  document.getElementById("output").textContent =
    JSON.stringify(data, null, 2);

  speak(data.response || "Error");
}

// 🔊 Voice output
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(speech);
}

// 🎤 Voice input
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    sendRequest(text);
  };
  recognition.start();
}

// 📸 Image handler (placeholder)
function readImage(event) {
  document.getElementById('output').textContent =
    "Image loaded (OCR can be added later)";
}
