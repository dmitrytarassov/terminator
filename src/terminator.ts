import * as process from "node:process";

import { getExecutionPath } from "@/getExecutionPath";
import { prompt } from "@/prompt";
import { stringifyArg } from "@/stringifyArg";

const exit = process.exit;

export function terminator(
  type: string,
  functionName: string,
  args: any[],
  callback: () => any,
) {
  const executionPath = getExecutionPath();
  const callPreview = `${type}.${functionName}(\n${args.map(stringifyArg).join(",\n")}\n)`;

  const response = prompt(`${executionPath}\n${callPreview}\nRun?`);

  if (response === null || response === "y") {
    const result = callback();
    console.log("Result: " + result);
    const continueResponse = prompt("Continue?");
    if (continueResponse === null || continueResponse === "y") {
      return result;
    } else {
      exit(1);
    }
  } else {
    exit(1);
  }
}
