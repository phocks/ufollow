export function redirectBrowserTo(url: string) {
  if (typeof globalThis !== "undefined") {
    globalThis.location.href = url;
  }
}
