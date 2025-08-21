import { terminator } from "@/terminator";

export function terminate<T>(_module: T, moduleName: string): T {
  Object.keys(_module).forEach((key) => {
    const handler = _module[key];

    if (typeof _module[key] === "function") {
      _module[key] = (...args) => {
        return terminator(moduleName, key, args, () => {
          return handler.apply(null, args);
        });
      };
    }
  });

  return _module;
}
