import { Stack } from '../ui';
import Button from '../ui/button';
import TextField from '../ui/text-field';

export default function SignInForm() {
  return (
    <Stack space="large">
      <Stack space="medium">
        <Stack space="small">
          <TextField
            label="Phone number, username, or email"
            tone="negative"
            message="Please fill this field"
          />
          <TextField label="Password" type="password" />
        </Stack>
        <Button>Log in</Button>
      </Stack>
      <div className="center">
        <a href="https://localhost" className="link">
          Forgot password?
        </a>
      </div>
    </Stack>
  );
}
