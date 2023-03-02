import { ComponentProps, createElement, ElementType, forwardRef, ReactElement, Ref } from 'react';
import clsx from 'clsx';

/**
 * Polymorphic base atomic component
 */

type OwnProps<T extends ElementType = ElementType> = {
  as?: T;
  className?: string | string[] | { [key: string]: boolean };
};

type PolyProps<E extends ElementType> = OwnProps<E> & Omit<ComponentProps<E>, keyof OwnProps>;

type PolyFn = <ComponentType extends ElementType = 'div'>(props: PolyProps<ComponentType>) => ReactElement | null;

const Poly: PolyFn = forwardRef(function Poly(
  { as: Element = 'div', className: originalClassName, ...props }: OwnProps,
  ref: Ref<Element>,
) {
  return createElement(Element, { ...props, ref, className: clsx(originalClassName) });
});

export default Poly;
