export const hapticFeedback = (ms: number | number[] = 15) => {
  if (typeof window !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(ms);
  }
};

export const hapticVariants = {
  default: 15,
  soft: 10,
  medium: 30,
  heavy: 60,
  error: [50, 50, 50],
  success: [10, 30, 10],
};