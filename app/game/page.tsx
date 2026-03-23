"use client";

import { useState } from "react";

export default function GamePage() {
  const [greeting, setGreeting] = useState<string | null>(null);

  const showGreeting = (message: string) => {
    setGreeting(message);
    setTimeout(() => {
      setGreeting(null);
    }, 2000);
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pop {
            0% {
              transform: scale(0);
              opacity: 0;
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          .greeting-popup {
            animation: pop 0.3s ease-out;
          }
        `,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <h1 style={{ fontSize: "36px", color: "#333" }}>Shape Game</h1>

        <div
          style={{
            display: "flex",
            gap: "40px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Triangle Button */}
          <button
            onClick={() => showGreeting("Hi 25!")}
            style={{
              width: "0",
              height: "0",
              borderLeft: "60px solid transparent",
              borderRight: "60px solid transparent",
              borderBottom: "100px solid #ff6b6b",
              cursor: "pointer",
              borderTop: "none",
              background: "none",
              padding: 0,
              transition: "transform 0.2s",
              filter: "drop-shadow(0 4px 8px rgba(255, 107, 107, 0.4))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />

          {/* Circle Button */}
          <button
            onClick={() => showGreeting("Hi 15!")}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />

          {/* Square Button */}
          <button
            onClick={() => showGreeting("Hi 100!")}
            style={{
              width: "120px",
              height: "120px",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
              boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          />
        </div>

        {/* Greeting Popup */}
        {greeting && (
          <div
            className="greeting-popup"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
              color: "white",
              padding: "30px 50px",
              borderRadius: "20px",
              fontSize: "48px",
              fontWeight: "bold",
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
              zIndex: 1000,
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {greeting}
          </div>
        )}
      </div>
    </>
  );
}
