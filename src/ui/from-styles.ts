export function fromStyles(
  styles: Record<string, string>,
  property: string,
  value: string | null | undefined,
) {
  if (!value) return null;
  return [styles[`${property}-${value}`]];
}
