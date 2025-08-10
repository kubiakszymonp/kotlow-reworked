import { Article } from "@/api/generated/models/Article";

export interface BaseComponent {
  type: string;
  id: number;
}

export type DynamicComponent =
  | (AtomicHeaderComponent & { __component: "atomic.header" })
  | (AtomicCardComponent & { __component: "atomic.card" })
  | (AtomicButtonComponent & { __component: "atomic.button" })
  | (AtomicHtmlContentComponent & { __component: "atomic.html-content" })
  | (OrganismsArticleListingComponent & {
      __component: "organisms.article-listing";
    });


export interface AtomicHeaderComponent extends BaseComponent {
  type: "atomic.header";
  title: string;
  subtitle: string;
}

export interface AtomicCardComponent extends BaseComponent {
  type: "atomic.card";
  title: string;
  shortText: string;
  image: string;
  linkText: string;
  linkUrl: string;
}

export interface AtomicButtonComponent extends BaseComponent {
  type: "atomic.button";
  title: string;
  linkText: string;
  linkUrl: string;
}

export interface OrganismsArticleListingComponent extends BaseComponent {
  type: "organisms.article-listing";
  title: string;
  subtitle: string;
  articles: Article[];
}

export interface AtomicHtmlContentComponent extends BaseComponent {
  type: "atomic.html-content";
  content: string;
}
