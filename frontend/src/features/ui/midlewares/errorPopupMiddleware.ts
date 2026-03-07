// errorPopupMiddleware.ts
import {
  createListenerMiddleware,
  isRejected,
  nanoid,
} from '@reduxjs/toolkit';
import { pushPopup } from '../model/UiSlice';
import { getErrorMessage } from './errorMessage';

export const errorPopupMiddleware = createListenerMiddleware();

errorPopupMiddleware.startListening({
  matcher: isRejected,
  effect: async (action, api) => {
    const text = getErrorMessage(
      action.payload,
      action.error?.message ?? 'Ошибка'
    );
    api.dispatch(
      pushPopup({
        id: nanoid(),
        title: text,
        kind: 'error',
      })
    );
  },
});
