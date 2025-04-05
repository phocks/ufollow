import { Signal, signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function mite<T>(key: string, defaultValue: T): Signal<T> {
  if (!IS_BROWSER) {
    return signal(defaultValue);
  }
  
  const stored = localStorage.getItem(key);
  const initial = stored 
    ? (typeof defaultValue === 'string' 
      ? stored 
      : JSON.parse(stored))
    : defaultValue;
  const sig = signal<T>(initial);

  sig.subscribe((value: T) => {
    localStorage.setItem(
      key, 
      typeof value === 'string' 
        ? value 
        : JSON.stringify(value)
    );
  });

  return sig;
}