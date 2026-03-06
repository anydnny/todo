export const getErrorMessage = (
  payload: unknown,
  fallback = 'Ошибка запроса'
) => {
  if (typeof payload === 'string') return payload;
  if (payload && typeof payload === 'object') {
    const p = payload as Record<string, unknown>;
    if (typeof p.message === 'string') return p.message;
    if (Array.isArray(p.message) && typeof p.message[0] === 'string')
      return p.message[0];
  }
  return fallback;
};
