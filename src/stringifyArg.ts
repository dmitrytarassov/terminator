export function stringifyArg(arg: any | any[]): string {
  if (Array.isArray(arg) || (typeof arg === "object" && arg !== null)) {
    return JSON.stringify(arg, null, 2)
      .split("\n")
      .map((e) => `\t${e}`)
      .join("\n");
  }

  return `\t${arg}`;
}
