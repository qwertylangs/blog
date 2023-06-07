import { createSlice } from "@reduxjs/toolkit";
import { IArticle } from "@src/types/article";
import { fetchArticles, fetchSingleArticle } from "./articles-thunks";

type ArticlesSlice = {
  page: number;
  allArticles: {
    items: IArticle[];
    count: number;
  };
  singleArticle: IArticle | null;
  isLoading: boolean;
};

const initialState: ArticlesSlice = {
  page: 1,
  allArticles: {
    items: [],
    count: 0,
  },
  singleArticle: null,
  isLoading: false,
};

const articlesSlice = createSlice({
  name: "@@articles",
  initialState,
  reducers: {
    likeFullArticle: (state) => {
      if (state.singleArticle) {
        if (state.singleArticle.favorited) {
          state.singleArticle.favoritesCount--;
        } else {
          state.singleArticle.favoritesCount++;
        }
        state.singleArticle.favorited = !state.singleArticle.favorited;
      }
    },
    likeArticle: (state, action) => {
      const article = state.allArticles.items.find(
        (article) => article.slug === action.payload,
      );
      if (article) {
        if (article.favorited) {
          article.favoritesCount--;
        } else {
          article.favoritesCount++;
        }
        article.favorited = !article.favorited;
      }
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.allArticles.items = action.payload.articles;
        state.allArticles.count = action.payload.count;
      })
      .addCase(fetchSingleArticle.fulfilled, (state, action) => {
        state.singleArticle = action.payload;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export default articlesSlice.reducer;
export const { likeArticle, likeFullArticle, setPage } = articlesSlice.actions;
