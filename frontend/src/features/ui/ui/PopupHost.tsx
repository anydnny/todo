// PopupHost.tsx
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { removePopup } from '../model/UiSlice';
import { Popup } from './Popup';
export const PopupHost = () => {
  const dispatch = useAppDispatch();
  const popup = useAppSelector(s => s.ui.popups[0]);

  if (!popup) return null;

  return (
    <Popup
      isOpen
      onClose={() => dispatch(removePopup(popup.id))}
      text={popup.title}
      popupKind={popup.kind}
    />
  );
};
