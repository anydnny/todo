const API_URL = '/api/';

type JsonBody = object;
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface RequestOptions<TBody> {
  method: HttpMethod;
  body?: TBody;
  errMessage?: string;
}

async function request<TResponse, TBody = undefined>(
  endpoint: string,
  { method, body, errMessage }: RequestOptions<TBody>
): Promise<TResponse> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(errMessage ?? `Ошибка запроса: ${method} ${endpoint}`);
  }

  if (response.status === 204 || response.status === 205) {
    return undefined as TResponse;
  }

  const rawBody = await response.text();
  if (!rawBody.trim()) {
    return undefined as TResponse;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return undefined as TResponse;
  }

  return JSON.parse(rawBody) as TResponse;
}

export const clientApi = {
  get: <TResponse>(endpoint: string, errMessage?: string) =>
    request<TResponse>(endpoint, { method: 'GET', errMessage }),
  post: <TResponse, TBody extends JsonBody>(
    endpoint: string,
    body: TBody,
    errMessage?: string
  ) =>
    request<TResponse, TBody>(endpoint, { method: 'POST', body, errMessage }),
  patch: <TResponse, TBody extends JsonBody | undefined = undefined>(
    endpoint: string,
    body?: TBody,
    errMessage?: string
  ) =>
    request<TResponse, TBody>(endpoint, { method: 'PATCH', body, errMessage }),
  put: <TResponse, TBody extends JsonBody>(
    endpoint: string,
    body: TBody,
    errMessage?: string
  ) => request<TResponse, TBody>(endpoint, { method: 'PUT', body, errMessage }),
  delete: <TResponse = void, TBody extends JsonBody | undefined = undefined>(
    endpoint: string,
    body?: TBody,
    errMessage?: string
  ) =>
    request<TResponse, TBody>(endpoint, {
      method: 'DELETE',
      body,
      errMessage,
    }),
};
