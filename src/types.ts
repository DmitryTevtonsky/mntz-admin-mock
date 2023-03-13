export interface Route {
  title?: string;
  element?: React.ReactNode;
  path?: string;
  icon?: JSX.Element;
  index?: boolean;
  subRoutes?: Array<Route>;
}

export type ErrorInfo = {
  status?: number;
  requestUrl?: string;
};

export interface PresignedUrlResponse {
  uploadUrl: string;
}

export interface PresignedUrlResponseDouble {
  largeUrl: string;
  smallUrl: string;
}

export enum LanguagesEnum {
  ru = 'ru',
  en = 'en',
}

export type Languages = Record<LanguagesEnum, string>;
