export interface IRegFields {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreement: boolean;
}

export interface ILoginFields {
  email: string;
  password: string;
}

export interface IRegErrors {
  username?: string;
  email?: string;
  password?: string;
}

export interface ILoginErrors {
  ["email or password"]: string;
}

export interface IEditProfileFields {
  username?: string;
  email?: string;
  password?: string;
  image?: string;
}

export interface IEditProfileErrors {
  username?: string;
  email?: string;
}

export interface ICreateArticleFields {
  title: string;
  description: string;
  body: string;
  tagList: {
    tag: string;
  }[];
}

export interface ICreateArticleData {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
