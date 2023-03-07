import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './text-field';

describe('TextField Component', () => {
  it('should render component', () => {
    const { baseElement } = render(<TextField />);
    expect(baseElement).toBeInTheDocument();
  });

  it('should generate id for input', () => {
    render(<TextField label="Username" />);
    expect(screen.getByLabelText('Username')).toHaveAttribute(
      'id',
      expect.any(String),
    );
  });

  it('should be labelled', () => {
    const { rerender } = render(
      <TextField data-testid="text-field" label="UsernameZero" />,
    );

    const textFieldElement = screen.getByTestId('text-field');
    expect(textFieldElement).toHaveAccessibleName('UsernameZero');

    rerender(<TextField label="UsernameOne" />);

    expect(textFieldElement).toHaveAccessibleName('UsernameOne');
  });

  it('should describe by message', () => {
    render(<TextField label="Username" message="Invalid username" />);
    expect(screen.getByLabelText('Username')).toHaveAccessibleDescription(
      'Invalid username',
    );
  });

  it('should be invalid when tone = negative', () => {
    render(<TextField label="Username" tone="negative" />);
    const textFieldElement = screen.getByLabelText('Username');
    expect(textFieldElement).toBeInvalid();
  });

  it('should support field types', () => {
    const { rerender } = render(<TextField label="Username" />);
    const textFieldElement = screen.getByLabelText('Username');

    expect(textFieldElement).toHaveAttribute('type', 'text');

    rerender(<TextField label="Username" type="email" />);
    expect(textFieldElement).toHaveAttribute('type', 'email');

    render(<TextField label="Username" type="search" />);
    expect(screen.getByLabelText('Username')).toHaveAttribute('type', 'search');
  });

  it('should set native input props', () => {
    render(<TextField label="Username" name="username" required />);

    const textFieldElement = screen.getByLabelText('Username');

    expect(textFieldElement).toHaveAttribute('data-custom', 'custom');
    expect(textFieldElement).toHaveAttribute('name', 'username');
    expect(textFieldElement).toHaveAttribute('required');
  });

  it('should allow to type text', async () => {
    render(<TextField label="Username" />);
    const textFieldElement = screen.getByLabelText('Username');

    expect(textFieldElement).not.toHaveValue();

    await userEvent.type(textFieldElement, 'myusername');
    expect(textFieldElement).toHaveValue('myusername');
  });
});
