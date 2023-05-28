import { configureStore } from "@reduxjs/toolkit";
import axios from "./axiosCli";
import { useDispatch } from "react-redux";
import articles from "@features/articles/articles-slice";
import auth from "@features/auth/auth-slice";

export const store = configureStore({
  reducer: { articles, auth },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
