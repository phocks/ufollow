import { Signal, signal } from "@preact/signals";

export function mite<T>(key: string, defaultValue: T): Signal<T> {
  const stored = localStorage.getItem(key);
  const initial = stored 
    ? (typeof defaultValue === 'string' 
      ? stored 
      : JSON.parse(stored))
    : defaultValue;
  const sig = signal<T>(initial);

  sig.subscribe((value) => {
    localStorage.setItem(
      key, 
      typeof value === 'string' 
        ? value 
        : JSON.stringify(value)
    );
  });

  return sig;
}