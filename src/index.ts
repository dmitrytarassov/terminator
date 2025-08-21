import { terminator } from "@/terminator";

type AnyRecord = Record<string, any>;

export function terminate<T extends AnyRecord>(
  moduleObj: T,
  moduleName: string,
): T {
  const wrapped: AnyRecord = { ...moduleObj };

  Object.keys(moduleObj).forEach((key) => {
    const handler = moduleObj[key];
    if (typeof handler === "function") {
      wrapped[key] = function (...args: any[]) {
        // сохранить контекст вызова, если критично:
        const self = this;
        return terminator(moduleName, key, args, () =>
          handler.apply(self, args),
        );
      };
    }
  });

  return wrapped as T;
}
