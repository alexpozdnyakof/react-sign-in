import { forwardRef } from 'react';
import FormField, { ReusableFormFieldProps } from '../form-field/form-field';

type InputType = 'email' | 'text' | 'url' | 'search';

type TextFieldProps = {
  type?: InputType;
} & Omit<ReusableFormFieldProps, 'type'>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, message, tone, type = 'text', placeholder, ...inputProps },
    ref,
  ) {
    return (
      <FormField
        label={label}
        message={message}
        tone={tone}
        placeholder={placeholder}
      >
        {(drilled) => (
          <input type={type} ref={ref} {...inputProps} {...drilled} />
        )}
      </FormField>
    );
  },
);

export default TextField;
