import { createAsyncThunk } from "@reduxjs/toolkit";
import { ArticlesResponce, IArticle, ICreateArticleData } from "@src/types";
import { Extra } from "@src/types/extra";
import { AxiosResponse } from "axios";

export const fetchArticles = createAsyncThunk<
  { articles: IArticle[]; count: number },
  number,
  { extra: Extra; rejectValue: string }
>("@@articles/fetchArticles", async (offset: number, { extra, rejectWithValue }) => {
  try {
    const response: AxiosResponse<ArticlesResponce> = await extra.client.get(
      `/articles?offset=${offset}&limit=5`,
    );
    if (response.status !== 200) {
      throw new Error("Articles not found");
    }
    const data = response.data;
    const count = data.articlesCount;

    return { articles: data.articles, count };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Articles fetch error");
  }
});

export const fetchSingleArticle = createAsyncThunk<
  IArticle,
  string,
  { extra: Extra; rejectValue: string }
>("@@articles/fetchSingleArticle", async (slug, { extra, rejectWithValue }) => {
  try {
    const response: AxiosResponse = await extra.client.get(`/articles/${slug}`);
    if (response.status !== 200) {
      throw new Error("Article not found");
    }
    const data = response.data;

    return data.article as IArticle;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Articles fetch error");
  }
});

export const fetchNewArticle = createAsyncThunk<
  IArticle,
  { article: ICreateArticleData },
  { extra: Extra; rejectValue: string }
>("@@articles/fetchNewArticle", async (article, { extra, rejectWithValue }) => {
  try {
    const response: AxiosResponse = await extra.client.post(`/articles`, article);
    const data = response.data;

    return data.article as IArticle;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Article post error");
  }
});

export const fetchDeleteArticle = createAsyncThunk<
  undefined,
  string,
  { extra: Extra; rejectValue: string }
>("@@articles/deleteArticle", async (slug, { extra, rejectWithValue }) => {
  try {
    await extra.client.delete(`/articles/${slug}`);
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Article deleting error");
  }
});

export const fetchEditingArticle = createAsyncThunk<
  undefined,
  { data: ICreateArticleData; slug: string },
  { extra: Extra; rejectValue: string }
>("@@articles/deleteArticle", async ({ data, slug }, { extra, rejectWithValue }) => {
  try {
    await extra.client.put(`/articles/${slug}`, { article: data });
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Article editing error");
  }
});
