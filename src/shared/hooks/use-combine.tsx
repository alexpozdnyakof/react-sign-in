import { Dispatch, Reducer, ReducerAction, ReducerState } from 'react';

export default function useCombine<
  State extends Record<string, object>,
  Action = any,
>(reducers: {
  [K in keyof State]: [
    ReducerState<Reducer<State[K], Action>>,
    Dispatch<ReducerAction<Reducer<State[K], Action>>>,
  ];
}) {
  const combinedState = Object.entries(reducers).reduce(
    (acc, [sliceName, [subState]]) =>
      Object.assign(acc, { [sliceName]: subState }),
    {},
  );

  const combinedDispatch = (action: Action) =>
    Object.values(reducers)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, dispatch]) => dispatch)
      .forEach((dispatch) => dispatch(action));

  return [combinedState, combinedDispatch] as [State, Dispatch<Action>];
}
