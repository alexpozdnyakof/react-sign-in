/* eslint-disable jsx-a11y/tabindex-no-positive */
import { forwardRef, useState } from 'react';
import FormField, { ReusableFormFieldProps } from './form-field';
import styles from './password-field.module.css';

type PasswordFieldProps = Omit<ReusableFormFieldProps, 'type'>;

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    { label, message, tone, placeholder = ' ', ...inputProps },
    ref,
  ) {
    const [isShow, setShow] = useState<boolean>(false);
    const toggleShow = () => setShow((x) => !x);

    return (
      <FormField label={label} message={message} tone={tone}>
        {(drilled) => (
          <>
            <input
              {...inputProps}
              type={isShow ? 'text' : 'password'}
              {...drilled}
              ref={ref}
              placeholder={placeholder}
            />
            <button className={styles['button-show']} onClick={toggleShow}>
              {isShow ? 'Hide' : 'Show'}
            </button>
          </>
        )}
      </FormField>
    );
  },
);

export default PasswordField;
