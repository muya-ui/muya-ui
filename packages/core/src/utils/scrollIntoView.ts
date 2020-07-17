// copy from https://github.com/KoryNunn/scroll-into-view/blob/05d319fe685411c60bd3f3d78d8114d7aa2f0037/scrollIntoView.js

type IEndType = 'complete' | 'canceled';
interface IScrollIntoViewAlignment {
  /** 0 to 1, default 0.5 (center) */
  top?: number;
  /** 0 to 1, default 0.5 (center) */
  left?: number;
  /** pixels to offset top alignment */
  topOffset?: number;
  /** pixels to offset left alignment */
  leftOffset?: number;
}
interface IScrollIntoViewSettings {
  time: number;
  ease: (value: number) => number;
  validTarget: (target: HTMLElement, parentsScrolled: number) => boolean;
  isScrollable: (element: HTMLElement) => boolean;
  align?: IScrollIntoViewAlignment;
  /** 这个是增加的，用于只滚动第一级的父容器 */
  onlyFirstScrollableParent?: boolean;
  /** 这个也是增加的，用于控制平滑滚动或者直接滚动 */
  behavior: 'auto' | 'smooth';
  /** 指定父节点 */
  parentNode?: HTMLElement;
}

const COMPLETE = 'complete';
const CANCELED = 'canceled';

function raf(task: FrameRequestCallback) {
  if ('requestAnimationFrame' in window) {
    return window.requestAnimationFrame(task);
  }
  setTimeout(task, 16);
}

function defaultIsWindow(target: any): target is Window {
  return target.self === target;
}

function setElementScroll(element: HTMLElement | Window, x: number, y: number) {
  if (defaultIsWindow(element)) {
    element.scrollTo(x, y);
  } else {
    element.scrollLeft = x;
    element.scrollTop = y;
  }
}

function getTargetScrollLocation(scrollSettings: any, parent: any) {
  let align = scrollSettings.align;
  let target = scrollSettings.target;
  let targetPosition = target.getBoundingClientRect();
  let parentPosition;
  let x;
  let y;
  let differenceX;
  let differenceY;
  let targetWidth;
  let targetHeight;
  let leftAlign = align && align.left != null ? align.left : 0.5;
  let topAlign = align && align.top != null ? align.top : 0.5;
  let leftOffset = align && align.leftOffset != null ? align.leftOffset : 0;
  let topOffset = align && align.topOffset != null ? align.topOffset : 0;
  let leftScalar = leftAlign;
  let topScalar = topAlign;

  if (defaultIsWindow(parent)) {
    targetWidth = Math.min(targetPosition.width, parent.innerWidth);
    targetHeight = Math.min(targetPosition.height, parent.innerHeight);
    x =
      targetPosition.left +
      parent.pageXOffset -
      parent.innerWidth * leftScalar +
      targetWidth * leftScalar;
    y =
      targetPosition.top +
      parent.pageYOffset -
      parent.innerHeight * topScalar +
      targetHeight * topScalar;
    x -= leftOffset;
    y -= topOffset;
    differenceX = x - parent.pageXOffset;
    differenceY = y - parent.pageYOffset;
  } else {
    targetWidth = targetPosition.width;
    targetHeight = targetPosition.height;
    parentPosition = parent.getBoundingClientRect();
    let offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft);
    let offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop);
    x = offsetLeft + targetWidth * leftScalar - parent.clientWidth * leftScalar;
    y = offsetTop + targetHeight * topScalar - parent.clientHeight * topScalar;
    x -= leftOffset;
    y -= topOffset;
    x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
    y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
    differenceX = x - parent.scrollLeft;
    differenceY = y - parent.scrollTop;
  }

  return {
    x: x,
    y: y,
    differenceX: differenceX,
    differenceY: differenceY,
  };
}

function animate(parent: any): any {
  let scrollSettings = parent._scrollSettings;

  if (!scrollSettings) {
    return;
  }

  let maxSynchronousAlignments = scrollSettings.maxSynchronousAlignments;

  let location = getTargetScrollLocation(scrollSettings, parent);
  let time = Date.now() - scrollSettings.startTime;
  let timeValue = Math.min((1 / scrollSettings.time) * time, 1);

  if (scrollSettings.endIterations >= maxSynchronousAlignments) {
    setElementScroll(parent, location.x, location.y);
    parent._scrollSettings = null;
    return scrollSettings.end(COMPLETE);
  }

  let easeValue = 1 - scrollSettings.ease(timeValue);

  setElementScroll(
    parent,
    location.x - location.differenceX * easeValue,
    location.y - location.differenceY * easeValue,
  );

  if (time >= scrollSettings.time) {
    scrollSettings.endIterations++;
    return animate(parent);
  }

  raf(animate.bind(null, parent));
}

