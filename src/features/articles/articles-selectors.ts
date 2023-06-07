import { RootState } from "@src/store";

export const selectAllArticles = (state: RootState) => state.articles.allArticles;
export const selectSingleArticle = (state: RootState) => state.articles.singleArticle;

export const selectArticlesLoading = (state: RootState) => state.articles.isLoading;

export const selectPage = (state: RootState) => state.articles.page;
