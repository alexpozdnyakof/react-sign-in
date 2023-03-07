import Block from './block';
import { poly } from './polymorphic';
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

const Text = poly<TextProps>(function Text(
  {
    tone = 'normal',
    size = 'body',
    weight = 'regular',
    children,
    as,
    ...props
  },
  ref,
) {
  return (
    <Block
      className={[
        styles['text'],
        tone != 'normal' ? fromStyles(styles, 'tone', tone) : null,
        size != 'body' ? fromStyles(styles, 'size', size) : null,
        weight != 'regular' ? fromStyles(styles, 'weight', weight) : null,
      ]}
      as={as}
      ref={ref}
      {...props}
    >
      {children}
    </Block>
  );
});

export default Text;
