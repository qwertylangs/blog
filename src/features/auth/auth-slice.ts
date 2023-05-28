import { createSlice } from "@reduxjs/toolkit";
import { IEditProfileErrors, ILoginErrors, IRegErrors } from "@src/types/formsFields";
import { IUser } from "@src/types/user";
import {
  fetchAuthMe,
  fetchEditProfile,
  fetchLogin,
  fetchRegistration,
} from "./auth-thunks";

export type AuthSlice = {
  data: IUser | null;
  registrationErrors: string | IRegErrors;
  loginErrors: string | ILoginErrors;
  editProfileErrors: string | IEditProfileErrors;
  isAuth: boolean | null;
  isLoading: boolean;
};

const initialState: AuthSlice = {
  data: null,
  registrationErrors: "",
  loginErrors: "",
  editProfileErrors: "",
  isAuth: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: "@@auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.registrationErrors = action.payload || "Registration error";
      });

    builder
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginErrors = action.payload || "Registration error";
      });

    builder
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isAuth = true;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.isAuth = false;
      });

    builder
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.editProfileErrors = action.payload || "Registration error";
      });

    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
