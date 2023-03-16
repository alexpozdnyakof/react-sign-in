import { logoutAction, useAppState } from '../context';
import { Button } from '../shared/ui';

export default function HomePage() {
  const { state, dispatch } = useAppState();
  return (
    <div className="fullscreen center">
      <div style={{ textAlign: 'center' }}>
        <h1>Logged in as {state.session?.username}</h1>
        <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
      </div>
    </div>
  );
}
