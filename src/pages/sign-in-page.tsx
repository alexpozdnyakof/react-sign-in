import { Link, Stack } from '../shared/ui';
import { SignInForm } from '../widgets/';

export default function SignInPage() {
  return (
    <div className="fullscreen center">
      <div className="query-container">
        <div className="container">
          <Stack space="medium">
            <Stack space="large">
              <h1>Enter your email and password to continue</h1>
              <SignInForm />
            </Stack>
            <div className="size-body-l center">
              Dont have an account?&nbsp;
              <Link href="https://localhost">Sign up</Link>
            </div>
          </Stack>
        </div>
      </div>
    </div>
  );
}
