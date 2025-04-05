import type Result from "~/types/Result.ts";

// Helper function for safe JSON parsing
const safeJsonParse = (text: string): Result<any> => {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e : new Error("JSON parse error"),
    };
  }
};

export default safeJsonParse;
