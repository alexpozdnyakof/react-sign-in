import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import styles from './button.module.css';
type ButtonProps = {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
} & Omit<React.ComponentProps<'button'>, 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', ...props },
  ref,
) {
  return (
    <button
      className={clsx([styles['button'], styles[`variant-${variant}`]])}
      ref={ref}
      {...props}
    >
      <div className={styles['button-content']}>{children}</div>
    </button>
  );
});

export default Button;
