import clsx from 'clsx';
import { useId } from 'react';
import styles from './form-field.module.css';
import Stack from './stack';

type FormFieldProps = {
  tone?: 'normal' | 'negative';
  message?: React.ReactNode;
  label?: React.ReactNode;
  children: (props: {
    id: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
  }) => React.ReactNode;
};

export type ReusableFormFieldProps = Omit<
  FormFieldProps,
  'children' | 'className' | 'type'
> &
  Omit<React.ComponentProps<'input'>, 'className'>;

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
      <div
        className={clsx([
          styles['input-container'],
          tone == 'negative' ? 'border-negative' : null,
        ])}
      >
        {children({
          id: generatedId,
          'aria-describedby': describedBy,
          'aria-invalid': ariaInvalid,
        })}

        {label !== undefined && (
          <label htmlFor={generatedId} className={styles['label']}>
            {label}
          </label>
        )}
      </div>
      {message !== undefined && (
        <p
          className={clsx([
            styles['field-message'],
            tone == 'negative' ? 'color-negative' : null,
          ])}
          id={describedBy}
        >
          {message}
        </p>
      )}
    </Stack>
  );
}
