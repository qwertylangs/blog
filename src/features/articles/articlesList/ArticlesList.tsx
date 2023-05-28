import { Pagination } from "@mui/material";

import { Article } from "@components/article/Article";
import styles from "./ArticlesList.module.scss";
import { useSelector } from "react-redux";
import { selectAllArticles, selectArticlesLoading } from "../articles-selectors";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@src/store";
import { fetchArticles } from "../articles-thunks";
import { Spinner } from "@components/spinner/Spinner";
import { selectUser } from "@features/auth/auth-selectors";

const ArticlesList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const { items: articles, count } = useSelector(selectAllArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const user = useSelector(selectUser);

  useEffect(() => {
    const offset = (page - 1) * 5;
    dispatch(fetchArticles(offset));
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className={styles.articlesList}>
      {isLoading && (
        <div style={{ height: "100vh" }}>
          <Spinner />
        </div>
      )}
      {articles &&
        !isLoading &&
        articles.map((article) => (
          <Article key={article.slug} {...article} currentUser={user} />
        ))}

      <Pagination
        count={Math.ceil(count / 5)}
        color="primary"
        shape="rounded"
        sx={{ margin: "0 auto" }}
        onChange={handleChange}
      />
    </div>
  );
};

export { ArticlesList };
