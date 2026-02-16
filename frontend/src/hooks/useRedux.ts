import {useSelector, useDispatch} from "react-redux";
import {store} from "../store/store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector = <T>(selector: (state: RootState) => T) => useSelector(selector);
