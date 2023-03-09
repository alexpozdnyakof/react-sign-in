import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';
import styles from './button.module.css';
type ButtonProps = {
  children?: ReactNode;
} & Omit<React.ComponentProps<'button'>, 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, ...props },
  ref,
) {
  return (
    <button className={clsx([styles['button']])} ref={ref} {...props}>
      <div className={clsx([styles['button-content']])}>{children}</div>
    </button>
  );
});

export default Button;
