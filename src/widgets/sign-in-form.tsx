import { Stack } from '../ui';
import Button from '../ui/button';
import TextField from '../ui/text-field';

export default function SignInForm() {
  return (
    <Stack space="large">
      <div className="stretch">
        <Stack space="medium">
          <Stack space="small">
            <TextField label="Phone number, username, or email" />
            <TextField label="Password" type="password" />
          </Stack>
          <Button>Log in</Button>
        </Stack>
      </div>
      <div className="signup">
        <a href="#">Forgot password?</a>
      </div>
    </Stack>
  );
}
