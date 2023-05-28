import { RootState } from "@src/store";

export const selectUser = (state: RootState) => state.auth.data;

export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectRegistrationErrors = (state: RootState) =>
  state.auth.registrationErrors;

export const selectLoginErrors = (state: RootState) => state.auth.loginErrors;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const selectEditProfileErrors = (state: RootState) => state.auth.editProfileErrors;
