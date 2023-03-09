import { forwardRef } from 'react';
import FormField, { ReusableFormFieldProps } from './base-field';
type TextFieldProps = ReusableFormFieldProps;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, message, tone, type = 'text', placeholder = ' ', ...inputProps },
    ref,
  ) {
    return (
      <FormField label={label} message={message} tone={tone}>
        {(drilled) => (
          <input
            type={type}
            ref={ref}
            placeholder={placeholder}
            {...inputProps}
            {...drilled}
          />
        )}
      </FormField>
    );
  },
);

export default TextField;
