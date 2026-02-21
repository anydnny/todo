import { type RefObject, useEffect, useCallback } from 'react';

function useClickOutside(
  excludeRefs: Array<RefObject<HTMLElement | null>>,
  onOutside: () => void,
  enabled: boolean = true
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
    if (!enabled) return;

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [handler, enabled]);
}

export default useClickOutside;
