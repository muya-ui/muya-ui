export default function addPx(width?: string | number) {
  if (typeof width === 'number') {
    return `${width}px`;
  }
  if (!width) {
    return '';
  }
  return width;
}
