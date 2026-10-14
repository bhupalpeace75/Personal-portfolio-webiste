export function validateInquiry(data: unknown): {
  clean: Record<string, string>;
  errors: Record<string, string>;
};
