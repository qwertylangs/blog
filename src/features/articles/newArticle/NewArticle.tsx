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
      .then(() => {
        message.success("Article created!");
        navigate("/");
      })
      .catch(() => message.error("Error creating new article"));
  };

  return <ArticleForm {...{ onSave, isLoading }} />;
};

export default NewArticle;
