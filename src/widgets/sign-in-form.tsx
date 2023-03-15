import { loginAction, useAppState } from '../context';
import { ApiLoginParams, login } from '../shared/api';
import { useForm } from '../shared/hooks';
import { PasswordField, Stack } from '../ui';
import Button from '../ui/button';
import TextField from '../ui/text-field';

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
        <a href="https://localhost" className="link">
          Forgot password?
        </a>
      </div>
    </Stack>
  );
}
