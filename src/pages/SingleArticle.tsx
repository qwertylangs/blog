import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "@src/store";
import { message } from "antd";

import { Article } from "@components/article";
import {
  fetchDeleteArticle,
  fetchSingleArticle,
} from "@features/articles/articles-thunks";
import {
  selectArticlesLoading,
  selectSingleArticle,
} from "@features/articles/articles-selectors";
import { Spinner } from "@components/spinner/Spinner";
import { selectUser } from "@features/auth/auth-selectors";

const SingleArticle = () => {
  const dispatch = useAppDispatch();
  const article = useSelector(selectSingleArticle);
  const isLoading = useSelector(selectArticlesLoading);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchSingleArticle(slug as string));
  }, []);

  const onDelete = () => {
    dispatch(fetchDeleteArticle(slug || ""))
      .then(() => {
        message.success("Article deleted");
        navigate("/");
      })
      .catch(() => message.error("Error deleting article"));
  };

  const onEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  if (isLoading) return <Spinner />;

  return (
    <div style={{ marginTop: "25px", marginBottom: "25px" }}>
      {article ? (
        <Article
          fullArticle
          {...article}
          currentUser={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ) : (
        <p>Article not found</p>
      )}
    </div>
  );
};

export default SingleArticle;
