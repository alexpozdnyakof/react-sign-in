import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {
  UserAction,
  userInitalState,
  userReducer,
  UserState,
} from './entities/user';
import { useCombine } from './shared/hooks';

export type AppState = {
  userState: UserState;
};

type AppAction = UserAction;

type ContextProps = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

const AppStateContext = createContext<ContextProps>({} as ContextProps);

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useCombine<AppState, AppAction>({
    userState: useReducer(userReducer, userInitalState),
  });

  const store = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppStateContext.Provider value={store}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}

