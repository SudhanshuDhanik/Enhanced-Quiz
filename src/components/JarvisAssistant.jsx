import React, { useEffect, useRef, useState } from "react";
import giphy from "../images/giphycopy.gif";
import "./JarvisAssistant.css";

const JarvisAssistant = () => {
  const btnRef = useRef(null);
  const contentRef = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [response, setResponse] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const speak = (text) => {
      const textSpeak = new SpeechSynthesisUtterance(text);
      textSpeak.rate = 1.3;
      textSpeak.volume = 1;
      textSpeak.pitch = 0.5;
      window.speechSynthesis.speak(textSpeak);
    };

    const initializeAssistant = () => {
      if (!initialized) {
        speak("Initializing JARVIS...");
        setInitialized(true);
      }
    };

    const callGeminiApi = async (message) => {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBifxYoSp18DsMxYKrXvqVPgK0V-Kx89rk`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `Answer in 2 lines only: ${message}`,

                    },
                  ],
                },
              ],
            }),
          }
        );
    
        const data = await res.json();
        const geminiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";
        setResponse(geminiReply);
        speak(geminiReply);
      } catch (error) {
        const fallback = "Sorry, I'm having trouble connecting to Gemini.";
        setResponse(fallback);
        speak(fallback);
        console.error("Gemini API Error:", error);
      }
    };
    
    const takeCommand = (message) => {
      let reply = "";
      const lowerMsg = message.trim().toLowerCase();

      // Local hardcoded commands
      if (lowerMsg.includes("hey") || lowerMsg.includes("hello")) {
        reply = "Hello Sir, How May I Help You?";
      } else if (lowerMsg.includes("open google")) {
        window.open("https://google.com", "_blank");
        reply = "Opening Google...";
      } else if (lowerMsg.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        reply = "Opening YouTube...";
      }

      // Java
      else if (lowerMsg.includes("default value of a local variable in java")) {
        reply = "It must be initialized before use.";
      } else if (lowerMsg.includes("final keyword")) {
        reply = "The variable cannot be reassigned a new value.";
      } else if (lowerMsg.includes("features of java")) {
        reply = "Platform independence and object-oriented are key features of Java.";
      }

      // DSA
      else if (lowerMsg.includes("which data structure is")) {
        reply = "Stack is the correct answer.";
      } else if (lowerMsg.includes("what is the value of")) {
        reply = "-18 is the correct answer.";
      } else if (lowerMsg.includes("which algorithm is used")) {
        reply = "Divide and conquer is the correct answer.";
      }

      // Python
      else if (lowerMsg.includes("immutable data type in python")) {
        reply = "Tuple is the correct answer.";
      } else if (lowerMsg.includes("what is the correct way to")) {
        reply = "def FunctionName(): is the correct answer.";
      } else if (lowerMsg.includes("python libraries")) {
        reply = "Pandas and NumPy.";
      }

      // If no match, call Gemini AI API
      if (reply) {
        setResponse(reply);
        speak(reply);
      } else {
        callGeminiApi(lowerMsg);
      }
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (!recognition) {
      const fallback = "Speech Recognition is not supported on this browser.";
      setResponse(fallback);
      speak(fallback);
      return;
    }

    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      contentRef.current.textContent = transcript;
      takeCommand(transcript);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.onerror = (event) => {
      const errMsg = `Error: ${event.error}`;
      setResponse(errMsg);
      speak(errMsg);
      setIsListening(false);
    };

    const handleButtonClick = () => {
      if (recognition) {
        setIsListening(true);
        contentRef.current.textContent = "Listening...";
        recognition.start();
      }
    };

    const btn = btnRef.current;
    btn.addEventListener("click", handleButtonClick);

    if (!initialized) {
      initializeAssistant();
    }

    return () => {
      btn.removeEventListener("click", handleButtonClick);
    };
  }, [initialized]);

  return (
    <section className="main">
      <div className="image-container">
        <div className="image">
          <img src={giphy} alt="JARVIS" />
        </div>
        <h1>J A R V I S</h1>
        <h6>I am your Virtual Assistant JARVIS. How may I help you?</h6>
      </div>

      <div className="input">
        <button className={`talk ${isListening ? "listening" : ""}`} ref={btnRef}>
          <h1 className="content" ref={contentRef}>
            Click here to speak
          </h1>
        </button>
      </div>

      <div className="jarvis-frame">
        <p className="typing-effect">{response}</p>
      </div>
    </section>
  );
};

export default JarvisAssistant;
