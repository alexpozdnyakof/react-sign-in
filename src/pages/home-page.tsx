import { useAppState } from '../context';
import { userActions } from '../entities/user';
import { Button, Stack } from '../shared/ui';

export default function HomePage() {
  const {
    state: { userState },
    dispatch,
  } = useAppState();
  return (
    <div className="fullscreen center">
      <Stack space="large">
        <h1>Logged in as {userState.user?.username}</h1>
        <Button onClick={() => dispatch(userActions.logout())}>Logout</Button>
      </Stack>
    </div>
  );
}
