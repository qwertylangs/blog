import { ArticleForm } from "@components/articleForm/ArticleForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";

import { useAppDispatch } from "@src/store";
import { ICreateArticleData } from "@src/types";
import { fetchNewArticle } from "../articles-thunks";
import { selectArticlesLoading } from "../articles-selectors";

const NewArticle = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectArticlesLoading);

  const onSave = (data: ICreateArticleData) => {
    dispatch(fetchNewArticle({ article: data }))
      .then((res) => {
        if ("error" in res) {
          message.error("Cannot create article");
        } else {
          message.success("Article created successfully");
          navigate(`/articles/${res.payload.slug}`);
        }
      })
      .catch(() => message.error("Error creating new article"));
  };

  return <ArticleForm {...{ onSave, isLoading }} />;
};

export default NewArticle;
