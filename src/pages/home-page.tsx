import { logoutAction, useAppState } from '../context';
import { Button, Stack } from '../shared/ui';

export default function HomePage() {
  const { state, dispatch } = useAppState();
  return (
    <div className="fullscreen center">
      <Stack space="large">
        <h1>Logged in as {state.session?.username}</h1>
        <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
      </Stack>
    </div>
  );
}
