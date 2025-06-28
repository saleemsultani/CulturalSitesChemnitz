export function escapeRegex(str) {
  if (typeof text !== "string") return "";
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
