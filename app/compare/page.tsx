"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getRandomCorrectMessage, getRandomTryAgainMessage } from "@/app/utils/feedbackMessages";
import { DISPLAY_BG } from "@/app/utils/numberColors";
import ColoredNumber from "@/app/components/ColoredNumber";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newPair(): { a: number; b: number } {
  let a = randomInt(1, 99);
  let b = randomInt(1, 99);
  while (b === a) b = randomInt(1, 99);
  return { a, b };
}

export default function ComparePage() {
  const [pair, setPair] = useState(() => newPair());
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const bigger = pair.a > pair.b ? pair.a : pair.b;

  const handlePick = useCallback(
    (picked: number) => {
      if (picked === bigger) {
        setFeedback({ type: "correct", message: getRandomCorrectMessage() });
        setStreak((s) => s + 1);
        setTimeout(() => {
          setFeedback(null);
          setPair(newPair());
        }, 1500);
      } else {
        setFeedback({ type: "wrong", message: getRandomTryAgainMessage() });
        setStreak(0);
        setTimeout(() => setFeedback(null), 1500);
      }
    },
    [bigger]
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
          background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #fd79a8 100%)",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
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
        <h1 style={{ fontSize: "34px", color: "#2d3436", fontWeight: "bold", marginTop: "20px" }}>
          Which Is Bigger?
        </h1>
        {streak > 0 && (
          <div
            style={{
              fontSize: "22px",
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
        <p style={{ fontSize: "18px", color: "#2d3436", margin: 0 }}>Tap the bigger number!</p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => handlePick(pair.a)}
            disabled={!!feedback}
            style={{
              padding: "32px 40px",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: DISPLAY_BG,
              color: "white",
              border: "4px solid #fd79a8",
              borderRadius: "20px",
              cursor: feedback ? "default" : "pointer",
              boxShadow: "0 8px 0 #e84393",
              opacity: feedback ? 0.6 : 1,
            }}
          >
            <ColoredNumber value={pair.a} style={{ fontSize: "48px" }} defaultColor="#b2bec3" />
          </button>
          <button
            type="button"
            onClick={() => handlePick(pair.b)}
            disabled={!!feedback}
            style={{
              padding: "32px 40px",
              fontSize: "48px",
              fontWeight: "bold",
              backgroundColor: DISPLAY_BG,
              color: "white",
              border: "4px solid #fd79a8",
              borderRadius: "20px",
              cursor: feedback ? "default" : "pointer",
              boxShadow: "0 8px 0 #e84393",
              opacity: feedback ? 0.6 : 1,
            }}
          >
            <ColoredNumber value={pair.b} style={{ fontSize: "48px" }} defaultColor="#b2bec3" />
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
            padding: "28px 44px",
            borderRadius: "24px",
            fontSize: "36px",
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
