import {
  ComponentProps,
  createElement,
  ElementType,
  forwardRef,
  ReactElement,
  Ref,
} from 'react';
import clsx from 'clsx';
import styles from './block.module.css';
import { fromStyles } from './from-styles';

/**
 * Atomic Polymorphic Component who shared
 * basic design tokens for space, borders, fills etc.
 */

type Space = 'micro' | 'small' | 'medium' | 'large' | 'xlarge';
type SpaceWithNegatives = Space | `-${Space}`;

type MarginAndPadding = {
  margin: SpaceWithNegatives | 'auto';
  marginRight: SpaceWithNegatives;
  marginBottom: SpaceWithNegatives;
  marginLeft: SpaceWithNegatives;
  marginTop: SpaceWithNegatives;

  padding: Space;
  paddingX: Space;
  paddingY: Space;
  paddingTop: Space;
  paddingRight: Space;
  paddingBottom: Space;
  paddingLeft: Space;
};

type Border = {
  border: 'primary';
  borderRadius: 'micro' | 'standart' | 'full';
};

type BlockProps = {
  backgroundColor?: 'surface' | 'on-surface';
} & Partial<MarginAndPadding & Border>;

type OwnProps<T extends ElementType = ElementType> = {
  as?: T;
  className?: Parameters<typeof clsx>[number];
} & BlockProps;

type PolyProps<ComponentType extends ElementType> = OwnProps<ComponentType> &
  Omit<ComponentProps<ComponentType>, keyof OwnProps>;

type PolyFn = <ComponentType extends ElementType = 'div'>(
  props: PolyProps<ComponentType>,
) => ReactElement | null;

const Block: PolyFn = forwardRef(function Block(
  {
    as: Element = 'div',
    className: originalClassName,
    margin: _margin,
    marginRight: _marginRight,
    marginBottom: _marginBottom,
    marginLeft: _marginLeft,
    marginTop: _marginTop,
    padding: _padding,
    paddingX,
    paddingY,
    paddingTop: _paddingTop,
    paddingRight: _paddingRight,
    paddingBottom: _paddingBottom,
    paddingLeft: _paddingLeft,
    borderRadius,
    border,
    backgroundColor,
    ...props
  }: OwnProps,
  ref: Ref<Element>,
) {
  const marginTop = firstDefined(_marginTop, _margin);
  const marginRight = firstDefined(_marginRight, _margin);
  const marginBottom = firstDefined(_marginBottom, _margin);
  const marginLeft = firstDefined(_marginLeft, _margin);

  const paddingTop = firstDefined(_paddingTop, paddingY, _padding);
  const paddingRight = firstDefined(_paddingRight, paddingX, _padding);
  const paddingBottom = firstDefined(_paddingBottom, paddingY, _padding);
  const paddingLeft = firstDefined(_paddingLeft, paddingX, _padding);

  return createElement(Element, {
    ...props,
    ref,
    className: clsx(
      originalClassName,
      fromStyles(styles, 'marginTop', marginTop),
      fromStyles(styles, 'marginRight', marginRight),
      fromStyles(styles, 'marginBottom', marginBottom),
      fromStyles(styles, 'marginLeft', marginLeft),
      fromStyles(styles, 'paddingTop', paddingTop),
      fromStyles(styles, 'paddingRight', paddingRight),
      fromStyles(styles, 'paddingBottom', paddingBottom),
      fromStyles(styles, 'paddingLeft', paddingLeft),
      fromStyles(styles, 'borderRadius', borderRadius),
      fromStyles(styles, 'border', border),
      fromStyles(styles, 'backgroundColor', backgroundColor),
    ),
  });
});

function firstDefined<T extends Space | SpaceWithNegatives | 'auto'>(
  propA?: T | undefined,
  propB?: T | undefined,
  propC?: T | undefined,
): T {
  return propA ?? propB ?? (propC as T);
}

export type WithBlockProps<ComponentType extends ElementType, P> = P &
  PolyProps<ComponentType>;

export default Block;