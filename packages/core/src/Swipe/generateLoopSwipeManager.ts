import { ILoopSwipeManager } from './types';

export function getItemOffsets(
  items: ClientRect[],
  prevKey: 'left' | 'top',
  panelStartPoint: number,
) {
  return items.map(item => {
    const itemPrev = item[prevKey];
    const offset = itemPrev - panelStartPoint;
    return offset;
  });
}

/**
 * 根据第一页所在的位置计算出所有在面板可能出现的位置
 * @param firstOffset 第一页所在的 offset ，注意这个第一页指 clone 的第一个节点所在的位置
 * @param pageSize 注意这个 page size 指容器的宽度或者长度
 */
export function calcStepsByPageOneInCloneItems(firstOffset: number, pageSize: number) {
  const steps: number[] = [firstOffset, firstOffset + pageSize];
  let i = 1;
  let offset = firstOffset - pageSize * i;
  while (offset >= 0) {
    steps.unshift(offset);
    i++;
    offset = firstOffset - pageSize * i;
  }
  return steps;
}

/**
 * 根据offset找到数组中的 index
 * @param offset
 * @param offsets 一定是正数数组，并是从小到大排列的，由 calcStepsByPageOneInCloneItems 产生
 */
export function findIndexByOffset(offset: number, offsets: number[]) {
  for (let l = offsets.length, i = l - 1; i >= 0; i--) {
    const currentOffset = offsets[i];
    if (currentOffset <= offset) {
      return i;
    }
  }
  return 0;
}

export function findFirstItemIndexInPageTwo(itemOffsets: number[], containerSize: number) {
  for (let i = 0, l = itemOffsets.length; i < l; i++) {
    const offset = itemOffsets[i];
    if (offset > containerSize) {
      return i;
    }
  }
  return 0;
}

interface IInnerMethods {
  readonly pageOffsets: number[];
  readonly itemOffsets: number[];
  getCurrentIndexByRealIndex(inputIndex: number): number;
  getRealIndexByCurrentIndex(inputIndex: number): number;
  getCurrentItemIndexByRealItemIndex(inputIndex: number): number;
  getRealItemIndexByCurrentItemIndex(inputIndex: number): number;
}

interface ILoopSwipeManagerArgs {
  items: ClientRect[];
  cloneItemRects: ClientRect[];
  containerSize: number; // 宽或高
  direction: 'horizontal' | 'vertical';
  gutter: number;
  stepIndex: number;
  itemIndex: number;
  defaultIndex: number;
}

export function generateDisabledLoopSwipeManager(): ILoopSwipeManager {
  return {
    get index() {
      return 0;
    },
    get itemIndex() {
      return 0;
    },
    get realItemIndex() {
      return 0;
    },
    get size() {
      return 0;
    },
    get itemSize() {
      return 0;
    },
    get realItemSize() {
      return 0;
    },
    get offset() {
      return 0;
    },
    get direction() {
      return 'horizontal' as 'horizontal';
    },
    get locked() {
      return true;
    },
    lock() {},
    unlock() {},
    prevItem() {},
    nextItem() {},
    goToItem() {},
    next() {},
    prev() {},
    goTo() {},
    hasStep() {
      return false;
    },
    hasItem() {
      return false;
    },
    getStepOffset() {
      return 0;
    },
    getItemOffset() {
      return 0;
    },
    updateOffset() {},
  };
}

