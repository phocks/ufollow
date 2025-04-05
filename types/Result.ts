type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export default Result;