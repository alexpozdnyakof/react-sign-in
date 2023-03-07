import FormField, { ReusableFormFieldProps } from './base-field';

type TextFieldProps = ReusableFormFieldProps;

export default function TextField({
  label,
  message,
  tone,
  type = 'text',
  ...inputProps
}: TextFieldProps) {
  return (
    <FormField label={label} message={message} tone={tone}>
      {(drilled) => <input type={type} {...inputProps} {...drilled} />}
    </FormField>
  );
}
