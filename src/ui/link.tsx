import { ComponentProps, PropsWithChildren } from 'react';
import styles from './link.module.css';

type LinkProps = PropsWithChildren & Omit<ComponentProps<'a'>, 'className'>;

export default function Link({ children, ...props }: LinkProps) {
  return (
    <a {...props} className={styles['link']}>
      {children}
    </a>
  );
}
