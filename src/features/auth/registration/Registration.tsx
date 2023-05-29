import { useEffect } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import styles from "./Registration.module.scss";
import { Link } from "react-router-dom";
import { IRegFields } from "@src/types/formsFields";
import { fetchRegistration } from "../auth-thunks";
import { selectRegistrationErrors, selectAuthLoading } from "../auth-selectors";
import { useAppDispatch } from "@src/store";

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, watch, setError, clearErrors } =
    useForm<IRegFields>({
      mode: "onChange",
    });

  const isLoading = useSelector(selectAuthLoading);
  const authErrors = useSelector(selectRegistrationErrors);

  const onSubmit: SubmitHandler<IRegFields> = (fields) => {
    const data = {
      email: fields.email,
      password: fields.password,
      username: fields.username,
    };

    dispatch(fetchRegistration(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        reset();
        toast.success("Registration is successful");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (typeof authErrors === "object") {
      if ("username" in authErrors) {
        setError("username", {
          type: "manual",
          message: authErrors.username,
        });
      }
      if ("email" in authErrors) {
        setError("email", {
          type: "manual",
          message: authErrors.email,
        });
      }
      if ("message" in authErrors) {
        toast.error(authErrors.message);
      }
    }
  }, [authErrors]);

  return (
    <section className={styles.registration}>
      <h2>Create new account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
          <Controller
            name="username"
            control={control}
            defaultValue={""}
            rules={{
              required: "User name is required",
              minLength: { value: 3, message: "Minimum length is 3" },
              maxLength: { value: 20, message: "Maximum length is 20" },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Username"
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue={""}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Email address"
                variant="outlined"
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue={""}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length is 6" },
              maxLength: { value: 40, message: "Maximum length is 40" },
              validate: (value) => {
                if (value !== watch("repeatPassword")) {
                  return "Passwords do not match";
                }
                clearErrors("repeatPassword");
                return true;
              },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                {...field}
              />
            )}
          />

          <Controller
            name="repeatPassword"
            control={control}
            defaultValue={""}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length is 6" },
              maxLength: { value: 40, message: "Maximum length is 40" },
              validate: (value) => {
                if (value !== watch("password")) {
                  return "Passwords do not match";
                }
                clearErrors("password");
                return true;
              },
            }}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                error={invalid}
                helperText={error?.message}
                fullWidth
                label="Repeat Password"
                variant="outlined"
                type="password"
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="agreement"
          control={control}
          defaultValue={false}
          rules={{
            validate: (value) =>
              !value
                ? "You must agree to the processing of your personal information"
                : true,
          }}
          render={({ field, fieldState: { error, invalid } }) => (
            <FormControl
              required
              error={invalid}
              component="fieldset"
              sx={{ m: 3 }}
              variant="standard"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                }
                label="I agree to the processing of my personal 
              information"
                className={styles.checkbox}
              />
              {error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
        />

        <div className={styles.button}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            type="submit"
          >
            Create
          </LoadingButton>
        </div>

        <div className={styles.redirect}>
          Already have an account?{" "}
          <Link to={"/sign-in"} className={styles.link}>
            Sign In.
          </Link>
        </div>
      </form>
    </section>
  );
};

export { Registration };
