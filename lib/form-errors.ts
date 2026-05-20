import type { ZodError } from "zod";

export function zodFieldErrors(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues
      .filter((issue) => issue.path[0] !== undefined)
      .map((issue) => [String(issue.path[0]), issue.message])
  );
}
