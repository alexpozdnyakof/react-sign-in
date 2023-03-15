import { useAppState } from './context';
import SignInPage from './pages/sign-in-page';

function App() {
  const { state } = useAppState();
  return (
    <>
      {!state.session && <SignInPage />}
      {state.session && (
        <div className="fullscreen center">
          <h1>Hello Again!</h1>
        </div>
      )}
    </>
  );
}

export default App;
