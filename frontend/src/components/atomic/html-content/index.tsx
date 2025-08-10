import React from "react";
import styles from "./styles.module.scss";
import { cx } from "class-variance-authority";

interface HtmlContentProps {
  content?: string;
}

export default function HtmlContent({ content }: HtmlContentProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <div
        className={cx(styles.htmlContent)}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