export default function generateLoopSwipeManager(
  args: ILoopSwipeManagerArgs,
): ILoopSwipeManager & IInnerMethods {
  const {
    items,
    cloneItemRects,
    containerSize, // 宽或高
    direction,
    gutter: innerGutter,
    stepIndex,
    itemIndex,
    defaultIndex = 0,
  } = args;
  const isH = direction === 'horizontal';
  const prevKey = isH ? 'left' : 'top';
  const panelStartPoint = items[0][prevKey];
  const itemOffsets = getItemOffsets(items, prevKey, panelStartPoint);
  const cloneItemOffsets = getItemOffsets(cloneItemRects, prevKey, panelStartPoint);
  // 公共的状态
  let currentOffset = 0;
  let locked = false;

  const stepContainerSize = containerSize + innerGutter;

  // item 的状态
  const itemSize = items.length;
  let currentItemIndex = itemIndex > 0 ? itemIndex : defaultIndex;
  let realItemIndex = currentItemIndex;
  let prevRealItemIndex = currentItemIndex;
  const cloneFirstOffset = cloneItemOffsets[0];
  const realItemOffsets = [...itemOffsets, ...cloneItemOffsets];
  const getCurrentItemIndexByRealItemIndex = (inputIndex: number) => {
    if (inputIndex >= itemOffsets.length) {
      return inputIndex - itemOffsets.length;
    }
    return inputIndex;
  };
  const getRealItemIndexByCurrentItemIndex = (inputIndex: number) => {
    if (inputIndex > 1) {
      return inputIndex;
    }
    const indexA = inputIndex;
    const indexB = inputIndex + itemSize;
    const prevOffset = realItemOffsets[prevRealItemIndex];
    const offsetA = realItemOffsets[indexA];
    const offsetB = realItemOffsets[indexB];

    if (Math.abs(offsetA - prevOffset) < Math.abs(offsetB - prevOffset)) {
      return indexA;
    }
    return indexB;
  };
  if (currentItemIndex && currentItemIndex >= 1) {
    realItemIndex = currentItemIndex;
  } else if (currentItemIndex === 0) {
    realItemIndex = itemSize;
  }
  currentItemIndex = getCurrentItemIndexByRealItemIndex(realItemIndex);
  prevRealItemIndex = realItemIndex;

  const checkLockedByCurrentItemIndex = (inputIndex: number) => {
    const innerRealItemIndex = getRealItemIndexByCurrentItemIndex(inputIndex);
    if (innerRealItemIndex <= 0) {
      locked = true;
    } else if (innerRealItemIndex > itemSize) {
      locked = true;
    }
  };

  // 因为循环的原因，第一页所在的位置实际是会变更的
  let currentIndex = 0;
  let realIndex = currentIndex;
  let prevRealIndex = 0;
  let pageOffsets = calcStepsByPageOneInCloneItems(cloneFirstOffset, stepContainerSize);
  let stepSize = pageOffsets.length - 2;
  if (itemOffsets[defaultIndex] < stepContainerSize) {
    currentOffset = cloneItemOffsets[defaultIndex];
  } else {
    currentOffset = itemOffsets[defaultIndex];
  }
  const getCurrentIndexByRealIndex = (inputIndex: number) => {
    if (inputIndex >= stepSize) {
      return inputIndex - stepSize;
    }
    return inputIndex;
  };
  const getRealIndexByCurrentIndex = (inputIndex: number) => {
    if (inputIndex > 1) {
      return inputIndex;
    }
    const indexA = inputIndex;
    const indexB = inputIndex + stepSize;
    const prevOffset = pageOffsets[prevRealIndex];
    const offsetA = pageOffsets[indexA];
    const offsetB = pageOffsets[indexB];

    if (Math.abs(offsetA - prevOffset) < Math.abs(offsetB - prevOffset)) {
      return indexA;
    }
    return indexB;
  };
  realIndex =
    stepIndex && stepIndex > 0 ? stepIndex : findIndexByOffset(currentOffset, pageOffsets);
  currentIndex = getCurrentIndexByRealIndex(realIndex);
  prevRealIndex = realIndex;

  const checkLockedByCurrentIndex = (inputIndex: number) => {
    const innerRealIndex = getRealIndexByCurrentIndex(inputIndex);
    if (innerRealIndex === 0 || innerRealIndex === pageOffsets.length - 1) {
      locked = true;
    }
  };

  return {
    get index() {
      return currentIndex;
    },
    get itemIndex() {
      return currentItemIndex;
    },
    get realItemIndex() {
      return currentItemIndex;
    },
    get size() {
      return stepSize;
    },
    get itemSize() {
      return itemSize;
    },
    get realItemSize() {
      return itemSize;
    },
    get offset() {
      return currentOffset;
    },
    get direction() {
      return direction;
    },
    get locked() {
      return locked;
    },
    get pageOffsets() {
      return pageOffsets;
    },
    get itemOffsets() {
      return realItemOffsets;
    },
    getCurrentIndexByRealIndex,
    getRealIndexByCurrentIndex,
    getCurrentItemIndexByRealItemIndex,
    getRealItemIndexByCurrentItemIndex,
    lock() {
      locked = true;
    },
    unlock() {
      locked = false;
      const innerRealIndex = getRealIndexByCurrentIndex(currentIndex);
      if (innerRealIndex === 0) {
        const firstPageOffset = pageOffsets[0] + cloneFirstOffset;
        pageOffsets = calcStepsByPageOneInCloneItems(firstPageOffset, stepContainerSize);
        stepSize = pageOffsets.length - 2;
        prevRealIndex = stepSize;
      } else if (innerRealIndex === pageOffsets.length - 1) {
        const baseOffset =
          pageOffsets[pageOffsets.length - 1] - cloneFirstOffset - stepContainerSize;
        const remainOffset = (cloneFirstOffset - baseOffset) % stepContainerSize;
        const firstPageOffset = remainOffset > 0 ? stepContainerSize - remainOffset : 0;
        const firstPageOffsetInCloneRegion = firstPageOffset + cloneFirstOffset;
        pageOffsets = calcStepsByPageOneInCloneItems(
          firstPageOffsetInCloneRegion,
          stepContainerSize,
        );
        stepSize = pageOffsets.length - 2;
        prevRealIndex = 1;
      }

      const innerRealItemIndex = getRealItemIndexByCurrentItemIndex(currentItemIndex);
      if (innerRealItemIndex === 0) {
        prevRealItemIndex = itemSize;
      } else if (innerRealItemIndex >= itemSize) {
        prevRealItemIndex = innerRealItemIndex - itemSize;
      }
    },
    prevItem() {
      if (locked) return;
      prevRealItemIndex = getRealItemIndexByCurrentItemIndex(currentItemIndex);
      currentItemIndex = currentItemIndex - 1;
      if (currentItemIndex < 0) {
        currentItemIndex = itemOffsets.length - 1;
      }
      checkLockedByCurrentItemIndex(currentItemIndex);
    },
    nextItem() {
      if (locked) return;
      prevRealItemIndex = getRealItemIndexByCurrentItemIndex(currentItemIndex);
      currentItemIndex = currentItemIndex + 1;
      if (currentItemIndex >= itemOffsets.length) {
        currentItemIndex = 0;
      }
      checkLockedByCurrentItemIndex(currentItemIndex);
    },
    goToItem(itemIndex) {
      if (locked) return;
      if (this.hasItem(itemIndex)) {
        prevRealItemIndex = getRealItemIndexByCurrentItemIndex(currentItemIndex);
        currentItemIndex = itemIndex;
        checkLockedByCurrentItemIndex(itemIndex);
      }
    },
    next() {
      if (locked) return;
      prevRealIndex = getRealIndexByCurrentIndex(currentIndex);
      currentIndex = currentIndex + 1;
      if (currentIndex >= stepSize) {
        currentIndex = 0;
      }
      checkLockedByCurrentIndex(currentIndex);
    },
    prev() {
      if (locked) return;
      prevRealIndex = getRealIndexByCurrentIndex(currentIndex);
      currentIndex = currentIndex - 1;
      if (currentIndex < 0) {
        currentIndex = stepSize - 1;
      }
      checkLockedByCurrentIndex(currentIndex);
    },
    goTo(stepIndex) {
      if (locked) return;
      if (this.hasStep(stepIndex)) {
        prevRealIndex = getRealIndexByCurrentIndex(currentIndex);
        currentIndex = stepIndex;
        checkLockedByCurrentIndex(currentIndex);
      }
    },
    hasStep(stepIndex) {
      return stepIndex >= 0 && stepIndex < pageOffsets.length;
    },
    hasItem(itemIndex) {
      return itemIndex >= 0 && itemIndex < itemSize;
    },
    getStepOffset(stepIndex) {
      const newRealIndex = getRealIndexByCurrentIndex(stepIndex);
      prevRealIndex = newRealIndex;
      currentIndex = stepIndex;
      checkLockedByCurrentIndex(stepIndex);
      currentOffset = pageOffsets[newRealIndex];
      return currentOffset;
    },
    getItemOffset(inputItemIndex) {
      const newRealItemIndex = getRealItemIndexByCurrentItemIndex(inputItemIndex);
      currentItemIndex = inputItemIndex;
      prevRealItemIndex = newRealItemIndex;
      checkLockedByCurrentItemIndex(currentItemIndex);
      currentOffset = realItemOffsets[newRealItemIndex];
      return currentOffset;
    },
    updateOffset(offset: number) {
      currentOffset = offset;
    },
  };
}
