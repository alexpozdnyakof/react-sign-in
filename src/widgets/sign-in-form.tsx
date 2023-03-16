import { useReducer } from 'react';
import { loginAction, useAppState } from '../context';
import { ApiLoginParams } from '../shared/api';
import { useForm } from '../shared/hooks';
import {
  Button,
  Link,
  PasswordField,
  Spinner,
  Stack,
  TextField,
} from '../shared/ui';

export default function SignInForm() {
  const { dispatch } = useAppState();
  const [loading, toggleLoading] = useReducer((loading) => !loading, false);
  const { errors, handleFormEvent } = useForm<ApiLoginParams>((formValue) => {
    toggleLoading();
    fetch('/sign-in', { method: 'POST', body: JSON.stringify(formValue) })
      .then((response) => response.json())
      .then((session) => dispatch(loginAction(session)))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => toggleLoading());
  });

  return (
    <Stack space="large">
      <form onSubmit={handleFormEvent} onBlur={handleFormEvent} noValidate>
        <Stack space="medium">
          <Stack space="small">
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              tone={errors.email ? 'negative' : 'normal'}
              message={errors.email}
            />
            <PasswordField
              label="Password"
              name="password"
              tone={errors.password ? 'negative' : 'normal'}
              message={errors.password}
              required
              minLength={8}
            />
          </Stack>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner /> : 'Continue'}
          </Button>
        </Stack>
      </form>
      <div className="center">
        <Link href="https://localhost">Forgot password?</Link>
      </div>
    </Stack>
  );
}
