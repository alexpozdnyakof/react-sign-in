import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';
import { ApiUser } from './shared/api';

export type AppState = {
  session: ApiUser | null;
};

type ContextProps = {
  state: AppState;
  dispatch: Dispatch<Action>;
};

const initialState = {
  session: null,
};

const AppStateContext = createContext<ContextProps>({} as ContextProps);

type Action =
  | { type: 'login'; payload: ApiUser }
  | {
      type: 'logout';
      payload: null;
    };

function rootReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'login': {
      return { ...state, session: action.payload };
    }
    case 'logout': {
      return { ...state, session: null };
    }
    default: {
      return { ...state };
    }
  }
}

export function AppStateProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}

export const loginAction = (payload: ApiUser): Action => ({
  type: 'login',
  payload,
});

export const logoutAction = (): Action => ({
  type: 'logout',
  payload: null,
});
