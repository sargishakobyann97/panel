import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import accountSlice from "./features/accountSlice";
import mainSlice from "./features/mainSlice";

export const store = configureStore({
    reducer: {
        main: mainSlice,
        account: accountSlice,
    },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
