"use client";

import Link from "next/link";

const games = [
  {
    href: "/calculator",
    title: "Math Fun Calculator",
    description: "Calculate with colorful numbers and a celebration balloon!",
    emoji: "🧮",
    color: "#ff9ff3",
  },
  {
    href: "/times-tables",
    title: "Times Tables",
    description: "Multiply numbers from 1 to 20 — what’s the answer?",
    emoji: "🔢",
    color: "#00cec9",
  },
  {
    href: "/prime",
    title: "Prime Detective",
    description: "Is this number prime?",
    emoji: "🔍",
    color: "#a55eea",
  },
  {
    href: "/even-odd",
    title: "Even or Odd",
    description: "Fast number recognition!",
    emoji: "⚡",
    color: "#54a0ff",
  },
  {
    href: "/fibonacci",
    title: "Fibonacci Builder",
    description: "What comes next?",
    emoji: "📐",
    color: "#2ed573",
  },
  {
    href: "/big-numbers",
    title: "Big Number Explorer",
    description: "Pi, e, and huge numbers!",
    emoji: "🌌",
    color: "#ff9ff3",
  },
  {
    href: "/quiz",
    title: "Math Quiz",
    description: "Quick calculation practice",
    emoji: "📝",
    color: "#ffeaa7",
  },
  {
    href: "/compare",
    title: "Which Is Bigger?",
    description: "Pick the larger number!",
    emoji: "⚖️",
    color: "#fd79a8",
  },
  {
    href: "/skip-count",
    title: "Skip Counting",
    description: "What comes next in the pattern?",
    emoji: "🦘",
    color: "#74b9ff",
  },
  {
    href: "/double",
    title: "Double It!",
    description: "What is double this number?",
    emoji: "✖️",
    color: "#fdcb6e",
  },
  {
    href: "/count-stars",
    title: "Count the Stars",
    description: "How many stars do you see?",
    emoji: "⭐",
    color: "#a29bfe",
  },
  {
    href: "/game",
    title: "Shape Game",
    description: "Tap the shapes!",
    emoji: "🎯",
    color: "#fd79a8",
  },
];

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #ffeaa7 100%)",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          color: "#2d3436",
          marginBottom: "12px",
          fontWeight: "bold",
        }}
      >
        Number Games
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
          color: "#636e72",
          marginBottom: "40px",
        }}
      >
        Pick a game and have fun!
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {games.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "24px",
                padding: "28px",
                border: `4px solid ${game.color}`,
                boxShadow: `0 6px 0 ${game.color}80, 0 10px 25px rgba(0,0,0,0.12)`,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 10px 0 ${game.color}80, 0 14px 30px rgba(0,0,0,0.15)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 6px 0 ${game.color}80, 0 10px 25px rgba(0,0,0,0.12)`;
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                {game.emoji}
              </div>
              <h2
                style={{
                  fontSize: "22px",
                  color: "#2d3436",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {game.title}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#636e72",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {game.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
