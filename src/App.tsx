import './App.css';
import Button from './ui/button';
import Stack from './ui/stack';
import TextField from './ui/text-field';

function App() {
  return (
    <div className="signInPage">
      <Stack space="medium">
        <div className="surface">
          <div className="stretch">
            <h1> Welcome back</h1>
          </div>

          <div className="stretch">
            <Stack space="medium">
              <Stack space="small">
                <TextField
                  tone="negative"
                  label="Phone number, username, or email"
                />
                <TextField label="Password" type="password" />
              </Stack>
              <Button>Log in</Button>
            </Stack>
          </div>
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
