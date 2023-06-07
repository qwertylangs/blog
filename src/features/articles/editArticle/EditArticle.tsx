import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { ArticleForm } from "@components/articleForm/ArticleForm";
import { useAppDispatch } from "@src/store";
import { fetchEditingArticle, fetchSingleArticle } from "../articles-thunks";
import { selectArticlesLoading, selectSingleArticle } from "../articles-selectors";
import { ICreateArticleData } from "@src/types";
import { message } from "antd";

const EditArticle = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();
  const isLoading = useSelector(selectArticlesLoading);

  const singleArticle = useSelector(selectSingleArticle);

  const onSave = (data: ICreateArticleData) => {
    dispatch(fetchEditingArticle({ data, slug: slug as string })).then((res) => {
      if ("error" in res) {
        message.error("Cannot update article");
      } else {
        message.success("Article updated successfully");
        navigate(`/articles/${res.payload.slug}`);
      }
    });
  };

  return (
    <ArticleForm isEditing {...singleArticle} onSave={onSave} isLoading={isLoading} />
  );
};

export default EditArticle;
