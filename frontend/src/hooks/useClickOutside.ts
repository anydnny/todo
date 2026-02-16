import { type RefObject, useEffect, useCallback } from 'react';

function useClickOutside(
  excludeRefs: RefObject<HTMLElement>[],
  onOutside: () => void,
  enabled: boolean = true // ← новый параметр
) {
  const handler = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      const isInExclude = excludeRefs.some(ref =>
        ref.current?.contains(target)
      );

      if (!isInExclude) {
        onOutside();
      }
    },
    [excludeRefs, onOutside]
  );

  useEffect(() => {
    if (!enabled) return; // ← не добавляем listener если !enabled

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [handler, enabled]); // ← enabled в зависимостях
}

export default useClickOutside;
