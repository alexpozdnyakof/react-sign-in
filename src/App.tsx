import './App.css';
import Button from './ui/button';
import Stack from './ui/stack';
import TextField from './ui/text-field';

function App() {
  return (
    <div className="signInPage">
      <div className="surface">
        <div className="stretch">
          <h1> Welcome back</h1>
        </div>

        <div className="stretch">
          <Stack space="medium">
            <Stack space="small">
              <TextField
                label="Phone number, username, or email"
                placeholder=" "
              />
              <TextField label="Password" type="password" placeholder=" " />
            </Stack>
            <Button>Log in</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default App;
