import { render, screen } from '@testing-library/react';
import Text from './text';

describe('Text', () => {
  it('should render component', () => {
    render(<Text>Hello there!</Text>);
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
  });

  it('should set tone classNames', () => {
    const { rerender } = render(<Text>Hello there!</Text>);

    const textElement = screen.getByText('Hello there!');
    expect(textElement).not.toHaveClass('tone-normal');
    expect(textElement).not.toHaveClass('tone-secondary');
    expect(textElement).not.toHaveClass('tone-negative');

    rerender(<Text tone="secondary">Hello there!</Text>);
    expect(textElement).toHaveClass('tone-secondary');
    expect(textElement).not.toHaveClass('tone-negative');

    rerender(<Text tone="negative">Hello there!</Text>);
    expect(textElement).not.toHaveClass('tone-secondary');
    expect(textElement).toHaveClass('tone-negative');
  });

  it('should set size classNames', () => {
    const { rerender } = render(<Text>Hello there!</Text>);

    const textElement = screen.getByText('Hello there!');
    expect(textElement).not.toHaveClass('size-body');
    expect(textElement).not.toHaveClass('size-caption');
    expect(textElement).not.toHaveClass('size-header');

    rerender(<Text size="caption">Hello there!</Text>);
    expect(textElement).toHaveClass('size-caption');
    expect(textElement).not.toHaveClass('size-header');

    rerender(<Text size="header">Hello there!</Text>);
    expect(textElement).not.toHaveClass('size-caption');
    expect(textElement).toHaveClass('size-header');
  });

  it('should set weight classNames', () => {
    const { rerender } = render(<Text>Hello there!</Text>);

    const textElement = screen.getByText('Hello there!');
    expect(textElement).not.toHaveClass('weight-normal');
    expect(textElement).not.toHaveClass('weight-bold');

    rerender(<Text weight="bold">Hello there!</Text>);
    expect(textElement).toHaveClass('weight-bold');
  });
});
