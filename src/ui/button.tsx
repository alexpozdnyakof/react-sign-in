import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './button.module.css';
type ButtonProps = {
  children?: ReactNode;
} & Omit<React.ComponentProps<'button'>, 'className'>;

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={clsx([styles['button']])} {...props}>
      <div className={clsx([styles['button-content']])}>{children}</div>
    </button>
  );
}
