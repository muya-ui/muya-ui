import { ISwipeManager } from './types';

function getStepsArr(
  items: ClientRect[],
  containerSize: number,
  isH: boolean,
  defaultIndex: number = 0,
) {
  const itemSteps: number[] = [];
  const positionSteps: number[] = [];
  const reverseSteps: number[] = [];
  const prevKey = isH ? 'left' : 'top';
  const nextKey = isH ? 'right' : 'bottom';

  const panelStartPoint = items[0][prevKey];
  const panelEndPoint = items[items.length - 1][nextKey];
  let baseline = panelStartPoint + containerSize;
  const panelSize = panelEndPoint - panelStartPoint;
  let defaultStepIndex = 0;

  positionSteps.push(0);
  if (panelSize < containerSize) {
    return { itemSteps, positionSteps, reverseSteps, defaultStepIndex };
  }

  for (let i = 0, l = items.length; i < l; i++) {
    const item = items[i];
    const itemNext = item[nextKey];
    const itemPrev = item[prevKey];
    if (itemNext > baseline) {
      baseline = itemPrev + containerSize;
      const offset = itemPrev - panelStartPoint;
      positionSteps.push(offset);
    }
    if (i === defaultIndex) {
      defaultStepIndex = positionSteps.length - 1;
    }
    itemSteps.push(positionSteps.length - 1);
  }

  const lastPageSize = panelEndPoint - (positionSteps[positionSteps.length - 1] + panelStartPoint);
  if (lastPageSize < containerSize) {
    positionSteps.pop();
    const lastPositionOffset = panelEndPoint - panelStartPoint - containerSize;
    positionSteps.push(lastPositionOffset);
    baseline = panelEndPoint - containerSize;
    reverseSteps.push(lastPositionOffset);
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      const itemNext = item[nextKey];
      const itemPrev = item[prevKey];
      if (itemPrev < baseline) {
        baseline = itemNext - containerSize;
        const offset = itemNext - panelStartPoint - containerSize;
        reverseSteps.push(offset);
      }
    }
    reverseSteps.pop();
    reverseSteps.push(0);
    reverseSteps.sort((a, b) => a - b);
  }
  return { itemSteps, positionSteps, reverseSteps, defaultStepIndex };
}

export function getItemOffsets(items: ClientRect[], lastPageOffset: number, isH: boolean) {
  const prevKey = isH ? 'left' : 'top';
  const panelStartPoint = items[0][prevKey];
  const offsets: number[] = [];

  let hasLast = true;
  items.forEach(item => {
    const itemPrev = item[prevKey];
    const offset = itemPrev - panelStartPoint;
    if (offset <= lastPageOffset) {
      offsets.push(offset);
      if (offset === lastPageOffset) {
        hasLast = false;
      }
    }
  });
  if (hasLast) {
    offsets.push(lastPageOffset);
  }

  return offsets;
}

interface ISwipeManagerArgs {
  items: ClientRect[];
  containerSize: number; // 宽或高
  direction: 'horizontal' | 'vertical';
  stepIndex: number;
  itemIndex: number;
  defaultIndex?: number;
}

export function generateDisabledSwipeManager(): ISwipeManager {
  return {
    get index() {
      return 0;
    },
    get itemIndex() {
      return 0;
    },
    get hasNext() {
      return false;
    },
    get hasPrev() {
      return false;
    },
    get hasNextItem() {
      return false;
    },
    get hasPrevItem() {
      return false;
    },
    get size() {
      return 0;
    },
    get itemSize() {
      return 0;
    },
    get offset() {
      return 0;
    },
    get maxOffset() {
      return 0;
    },
    get direction() {
      return 'horizontal' as 'horizontal';
    },
    prevItem() {},
    nextItem() {},
    goToItem() {},
    next() {},
    prev() {},
    goTo() {},
    hasItem() {
      return false;
    },
    hasStep() {
      return false;
    },
    getItemOffset() {
      return 0;
    },
    getItemStep() {
      return 0;
    },
    getStepOffset() {
      return 0;
    },
    updateOffset() {},
  };
}

