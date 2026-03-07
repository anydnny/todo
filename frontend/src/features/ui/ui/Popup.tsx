import clsx from 'clsx';
import style from './Popup.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  text: string;
  popupKind: 'error' | 'success' | 'info';
};

export const Popup = ({ isOpen, onClose, text, popupKind }: Props) => {
  const CLOSE_ANIMATION_MS = 220;
  const AUTO_CLOSE_MS = 3000;

  const [isClosing, setIsClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const autoCloseTimerRef = useRef<number | null>(null);
  const closeAnimationTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(
    (timers: React.RefObject<number | null>[]) => {
      timers.forEach(timer => {
        if (timer.current !== null) {
          window.clearTimeout(timer.current);
          timer.current = null;
        }
      });
    },
    []
  );

  const hideWithAnimation = useCallback(
    (notifyClose: boolean) => {
      const el = ref.current;

      if (!el || !el.matches(':popover-open')) {
        if (notifyClose) {
          onClose?.();
        }
        return;
      }

      clearTimers([closeAnimationTimerRef]);
      setIsClosing(true);

      closeAnimationTimerRef.current = window.setTimeout(() => {
        el.hidePopover();
        setIsClosing(false);
        closeAnimationTimerRef.current = null;
        if (notifyClose) {
          onClose?.();
        }
      }, CLOSE_ANIMATION_MS);
    },
    [onClose, clearTimers]
  );

  const closePopup = useCallback(() => {
    clearTimers([autoCloseTimerRef]);
    hideWithAnimation(true);
  }, [hideWithAnimation, clearTimers]);

  useEffect(() => {
    const el = ref.current;
    let hideWithAnimationTimer: number | null = null;

    if (!el) return;

    if (isOpen) {
      if (!el.matches(':popover-open')) {
        el.showPopover();
      }
      clearTimers([autoCloseTimerRef]);
      autoCloseTimerRef.current = window.setTimeout(() => {
        closePopup();
      }, AUTO_CLOSE_MS);
    }

    if (!isOpen && el.matches(':popover-open')) {
      clearTimers([autoCloseTimerRef]);
      hideWithAnimationTimer = window.setTimeout(() => {
        hideWithAnimation(false);
      }, 0);
    }

    return () => {
      if (hideWithAnimationTimer !== null) {
        window.clearTimeout(hideWithAnimationTimer);
      }
      clearTimers([autoCloseTimerRef, closeAnimationTimerRef]);
    };
  }, [isOpen, closePopup, hideWithAnimation, clearTimers]);

  return (
    <div
      ref={ref}
      popover="manual"
      className={clsx(
        style.popup,
        popupKind === 'error' ? style['popup-error'] : style['popup-success'],
        isClosing && style.popupClosing,
        isOpen && !isClosing && style['popup-slow-closing']
      )}
    >
      <button
        type="button"
        onClick={closePopup}
        className={style.close}
        aria-label="Закрыть popup"
      >
        ×
      </button>
      <p className={style.content}>{text}</p>
    </div>
  );
};
