import { selectIsAuth } from "@features/auth/auth-selectors";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth && !localStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