export default function generateSwipeManager(args: ISwipeManagerArgs): ISwipeManager {
  const { items, containerSize, direction, stepIndex, itemIndex, defaultIndex = 0 } = args;
  const isH = direction === 'horizontal';
  let steps: number[];
  const { itemSteps, positionSteps, reverseSteps, defaultStepIndex } = getStepsArr(
    items,
    containerSize,
    isH,
    defaultIndex,
  );
  const itemOffsets = getItemOffsets(items, positionSteps[positionSteps.length - 1], isH);
  // 公共的状态
  let currentOffset = 0;
  let maxOffset = 0;

  // step 的状态
  steps = positionSteps;
  let currentIndex = stepIndex >= 0 ? stepIndex : defaultStepIndex;
  maxOffset = steps[steps.length - 1];
  let nextIndex = currentIndex + 1;
  let prevIndex = currentIndex - 1;

  // item 的状态
  let currentItemIndex = itemIndex >= 0 ? itemIndex : defaultIndex;
  let prevItemIndex = currentItemIndex - 1;
  let nextItemIndex = currentItemIndex + 1;

  const refreshItemIndex = () => {
    for (let i = 0, l = itemOffsets.length; i < l; i++) {
      const itemOffset = itemOffsets[i];
      if (itemOffset === currentOffset) {
        currentItemIndex = i;
        nextItemIndex = currentItemIndex! + 1;
        prevItemIndex = currentItemIndex! - 1;

        break;
      } else if (itemOffset > currentOffset) {
        nextItemIndex = i;
        prevItemIndex = nextItemIndex - 1;
        currentItemIndex = i;
        break;
      }
    }
  };

  const refreshStepIndex = () => {
    for (let i = 0, l = steps.length; i < l; i++) {
      const stepOffset = steps[i];
      if (stepOffset === currentOffset) {
        currentIndex = i;
        nextIndex = currentIndex + 1;
        prevIndex = currentIndex - 1;
        break;
      } else if (stepOffset > currentOffset) {
        nextIndex = i;
        prevIndex = nextIndex - 1;
        currentIndex = i;
        break;
      }
    }
  };

  const updateSteps = () => {
    if (reverseSteps.length && currentIndex === steps.length - 1) {
      steps = reverseSteps;
    } else if (reverseSteps.length && currentIndex <= 0) {
      steps = positionSteps;
    }
    prevIndex = currentIndex - 1;
    nextIndex = currentIndex + 1;
    currentOffset = steps[currentIndex];
    refreshItemIndex();
  };

  const updateItems = () => {
    prevItemIndex = currentItemIndex - 1;
    nextItemIndex = currentItemIndex + 1;
    currentOffset = itemOffsets[currentItemIndex];
    refreshStepIndex();
  };

  updateSteps();
  return {
    get index() {
      return currentIndex;
    },
    get itemIndex() {
      return currentItemIndex;
    },
    get hasNext() {
      return steps[nextIndex] !== undefined;
    },
    get hasPrev() {
      return steps[prevIndex] !== undefined;
    },
    get hasNextItem() {
      return itemOffsets[nextItemIndex] !== undefined;
    },
    get hasPrevItem() {
      return itemOffsets[prevItemIndex] !== undefined;
    },
    get size() {
      return steps.length;
    },
    get itemSize() {
      return itemOffsets.length;
    },
    get offset() {
      return currentOffset;
    },
    get maxOffset() {
      return maxOffset;
    },
    get direction() {
      return direction;
    },
    prevItem() {
      if (!this.hasPrevItem) {
        return;
      }
      currentItemIndex = prevItemIndex;
      updateItems();
    },
    nextItem() {
      if (!this.hasNextItem) {
        return;
      }
      currentItemIndex = nextItemIndex;
      updateItems();
    },
    goToItem(itemIndex) {
      if (!this.hasItem(itemIndex)) {
        return;
      }
      currentItemIndex = itemIndex;
      updateItems();
    },
    next() {
      if (!this.hasNext) {
        return;
      }
      currentIndex = nextIndex;
      updateSteps();
    },
    prev() {
      if (!this.hasPrev) {
        return;
      }
      currentIndex = prevIndex;
      updateSteps();
    },
    goTo(stepKey) {
      if (!this.hasStep(stepKey)) {
        return;
      }
      currentIndex = stepKey;
      updateSteps();
    },
    hasItem(itemIndex) {
      return itemOffsets[itemIndex] !== undefined;
    },
    hasStep(stepKey) {
      return steps[stepKey] !== undefined;
    },
    getItemOffset(itemIndex) {
      return itemOffsets[itemIndex];
    },
    getItemStep(itemIndex) {
      return itemSteps[itemIndex] || 0;
    },
    getStepOffset(stepKey) {
      return steps[stepKey];
    },

    // 只有在支持滚轮的时候需要处理这个
    updateOffset(offset: number) {
      if (offset > maxOffset || offset < 0) {
        return;
      }
      currentOffset = offset;
      refreshItemIndex();
      refreshStepIndex();
    },
  };
}
