"use client";

import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";

// TypeScript declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

const CampaignBox = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [language, setLanguage] = useState("en-US");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleStart = () => {
    if (listening) {
      handleStop();
      setText(""); // reset text only when starting new session
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recog: SpeechRecognition = new SpeechRecognition();
    recog.continuous = true; // ✅ keeps listening even with pauses
    recog.interimResults = true;
    recog.lang = language;

    let finalTranscript = ""; // accumulate final results here

    recog.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // ✅ append final + interim continuously
      setText(finalTranscript + interimTranscript);
    };

    recog.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };

    recog.onend = () => {
      // ✅ restart automatically if still in listening mode
      if (listening) recog.start();
    };

    recog.start();
    setRecognition(recog);
    setListening(true);
  };

  const handleStop = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    setListening(false);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="bg-black/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl max-w-xl w-full">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your business, target audience, and goals. Our smart system will create the campaign for you..."
          className="w-full h-32 p-4 pr-20 text-white bg-black/40 rounded-lg resize-none focus:outline-none"
        />

        {text && (
          <button
            onClick={handleClear}
            className="absolute top-2 left-2 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        )}

        <button
          onClick={listening ? handleStop : handleStart}
          className="absolute bottom-3 right-3 text-gray-400 hover:text-white"
        >
          {listening ? (
            <FaStop className="text-red-500 text-lg" />
          ) : (
            <FaMicrophone className="text-gray-300 text-lg" />
          )}
        </button>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="absolute bottom-3 left-3 bg-transparent text-gray-300 text-sm focus:outline-none cursor-pointer"
        >
          <option value="en-US">en</option>
          <option value="es-ES">es</option>
          <option value="fr-FR">fr</option>
          <option value="he-IL">he</option>
        </select>
      </div>

      <button className="mt-4 w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-semibold text-white">
        Create my campaign
      </button>
    </div>
  );
};

export default CampaignBox;
