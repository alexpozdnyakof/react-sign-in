import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import styles from './button.module.css';

type ButtonProps = {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'compact';
} & Omit<React.ComponentProps<'button'>, 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'default',
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      {...props}
      className={clsx([
        styles['button'],
        styles[`variant-${variant}`],
        size !== 'default' ? styles[`size-${size}`] : null,
      ])}
    >
      <div className={styles['button-content']}>{children}</div>
    </button>
  );
});

export default Button;
