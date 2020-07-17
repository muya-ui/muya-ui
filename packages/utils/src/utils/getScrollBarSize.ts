export function getScrollBarSize(node: HTMLElement) {
  if (document.body === node) {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  const { borderRightWidth, borderLeftWidth } = window.getComputedStyle(node);

  const borderLeftWidthNum = borderLeftWidth ? parseInt(borderLeftWidth, 10) : 0;
  const borderRightWidthNum = borderRightWidth ? parseInt(borderRightWidth, 10) : 0;
  return node.offsetWidth - node.clientWidth - borderLeftWidthNum - borderRightWidthNum;
}

export default getScrollBarSize;
