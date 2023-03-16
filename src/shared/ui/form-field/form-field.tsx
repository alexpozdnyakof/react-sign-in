import clsx from 'clsx';
import { useId } from 'react';
import styles from './form-field.module.css';
import Stack from '../stack/stack';

type FormFieldProps = {
  tone?: 'normal' | 'negative';
  message?: React.ReactNode;
  label?: React.ReactNode;
  placeholder?: string;
  children: (props: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    placeholder?: string;
  }) => React.ReactNode;
};

export type ReusableFormFieldProps = Omit<
  FormFieldProps,
  'children' | 'className'
> &
  Omit<React.ComponentProps<'input'>, 'className'>;

export default function FormField({
  tone = 'normal',
  message,
  label,
  children,
  placeholder = ' ',
}: FormFieldProps) {
  const generatedId = useId();
  const describedBy = `${generatedId}-message`;
  const ariaInvalid = tone === 'negative' ? true : undefined;
  return (
    <Stack space="xsmall">
      <div
        className={clsx([
          styles['input-container'],
          tone == 'negative' ? styles['border-negative'] : null,
        ])}
      >
        {children({
          id: generatedId,
          'aria-describedby': describedBy,
          'aria-invalid': ariaInvalid,
          placeholder,
        })}

        {label !== undefined && (
          <label htmlFor={generatedId} className={styles['label']}>
            {label}
          </label>
        )}
      </div>
      {message && (
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
