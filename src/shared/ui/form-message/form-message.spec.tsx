import { render, screen } from '@testing-library/react';
import FormMessage from './form-message';

describe('FormMessage', () => {
  it('should render component', () => {
    render(<FormMessage>Message</FormMessage>);
    expect(screen.getByText('Message')).toBeInTheDocument();
  });

  it('should set negative tone', () => {
    render(<FormMessage tone="negative">Message</FormMessage>);
    expect(screen.getByText('Message')).toHaveClass('tone-negative');
  });
});
