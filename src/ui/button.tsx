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
    <button className={styles['button']} ref={ref} {...props}>
      <div className={styles['button-content']}>{children}</div>
    </button>
  );
});

export default Button;
