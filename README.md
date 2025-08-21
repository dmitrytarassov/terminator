# Terminator

An interactive "safety terminate" for dangerous calls. It wraps an object/module so that before every function call it shows the call stack and a preview of arguments, asks **"Run?"**, and after execution asks **"Continue?"**. By default, pressing **Enter = Yes**.

Runs synchronously. Useful for migration scripts, admin CLIs, and local utilities when you need to double-check what’s being called inside.

---

### Installation

Requirements: macOS/Linux with `/bin/bash`, Node.js ≥ 18.

```bash
bun add execution-terminator
```

### Usage

Add snippet to beginning of your code.

```typescript
import fs from "fs";

import { terminate } from "execution-terminator";

terminate(fs, "fs");
```

### Demo

To run the demo (TypeScript without build):

```shell
git clone https://github.com/dmitrytarassov/terminator.git
cd terminator
bun install

bun run demo/terminate-fs.ts
```

### How It Works

- `terminate` iterates through all functions of an object and replaces them with wrappers.

- A wrapper calls terminator(type, functionName, args, callback):
  - prints the stack (getExecutionPath) and a call preview (stringifyArg), 
  - waits for confirmation "Run?" (Enter/y → run, anything else → process.exit(1)), 
  - executes callback(), prints Result: ..., 
  - asks "Continue?" (Enter/y → return result, otherwise exit with code 1). 
- Confirmations are printed to stderr, results to stdout.

**Default behavior:**

- Empty input (Enter) → Yes

- Any input other than y → No, immediate exit(1)