"use client";

import Calculator from "../components/Calculator";

export default function CalculatorPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #dfe6e9 0%, #b2bec3 50%, #ffeaa7 100%)",
        padding: "40px 20px",
      }}
    >
      <Calculator />
    </div>
  );
}
