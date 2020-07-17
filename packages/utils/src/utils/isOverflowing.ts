export function isOverflowing(node: HTMLElement) {
  if (document.body === node) {
    return window.innerWidth > document.documentElement.clientWidth;
  }
  return node.scrollHeight > node.clientHeight;
}

export default isOverflowing;
