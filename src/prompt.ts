import { execSync } from "node:child_process";

export function prompt(message = ""): string | null {
  const msg = String(message);
  const escaped = msg
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/`/g, "\\`")
    .replace(/\$/g, "\\$");

  const cmd = `printf "%s" "${escaped}\\n> " >&2; read REPLY; printf "%s" "$REPLY"`;

  const out = execSync(cmd, {
    stdio: ["inherit", "pipe", "inherit"],
    shell: "/bin/bash",
  });

  const s = out.toString("utf8");
  return s.length ? s : null;
}