function transitionScrollTo(target: any, parent: any, settings: any, callback: any) {
  let idle = !parent._scrollSettings;
  let lastSettings = parent._scrollSettings;
  let now = Date.now();
  let cancelHandler: Function | undefined;
  let passiveOptions = { passive: true };

  if (lastSettings) {
    lastSettings.end(CANCELED);
  }

  function end(endType: IEndType) {
    parent._scrollSettings = null;

    if (parent.parentElement && parent.parentElement._scrollSettings) {
      parent.parentElement._scrollSettings.end(endType);
    }

    callback(endType);
    if (cancelHandler) {
      parent.removeEventListener('touchstart', cancelHandler, passiveOptions);
      parent.removeEventListener('wheel', cancelHandler, passiveOptions);
    }
  }

  let maxSynchronousAlignments = settings.maxSynchronousAlignments;

  if (maxSynchronousAlignments == null) {
    maxSynchronousAlignments = 3;
  }

  parent._scrollSettings = {
    startTime: now,
    endIterations: 0,
    target: target,
    time: settings.time,
    ease: settings.ease,
    align: settings.align,
    maxSynchronousAlignments: maxSynchronousAlignments,
    end: end,
  };

  if (!('cancellable' in settings) || settings.cancellable) {
    cancelHandler = end.bind(null, CANCELED);
    parent.addEventListener('touchstart', cancelHandler, passiveOptions);
    parent.addEventListener('wheel', cancelHandler, passiveOptions);
  }

  if (idle) {
    animate(parent);
  }
}

function directScrollTo(target: any, parent: any, settings: any, callback: any) {
  const scrollSettings = {
    target: target,
    ease: settings.ease,
    align: settings.align,
  };

  let location = getTargetScrollLocation(scrollSettings, parent);

  setElementScroll(parent, location.x, location.y);
  callback && callback(COMPLETE);
}

function innerScrollTo(target: any, parent: any, settings: IScrollIntoViewSettings, callback: any) {
  if (settings.behavior === 'auto') {
    directScrollTo(target, parent, settings, callback);
  } else {
    transitionScrollTo(target, parent, settings, callback);
  }
}

function findParentElement(el: any): any {
  if (el.assignedSlot) {
    return findParentElement(el.assignedSlot);
  }

  if (el.parentElement) {
    if (el.parentElement.tagName === 'BODY') {
      return (
        el.parentElement.ownerDocument.defaultView || el.parentElement.ownerDocument.ownerWindow
      );
    }
    return el.parentElement;
  }

  if (el.getRootNode) {
    let parent = el.getRootNode();
    if (parent.nodeType === 11) {
      return parent.host;
    }
  }
}

const defaultSettings: IScrollIntoViewSettings = {
  time: 500,
  ease: (v: number) => 1 - Math.pow(1 - v, v / 2),
  validTarget: () => true,
  behavior: 'smooth',
  isScrollable: (element: HTMLElement) => {
    return (
      'pageXOffset' in element ||
      ((element.scrollHeight !== element.clientHeight ||
        element.scrollWidth !== element.clientWidth) &&
        getComputedStyle(element).overflow !== 'hidden')
    );
  },
};

export default function scrollIntoView(
  target: HTMLElement,
  settings?: Partial<IScrollIntoViewSettings>,
  cb?: (endType: IEndType) => void,
) {
  const innerSettings: IScrollIntoViewSettings = {
    ...defaultSettings,
    ...settings,
  };

  let parents = 0;
  const done = (endType: IEndType) => {
    parents--;
    if (!parents) {
      cb && cb(endType);
    }
  };
  const {
    validTarget,
    isScrollable,
    onlyFirstScrollableParent = false,
    parentNode,
  } = innerSettings;

  const findFirstScrollableParent: (targetNode: any) => any = (targetNode: any) => {
    const innerParent = findParentElement(targetNode);
    if (!innerParent) {
      return;
    }
    if (isScrollable(innerParent)) {
      return innerParent;
    }
    return findFirstScrollableParent(innerParent);
  };

  if (parentNode) {
    parents++;
    innerScrollTo(target, parentNode, innerSettings, done);
    return;
  }

  let parent = findFirstScrollableParent(target);
  if (onlyFirstScrollableParent && parent && validTarget(parent, parents)) {
    parents++;
    innerScrollTo(target, parent, innerSettings, done);
    return;
  }
  while (parent) {
    if (validTarget(parent, parents)) {
      parents++;
      innerScrollTo(target, parent, innerSettings, done);
    }

    parent = findFirstScrollableParent(parent);

    if (!parent) {
      break;
    }
  }
}
