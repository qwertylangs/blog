import { FC, useEffect, useState } from "react";
import { Spinner } from "@components/spinner/Spinner";
import { fetchSingleArticle } from "@features/articles/articles-thunks";
import { selectAuthLoading, selectUser } from "@features/auth/auth-selectors";
import { useAppDispatch } from "@src/store";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const RequireUser: FC = ({ children }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoading = useSelector(selectAuthLoading);
  const user = useSelector(selectUser);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isLoading || !user || !slug) return;

    dispatch(fetchSingleArticle(slug)).then((res) => {
      if ("error" in res) {
        message.error(res.error);
        navigate("/");
      }

      if (res.payload && "author" in res.payload) {
        if (res.payload.author.username === user?.username) {
          setIsCompleted(true);
        } else {
          message.error("You are not authorized to edit this article");
          navigate("/");
        }
      }
    });
  }, [user]);

  return (
    <div>
      {!isCompleted && (
        <div style={{ height: "100vh" }}>
          <Spinner />
        </div>
      )}
      {isCompleted && children}
    </div>
  );
};

export default RequireUser;
