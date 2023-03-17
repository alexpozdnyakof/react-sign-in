import useCombine from './use-combine';

describe('useCombine', () => {
  const userInitialState = { name: 'name' };
  const todosInitialState = { todos: [1, 2, 3] };

  it('should merge states with provided keys', () => {
    const [state] = useCombine({
      user: [userInitialState, (state) => state],
      todos: [todosInitialState, (state) => state],
    });

    expect(state).toEqual({
      user: userInitialState,
      todos: todosInitialState,
    });
  });

  it('should call all passed reducers', () => {
    const reducerA = vi.fn();
    const reducerB = vi.fn();
    const action = { type: 'init' };

    const [_, dispatch] = useCombine({
      user: [userInitialState, reducerA],
      todos: [todosInitialState, reducerB],
    });

    dispatch(action);

    expect(reducerA).toHaveBeenCalledTimes(1);
    expect(reducerA).toHaveBeenCalledWith(action);
    expect(reducerB).toHaveBeenCalledTimes(1);
    expect(reducerB).toHaveBeenCalledWith(action);
  });
});
