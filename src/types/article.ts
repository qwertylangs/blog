export interface IArticle {
  slug: string;
  title: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ArticleCreator;
}

export type ArticleCreator = {
  username: string;
  image?: string;
  following?: boolean;
};

export type ArticlesResponce = {
  articles: IArticle[];
  articlesCount: number;
};
