import { useAppState } from './context';
import { HomePage, SignInPage } from './pages';

function App() {
  const {
    state: { userState },
  } = useAppState();

  return (
    <>
      {!userState.user && <SignInPage />}
      {userState.user && <HomePage />}
    </>
  );
}

export default App;
