import { getEnvironmentConfig } from "./environments";

export const getMediaUrl = (url: string) => {
  if (url.startsWith("/uploads")) {
    return `${url}`;
  }
  return url;
};
