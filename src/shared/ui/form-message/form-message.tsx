import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './form-message.module.css';

export type FormMessageProps = {
  children: ReactNode;
  tone?: 'normal' | 'negative';
  id?: string;
};

export default function FormMessage({
  children,
  tone = 'normal',
  id,
}: FormMessageProps) {
  return (
    <p
      className={clsx([
        styles['form-message'],
        tone == 'negative' ? styles['tone-negative'] : null,
      ])}
      id={id}
    >
      {children}
    </p>
  );
}
