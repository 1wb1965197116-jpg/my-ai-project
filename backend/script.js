// 🔗 YOUR BACKEND URL
const backendUrl = "https://my-ai-project-1-0hu7.onrender.com";

// 🔑 API KEY STORAGE
let API_KEY = localStorage.getItem("api_key");

// =====================
// CREATE ACCOUNT
// =====================
async function signup() {
  try {
    const res = await fetch(`${backendUrl}/signup`, {
      method: "POST"
    });

    const data = await res.json();

    API_KEY = data.api_key;
    localStorage.setItem("api_key", API_KEY);

    alert("✅ Account created!");

  } catch (err) {
    alert("❌ Signup failed");
    console.error(err);
  }
}

// =====================
// SEND REQUEST
// =====================
async function sendRequest(textInput = null) {
  const text = textInput || document.getElementById("inputBox").value;

  if (!API_KEY) {
    alert("Click 'Create Account' first");
    return;
  }

  try {
    const res = await fetch(`${backendUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: text,
        api_key: API_KEY
      })
    });

    const data = await res.json();

    document.getElementById("output").textContent =
      JSON.stringify(data, null, 2);

    speak(data.response);

  } catch (err) {
    document.getElementById("output").textContent = "Error connecting to AI";
    console.error(err);
  }
}

// =====================
// VOICE OUTPUT
// =====================
function speak(text) {
  if (!text) return;

  const speech = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

// =====================
// VOICE INPUT
// =====================
function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    sendRequest(text);
  };

  recognition.start();
}
