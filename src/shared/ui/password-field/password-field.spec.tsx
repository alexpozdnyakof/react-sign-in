import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PasswordField from './password-field';
import { axe } from 'vitest-axe';

describe('PasswordField Component', () => {
  it('should render component', () => {
    const { baseElement } = render(<PasswordField />);
    expect(baseElement).toBeInTheDocument();
  });

  it('should generate id for input', () => {
    render(<PasswordField label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'id',
      expect.any(String),
    );
  });

  it('should be labelled', () => {
    render(<PasswordField data-testid="password-field" label="Password" />);
    const textFieldElement = screen.getByTestId('password-field');
    expect(textFieldElement).toHaveAccessibleName('Password');
  });

  it('should describe by message', () => {
    render(<PasswordField label="Password" message="Invalid password" />);
    expect(screen.getByLabelText('Password')).toHaveAccessibleDescription(
      'Invalid password',
    );
  });

  it('should be invalid when tone = negative', () => {
    render(<PasswordField label="Password" tone="negative" />);
    const passwordFieldElement = screen.getByLabelText('Password');
    expect(passwordFieldElement).toBeInvalid();
  });

  it('should not support field types', () => {
    const { rerender } = render(<PasswordField label="Password" />);
    const passwordFieldElement = screen.getByLabelText('Password');
    expect(passwordFieldElement).toHaveAttribute('type', 'password');

    // @ts-expect-error test unavialable prop
    rerender(<PasswordField label="Username" type="email" />);
    expect(passwordFieldElement).toHaveAttribute('type', 'password');
  });

  it('should provide native input props', () => {
    render(<PasswordField label="Password" name="password" required />);
    const passwordFieldElement = screen.getByLabelText('Password');

    expect(passwordFieldElement).toHaveAttribute('name', 'password');
    expect(passwordFieldElement).toHaveAttribute('required');
  });

  it('should allow to type text', async () => {
    render(<PasswordField label="Password" />);
    const passwordFieldElement = screen.getByLabelText('Password');

    expect(passwordFieldElement).not.toHaveValue();

    await userEvent.type(passwordFieldElement, 'mypassword');
    expect(passwordFieldElement).toHaveValue('mypassword');
  });

  it('should provide default placeholder', () => {
    render(<PasswordField label="Password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'placeholder',
      ' ',
    );
  });

  it('should show password after button clicked', async () => {
    render(<PasswordField label="Password" />);
    const toggleShowButtonElement = screen.getByRole('button');
    const passwordField = screen.getByLabelText('Password');
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(toggleShowButtonElement).toHaveTextContent('Show');

    await userEvent.click(toggleShowButtonElement);
    expect(passwordField).toHaveAttribute('type', 'text');
    expect(toggleShowButtonElement).toHaveTextContent('Hide');

    await userEvent.click(toggleShowButtonElement);
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(toggleShowButtonElement).toHaveTextContent('Show');
  });

  it('should render with no a11y violations', async () => {
    const { container } = render(<PasswordField label="Password" />);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
