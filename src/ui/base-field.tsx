import clsx from 'clsx';
import { InputHTMLAttributes, ReactNode, useId } from 'react';
import styles from './base-field.module.css';
import Stack from './stack';

type FormFieldProps = {
  tone?: 'normal' | 'negative';
  message?: ReactNode;
  label?: ReactNode;
  children: (props: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
  }) => ReactNode;
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
  const ariaInvalid = tone === 'negative' ? true : undefined;
  return (
    <Stack space="xsmall">
      <div className={styles['container']}>
        {children({
          id: generatedId,
          'aria-describedby': describedBy,
          'aria-invalid': ariaInvalid,
        })}
        {label !== undefined && (
          <div className={styles['label-container']}>
            <label htmlFor={generatedId} className={styles['label']}>
              {label}
            </label>
          </div>
        )}
      </div>
      {message !== undefined && (
        <p
          className={clsx([
            styles['field-message'],
            tone == 'negative' ? styles['tone-negative'] : null,
          ])}
          id={describedBy}
        >
          {message}
        </p>
      )}
    </Stack>
  );
}
