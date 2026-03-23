"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { getRandomCorrectMessage, getRandomTryAgainMessage } from "@/app/utils/feedbackMessages";
import { getNumberColor, DISPLAY_BG } from "@/app/utils/numberColors";
import ColoredNumber from "@/app/components/ColoredNumber";

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

function newQuestion(): { a: number; b: number; answer: number; options: number[] } {
  const a = randomInt(1, 20);
  const b = randomInt(1, 20);
  const answer = a * b;
  const used = new Set<number>([answer]);
  const wrong: number[] = [];
  const deltas = [
    -50, -30, -20, -15, -10, -8, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 8, 10, 15, 20, 30, 50,
  ];
  for (const d of deltas) {
    const c = answer + d;
    if (c > 0 && c !== answer && !used.has(c)) {
      wrong.push(c);
      used.add(c);
    }
  }
  let step = 1;
  while (wrong.length < 3 && step < 200) {
    const c = answer + step;
    if (c > 0 && !used.has(c)) {
      wrong.push(c);
      used.add(c);
    }
    step++;
  }
  const picks = shuffle(wrong).slice(0, 3);
  return { a, b, answer, options: shuffle([answer, ...picks]) };
}

export default function TimesTablesPage() {
  const [q, setQ] = useState(() => newQuestion());
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong"; message: string } | null>(null);
  const [streak, setStreak] = useState(0);

  const handleAnswer = useCallback(
    (pick: number) => {
      if (pick === q.answer) {
        setFeedback({ type: "correct", message: getRandomCorrectMessage() });
        setStreak((s) => s + 1);
        setTimeout(() => {
          setFeedback(null);
          setQ(newQuestion());
        }, 1500);
      } else {
        setFeedback({ type: "wrong", message: getRandomTryAgainMessage() });
        setStreak(0);
        setTimeout(() => setFeedback(null), 1500);
      }
    },
    [q.answer]
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
          Times Tables
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#636e72",
            margin: "-12px 0 0",
            textAlign: "center",
            maxWidth: "420px",
          }}
        >
          Multiply numbers from 1 to 20 — pick the right answer!
        </p>
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
        <div
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            backgroundColor: DISPLAY_BG,
            padding: "28px 32px",
            borderRadius: "20px",
            border: "4px solid #00cec9",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px",
            maxWidth: "min(100%, 420px)",
          }}
        >
          <ColoredNumber value={String(q.a)} style={{ fontSize: "36px" }} defaultColor="#b2bec3" />
          <span style={{ color: "#636e72", fontSize: "36px" }}>×</span>
          <ColoredNumber value={String(q.b)} style={{ fontSize: "36px" }} defaultColor="#b2bec3" />
          <span style={{ color: "#b2bec3", fontSize: "36px" }}> = ?</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "14px",
            maxWidth: "360px",
          }}
        >
          {q.options.map((opt) => {
            const { top, shadow, text } = getNumberColor(opt);
            return (
              <button
                key={`${opt}-${q.a}-${q.b}`}
                type="button"
                onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                style={{
                  padding: "20px 28px",
                  fontSize: "30px",
                  fontWeight: "bold",
                  background: `linear-gradient(180deg, ${top} 0%, ${shadow} 100%)`,
                  color: text,
                  border: `3px solid ${top}`,
                  borderRadius: "16px",
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
