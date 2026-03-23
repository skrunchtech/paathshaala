const CORRECT_MESSAGES = [
  "You got it!",
  "You're awesome!",
  "You're great!",
  "Amazing!",
  "Brilliant!",
  "Super star!",
  "Well done!",
  "Fantastic!",
  "You nailed it!",
  "Perfect!",
  "Incredible!",
  "Outstanding!",
  "You are a genius!",
  "So clever!",
  "Wonderful!",
  "Excellent!",
  "Spectacular!",
];

const TRY_AGAIN_MESSAGES = [
  "Try again!",
  "Almost there!",
  "Give it another go!",
  "Not quite - try once more!",
  "Keep trying!",
  "You'll get it!",
  "One more try!",
  "Don't give up!",
  "Try again - you got this!",
  "So close! Try again!",
  "Next time!",
  "Keep going!",
];

export function getRandomCorrectMessage(): string {
  return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
}

export function getRandomTryAgainMessage(): string {
  return TRY_AGAIN_MESSAGES[Math.floor(Math.random() * TRY_AGAIN_MESSAGES.length)];
}
