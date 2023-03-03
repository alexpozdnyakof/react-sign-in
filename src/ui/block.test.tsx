import { render, screen } from '@testing-library/react';
import Block from './block';

describe('Polymorphic Block', () => {
  it('should render component', () => {
    const { baseElement } = render(<Block>Hello its Block!</Block>);
    expect(baseElement).toBeDefined();
  });

  it('should render any tags', () => {
    const { rerender } = render(<Block data-testid="Block" />);
    expect(screen.getByTestId('Block').tagName).toBe('DIV');

    rerender(<Block data-testid="Block" as="input" />);
    expect(screen.getByTestId('Block').tagName).toBe('INPUT');

    rerender(<Block data-testid="Block" as="span" />);
    expect(screen.getByTestId('Block').tagName).toBe('SPAN');
  });

  it('should set className from string, array and object', () => {
    const { rerender } = render(
      <>
        <Block data-testid="BlockA" />
        <Block data-testid="BlockB" />
        <Block data-testid="BlockC" />
      </>,
    );

    const blockA = screen.getByTestId('BlockA');
    const blockB = screen.getByTestId('BlockB');
    const blockC = screen.getByTestId('BlockC');

    expect(blockA).not.toHaveClass('classA');
    expect(blockB).not.toHaveClass('classB');
    expect(blockC).not.toHaveClass('classC');

    rerender(
      <>
        <Block data-testid="BlockA" className="classA" />
        <Block data-testid="BlockB" className={['classB']} />
        <Block data-testid="BlockC" className={{ classC: true }} />
      </>,
    );

    expect(blockA).toHaveClass('classA');
    expect(blockB).toHaveClass('classB');
    expect(blockC).toHaveClass('classC');
  });

  it('should set border classNames', () => {
    const { rerender } = render(<Block data-testid="Block" />);
    const blockElement = screen.getByTestId('Block');
    expect(blockElement).not.toHaveClass('border-primary');

    rerender(<Block data-testid="Block" border="primary" />);
    expect(blockElement).toHaveClass('border-primary');
  });

  it('should set backgroundColor classNames', () => {
    const { rerender } = render(<Block data-testid="Block" />);
    const blockElement = screen.getByTestId('Block');
    expect(blockElement).not.toHaveClass(
      'background-surface',
      'background-on-surface',
    );

    rerender(<Block data-testid="Block" backgroundColor="surface" />);
    expect(blockElement).toHaveClass('backgroundColor-surface');
    expect(blockElement).not.toHaveClass('backgroundColor-on-surface');

    rerender(<Block data-testid="Block" backgroundColor="on-surface" />);
    expect(blockElement).toHaveClass('backgroundColor-on-surface');
    expect(blockElement).not.toHaveClass('backgroundColor-surface');
  });

  it('should set borderRadius classNames', () => {
    const { rerender } = render(<Block data-testid="Block" />);
    const blockElement = screen.getByTestId('Block');
    expect(blockElement).not.toHaveClass(
      'borderRadius-micro',
      'borderRadius-standart',
      'borderRadius-full',
    );

    rerender(<Block data-testid="Block" borderRadius="micro" />);
    expect(blockElement).toHaveClass('borderRadius-micro');
    expect(blockElement).not.toHaveClass(
      'borderRadius-standart',
      'borderRadius-full',
    );

    rerender(<Block data-testid="Block" borderRadius="standart" />);
    expect(blockElement).toHaveClass('borderRadius-standart');
    expect(blockElement).not.toHaveClass(
      'borderRadius-micro',
      'borderRadius-full',
    );

    rerender(<Block data-testid="Block" borderRadius="full" />);
    expect(blockElement).toHaveClass('borderRadius-full');
    expect(blockElement).not.toHaveClass(
      'borderRadius-micro',
      'borderRadius-standart',
    );
  });

  describe('padding props', () => {
    it('should apply padding classNames to each direction', () => {
      const { rerender } = render(<Block data-testid="Block" />);
      const blockElement = screen.getByTestId('Block');

      expect(blockElement).not.toHaveClass(
        'paddingTop-micro',
        'paddingRight-small',
        'paddingBottom-medium',
        'paddingLeft-large',
      );

      rerender(
        <Block
          data-testid="Block"
          paddingTop="micro"
          paddingRight="small"
          paddingBottom="medium"
          paddingLeft="large"
        />,
      );

      expect(blockElement).toHaveClass(
        'paddingTop-micro',
        'paddingRight-small',
        'paddingBottom-medium',
        'paddingLeft-large',
      );
    });

    it('should apply padding classNames in all directions', () => {
      const { rerender } = render(<Block data-testid="Block" />);
      const blockElement = screen.getByTestId('Block');

      expect(blockElement).not.toHaveClass(
        'paddingTop-micro',
        'paddingRight-micro',
        'paddingBottom-micro',
        'paddingLeft-micro',
      );

      rerender(<Block data-testid="Block" padding="micro" />);

      expect(blockElement).toHaveClass(
        'paddingTop-micro',
        'paddingRight-micro',
        'paddingBottom-micro',
        'paddingLeft-micro',
      );
    });

    it('should apply padding classNames separately', () => {
      const { rerender } = render(<Block data-testid="Block" />);
      const blockElement = screen.getByTestId('Block');

      expect(blockElement).not.toHaveClass(
        'paddingTop-micro',
        'paddingBottom-micro',
        'paddingRight-small',
        'paddingLeft-small',
      );

      rerender(<Block data-testid="Block" paddingY="micro" paddingX="small" />);

      expect(blockElement).toHaveClass(
        'paddingTop-micro',
        'paddingBottom-micro',
        'paddingRight-small',
        'paddingLeft-small',
      );
    });
  });

  describe('margin props', () => {
    it('should apply margin classNames to each direction', () => {
      const { rerender } = render(<Block data-testid="Block" />);
      const blockElement = screen.getByTestId('Block');

      expect(blockElement).not.toHaveClass(
        'marginTop-micro',
        'marginRight-small',
        'marginBottom-medium',
        'marginLeft-large',
      );

      rerender(
        <Block
          data-testid="Block"
          marginTop="micro"
          marginRight="small"
          marginBottom="medium"
          marginLeft="large"
        />,
      );

      expect(blockElement).toHaveClass(
        'marginTop-micro',
        'marginRight-small',
        'marginBottom-medium',
        'marginLeft-large',
      );
    });

    it('should apply negative margin classNames to each direction', () => {
      const { rerender } = render(<Block data-testid="Block" />);
      const blockElement = screen.getByTestId('Block');

      expect(blockElement).not.toHaveClass(
        'marginTop--micro',
        'marginRight--small',
        'marginBottom--medium',
        'marginLeft--large',
      );

      rerender(
        <Block
          data-testid="Block"
          marginTop="-micro"
          marginRight="-small"
          marginBottom="-medium"
          marginLeft="-large"
        />,
      );

      expect(blockElement).toHaveClass(
        'marginTop--micro',
        'marginRight--small',
        'marginBottom--medium',
        'marginLeft--large',
      );
    });

    it('should apply margin classNames in all directions', () => {
      const { rerender } = render(<Block data-testid="Block" />);
      const blockElement = screen.getByTestId('Block');

      expect(blockElement).not.toHaveClass(
        'marginTop-micro',
        'marginRight-micro',
        'marginBottom-micro',
        'marginLeft-micro',
      );

      rerender(<Block data-testid="Block" margin="micro" />);

      expect(blockElement).toHaveClass(
        'marginTop-micro',
        'marginRight-micro',
        'marginBottom-micro',
        'marginLeft-micro',
      );
    });
  });
});
