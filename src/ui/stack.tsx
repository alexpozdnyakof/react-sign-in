import clsx from 'clsx';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import styles from './stack.module.css';

type Space =
  | 'micro'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

type StackProps = {
  children?: ReactNode;
  space?: Space;
} & Omit<ComponentProps<'div'>, 'className'>;

const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { children, space, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx([
        styles['stack'],
        space !== undefined ? styles[`space-${space}`] : null,
      ])}
    >
      {children}
    </div>
  );
});

export default Stack;
