import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

interface ButtonProps {
  text?: string;
  link?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export default function Button({ 
  text, 
  link, 
  variant = 'primary', 
  size = 'medium',
  onClick 
}: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]}`;

  const buttonContent = (
    <span className={styles.content}>
      {text}
      <span className={styles.arrow}>→</span>
    </span>
  );

  if (link) {
    return (
      <Link href={link} className={buttonClass}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} type="button">
      {buttonContent}
    </button>
  );
}
