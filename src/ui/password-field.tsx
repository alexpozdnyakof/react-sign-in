/* eslint-disable jsx-a11y/tabindex-no-positive */
import { forwardRef, useState } from 'react';
import Button from './button';
import FormField, { ReusableFormFieldProps } from './form-field';
import styles from './password-field.module.css';

type PasswordFieldProps = Omit<ReusableFormFieldProps, 'type'>;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { label, message, tone, placeholder = ' ', ...inputProps },
    ref,
  ) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisible = () => setIsVisible((x) => !x);

    const derivedFieldType = isVisible ? 'text' : 'password';
    const derivedButtonText = isVisible ? 'Hide' : 'Show';

    return (
      <FormField label={label} message={message} tone={tone}>
        {(drilled) => (
          <>
            <input
              {...inputProps}
              type={derivedFieldType}
              {...drilled}
              ref={ref}
              placeholder={placeholder}
            />
            <div className={styles['button-show']}>
              <Button onClick={toggleVisible} variant="secondary">
                {derivedButtonText}
              </Button>
            </div>
          </>
        )}
      </FormField>
    );
  },
);

export default PasswordField;
