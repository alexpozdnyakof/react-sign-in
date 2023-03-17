import { ApiUser } from '../shared/api';

export type UserState = {
  user: ApiUser | null;
};

export const userInitalState: UserState = {
  user: null,
};

export type UserAction =
  | { type: 'login'; payload: ApiUser }
  | {
      type: 'logout';
      payload: null;
    };

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'login': {
      return { ...state, user: action.payload };
    }
    case 'logout': {
      return { ...state, user: null };
    }
    default: {
      return { ...state };
    }
  }
}

const login = (payload: ApiUser) => ({
  type: 'login' as const,
  payload,
});

const logout = () => ({ type: 'logout' as const, payload: null });

export const userActions = { login, logout };
