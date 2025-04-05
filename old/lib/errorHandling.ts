export const tryFn = <T>(fn: () => T): [Error | null, T | null] => {
  try {
    return [null, fn()];
  } catch (err) {
    return [err instanceof Error ? err : new Error(String(err)), null];
  }
};