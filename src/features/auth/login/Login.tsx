import { useEffect } from "react";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { ILoginFields, IRegFields } from "@src/types/formsFields";
import { fetchLogin } from "../auth-thunks";
import { selectLoginErrors, selectAuthLoading } from "../auth-selectors";
import { useAppDispatch } from "@src/store";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, watch, setError } = useForm<IRegFields>({
    mode: "onChange",
    defaultValues: {
      email: "test1@gmail.com",
      password: "123456",
    },
  });

  const isLoading = useSelector(selectAuthLoading);
  const authErrors = useSelector(selectLoginErrors);

  const onSubmit: SubmitHandler<ILoginFields> = (data) => {
    dispatch(fetchLogin(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        reset();
        toast.success("Login is successful");
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (typeof authErrors === "object") {
      if ("email or password" in authErrors) {
        setError("email", {
          type: "manual",
          message: "invalid email or password",
        });
        setError("password", {
          type: "manual",
          message: "invalid email or password",
        });
      }
      if ("message" in authErrors) {
        toast.error(authErrors.message);
      }
    }
  }, [authErrors]);

  return (
    <section className={styles.login}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.fields}>
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
        </div>

        <div className={styles.button}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            type="submit"
          >
            Login
          </LoadingButton>
        </div>

        <div className={styles.redirect}>
          Already have an account?{" "}
          <Link to={"/sign-up"} className={styles.link}>
            Sign Up.
          </Link>
        </div>
      </form>
    </section>
  );
};

export { Login };
