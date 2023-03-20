/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import { useAppState } from '../context';
import { userActions } from '../entities/user';
import { ApiLoginParams } from '../shared/api';
import { useForm } from '../shared/hooks';
import {
  Button,
  FormMessage,
  Link,
  PasswordField,
  Spinner,
  Stack,
  TextField,
} from '../shared/ui';

type FormState = 'idle' | 'pending' | 'error';

export default function SignInForm() {
  const { dispatch } = useAppState();
  const [state, setState] = useState<FormState>('idle');

  const { errors, handleFormEvent } = useForm<ApiLoginParams>(() => {
    setState('pending');
    fetch(`https://random-data-api.com/api/v2/users`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((user) => (setState('idle'), dispatch(userActions.login(user))))
      .catch(() => setState('error'));
  });

  return (
    <Stack space="large">
      <form
        onSubmit={handleFormEvent}
        onBlur={handleFormEvent}
        noValidate
        aria-label="Sign-in Form"
      >
        <Stack space="medium">
          <Stack space="small">
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              tone={errors.email ? 'negative' : 'normal'}
              message={errors.email}
              autoFocus
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
          {state === 'error' && (
            <FormMessage tone="negative">
              ❌ Login error. Please try again later
            </FormMessage>
          )}
          <Button type="submit" disabled={state === 'pending'}>
            {state === 'pending' ? <Spinner /> : 'Continue'}
          </Button>
        </Stack>
      </form>
      <div className="center">
        <Link href="/forgot">Forgot password?</Link>
      </div>
    </Stack>
  );
}
