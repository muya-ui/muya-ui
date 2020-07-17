import { ScrollElement } from './types';
const overflowScrollReg = /scroll|auto/i;

function isWindow(val: unknown): val is Window {
  return val === window;
}

export function getScroller(el: HTMLElement, root: ScrollElement = window) {
  let node = el;

  while (node && node.tagName !== 'HTML' && node.nodeType === 1 && node !== root) {
    const { overflowY } = window.getComputedStyle(node);

    if (overflowY && overflowScrollReg.test(overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      }

      const { overflowY: htmlOverflowY } = window.getComputedStyle(node.parentNode as Element);

      if (htmlOverflowY && overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode as HTMLElement;
  }

  return root;
}

export function isHidden(el: HTMLElement) {
  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';

  const parentHidden = el.offsetParent === null && style.position !== 'fixed';

  return hidden || parentHidden;
}

export function getScrollTop(el: ScrollElement): number {
  return 'scrollTop' in el ? el.scrollTop : el.pageYOffset;
}

export function getRootScrollTop(): number {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export function getElementTop(el: ScrollElement, scroller?: HTMLElement) {
  if (isWindow(el)) {
    return 0;
  }
  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return el.getBoundingClientRect().top + scrollTop;
}
