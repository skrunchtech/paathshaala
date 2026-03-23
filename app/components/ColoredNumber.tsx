"use client";

import { getDigitSpans } from "../utils/numberColors";

interface ColoredNumberProps {
  value: string | number;
  style?: React.CSSProperties;
  defaultColor?: string;
}

export default function ColoredNumber({ value, style = {}, defaultColor = "#2d3436" }: ColoredNumberProps) {
  const spans = getDigitSpans(value, defaultColor);
  return (
    <span style={style}>
      {spans.map(({ key, char, color }) => (
        <span key={key} style={{ color }}>
          {char}
        </span>
      ))}
    </span>
  );
}
