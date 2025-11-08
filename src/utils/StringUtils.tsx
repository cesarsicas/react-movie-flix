export function capitalize(s: string) {
  if (typeof s !== "string" || s.length === 0) {
    return s;
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}
