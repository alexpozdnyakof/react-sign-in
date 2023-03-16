import { loginAction, useAppState } from '../context';
import { ApiLoginParams, login } from '../shared/api';
import { useForm } from '../shared/hooks';
import { TextField, Button, Link, PasswordField, Stack } from '../shared/ui';

export default function SignInForm() {
  const { dispatch } = useAppState();
  const { errors, handleFormEvent } = useForm<ApiLoginParams>((form) => {
    login(form)
      .then((session) => dispatch(loginAction(session)))
      .catch((error) => {
        console.log(error);
      });
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
          <Button type="submit">Continue</Button>
        </Stack>
      </form>
      <div className="center">
        <Link href="https://localhost">Forgot password?</Link>
      </div>
    </Stack>
  );
}
