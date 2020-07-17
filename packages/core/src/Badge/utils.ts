export function getDisplayText(value: string | number | undefined, max: number): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return value > max ? `${max}+` : `${value}`;
  }
  return '';
}
