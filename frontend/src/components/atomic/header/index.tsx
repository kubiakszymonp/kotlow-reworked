import React from "react";
import styles from "./styles.module.scss";
import cx from "classnames";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className={cx(styles.header, "container mx-auto")}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
