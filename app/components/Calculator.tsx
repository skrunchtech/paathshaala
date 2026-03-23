"use client";

import { useEffect, useState } from "react";
import { getNumberColor, DISPLAY_BG } from "../utils/numberColors";
import ColoredNumber from "./ColoredNumber";
import Marquee from "./Marquee";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    "🎈 Good job 1000000 (1 Million)! 🎈"
  );
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const savedMessage = localStorage.getItem("balloonMessage");
    if (savedMessage) {
      setCustomMessage(savedMessage);
      setMessageInput(savedMessage);
    } else {
      setMessageInput("🎈 Good job Damma (100)! 🎈");
    }
  }, []);

  const handleSaveMessage = () => {
    if (messageInput.trim()) {
      setCustomMessage(messageInput.trim());
      localStorage.setItem("balloonMessage", messageInput.trim());
    }
  };

  const formatResult = (result: number): string => {
    if (result === Infinity || result === -Infinity) {
      return result === -Infinity ? "-∞" : "∞";
    }
    if (isNaN(result)) {
      return "Error";
    }
    return String(result);
  };

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(formatResult(result));
      setPreviousValue(result);
    }

    setWaitingForNewValue(true);
    setOperation(op);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return first / second;
      default:
        return second;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(formatResult(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      setShowBalloon(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const numBtnStyle = (digit: number) => {
    const { top, shadow, text } = getNumberColor(digit);
    return {
      padding: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      background: `linear-gradient(180deg, ${top} 0%, ${shadow} 100%)`,
      color: text,
      border: `3px solid ${top}`,
      borderRadius: "16px",
      cursor: "pointer",
      boxShadow: `0 4px 0 ${shadow}`,
      transition: "transform 0.1s, box-shadow 0.1s",
    };
  };

  const opBtnStyle = {
    padding: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    background: "linear-gradient(180deg, #a55eea 0%, #8854d0 100%)",
    color: "white",
    border: "3px solid #b67ee8",
    borderRadius: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 0 #6c5ce7",
  };

  useEffect(() => {
    if (showBalloon) {
      const timer = setTimeout(() => {
        setShowBalloon(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showBalloon]);

  return (
    <>
      <Marquee />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes flyAcross {
            0% { left: -200px; top: 20%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100vw; top: 20%; opacity: 0; }
          }
          .balloon-fly {
            position: fixed;
            animation: flyAcross 6s ease-in-out;
            z-index: 1000;
            pointer-events: none;
          }
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
          .calc-display.pop {
            animation: pop 0.2s ease-out;
          }
          .calc-btn {
            transition: transform 0.1s, box-shadow 0.1s;
          }
          .calc-btn:active {
            transform: translateY(4px) scale(0.97);
            box-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
          }
          .calc-container {
            border: 4px solid #ff9ff3;
            box-shadow: 0 8px 0 #ff6b9d, 0 12px 25px rgba(0,0,0,0.15);
          }
        `,
        }}
      />
      {showBalloon && (
        <div className="balloon-fly">
          <div
            style={{
              background:
                "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
              color: "white",
              padding: "15px 25px",
              borderRadius: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              whiteSpace: "nowrap",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {customMessage}
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          className="calc-container"
          style={{
            background: "linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)",
            padding: "24px",
            borderRadius: "24px",
            border: "4px solid #ff9ff3",
            boxShadow: "0 8px 0 #ff6b9d, 0 12px 25px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "28px",
              color: "#5f27cd",
              fontWeight: "bold",
              textShadow: "1px 1px 0 white",
            }}
          >
            🧮 Math Fun Calculator ✨
          </h1>

          <div
            className="calc-display"
            style={{
              background: DISPLAY_BG,
              padding: "20px 24px",
              borderRadius: "16px",
              marginBottom: "16px",
              fontSize: "36px",
              fontFamily: "'Courier New', monospace",
              textAlign: "right",
              minHeight: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              border: "3px solid #ff9ff3",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <ColoredNumber value={display} defaultColor="#b2bec3" />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              width: "320px",
            }}
          >
            <button
              className="calc-btn"
              onClick={handleClear}
              style={{
                gridColumn: "span 2",
                padding: "20px",
                fontSize: "18px",
                fontWeight: "bold",
                background: "linear-gradient(180deg, #ff6b6b 0%, #ee5a5a 100%)",
                color: "white",
                border: "3px solid #ff8787",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 0 #c0392b",
              }}
            >
              🗑️ Clear
            </button>
            <button
              className="calc-btn"
              onClick={() => handleOperation("/")}
              style={{
                padding: "20px",
                fontSize: "22px",
                fontWeight: "bold",
                background: "linear-gradient(180deg, #a55eea 0%, #8854d0 100%)",
                color: "white",
                border: "3px solid #b67ee8",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 0 #6c5ce7",
              }}
            >
              ÷
            </button>
            <button
              className="calc-btn"
              onClick={() => handleOperation("*")}
              style={{
                padding: "20px",
                fontSize: "22px",
                fontWeight: "bold",
                background: "linear-gradient(180deg, #a55eea 0%, #8854d0 100%)",
                color: "white",
                border: "3px solid #b67ee8",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 0 #6c5ce7",
              }}
            >
              ×
            </button>

            <button className="calc-btn" onClick={() => handleNumber("7")} style={numBtnStyle(7)}>7</button>
            <button className="calc-btn" onClick={() => handleNumber("8")} style={numBtnStyle(8)}>8</button>
            <button className="calc-btn" onClick={() => handleNumber("9")} style={numBtnStyle(9)}>9</button>
            <button className="calc-btn" onClick={() => handleOperation("-")} style={opBtnStyle}>−</button>

            <button className="calc-btn" onClick={() => handleNumber("4")} style={numBtnStyle(4)}>4</button>
            <button className="calc-btn" onClick={() => handleNumber("5")} style={numBtnStyle(5)}>5</button>
            <button className="calc-btn" onClick={() => handleNumber("6")} style={numBtnStyle(6)}>6</button>
            <button className="calc-btn" onClick={() => handleOperation("+")} style={opBtnStyle}>+</button>

            <button className="calc-btn" onClick={() => handleNumber("1")} style={numBtnStyle(1)}>1</button>
            <button className="calc-btn" onClick={() => handleNumber("2")} style={numBtnStyle(2)}>2</button>
            <button className="calc-btn" onClick={() => handleNumber("3")} style={numBtnStyle(3)}>3</button>
            <button
              className="calc-btn"
              onClick={handleEquals}
              style={{
                padding: "20px",
                fontSize: "28px",
                fontWeight: "bold",
                background: "linear-gradient(180deg, #ffeaa7 0%, #fdcb6e 100%)",
                color: "#2d3436",
                border: "3px solid #f9ca24",
                borderRadius: "16px",
                cursor: "pointer",
                gridRow: "span 2",
                boxShadow: "0 4px 0 #e17055",
              }}
            >
              = ✨
            </button>

            <button className="calc-btn" onClick={() => handleNumber("0")} style={{ ...numBtnStyle(0), gridColumn: "span 2" }}>0</button>
            <button
              className="calc-btn"
              onClick={() => handleNumber(".")}
              style={{
                padding: "20px",
                fontSize: "24px",
                fontWeight: "bold",
                background: "linear-gradient(180deg, #81ecec 0%, #00cec9 100%)",
                color: "white",
                border: "3px solid #55efc4",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 0 #00b894",
              }}
            >
              .
            </button>
          </div>
        </div>

        <div
          style={{
            background: "linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)",
            padding: "25px",
            borderRadius: "24px",
            border: "4px solid #ff9ff3",
            boxShadow: "0 6px 0 #ff6b9d, 0 10px 25px rgba(0,0,0,0.12)",
            width: "300px",
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: "20px", color: "#5f27cd", fontWeight: "bold" }}>
            ✏️ Customize Balloon
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Enter your message..."
              style={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "2px solid #e0e0e0",
                resize: "vertical",
                minHeight: "100px",
                fontFamily: "inherit",
              }}
            />
            <button
              className="calc-btn"
              onClick={handleSaveMessage}
              style={{
                padding: "14px 24px",
                fontSize: "16px",
                background: "linear-gradient(180deg, #54a0ff 0%, #2e86de 100%)",
                color: "white",
                border: "3px solid #74b9ff",
                borderRadius: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 4px 0 #0984e3",
              }}
            >
              💾 Save Message
            </button>
            <div
              style={{
                padding: "15px",
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <strong>Current message:</strong>
              <div style={{ marginTop: "8px", color: "#333" }}>
                {customMessage}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
