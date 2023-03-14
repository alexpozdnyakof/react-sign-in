import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useForm, { SubmitFn } from './use-form';

type FormState = {
  hostname: string;
  ipaddress: string;
  optional: string | undefined;
};

function ComponentUnderTest({
  submitCallback,
}: {
  submitCallback?: SubmitFn<FormState>;
}) {
  const { errors, handleFormEvent } = useForm<FormState>(submitCallback);

  return (
    <>
      <form onSubmit={handleFormEvent} onBlur={handleFormEvent} noValidate>
        <input name="hostname" data-testid="hostnameField" required />
        <input name="ipaddress" data-testid="ipaddressField" required />
        <input name="optional" data-testid="optionalField" />
        <button type="submit">Submit</button>
      </form>
      <div data-testid="hostnameMessage">{errors.hostname}</div>
      <div data-testid="ipaddressMessage">{errors.ipaddress}</div>
      <div data-testid="optionalMessage">{errors.optional}</div>
    </>
  );
}

describe('useForm', () => {
  it('should set errors for fields with constraints after submit', async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByTestId('hostnameMessage')).toHaveTextContent(
      'Constraints not satisfied',
    );
    expect(screen.getByTestId('ipaddressMessage')).toHaveTextContent(
      'Constraints not satisfied',
    );
  });

  it('should not set any error messages for optional fields', async () => {
    render(<ComponentUnderTest />);
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByTestId('optionalMessage')).toHaveTextContent('');
  });

  it('should set errors for fields with constraints after submit', async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByTestId('hostnameMessage')).toHaveTextContent(
      'Constraints not satisfied',
    );
    expect(screen.getByTestId('optionalMessage')).toHaveTextContent('');
  });

  it('should set errors for fields with constraints after blur', async () => {
    render(<ComponentUnderTest />);

    await userEvent.click(screen.getByTestId('hostnameField'));
    await userEvent.click(screen.getByTestId('ipaddressField'));
    await userEvent.click(screen.getByTestId('optionalField'));
    await userEvent.click(document.body);

    expect(screen.getByTestId('hostnameMessage')).toHaveTextContent(
      'Constraints not satisfied',
    );
    expect(screen.getByTestId('ipaddressMessage')).toHaveTextContent(
      'Constraints not satisfied',
    );
    expect(screen.getByTestId('optionalMessage')).toHaveTextContent('');
  });

  it('should clear errors for valid fields', async () => {
    render(<ComponentUnderTest />);
    const field = screen.getByTestId('hostnameField');
    const message = screen.getByTestId('hostnameMessage');

    await userEvent.click(field);
    await userEvent.click(document.body);
    expect(message).toHaveTextContent('Constraints not satisfied');

    await userEvent.type(field, 'linux.org');
    await userEvent.click(document.body);
    expect(message).toHaveTextContent('');
  });

  it('should not execute submit callback for invalid form', async () => {
    const submitCallback = vi.fn();
    render(<ComponentUnderTest submitCallback={submitCallback} />);
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submitCallback).not.toHaveBeenCalled();
  });

  it('should execute submit callback for valid form', async () => {
    const submitCallback = vi.fn();
    render(<ComponentUnderTest submitCallback={submitCallback} />);

    await userEvent.type(screen.getByTestId('hostnameField'), 'linux.org');
    await userEvent.type(screen.getByTestId('ipaddressField'), '127.0.0.1');

    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(submitCallback).toHaveBeenCalledTimes(1);
    expect(submitCallback).toHaveBeenCalledWith({
      hostname: 'linux.org',
      ipaddress: '127.0.0.1',
      optional: '',
    });
  });
});
