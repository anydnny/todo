import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { clientApi } from './clientApi';

type MockResponse = {
  ok: boolean;
  status: number;
  text: () => Promise<string>;
  headers: { get: (name: string) => string | null };
};

function makeResponse(params: {
  ok?: boolean;
  status?: number;
  body?: string;
  contentType?: string | null;
}): MockResponse {
  const {
    ok = true,
    status = 200,
    body = '',
    contentType = 'application/json',
  } = params;

  return {
    ok,
    status,
    text: async () => body,
    headers: { get: () => contentType },
  };
}

describe('clientApi', () => {
  const fetchMock = jest.fn<typeof fetch>();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  it('post отправляет json body и заголовок Content-Type', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({
        body: JSON.stringify({ id: '1', name: 'Task' }),
      }) as unknown as Response
    );

    const result = await clientApi.post<{ id: string; name: string }, { name: string }>(
      'tasks',
      { name: 'Task' }
    );

    expect(fetchMock).toHaveBeenCalledWith('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Task' }),
    });
    expect(result).toEqual({ id: '1', name: 'Task' });
  });

  it('get без body не отправляет headers и body', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({
        body: JSON.stringify([{ id: '1' }]),
      }) as unknown as Response
    );

    await clientApi.get<Array<{ id: string }>>('tasks');

    expect(fetchMock).toHaveBeenCalledWith('/api/tasks', {
      method: 'GET',
      headers: undefined,
      body: undefined,
    });
  });

  it('выбрасывает errMessage при response.ok=false', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ ok: false, status: 400 }) as unknown as Response
    );

    await expect(
      clientApi.delete('tasks', { id: 't1' }, 'Ошибка удаления')
    ).rejects.toThrow('Ошибка удаления');
  });

  it('использует fallback сообщение при response.ok=false и без errMessage', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ ok: false, status: 500 }) as unknown as Response
    );

    await expect(clientApi.get('tasks')).rejects.toThrow(
      'Ошибка запроса: GET tasks'
    );
  });

  it('возвращает undefined для 204/205', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ status: 204, body: '' }) as unknown as Response
    );

    const result = await clientApi.delete<void>('tasks');

    expect(result).toBeUndefined();
  });

  it('возвращает undefined при пустом response body', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ body: '   ' }) as unknown as Response
    );

    const result = await clientApi.get('tasks');

    expect(result).toBeUndefined();
  });

  it('возвращает undefined для non-json content-type', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({
        body: 'ok',
        contentType: 'text/plain',
      }) as unknown as Response
    );

    const result = await clientApi.get('tasks');

    expect(result).toBeUndefined();
  });
});
