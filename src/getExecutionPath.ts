export function getExecutionPath(): string {
  let path = undefined;
  try {
    path = new Error().stack
      .split("\n")
      .map((line, index, arr) =>
        index > 1 && index < arr.length ? line.trim() : null,
      )
      .filter(Boolean)
      .join("\n");
  } catch {
    // do nothing
  }
  return path || "";
}
