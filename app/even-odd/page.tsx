"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getRandomCorrectMessage, getRandomTryAgainMessage } from "@/app/utils/feedbackMessages";
import { DISPLAY_BG } from "@/app/utils/numberColors";
import ColoredNumber from "@/app/components/ColoredNumber";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function EvenOddPage() {
  const [number, setNumber] = useState(() => randomInt(1, 100));
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const handleAnswer = useCallback(
    (guess: "even" | "odd") => {
      const correct = number % 2 === 0;
      const isCorrect = (guess === "even" && correct) || (guess === "odd" && !correct);
      if (isCorrect) {
        setFeedback({ type: "correct", message: getRandomCorrectMessage() });
        setStreak((s) => s + 1);
        setTimeout(() => {
          setFeedback(null);
          setNumber(randomInt(1, 100));
        }, 1500);
      } else {
        setFeedback({ type: "wrong", message: getRandomTryAgainMessage() });
        setStreak(0);
        setTimeout(() => setFeedback(null), 1500);
      }
    },
    [number]
  );

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes pop {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); opacity: 1; }
            }
            .feedback-popup { animation: pop 0.3s ease-out; }
          `,
        }}
      />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #54a0ff 100%)",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <Link
          href="/"
          style={{
            position: "absolute",
            top: "90px",
            left: "20px",
            color: "#2d3436",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ← Back to Games
        </Link>
        <h1 style={{ fontSize: "36px", color: "#2d3436", fontWeight: "bold", marginTop: "20px" }}>
          Even or Odd
        </h1>
        {streak > 0 && (
          <div
            style={{
              fontSize: "24px",
              color: "#2ed573",
              fontWeight: "bold",
              backgroundColor: "rgba(255,255,255,0.9)",
              padding: "8px 20px",
              borderRadius: "20px",
            }}
          >
            {streak} in a row!
          </div>
        )}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            backgroundColor: DISPLAY_BG,
            padding: "40px 60px",
            borderRadius: "24px",
            border: "4px solid #54a0ff",
            boxShadow: "0 8px 0 #0984e3",
          }}
        >
          <ColoredNumber value={number} style={{ fontSize: "72px" }} />
        </div>
        <p style={{ fontSize: "20px", color: "#2d3436", margin: "-16px 0 0 0" }}>
          Is this number even or odd?
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => handleAnswer("even")}
            disabled={!!feedback}
            style={{
              padding: "24px 48px",
              fontSize: "28px",
              fontWeight: "bold",
              background: "linear-gradient(180deg, #54a0ff 0%, #2e86de 100%)",
              color: "white",
              border: "3px solid #74b9ff",
              borderRadius: "20px",
              cursor: feedback ? "default" : "pointer",
              boxShadow: "0 6px 0 #0984e3",
              opacity: feedback ? 0.6 : 1,
            }}
          >
            Even
          </button>
          <button
            onClick={() => handleAnswer("odd")}
            disabled={!!feedback}
            style={{
              padding: "24px 48px",
              fontSize: "28px",
              fontWeight: "bold",
              background: "linear-gradient(180deg, #a55eea 0%, #8854d0 100%)",
              color: "white",
              border: "3px solid #b67ee8",
              borderRadius: "20px",
              cursor: feedback ? "default" : "pointer",
              boxShadow: "0 6px 0 #6c5ce7",
              opacity: feedback ? 0.6 : 1,
            }}
          >
            Odd
          </button>
        </div>
      </div>
      {feedback && (
        <div
          className="feedback-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background:
              feedback.type === "correct"
                ? "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)"
                : "#ff6b6b",
            color: "white",
            padding: "32px 56px",
            borderRadius: "24px",
            fontSize: "42px",
            fontWeight: "bold",
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            zIndex: 1000,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
}
