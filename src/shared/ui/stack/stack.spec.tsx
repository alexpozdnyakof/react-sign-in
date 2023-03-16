import { render, screen } from '@testing-library/react';
import Stack from './stack';

describe('Stack', () => {
  it('should render component', () => {
    render(<Stack data-testId="stack">Content</Stack>);

    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });

  it('should set space', () => {
    const allowedSpaceValues = ['xsmall', 'small', 'medium', 'large'] as const;

    const { rerender } = render(<Stack data-testId="stack" />);
    const stack = screen.getByTestId('stack');
    expect(stack).not.toHaveClass(
      'space-xsmall',
      'space-small',
      'space-medium',
      'space-large',
    );

    allowedSpaceValues.forEach((space) => {
      rerender(<Stack data-testId="stack" space={space} />);
      expect(stack).toHaveClass(`space-${space}`);
    });
  });
});
