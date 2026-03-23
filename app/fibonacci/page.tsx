"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getRandomCorrectMessage, getRandomTryAgainMessage } from "@/app/utils/feedbackMessages";
import { getNumberColor, DISPLAY_BG } from "@/app/utils/numberColors";
import ColoredNumber from "@/app/components/ColoredNumber";

const FIB: number[] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateQuestion(): { seq: (number | null)[]; blankIndex: number; correct: number; options: number[] } {
  const blankIndex = Math.floor(Math.random() * (FIB.length - 2)) + 2;
  const correct = FIB[blankIndex];
  const wrongOptions: number[] = [];
  const used = new Set([correct]);
  for (const offset of [-3, -2, -1, 1, 2, 3, 4, 5, 6, 7]) {
    const cand = correct + offset;
    if (cand > 0 && !used.has(cand) && !FIB.includes(cand)) {
      wrongOptions.push(cand);
      used.add(cand);
      if (wrongOptions.length >= 3) break;
    }
  }
  const options = shuffle([correct, ...wrongOptions]);
  const seq = FIB.slice(0, blankIndex + 1).map((n, i) => (i === blankIndex ? null : n));
  return { seq, blankIndex, correct, options };
}

export default function FibonacciPage() {
  const [state, setState] = useState(() => generateQuestion());
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const handleAnswer = useCallback(
    (answer: number) => {
      if (answer === state.correct) {
        setFeedback({ type: "correct", message: getRandomCorrectMessage() });
        setStreak((s) => s + 1);
        setTimeout(() => {
          setFeedback(null);
          setState(generateQuestion());
        }, 1500);
      } else {
        setFeedback({ type: "wrong", message: getRandomTryAgainMessage() });
        setStreak(0);
        setTimeout(() => setFeedback(null), 1500);
      }
    },
    [state.correct]
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
          background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #2ed573 100%)",
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
          Fibonacci Builder
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
        <p style={{ fontSize: "18px", color: "#2d3436", margin: 0 }}>
          What number comes next?
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "36px",
            fontWeight: "bold",
            backgroundColor: DISPLAY_BG,
            padding: "32px 40px",
            borderRadius: "24px",
            border: "4px solid #2ed573",
            boxShadow: "0 8px 0 #1e8449",
          }}
        >
          {state.seq.map((n, i) => (
            <span key={i}>
              {n === null ? (
                <span style={{ color: "#b2bec3" }}>___</span>
              ) : (
                <ColoredNumber value={n} style={{ fontSize: "36px" }} />
              )}
              {i < state.seq.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {state.options.map((opt) => {
            const { top, shadow, text } = getNumberColor(opt);
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                style={{
                  padding: "20px 36px",
                  fontSize: "28px",
                  fontWeight: "bold",
                  background: `linear-gradient(180deg, ${top} 0%, ${shadow} 100%)`,
                  color: text,
                  border: `3px solid ${top}`,
                  borderRadius: "20px",
                  cursor: feedback ? "default" : "pointer",
                  boxShadow: `0 4px 0 ${shadow}`,
                  opacity: feedback ? 0.6 : 1,
                }}
              >
                {opt}
              </button>
            );
          })}
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
