import { useEffect, useState } from "react";
import { useAppDispatch } from "@src/store";
import styles from "./EditProfile.module.scss";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";

import { IEditProfileFields } from "@src/types";
import { fetchEditProfile } from "../auth-thunks";
import {
  selectAuthLoading,
  selectEditProfileErrors,
  selectUser,
} from "../auth-selectors";
import isEqual from "@utils/isEqual";
import debounce from "@utils/debounce";

const EditProfile = () => {
  const [isAvatarValidation, setIsAvatarValidation] = useState(false);
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoading);
  const editErrors = useSelector(selectEditProfileErrors);
  const user = useSelector(selectUser);

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<IEditProfileFields>({
    mode: "onChange",
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  });

  const isSameUserData = isEqual(
    {
      username: watch("username"),
      email: watch("email"),
      image: watch("image"),
    },
    {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  );

  const onSubmit: SubmitHandler<IEditProfileFields> = (fields) => {
    const data = {
      username: fields.username,
      email: fields.email,
      image: fields.image,
      password: fields.password || undefined,
    };
    console.log("sub");
    checkImage(fields.image).then((isValid) => {
      console.log(isValid);
      if (isValid) {
        dispatch(fetchEditProfile(data)).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            toast.success("User is editing successful");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (typeof editErrors === "object") {
      if ("username" in editErrors) {
        setError("username", {
          type: "manual",
          message: editErrors.username,
        });
      }
      if ("email" in editErrors) {
        setError("email", {
          type: "manual",
          message: editErrors.email,
        });
      }
    } else if (editErrors) {
      toast.error(editErrors);
    }
  }, [editErrors]);

  const checkImage = (value: string | undefined): Promise<boolean> =>
    new Promise((resolve) => {
      if (value) {
        setIsAvatarValidation(true);
        var img = new Image();
        img.src = value;
        img.onload = function () {
          clearErrors("image");
          setIsAvatarValidation(false);
          resolve(true);
        };
        img.onerror = function () {
          setError("image", { message: "Invalid image", type: "validate" });
          setIsAvatarValidation(false);
          resolve(false);
        };
      } else {
        resolve(true);
      }
    });
  console.log(isAvatarValidation);

  return (
    <section className={styles.editProfile}>
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Controller
            name="username"
            control={control}
            defaultValue={""}
            rules={{
              required: { value: true, message: "Username is required" },
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 20, message: "Maximum length is 20" },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <>
                <TextField
                  error={invalid}
                  helperText={error?.message}
                  fullWidth
                  label="Username"
                  variant="outlined"
                  {...field}
                />
              </>
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{
              required: { value: true, message: "Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <>
                <TextField
                  error={invalid}
                  helperText={error?.message}
                  fullWidth
                  label="Email address"
                  variant="outlined"
                  {...field}
                />
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue={""}
            rules={{
              minLength: { value: 6, message: "Minimum length is 6" },
              maxLength: { value: 40, message: "Maximum length is 40" },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <>
                <TextField
                  error={invalid}
                  helperText={error?.message}
                  fullWidth
                  label="New password"
                  variant="outlined"
                  type="password"
                  {...field}
                />
              </>
            )}
          />

          <Controller
            name="image"
            control={control}
            defaultValue={""}
            rules={{
              minLength: { value: 5, message: "Minimum length is 5" },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <>
                <TextField
                  error={invalid}
                  helperText={error?.message}
                  fullWidth
                  label="Avatar image (url)"
                  variant="outlined"
                  {...field}
                />
              </>
            )}
          />

          <img src="" alt="" style={{ display: "none" }} />
        </div>

        <div className={styles.button}>
          <LoadingButton
            loading={isLoading || isAvatarValidation}
            disabled={isSameUserData && !watch("password")}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            type="submit"
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </section>
  );
};

export { EditProfile };
