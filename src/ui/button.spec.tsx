import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
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

  it('should have type="button" by default', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button', { name: 'Click' })).toHaveAttribute(
      'type',
      'button',
    );
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

  it('should have primary variant by default', () => {
    render(<Button>Click</Button>);
    const btnElement = screen.getByRole('button', { name: 'Click' });
    expect(btnElement).toHaveClass('variant-primary');
    expect(btnElement).not.toHaveClass('variant-secondary');
  });

  it('should accept secondary variant', () => {
    const { rerender } = render(<Button>Click</Button>);
    const btnElement = screen.getByRole('button', { name: 'Click' });
    expect(btnElement).not.toHaveClass('variant-secondary');

    rerender(<Button variant="secondary">Click</Button>);
    expect(btnElement).not.toHaveClass('variant-primary');
    expect(btnElement).toHaveClass('variant-secondary');
  });


  it('should set compact size', () => {
    const { rerender } = render(<Button>Click</Button>);
    const btnElement = screen.getByRole('button', { name: 'Click' });

    expect(btnElement).not.toHaveClass('size-default');
    expect(btnElement).not.toHaveClass('size-compact');

    rerender(<Button size="compact">Click</Button>);

    expect(btnElement).not.toHaveClass('size-default');
    expect(btnElement).toHaveClass('size-compact');
  });

  it('should render with no a11y violations', async () => {
    const { container } = render(<Button>Click</Button>);
    const result = await axe(container);

    expect(result).toHaveNoViolations();
  });
});
