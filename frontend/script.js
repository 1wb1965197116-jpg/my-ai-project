// 🔗 BACKEND URL (YOUR LIVE RENDER URL)
const backendUrl = "https://my-ai-project-1-0hu7.onrender.com";

// 🔑 Load API Key
let API_KEY = localStorage.getItem("api_key");

// ==========================
// 🧠 SIGNUP (GET API KEY)
// ==========================
async function signup() {
  try {
    const res = await fetch(`${backendUrl}/signup`, {
      method: "POST"
    });

    const data = await res.json();

    if (data.api_key) {
      API_KEY = data.api_key;
      localStorage.setItem("api_key", API_KEY);
      alert("✅ API Key Created!");
    } else {
      throw new Error("No API key returned");
    }

  } catch (err) {
    alert("❌ Signup failed");
    console.error(err);
  }
}

// ==========================
// 🚀 SEND REQUEST TO AI
// ==========================
async function sendRequest(textInput = null) {
  const text = textInput || document.getElementById("inputBox").value;

  if (!API_KEY) {
    alert("⚠️ Please click 'Create Account' first");
    return;
  }

  if (!text) {
    alert("⚠️ Enter some text");
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

    if (data.error) {
      throw new Error(data.error);
    }

    document.getElementById("output").textContent =
      JSON.stringify(data, null, 2);

    speak(data.response);

  } catch (err) {
    document.getElementById("output").textContent =
      "❌ Error: " + err.message;

    console.error(err);
  }
}

// ==========================
// 🔊 TEXT TO SPEECH
// ==========================
function speak(text) {
  if (!text) return;

  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(speech);
}

// ==========================
// 🎤 VOICE INPUT
// ==========================
function startVoice() {
  try {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("❌ Voice not supported on this device");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      console.log("🎤 Listening...");
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      sendRequest(text);
    };

    recognition.onerror = (event) => {
      console.error("Voice error:", event.error);
    };

    recognition.start();

  } catch (err) {
    console.error(err);
  }
}

// ==========================
// 📸 IMAGE INPUT (PLACEHOLDER)
// ==========================
function readImage(event) {
  const file = event.target.files[0];

  if (!file) return;

  document.getElementById("output").textContent =
    "📸 Image loaded (OCR can be added next)";
}
