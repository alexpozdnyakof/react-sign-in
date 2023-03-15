import { useAppState } from './context';
import HomePage from './pages/home-page';
import SignInPage from './pages/sign-in-page';

function App() {
  const { state } = useAppState();
  return (
    <>
      {!state.session && <SignInPage />}
      {state.session && <HomePage />}
    </>
  );
}

export default App;
