import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

import { Article } from "@components/article/Article";
import { Spinner } from "@components/spinner/Spinner";
import styles from "./ArticlesList.module.scss";
import {
  selectAllArticles,
  selectArticlesLoading,
  selectPage,
} from "../articles-selectors";
import { useAppDispatch } from "@src/store";
import { fetchArticles } from "../articles-thunks";
import { selectUser } from "@features/auth/auth-selectors";
import { setPage } from "../articles-slice";

const ArticlesList = () => {
  const dispatch = useAppDispatch();
  const { items: articles, count } = useSelector(selectAllArticles);
  const isLoading = useSelector(selectArticlesLoading);
  const user = useSelector(selectUser);
  const page = useSelector(selectPage);

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
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
        defaultPage={1}
        page={page}
      />
    </div>
  );
};

export { ArticlesList };
