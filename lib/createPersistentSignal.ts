import { effect, type Signal, signal } from "@preact/signals";

function createPersistentSignal<T>(
  key: string,
  defaultValue: T,
): Signal<T> {
  const stored = localStorage.getItem(key);
  const initial = stored
    ? (typeof defaultValue === "string" ? stored : JSON.parse(stored))
    : defaultValue;
  const sig = signal<T>(initial);

  effect(() => {
    const value = sig.value;
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  });

  return sig;
}

export default createPersistentSignal;
