import { forwardRef } from 'react';
import Block, { WithBlockProps } from './block';
import styles from './text.module.css';

function fromStyles(
  styles: Record<string, string>,
  property: string,
  value: string | null | undefined,
) {
  if (!value) return null;
  return [styles[`${property}-${value}`]];
}

type TextProps = {
  /**
   * @default normal
   */
  tone?: 'normal' | 'secondary' | 'negative';
  /**
   * @default body
   */
  size?: 'header' | 'body' | 'caption';
  /**
   * @default weight
   */
  weight?: 'regular' | 'bold';
};

const Text = forwardRef(function Text(
  {
    tone = 'normal',
    size = 'body',
    weight = 'regular',
    children,
    ...props
  }: WithBlockProps<'div', TextProps>,
  ref: typeof props.ref,
) {
  return (
    <Block
      className={[
        styles['text'],
        tone != 'normal' ? fromStyles(styles, 'tone', tone) : null,
        size != 'body' ? fromStyles(styles, 'size', size) : null,
        weight != 'regular' ? fromStyles(styles, 'weight', weight) : null,
      ]}
      ref={ref}
      {...props}
    >
      {children}
    </Block>
  );
});

export default Text;
