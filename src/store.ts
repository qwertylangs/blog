import articles from "@features/articles/articles-slice";
import auth from "@features/auth/auth-slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import axios from "./axiosCli";

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
