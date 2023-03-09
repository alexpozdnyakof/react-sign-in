import './App.css';
import Button from './ui/button';
import TextField from './ui/text-field';

function App() {
  return (
    <div className="signInPage">
      <div className="surface">
        <div className="stretch">
          <h1> Welcome back</h1>
        </div>

        <div className="stretch">
          <TextField
            label="Phone number, username, or email"
            message="Error"
            placeholder=" "
          />
          <TextField
            label="Password"
            type="password"
            message="Error"
            placeholder=" "
          />
          <Button>Log in</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
