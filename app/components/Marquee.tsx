"use client";

export default function Marquee() {
  const messages = [
    "🎉 Have fun learning! ",
    "⭐ You're doing great! ",
    "🌈 Math is awesome! ",
    "🎈 Keep it up! ",
    "🚀 You're a star! ",
    "✨ Amazing work! ",
    "🎮 Let's play & learn! ",
  ];

  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#ffe66d",
    "#95e1d3",
    "#ff9ff3",
    "#54a0ff",
    "#5f27cd",
  ];

  return (
    <div
      style={{
        overflow: "hidden",
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4ecdc4 100%)",
        backgroundSize: "200% 100%",
        padding: "14px 0",
        borderBottom: "4px dashed rgba(255,255,255,0.6)",
        position: "relative",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes scroll-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
            @keyframes wiggle {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes glow {
              0%, 100% { text-shadow: 2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.5); }
              50% { text-shadow: 2px 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.8); }
            }
            .marquee-track {
              display: flex;
              width: max-content;
              animation: scroll-left 20s linear infinite;
            }
            .marquee-track:hover {
              animation-play-state: paused;
            }
            .marquee-item {
              display: inline-flex;
              align-items: center;
              padding: 0 24px;
              font-size: 22px;
              font-weight: bold;
              color: white;
              white-space: nowrap;
              animation: bounce 1.2s ease-in-out infinite;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.4);
              transition: transform 0.2s;
            }
            .marquee-item:nth-child(odd) {
              animation-delay: 0.1s;
            }
            .marquee-item:nth-child(3n) {
              animation-delay: 0.3s;
            }
            .marquee-item:nth-child(5n) {
              animation-delay: 0.5s;
            }
            .marquee-item span {
              display: inline-block;
              animation: wiggle 2.5s ease-in-out infinite;
              padding: 2px 4px;
            }
            .marquee-item span:hover {
              transform: scale(1.2);
            }
          `,
        }}
      />
      <div className="marquee-track">
        {[...messages, ...messages].map((msg, i) => (
          <div
            key={i}
            className="marquee-item"
            style={{
              backgroundColor: colors[i % colors.length],
              borderRadius: "20px",
              margin: "0 4px",
              border: "2px solid rgba(255,255,255,0.6)",
            }}
          >
            <span>{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
