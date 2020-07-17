import { Children, useContext, useEffect, useMemo, useRef, useState } from 'react';
import warning from 'warning';

import ImgPoolContext from '../Img/ImgPoolContext';
import useTheme from '../utils/useTheme';
import { ISwipeBaseHookArgs, ISwipeBaseHookState, ISwipeCloneResult } from './innerTypes';
import {
  calculateCloneNum,
  calculateSize,
  cloneChildren,
  getChildStyle,
  rectSizeEqual,
  transformItems,
} from './utils';

export default function useBaseSwipe({
  containerRef,
  direction = 'horizontal',
  equalNum,
  children,
  gutter,
  duration,
  loop = false,
  enableDiffChildren = false,
  onRectChange,
}: ISwipeBaseHookArgs) {
  const propsState: ISwipeBaseHookState = {
    status: 'init',
    children,
    cloneNum: 0,
    equalNum,
    gutter,
    direction,
  };
  const theme = useTheme();
  const finalDuration = duration || theme.transition.spec.duration.slow;
  const [state, setState] = useState<ISwipeBaseHookState>(propsState);
  if (
    state.equalNum !== equalNum ||
    state.gutter !== gutter ||
    state.direction !== direction ||
    Children.count(state.children) !== Children.count(children) ||
    /**
     * 没有默认打开是因为
     * <Swipe>
     *   <div>1</div>
     *   <div>2</div>
     * </Swipe>
     * 这种，其实 children 是变了
     */
    (state.children !== children && enableDiffChildren)
  ) {
    setState(propsState);
  }
  const mergeState = (newState: Partial<ISwipeBaseHookState>) => {
    setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  };
  const isH = state.direction === 'horizontal';
  const childNum = Children.count(children);
  const innerChildren = enableDiffChildren ? state.children : children;
  const { nodes, refs, cloneRefs } = useMemo<ISwipeCloneResult>(() => {
    if (state.status === 'init' || !state.containerRect) {
      return {
        nodes: state.children,
        refs: [],
        cloneRefs: [],
      };
    }

    const childStyle = getChildStyle(isH, state.containerRect, state.equalNum, state.gutter);
    return cloneChildren(innerChildren, childStyle, state.cloneNum);
  }, [
    state.status,
    state.containerRect,
    state.equalNum,
    state.gutter,
    state.cloneNum,
    state.children,
    isH,
    innerChildren,
  ]);

  const uiChange = useRef(true);
  const updateContainer = (newContainerRect: ClientRect) => {
    uiChange.current = true;
    if (loop && !state.equalNum) {
      mergeState({
        status: 'clone_init',
        cloneNum: 0,
        containerRect: newContainerRect,
      });
      return;
    }
    let cloneNum = 0;
    if (loop && state.equalNum && childNum > state.equalNum) {
      cloneNum = state.equalNum * 3;
    }
    mergeState({
      status: 'done',
      cloneNum: cloneNum,
      containerRect: newContainerRect,
    });
  };
  const initClone = () => {
    const itemRects = transformItems(refs);
    const containerSize = isH ? state.containerRect!.width : state.containerRect!.height;
    const panelSize = calculateSize(itemRects, isH);
    let cloneNum = 0;
    // 要能循环要 clone 3倍容器长度的节点来保证往前往后都能移动
    const threeContainerSize = 3 * containerSize;
    if (panelSize < threeContainerSize) {
      const times = Math.floor(threeContainerSize / panelSize);
      // 先计算要 clone 所有的节点多少倍
      const baseCloneNum = times * itemRects.length;
      const remainSize = threeContainerSize - panelSize * times;
      const remainCloneNum = calculateCloneNum(itemRects, isH, remainSize)!;
      cloneNum = baseCloneNum + remainCloneNum;
    } else {
      cloneNum = calculateCloneNum(itemRects, isH, threeContainerSize)!;
    }
    mergeState({
      status: 'done',
      cloneNum: cloneNum,
      containerRect: state.containerRect,
    });
  };
  const initContainer = () => {
    let newContainerRect;
    if (containerRef.current) {
      newContainerRect = containerRef.current.getBoundingClientRect();
    }
    if (!newContainerRect) {
      warning(false, '[Swipe]: get container fail.');
      return;
    }
    updateContainer(newContainerRect);
  };

  const imgPool = useContext(ImgPoolContext);
  const shouldUpdateContainer = async () => {
    let stateContainerRect = state.containerRect;
    let newContainerRect;
    if (containerRef.current) {
      newContainerRect = containerRef.current.getBoundingClientRect();
    }
    if (!newContainerRect) {
      warning(false, '[Swipe]: get container fail when window is resized.');
      return;
    }
    if (rectSizeEqual(stateContainerRect, newContainerRect)) {
      return;
    }
    updateContainer(newContainerRect);
  };
  useEffect(() => {
    if (state.status === 'init') {
      initContainer();
    } else if (state.status === 'clone_init') {
      initClone();
    } else if (state.status === 'done' && uiChange.current) {
      uiChange.current = false;
      const itemRects = transformItems(refs);
      const cloneItemRects = transformItems(cloneRefs);
      onRectChange(itemRects, state.containerRect!, cloneItemRects);
    }
    imgPool.resizeCheckFns.add(shouldUpdateContainer);
    return () => {
      imgPool.resizeCheckFns.delete(shouldUpdateContainer);
    };
  });
  return {
    finalDuration,
    state,
    shouldUpdateContainer,
    nodes,
  };
}
