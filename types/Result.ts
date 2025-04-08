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

// Transform a successful value (skip on error)
export const map = <T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> => {
  if (result.ok) {
    return { ok: true, value: fn(result.value) };
  }
  return result as unknown as Result<U, E>;
};

// Chain operations that return Results
export const flatMap = <T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> => {
  if (result.ok) {
    return fn(result.value);
  }
  return result as unknown as Result<U, E>;
};

export const fold = <T, E, R>(
  result: Result<T, E>,
  onSuccess: (value: T) => R,
  onFailure: (error: E) => R,
): R => {
  if (result.ok) {
    return onSuccess(result.value);
  } else {
    return onFailure(result.error);
  }
};

export const chain = <T, E = Error>(
  initial: Result<T, E>,
  ...operations: Array<(value: any) => Result<any, E>>
): Result<any, E> => {
  return operations.reduce(
    (result, operation) => flatMap(result, operation),
    initial
  );
};

export default Result;
