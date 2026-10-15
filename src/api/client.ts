import type {ProblemDetails} from "@/api/types.ts";

export class ApiError extends Error {
  status: number;
  problem: ProblemDetails | null;

  constructor(status: number, problem: ProblemDetails | null) {
    super(problem?.title ?? `Request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.problem = problem;
  }
}

type QueryParams = Record<string, string | number | undefined>;

interface RequestOptions {
  method?: "GET" | "POST";
  body?: unknown;
  query?: QueryParams;
}

export async function request<T>(path: string, {method = "GET", body, query}: RequestOptions = {}): Promise<T> {
  const url = new URL(path, import.meta.env.VITE_API_URL);
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    method,
    headers: body === undefined ? undefined : {"Content-Type": "application/json"},
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!response.ok) {
    const problem = await response.json().catch(() => null) as ProblemDetails | null;
    throw new ApiError(response.status, problem);
  }

  return await response.json() as T;
}
