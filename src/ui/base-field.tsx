import { InputHTMLAttributes, ReactNode, useId } from 'react';
import styles from './base-field.module.css';
import Block from './block';
import Text from './text';

type FormFieldProps = {
  /**
   * @default 'normal'
   */
  tone?: 'normal' | 'negative';
  message?: ReactNode;
  label?: ReactNode;
  children: (props: { id: string; 'aria-describedby': string }) => ReactNode;
};

export type ReusableFormFieldProps = Omit<
  FormFieldProps,
  'children' | 'className' | 'type'
> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>;

export default function FormField({
  tone = 'normal',
  message,
  label,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const describedBy = `${generatedId}-message`;

  return (
    <Block className={styles['stack']}>
      <Block className={styles['container']}>
        {label !== undefined && (
          <Block marginBottom="small" className={styles['label-container']}>
            <Text as="label" htmlFor={generatedId} className={styles['label']}>
              {label}
            </Text>
          </Block>
        )}
        {children({ id: generatedId, 'aria-describedby': describedBy })}
      </Block>
      {message !== undefined && (
        <Text as="p" size="caption" tone={tone} id={describedBy}>
          {message}
        </Text>
      )}
    </Block>
  );
}
