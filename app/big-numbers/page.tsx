"use client";

import { useState } from "react";
import Link from "next/link";
import { DISPLAY_BG } from "@/app/utils/numberColors";
import ColoredNumber from "@/app/components/ColoredNumber";

const PI_DIGITS =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
const E_DIGITS =
  "2.7182818284590452353602874713526624977572470936999595749669676277240766303535475945713821785251664274";

type BigNumberItem = {
  value?: string;
  /** For googol / googolplex — show this instead of digit-colored number */
  megaLabel?: string;
  name: string;
  zeros: string;
  fact: string;
};

const BIG_NUMBERS: BigNumberItem[] = [
  { value: "1,000", name: "Thousand", zeros: "3 zeros", fact: "A thousand is 10 × 10 × 10" },
  { value: "10,000", name: "Ten Thousand", zeros: "4 zeros", fact: "Ten thousands = 10 × 1,000" },
  { value: "100,000", name: "Hundred Thousand", zeros: "5 zeros", fact: "One hundred thousands!" },
  { value: "1,000,000", name: "Million", zeros: "6 zeros", fact: "A million has 6 zeros. Huge!" },
  { value: "1,000,000,000", name: "Billion", zeros: "9 zeros", fact: "A billion is 1,000 millions. Wow!" },
  { value: "1,000,000,000,000", name: "Trillion", zeros: "12 zeros", fact: "A trillion has 12 zeros. Super big!" },
  {
    value: "1,000,000,000,000,000",
    name: "Quadrillion",
    zeros: "15 zeros",
    fact: "1,000 trillions! The names keep going!",
  },
  {
    value: "1,000,000,000,000,000,000",
    name: "Quintillion",
    zeros: "18 zeros",
    fact: "A quintillion is mind-bogglingly big.",
  },
  {
    value: "1,000,000,000,000,000,000,000",
    name: "Sextillion",
    zeros: "21 zeros",
    fact: "Stars in the universe are counted in sextillions!",
  },
  {
    value: "1,000,000,000,000,000,000,000,000",
    name: "Septillion",
    zeros: "24 zeros",
    fact: "Seven groups of three zeros after the first 1.",
  },
  {
    value: "1,000,000,000,000,000,000,000,000,000",
    name: "Octillion",
    zeros: "27 zeros",
    fact: "Oct- means eight — eight groups of three zeros.",
  },
  {
    value: "1,000,000,000,000,000,000,000,000,000,000",
    name: "Nonillion",
    zeros: "30 zeros",
    fact: "Nine groups of three zeros. Almost at decillion!",
  },
  {
    value: "1,000,000,000,000,000,000,000,000,000,000,000",
    name: "Decillion",
    zeros: "33 zeros",
    fact: "Ten groups of three zeros. A classic big name in math!",
  },
  {
    value: "1,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000,000",
    name: "Vigintillion",
    zeros: "63 zeros (US short scale)",
    fact: "Viginti = twenty in Latin — 20 groups of three zeros!",
  },
  {
    megaLabel: "10^100",
    name: "Googol",
    zeros: "A 1 followed by 100 zeros",
    fact: "A mathematician’s nephew coined “googol.” The search company Google is named after this idea!",
  },
  {
    megaLabel: "10^303",
    name: "Centillion",
    zeros: "303 zeros (US short scale)",
    fact: "Centum = hundred in Latin. Way bigger than a googol — but still tiny next to a googolplex!",
  },
  {
    megaLabel: "10^(10^100)",
    name: "Googolplex",
    zeros: "A 1 followed by a googol zeros",
    fact: "Too big to write in our universe! There isn’t enough space for all those zeros. Your brain (and this screen) can’t hold it — and that’s the fun of it!",
  },
];

