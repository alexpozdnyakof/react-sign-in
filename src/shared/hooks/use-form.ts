import { FormEvent, useReducer } from 'react';

export type SubmitFn<T> = (state: T) => void | Promise<void>;

type Errors<T> = {
  [K in keyof T]: null | string;
};

const controls = (eventTarget: unknown): Array<HTMLInputElement> => {
  const dirtyControlList = Array.from(
    eventTarget instanceof HTMLFormElement
      ? eventTarget.elements
      : [eventTarget],
  );

  return dirtyControlList.filter(
    (x): x is HTMLInputElement => x instanceof HTMLInputElement,
  );
};

const validationResult = ({
  name,
  validity: { valid },
  validationMessage,
}: HTMLInputElement) => ({
  [name]: valid ? null : validationMessage,
});

export default function useForm<T>(submitFn?: SubmitFn<T>) {
  const [{ errors }, dispatch] = useReducer(
    (state: { errors: Errors<T> }, event: FormEvent) => {
      if (event.type === 'submit') {
        event.preventDefault();
      }

      const errors = controls(event.target).reduce(
        (acc, field) => Object.assign(acc, validationResult(field)),
        state.errors,
      );

      return { errors };
    },
    {
      errors: {} as Errors<T>,
    },
  );

  const handleFormEvent = (event: FormEvent) => {
    if (
      event.type === 'submit' &&
      event.target instanceof HTMLFormElement &&
      event.target.checkValidity()
    ) {
      event.preventDefault();
      submitFn?.(Object.fromEntries(new FormData(event.target).entries()) as T);
    } else {
      dispatch(event);
    }
  };

  return { errors, handleFormEvent };
}
