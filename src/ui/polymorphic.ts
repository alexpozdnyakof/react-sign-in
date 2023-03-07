import clsx from 'clsx';
import { forwardRef } from 'react';

/** helpers **/
type Merge<T, U> = Omit<T, keyof U> & U;
type EmptyProps = { [K in any]: never };
type NativeElementOrAny<Type extends React.ElementType> =
  Type extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[Type] : any;

type PolyProps<Type extends React.ElementType, Props> = Merge<
  Omit<React.ComponentProps<Type>, 'className'>,
  { as?: Type; className?: Parameters<typeof clsx>[number] } & Props
>;

type OverridedForwardRefRenderFunction<Type extends React.ElementType, P> = {
  (
    props: PolyProps<Type, P>,
    ref: React.ForwardedRef<NativeElementOrAny<Type>>,
  ): React.ReactElement | null;
  displayName?: string;
};

type Poly<Type extends React.ElementType, Props> = {
  <RebindDefaultType extends React.ElementType = Type>(
    props: PolyProps<RebindDefaultType, Props>,
  ): React.ReactElement | null;
};

export function poly<
  Props = EmptyProps,
  Type extends React.ElementType = 'div',
>(render: OverridedForwardRefRenderFunction<Type, Props>) {
  return forwardRef(render) as Poly<Type, Props>;
}
