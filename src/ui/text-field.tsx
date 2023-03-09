import clsx from 'clsx';
import FormField, { ReusableFormFieldProps } from './base-field';
import styles from './text-field.module.css';
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
      {(drilled) => (
        <div
          className={clsx([
            styles['input-wrapper'],
            tone === 'negative' ? styles['input-wrapper_negative'] : null,
          ])}
        >
          <input type={type} {...inputProps} {...drilled} />
        </div>
      )}
    </FormField>
  );
}
