// Copied from: https://github.com/douglascrockford/JSON-js/blob/master/cycle.js#L72
export default function isPureObj(value: any) {
  return (
    typeof value === "object" &&
    value !== null &&
    !(value instanceof Boolean) &&
    !(value instanceof Date) &&
    !(value instanceof Number) &&
    !(value instanceof RegExp) &&
    !(value instanceof String) &&
    !(value instanceof Array)
  );
}