export default function BigNumbersPage() {
  const [expandedBig, setExpandedBig] = useState<number | null>(null);
  const [piDigits, setPiDigits] = useState(10);
  const [eDigits, setEDigits] = useState(10);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #a29bfe 100%)",
        padding: "40px 20px",
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
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          color: "#2d3436",
          fontWeight: "bold",
          marginTop: "20px",
          marginBottom: "8px",
        }}
      >
        Big Number Explorer
      </h1>
      <p style={{ textAlign: "center", fontSize: "18px", color: "#636e72", marginBottom: "40px" }}>
        Explore huge numbers and special numbers like π and e!
      </p>

      <div style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Big Numbers Section */}
        <section
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "28px",
            border: "4px solid #ff9ff3",
            boxShadow: "0 6px 0 #fd79a8",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#5f27cd", marginBottom: "20px", fontWeight: "bold" }}>
            Big Numbers
          </h2>
          <p style={{ fontSize: "16px", color: "#636e72", marginBottom: "20px" }}>
            Tap a number to see its name and a fun fact!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {BIG_NUMBERS.map((item, i) => (
              <div
                key={i}
                onClick={() => setExpandedBig(expandedBig === i ? null : i)}
                style={{
                  padding: "16px 20px",
                  backgroundColor: expandedBig === i ? "#ffeaa7" : "#f5f5f5",
                  borderRadius: "16px",
                  cursor: "pointer",
                  border: "3px solid #ff9ff3",
                  transition: "background-color 0.2s",
                }}
              >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: DISPLAY_BG,
                      padding: "4px 10px",
                      borderRadius: "8px",
                      marginRight: "8px",
                    }}
                  >
                    {item.megaLabel ? (
                      <span style={{ color: "#ffffff", fontFamily: "'Courier New', monospace" }}>
                        {item.megaLabel}
                      </span>
                    ) : item.value ? (
                      <ColoredNumber value={item.value} defaultColor="#b2bec3" />
                    ) : null}
                  </span>
                  – {item.name}
                </div>
                {expandedBig === i && (
                  <div style={{ marginTop: "12px", fontSize: "16px", color: "#636e72" }}>
                    <div>• {item.zeros}</div>
                    <div style={{ marginTop: "4px" }}>• {item.fact}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pi Section */}
        <section
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "28px",
            border: "4px solid #54a0ff",
            boxShadow: "0 6px 0 #0984e3",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#5f27cd", marginBottom: "12px", fontWeight: "bold" }}>
            π (Pi)
          </h2>
          <p style={{ fontSize: "14px", color: "#636e72", marginBottom: "16px" }}>
            Pi has infinite digits! It never repeats. Used for circles.
          </p>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "24px",
              wordBreak: "break-all",
              marginBottom: "12px",
              backgroundColor: DISPLAY_BG,
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <ColoredNumber value={PI_DIGITS.slice(0, piDigits)} defaultColor="#b2bec3" />
            {piDigits < PI_DIGITS.length ? "…" : ""}
          </div>
          <button
            onClick={() => setPiDigits((d) => Math.min(d + 10, PI_DIGITS.length))}
            disabled={piDigits >= PI_DIGITS.length}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(180deg, #54a0ff 0%, #2e86de 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: piDigits >= PI_DIGITS.length ? "default" : "pointer",
              opacity: piDigits >= PI_DIGITS.length ? 0.7 : 1,
            }}
          >
            Show more digits
          </button>
        </section>

        {/* e Section */}
        <section
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "28px",
            border: "4px solid #2ed573",
            boxShadow: "0 6px 0 #1e8449",
          }}
        >
          <h2 style={{ fontSize: "28px", color: "#5f27cd", marginBottom: "12px", fontWeight: "bold" }}>
            e (Euler's number)
          </h2>
          <p style={{ fontSize: "14px", color: "#636e72", marginBottom: "16px" }}>
            e also has infinite digits! Used in growth, nature, and lots of math.
          </p>
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "24px",
              wordBreak: "break-all",
              marginBottom: "12px",
              backgroundColor: DISPLAY_BG,
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <ColoredNumber value={E_DIGITS.slice(0, eDigits)} defaultColor="#b2bec3" />
            {eDigits < E_DIGITS.length ? "…" : ""}
          </div>
          <button
            onClick={() => setEDigits((d) => Math.min(d + 10, E_DIGITS.length))}
            disabled={eDigits >= E_DIGITS.length}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",
              background: "linear-gradient(180deg, #2ed573 0%, #27ae60 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: eDigits >= E_DIGITS.length ? "default" : "pointer",
              opacity: eDigits >= E_DIGITS.length ? 0.7 : 1,
            }}
          >
            Show more digits
          </button>
        </section>
      </div>
    </div>
  );
}
