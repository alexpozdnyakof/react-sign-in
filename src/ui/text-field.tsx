import clsx from 'clsx';
import { forwardRef } from 'react';
import FormField, { ReusableFormFieldProps } from './base-field';
import styles from './text-field.module.css';
type TextFieldProps = ReusableFormFieldProps;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, message, tone, type = 'text', ...inputProps },
    ref,
  ) {
    return (
      <FormField label={label} message={message} tone={tone}>
        {(drilled) => (
          <div
            className={clsx([
              styles['input-wrapper'],
              tone === 'negative' ? styles['input-wrapper_negative'] : null,
            ])}
          >
            <input type={type} ref={ref} {...inputProps} {...drilled} />
          </div>
        )}
      </FormField>
    );
  },
);

export default TextField;