import { Stack } from '../ui';
import SignInForm from '../widgets/sign-in-form';

export default function SignInPage() {
  return (
    <div className="sign-in-page">
      <Stack space="medium">
        <div className="surface">
          <div className="stretch">
            <h1> Welcome back</h1>
            <SignInForm />
          </div>
        </div>
        <div className="surface">
          <div className="signup size-body-l">
            Dont have an account?&nbsp;
            <a href="https://localhost" className="link">
              Sign up
            </a>
          </div>
        </div>
      </Stack>
    </div>
  );
}
