import { createAsyncThunk } from "@reduxjs/toolkit";
import { Extra } from "@src/types";
import {
  IEditProfileErrors,
  IEditProfileFields,
  ILoginErrors,
  IRegErrors,
  IRegFields,
} from "@src/types/formsFields";
import { IUser } from "@src/types/user";
import { AxiosError, AxiosResponse } from "axios";

export const fetchRegistration = createAsyncThunk<
  IUser,
  Pick<IRegFields, "email" | "password" | "username">,
  { extra: Extra; rejectValue: string | IRegErrors }
>("@@auth/registration", async (fields, { extra, rejectWithValue, dispatch }) => {
  try {
    const response: AxiosResponse = await extra.client.post(`/users`, { user: fields });

    const data = response.data;
    const user: IUser = data.user;

    localStorage.setItem("token", user.token);
    dispatch(fetchAuthMe());

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.errors);
    }
    return rejectWithValue("Registration error");
  }
});

export const fetchLogin = createAsyncThunk<
  IUser,
  Pick<IRegFields, "email" | "password">,
  { extra: Extra; rejectValue: string | ILoginErrors }
>("@@auth/login", async (fields, { extra, rejectWithValue, dispatch }) => {
  try {
    const response: AxiosResponse = await extra.client.post(`/users/login`, {
      user: fields,
    });

    if (response.status !== 200) throw new Error("Error");

    const data = response.data;
    const user: IUser = data.user;

    localStorage.setItem("token", user.token);
    dispatch(fetchAuthMe());

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.errors);
    }
    return rejectWithValue("Login error");
  }
});

export const fetchAuthMe = createAsyncThunk<
  IUser,
  undefined,
  { extra: Extra; rejectValue: string | ILoginErrors }
>("@@auth/me", async (_, { extra, rejectWithValue }) => {
  try {
    const response: AxiosResponse = await extra.client.get(`/user`);

    const data = response.data;
    const user: IUser = data.user;

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "401") {
        console.log("unauthorized user");
        return rejectWithValue("Invalid authorization token");
      }
    }
    console.warn(error);
    return rejectWithValue("login Error");
  }
});

export const fetchEditProfile = createAsyncThunk<
  IUser,
  IEditProfileFields,
  { extra: Extra; rejectValue: string | IEditProfileErrors }
>("@@auth/editProfile", async (fields, { extra, rejectWithValue }) => {
  try {
    const response: AxiosResponse = await extra.client.put(`/user`, { user: fields });

    const data = response.data;
    const user: IUser = data.user;

    return user;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "401") {
        console.log("unauthorized user");
        return rejectWithValue("Invalid authorization token");
      }
      return rejectWithValue(error.response?.data.errors as IEditProfileErrors);
    }
    console.warn(error);
    return rejectWithValue("Edit Profile Error");
  }
});
