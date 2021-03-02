export default function randomInt(a, b) {
  if (typeof a !== "number") return NaN;
  if (typeof b !== "number") return Math.round(Math.random() * a);
  return Math.round(Math.random() * Math.abs(b - a) + Math.min(a, b));
}
