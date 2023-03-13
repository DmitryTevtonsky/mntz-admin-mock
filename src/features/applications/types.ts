/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Application {
  developerId: number;
  id: number;
  installs: number;
  name: string;
  platforms: string[];
  posts: number;
  totalSpend: string;
  iconUrl?: string;
}

export interface ApplicationInfo {
  id?: number | string;
  developerId: number;
  developerName: string;
  appName: string;
  appCategory: string;
  iconUrl: string;
  iconFile?: File;
  appStoreLink: string;
  googlePlayLink: string;
  oneLinkSubdomain: string;
  oneLinkTemplateId: string;
}

export interface DeveloperForSelect {
  id: number | string;
  name: string;
}
