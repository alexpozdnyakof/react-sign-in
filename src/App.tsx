import { useAppState } from './context';
import { HomePage, SignInPage } from './pages';

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
