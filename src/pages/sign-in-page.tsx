import { Stack } from '../ui';
import SignInForm from '../widgets/sign-in-form';

export default function SignInPage() {
  return (
    <div className="fullscreen center">
      <div className="query-container">
        <Stack space="medium">
          <div className="surface card">
            <div className="stretch">
              <div className="size-header mb-large lh-125">
                Enter your email and password to continue
              </div>
              <SignInForm />
            </div>
          </div>

          <div className="surface card">
            <div className="stretch">
              <div className="size-body-l center">
                Dont have an account?&nbsp;
                <a href="https://localhost" className="link">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
}
