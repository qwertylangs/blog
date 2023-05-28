import React from "react";
import { Button, IconButton, SvgIcon } from "@mui/material";
import { Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { useSelector } from "react-redux";
import axios from "@src/axiosCli";

import { ReactComponent as Favourite } from "@assets/favorite.svg";

import styles from "./Article.module.scss";
import { UserPreview } from "../userPreview";
import { IArticle, IUser } from "@src/types";
import { useAppDispatch } from "@src/store";
import { likeArticle, likeFullArticle } from "@features/articles/articles-slice";
import { selectIsAuth } from "@features/auth/auth-selectors";

const localDate = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

interface ArticleProps extends IArticle {
  fullArticle?: boolean;
  currentUser: IUser | null;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Article = ({
  fullArticle,
  title,
  description,
  body,
  createdAt,
  updatedAt,
  favorited,
  favoritesCount,
  tagList,
  author,
  slug,
  currentUser,
  onDelete,
  onEdit,
}: ArticleProps) => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  if (!isAuth) {
    favorited = false;
  }

  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    onDelete && onDelete();
  };

  const handleLike = () => {
    if (isAuth) {
      if (fullArticle) {
        dispatch(likeFullArticle());
      } else {
        dispatch(likeArticle(slug));
      }
      if (favorited) {
        axios.delete(`/articles/${slug}/favorite`);
      } else {
        axios.post(`/articles/${slug}/favorite`);
      }
    } else {
      navigate("/sign-in", { replace: true });
    }
  };

  if (title.length > 50) {
    title = title.substring(0, 50) + "...";
  }

  if (description && description.length > 100) {
    description = description.substring(0, 100) + "...";
  }

  return (
    <div className={styles.article}>
      <div className={styles.info}>
        <div>
          <div className={styles.header}>
            <h2>
              <Link to={`/articles/${slug}`} className={styles.link}>
                {title}
              </Link>
            </h2>
            <div className={styles.like}>
              <IconButton aria-label="like" onClick={handleLike}>
                <SvgIcon>
                  <Favourite
                    viewBox="0 0 700 700"
                    fill={favorited ? "red" : "none"}
                    stroke={favorited ? "red" : "black"}
                    strokeWidth={4}
                  />
                </SvgIcon>
              </IconButton>

              <span>{favoritesCount}</span>
            </div>
          </div>

          <div className={styles.tags}>
            {tagList &&
              tagList.map((tag, i) => {
                if (!tag || (tag && !tag.trim())) return null;

                if (tag && tag.length > 20) {
                  tag = tag.substring(0, 20) + "...";
                }
                return (
                  <div key={i} className={styles.tag}>
                    {tag}
                  </div>
                );
              })}
          </div>
        </div>

        <UserPreview {...author} createdAt={localDate.format(new Date(createdAt))} />
      </div>

      <div className={styles.preview}>
        <p className={styles.previewText}>{description}</p>
        {fullArticle && currentUser?.username === author.username && (
          <div className={styles.buttons}>
            <Popconfirm
              title="Are you sure to delete this article?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <Button variant="outlined" color="error" style={{ height: 35, width: 75 }}>
                Delete
              </Button>
            </Popconfirm>

            <Button
              variant="outlined"
              color="success"
              style={{ height: 35, width: 65 }}
              onClick={onEdit}
            >
              Edit
            </Button>
          </div>
        )}
      </div>

      {fullArticle && (
        <div className={styles.fullText}>
          <Markdown>{body || " "}</Markdown>
        </div>
      )}
    </div>
  );
};

export { Article };
