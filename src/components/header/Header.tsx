import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { useAppDispatch } from "@src/store";

import styles from "./Header.module.scss";
import { selectIsAuth, selectUser } from "@features/auth/auth-selectors";
import { UserPreview } from "@components/userPreview";
import { logout } from "@features/auth/auth-slice";
import { fetchAuthMe } from "@features/auth/auth-thunks";

const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1>
          <Link to="/" className={styles.title}>
            Realworld Blog
          </Link>
        </h1>

        <div className={styles.controls}>
          <Content />
        </div>
      </div>
    </header>
  );
};

export { Header };

const Content = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    dispatch(fetchAuthMe());
    navigate("/");
  };

  if (isAuth === null) {
    return (
      <>
        <Skeleton variant="rounded" width={110} height={30} />
        <Skeleton variant="circular" width={46} height={46} />
        <Skeleton variant="rounded" width={110} height={50} />
      </>
    );
  }
  if (isAuth && user) {
    return (
      <>
        <Button
          variant="outlined"
          color="success"
          className={styles.create}
          style={{ textTransform: "none" }}
          onClick={() => navigate("/new-article")}
        >
          Create article
        </Button>

        <Link to={"/profile"} className={styles.profileLink}>
          <UserPreview username={user.username} image={user.image} />
        </Link>

        <Button
          variant="outlined"
          color="secondary"
          className={styles.logout}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        variant="text"
        color="inherit"
        size="large"
        className={styles.signin}
        onClick={() => navigate("/sign-in")}
      >
        Sign In
      </Button>

      <Button
        variant="outlined"
        color="success"
        size="large"
        className={styles.signup}
        onClick={() => navigate("/sign-up")}
      >
        Sign Up
      </Button>
    </>
  );
};

{
  /* <Button variant="outlined" color="success">
Login
</Button>
<Button variant="contained" color="primary" disableElevation href""">
Login
</Button>

<Button variant="outlined" color="error">
Login
</Button> */
}
