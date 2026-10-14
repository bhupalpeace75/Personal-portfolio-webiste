export function handleInquiry(
  request: Request,
  env: Record<string, string | undefined>,
  fetcher?: typeof fetch,
): Promise<Response>;
