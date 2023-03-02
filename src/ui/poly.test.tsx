import { render, screen } from '@testing-library/react';
import Poly from './poly';

describe('Polymorphic', () => {
  it('should render component', () => {
    const { baseElement } = render(<Poly>Hello its Poly!</Poly>);
    expect(baseElement).toBeDefined();
  });

  it('should render any tags', () => {
    const { rerender } = render(<Poly data-testid="poly" />);
    expect(screen.getByTestId('poly').tagName).toBe('DIV');

    rerender(<Poly data-testid="poly" as="input" />);
    expect(screen.getByTestId('poly').tagName).toBe('INPUT');
  });

  it('should set className from string', () => {
    const { rerender } = render(<Poly data-testid="poly" />);
    const element = screen.getByTestId('poly');
    expect(element).not.toHaveClass('classA');

    rerender(<Poly data-testid="poly" className="classA" />);
    expect(element.classList).toHaveClass('classA');
  });

  it('should set className from array', () => {
    const { rerender } = render(<Poly data-testid="poly" />);
    const element = screen.getByTestId('poly');
    expect(element).not.toHaveClass('classA');
    expect(element).not.toHaveClass('classB');
    expect(element).not.toHaveClass('classC');

    rerender(<Poly data-testid="poly" className={['classA', 'classB', 'classC']} />);
    expect(element.classList.toString()).toEqual('classA classB classC');
  });
});
