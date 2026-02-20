import { useSelector, useDispatch } from 'react-redux';
import { store, type RootState } from '../store/store';

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);
