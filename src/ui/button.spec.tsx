import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button';

describe('Button', () => {
  it('should render component', () => {
    render(<Button>Click</Button>);

    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
  });

  it('should render children', () => {
    render(
      <Button>
        <div data-testid="children">Click</div>
      </Button>,
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('should be clickable', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Click' }));
    expect(onClick).toHaveBeenCalled();
  });

  it('should can be disabled', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toHaveAttribute(
      'disabled',
    );
  });

  it('should support submit type', () => {
    const { rerender } = render(<Button>Click</Button>);
    const btnElement = screen.getByRole('button', { name: 'Click' });
    expect(btnElement).not.toHaveAttribute('type');

    rerender(<Button type="submit">Click</Button>);
    expect(btnElement).toHaveAttribute('type', 'submit');
  });
});
