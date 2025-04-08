export type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export const ok = <T, E = Error>(value: T): Result<T, E> => ({
  ok: true,
  value,
});

export const err = <T, E = Error>(error: E): Result<T, E> => ({
  ok: false,
  error,
});

export default Result;
