// types.ts veya ilgili dosyada:

export interface ValidationError {
  type: "ValidationError";
  errors: {
    [field: string]: string[];
  };
}

export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { type: string }).type === "ValidationError" &&
    typeof (error as { errors: unknown }).errors === "object"
  );
}
