/**
 * Article-type taxonomy: the single place that maps Strapi's `articleType`
 * enum to its display label and its parent listing. Card, detail page and
 * breadcrumbs all read from here so a new type is wired up in one edit.
 */

export interface ArticleTypeMeta {
  /** Badge / breadcrumb label. */
  label: string;
  /** Parent listing path (back-link + breadcrumb target). */
  listingPath: string;
  /** A publish date would be misleading noise for evergreen types. */
  dateless?: boolean;
}

export const ARTICLE_TYPES: Record<string, ArticleTypeMeta> = {
  ogloszenia_duszpasterskie: {
    label: "Ogłoszenia",
    listingPath: "/ogloszenia",
  },
  intencje_mszalne: {
    label: "Intencje mszalne",
    listingPath: "/intencje",
  },
  artykul: {
    label: "Aktualności",
    listingPath: "/ogloszenia",
  },
  sakrament: {
    label: "Sakrament",
    listingPath: "/sakramenty",
    dateless: true,
  },
};

const FALLBACK: ArticleTypeMeta = {
  label: "",
  listingPath: "/ogloszenia",
};

export function articleTypeMeta(articleType?: string | null): ArticleTypeMeta {
  return (articleType && ARTICLE_TYPES[articleType]) || FALLBACK;
}
