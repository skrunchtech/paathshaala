/**
 * Rainbow color mapping for numbers 1-10.
 * 1=red, 2=orange, 3=yellow, 4=green, 5=blue,
 * 6=indigo, 7=violet, 8=pink, 9=gray, 10=white
 * display = color for text on dark background
 */
export const NUMBER_COLORS: Record<number, { top: string; shadow: string; text: string; display: string }> = {
  1: { top: "#ff6b6b", shadow: "#c0392b", text: "white", display: "#ff6b6b" },
  2: { top: "#ff9f43", shadow: "#e67e22", text: "white", display: "#ff9f43" },
  3: { top: "#ffeaa7", shadow: "#fdcb6e", text: "#2d3436", display: "#fdcb6e" },
  4: { top: "#2ed573", shadow: "#27ae60", text: "white", display: "#2ed573" },
  5: { top: "#54a0ff", shadow: "#0984e3", text: "white", display: "#54a0ff" },
  6: { top: "#6c5ce7", shadow: "#5f27cd", text: "white", display: "#6c5ce7" },
  7: { top: "#a29bfe", shadow: "#8e44ad", text: "white", display: "#a29bfe" },
  8: { top: "#fd79a8", shadow: "#e84393", text: "white", display: "#fd79a8" },
  9: { top: "#b2bec3", shadow: "#636e72", text: "white", display: "#b2bec3" },
  10: { top: "#ffffff", shadow: "#dfe6e9", text: "#2d3436", display: "#ffffff" },
};

export function getNumberColor(n: number): { top: string; shadow: string; text: string; display: string } {
  const digit = Math.abs(n) % 10;
  const key = (digit === 0 ? 10 : digit) as keyof typeof NUMBER_COLORS;
  return NUMBER_COLORS[key] ?? NUMBER_COLORS[1];
}

/** Dark background for number displays - ensures all digits (including white for 0) are visible */
export const DISPLAY_BG = "#2d3436";

/** Renders a string with each digit colored by the rainbow code. Non-digits use defaultColor. */
export function getDigitSpans(value: string | number, defaultColor = "#2d3436") {
  const str = String(value);
  const chars = str.split("");
  return chars.map((char, i) => {
    const digit = parseInt(char, 10);
    if (!isNaN(digit)) {
      const { display } = getNumberColor(digit === 0 ? 10 : digit);
      return { key: i, char, color: display };
    }
    return { key: i, char, color: defaultColor };
  });
}
