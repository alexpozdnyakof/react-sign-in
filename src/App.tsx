import './App.css';
import Stack from './ui/stack';
import SignInForm from './widgets/sign-in-form';

function App() {
  return (
    <div className="sign-in-page">
      <Stack space="medium">
        <div className="surface">
          <div className="stretch">
            <h1> Welcome back</h1>
          </div>
          <SignInForm />
        </div>
        <div className="surface">
          <div className="signup">
            Dont have an account?&nbsp;<a href="https://localhost">Sign up</a>
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default App;
