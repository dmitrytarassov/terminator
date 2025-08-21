# Terminator

Интерактивный «предохранитель» для опасных вызовов. Оборачивает объект/модуль так, что перед каждым вызовом функции показывает стек вызова и предпросмотр аргументов, задаёт вопрос «Run?» и после выполнения — «Continue?». По умолчанию Enter = «Да».

Работает синхронно. Удобно для скриптов миграций, админских CLI и локальных утилит, когда важно проверить, что вызывается внутри.

---

### Установка

Требования: macOS/Linux с `/bin/bash`, Node.js ≥ 18.

```bash
git clone https://github.com/dmitrytarassov/terminator.git
cd terminator
bun install
```

Для запуска демо (TypeScript без сборки):

```bash
bun run demo/terminate-fs.ts
```

---

### Быстрый старт

```ts
import fs from "fs";

import { terminate } from "@/index";

terminate(fs, "fs");

const data = fs.readFileSync("/tmp/secret", "utf-8");
console.log("data:", data);
```

---

### Как это работает

- `terminate` обходит все функции объекта и подменяет их обёртками.
- Обёртка вызывает `terminator(type, functionName, args, callback)`:
  - печатает стек (`getExecutionPath`) и предпросмотр вызова (`stringifyArg`),
  - ждёт ответ на «Run?» (Enter/`y` → выполнить, иначе выход `process.exit(1)`),
  - выполняет `callback()`, печатает `Result: ...`,
  - спрашивает «Continue?» (Enter/`y` → вернуть результат, иначе выход с кодом 1).
- Подтверждения печатаются в `stderr`, результаты — в `stdout`.

Поведение по умолчанию:

- Пустой ввод (Enter) трактуется как «Да».
- Любой отличный от `y` ввод — «Нет» → немедленный `exit(1)`.

---
