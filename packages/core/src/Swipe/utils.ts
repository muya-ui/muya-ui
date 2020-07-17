import {
  Children,
  cloneElement,
  createRef,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';

import { forkRef } from '@muya-ui/utils';

import { ISwipeCloneResult } from './innerTypes';

export function rectSizeEqual(
  rectA?: Pick<ClientRect, 'width' | 'height'>,
  rectB?: Pick<ClientRect, 'width' | 'height'>,
) {
  if (!rectA || !rectB) {
    return false;
  }
  return rectA.width === rectB.width && rectA.height === rectB.height;
}

export function transformItems(items: RefObject<HTMLDivElement>[]) {
  return items.map(item => {
    return item.current!.getBoundingClientRect();
  });
}

function getStepPoints(items: ClientRect[], isH: boolean) {
  const firstPoint = isH ? items[0].left : items[0].top;
  return items.map(item => (isH ? item.right - firstPoint : item.bottom - firstPoint));
}
/**
 * 根据一个个 bounding rect 来计算，要覆盖掉 size 需要多少个 rect
 * @param rects 输入的矩形数组
 * @param isH 水平还是垂直
 * @param size 要覆盖到的区间
 */
export function calculateCloneNum(rects: ClientRect[], isH: boolean, size: number) {
  const items = getStepPoints(rects, isH);
  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];
    if (item >= size) {
      return i + 1;
    }
  }
}

export function calculateSize(items: ClientRect[], isH: boolean) {
  const firstItem = items[0];
  const lastItem = items[items.length - 1];
  if (isH) {
    return lastItem.right - firstItem.left;
  }
  return lastItem.bottom - firstItem.top;
}

function notNull(value: any) {
  return value !== null;
}
function cloneMore(
  arr: ReactElement[],
  num: number,
  refs: RefObject<HTMLDivElement>[],
  cloneItems: RefObject<HTMLDivElement>[],
) {
  let i = 0;
  while (i < num) {
    const child = arr[i];
    const innerChildRef = createRef<HTMLDivElement>();
    const handleChildRef = forkRef<HTMLDivElement>(refs[i], innerChildRef);
    cloneItems.push(innerChildRef);
    arr.push(
      cloneElement(child, {
        ...child.props,
        key: arr.length,
        ref: handleChildRef,
      }),
    );
    i++;
  }
}
export function cloneChildren(
  children: ReactNode,
  containerStyle: CSSProperties = {},
  cloneNum: number = 0,
): ISwipeCloneResult {
  const innerItems: RefObject<HTMLDivElement>[] = [];
  const cloneItems: RefObject<HTMLDivElement>[] = [];
  const newChildren: ReactElement[] = [];
  const formerRefs: RefObject<HTMLDivElement>[] = [];

  Children.forEach(children, child => {
    if (!isValidElement(child)) {
      return null;
    }
    const { style, ...otherChildProps } = child.props;
    const innerChildRef = createRef<HTMLDivElement>();
    const handleChildRef = forkRef<HTMLDivElement>((child as any).ref, innerChildRef);
    const childStyle = {
      ...style,
      ...containerStyle,
    };

    innerItems.push(innerChildRef);
    formerRefs.push((child as any).ref);
    newChildren.push(
      cloneElement(child, {
        ...otherChildProps,
        key: notNull(child.key) ? child.key : newChildren.length,
        style: childStyle,
        ref: handleChildRef,
      }),
    );
  });
  let num = cloneNum;
  const realItemNum = newChildren.length;
  if (num > realItemNum && realItemNum > 0) {
    while (num > realItemNum) {
      num -= realItemNum;
      cloneMore(newChildren, realItemNum, formerRefs, cloneItems);
    }
  }
  if (num > 0) {
    cloneMore(newChildren, num, formerRefs, cloneItems);
  }

  return {
    refs: innerItems,
    cloneRefs: cloneItems,
    nodes: newChildren,
  };
}

/**
 * 根据容器节点来设置子容器的样式，只有设置的了等分的时候需要
 * @param isH
 * @param containerRect
 * @param equalNum
 * @param gutter
 */
export function getChildStyle(
  isH: boolean,
  containerRect?: Pick<ClientRect, 'width' | 'height'>,
  equalNum?: number,
  gutter: number = 0,
) {
  const childStyle: CSSProperties = {};
  if (equalNum && containerRect && isH) {
    const containerSize = containerRect.width;
    childStyle.width = (containerSize - gutter * (equalNum - 1)) / equalNum;
    gutter && (childStyle.marginRight = gutter);
  } else if (equalNum && containerRect) {
    const containerSize = containerRect.height;
    childStyle.height = (containerSize - gutter * (equalNum - 1)) / equalNum;
    gutter && (childStyle.marginBottom = gutter);
  }
  return childStyle;
}
