export function getRangeDefaultValue(defaultValue?: string[]): [string, string] {
  const value = defaultValue || [];
  const [left = '', right = ''] = value;
  return [left, right];
}
