"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getRandomCorrectMessage, getRandomTryAgainMessage } from "@/app/utils/feedbackMessages";
import { getNumberColor, DISPLAY_BG } from "@/app/utils/numberColors";
import ColoredNumber from "@/app/components/ColoredNumber";

type Op = "+" | "-" | "*";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateProblem(): { a: number; b: number; op: Op; answer: number; options: number[] } {
  const op = ["+", "-", "*"][randomInt(0, 2)] as Op;
  let a: number, b: number, answer: number;
  if (op === "+") {
    a = randomInt(2, 20);
    b = randomInt(2, 20);
    answer = a + b;
  } else if (op === "-") {
    a = randomInt(10, 30);
    b = randomInt(2, a - 1);
    answer = a - b;
  } else {
    a = randomInt(2, 10);
    b = randomInt(2, 10);
    answer = a * b;
  }
  const used = new Set([answer]);
  const wrongOptions: number[] = [];
  for (let i = 0; wrongOptions.length < 3; i++) {
    const offset = randomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);
    const cand = answer + offset;
    if (cand >= 0 && cand !== answer && !used.has(cand)) {
      wrongOptions.push(cand);
      used.add(cand);
    }
  }
  const options = shuffle([answer, ...wrongOptions.slice(0, 3)]);
  return { a, b, op, answer, options };
}

const OP_SYMBOL: Record<Op, string> = { "+": "+", "-": "−", "*": "×" };

export default function QuizPage() {
  const [problem, setProblem] = useState(() => generateProblem());
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const handleAnswer = useCallback(
    (guess: number) => {
      if (guess === problem.answer) {
        setFeedback({ type: "correct", message: getRandomCorrectMessage() });
        setStreak((s) => s + 1);
        setTimeout(() => {
          setFeedback(null);
          setProblem(generateProblem());
        }, 1500);
      } else {
        setFeedback({ type: "wrong", message: getRandomTryAgainMessage() });
        setStreak(0);
        setTimeout(() => setFeedback(null), 1500);
      }
    },
    [problem.answer]
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
          background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #ffeaa7 100%)",
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
          Math Quiz
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
            fontSize: "48px",
            fontWeight: "bold",
            backgroundColor: DISPLAY_BG,
            padding: "40px 60px",
            borderRadius: "24px",
            border: "4px solid #fdcb6e",
            boxShadow: "0 8px 0 #e17055",
          }}
        >
          <ColoredNumber value={problem.a} style={{ fontSize: "48px" }} /> {OP_SYMBOL[problem.op]}{" "}
          <ColoredNumber value={problem.b} style={{ fontSize: "48px" }} /> = ?
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            maxWidth: "400px",
          }}
        >
          {problem.options.map((opt) => {
            const { top, shadow, text } = getNumberColor(opt);
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                style={{
                  padding: "24px 32px",
                  fontSize: "32px",
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
