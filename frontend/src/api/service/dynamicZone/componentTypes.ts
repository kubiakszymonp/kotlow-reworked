import Button from "@/components/atomic/button";
import Card from "@/components/atomic/card";
import Header from "@/components/atomic/header";
import HtmlContent from "@/components/atomic/html-content";
import ArticleListing from "@/components/organisms/article-listing";

export const componentTypes = {
  header: "atomic.header",
  card: "atomic.card",
  button: "atomic.button",
  articleListing: "organisms.article-listing",
  htmlContent: "atomic.html-content",
};

// Component mapping object
export const componentMap = {
  "atomic.header": Header,
  "atomic.card": Card,
  "atomic.button": Button,
  "atomic.html-content": HtmlContent,
  "organisms.article-listing": ArticleListing,
};

// Type for dynamic component data
