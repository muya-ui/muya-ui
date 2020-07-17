import { useContext, useEffect, useRef, useState } from 'react';
import { shallowEqualObjects } from 'shallow-equal';

import { useMountedRef, wait as utilsWait } from '@muya-ui/utils';

import ImgPoolContext from './ImgPoolContext';
import { IImgHookArgs } from './innerTypes';
import { IImgEvent, IImgLoadStatus, IImgPool } from './types';

type IDiff = Pick<IImgHookArgs, 'suffixs' | 'options' | 'src'>;
export default function useImg(args: IImgHookArgs, pool?: IImgPool) {
  const {
    src,
    imgRef,
    onLoaded,
    onError,
    options: innerOpts,
    suffixs: innerSuffixs,
    loadingDelay,
  } = args;

  const imgPool = useContext(ImgPoolContext);
  const innerPool = pool || imgPool;

  const poolOpts = innerPool.settings.options;
  const innerResize = innerOpts.resize || poolOpts.resize;

  // 状态部分
  const [imgState, setImgState] = useState<IImgEvent>({
    imgSrc: '',
    originSrc: '',
    loadStatus: 'none',
  });

  const lastProps = useRef<IDiff>();
  const mounted = useMountedRef();
  // 当图片已经加载过
  if (lastProps.current && imgState.loadStatus !== 'none') {
    const lastP = lastProps.current;
    // 同时属性发生了变化
    // 再次执行加载逻辑
    if (
      lastP.src !== src ||
      !shallowEqualObjects(innerSuffixs, lastP.suffixs) ||
      !shallowEqualObjects(innerOpts, lastP.options)
    ) {
      setImgState({
        ...imgState,
        loadStatus: 'none',
      });
    }
  }

  function setState(state: IImgEvent) {
    if (!mounted.current) {
      return;
    }
    setImgState(state);
    lastProps.current = {
      src,
      suffixs: innerSuffixs,
      options: innerOpts,
    };
    if (onLoaded && state.loadStatus === 'loaded') {
      onLoaded(state);
      innerPool.emit('img_loaded', state);
    } else if (onError) {
      onError(state);
      innerPool.emit('img_error', state);
    }
  }

  function rectIntersect() {
    if (imgRef.current) {
      return innerPool.rectIntersect(imgRef.current);
    }
    const fakeRect: ClientRect = { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    return { intersect: false, rect: fakeRect };
  }

  const poolReadyPromise = useRef<Promise<void>>();
  const destroyPoolReady = useRef<() => void>(() => {});
  function waitPoolReady() {
    if (innerPool.poolStatus === 'ready') {
      return Promise.resolve();
    }

    if (poolReadyPromise.current) {
      return poolReadyPromise.current;
    }

    poolReadyPromise.current = new Promise(resolve => {
      innerPool.once('pool_ready', resolve);
      destroyPoolReady.current = () => {
        innerPool.removeListener('pool_ready', resolve);
      };
    });

    return poolReadyPromise.current;
  }

  /**
   * 加载图片
   * @param rect
   */
  async function loadImg(rect: ClientRect) {
    await waitPoolReady();
    if (!src) {
      setState({
        originSrc: '',
        loadStatus: 'blank',
        imgSrc: '',
      });
      return;
    }
    const suffixs = innerPool.getSuffixs(innerSuffixs, rect);
    const innerWait = innerOpts.wait || poolOpts.wait;
    const { clean, oss, suffix } = innerOpts;
    let innerImgSrc = innerPool.getImgSrc(src, suffixs, { clean, oss, suffix });
    let loadStatus: IImgLoadStatus = 'loaded';
    let imgInstance;
    if (loadingDelay && loadingDelay > 0) {
      await utilsWait.time(loadingDelay);
    }
    if (innerWait === 'on') {
      try {
        imgInstance = await utilsWait.imgLoaded(innerImgSrc);
      } catch (error) {
        loadStatus = 'error';
      }
    }

    setState({
      originSrc: src,
      loadStatus,
      imgSrc: innerImgSrc,
      rect,
      imgInstance,
    });
  }

  function removeCheckFns() {
    innerPool.scrollCheckFns.delete(scrollCheckFn);
    innerPool.resizeCheckFns.delete(resizeCheckFn);
    destroyPoolReady.current();
  }

  /**
   * 当容器滚动时，检测图片是否需要加载
   */
  async function scrollCheckFn() {
    const { rect, intersect } = rectIntersect();
    if (intersect) {
      removeCheckFns();
      await loadImg(rect);
    }
  }

  /**
   * 当容器缩放时，检测图片是否需要加载
   */
  async function resizeCheckFn() {
    const { rect, intersect } = rectIntersect();
    const { loadStatus } = imgState;

    if (intersect && loadStatus === 'none') {
      removeCheckFns();
      await loadImg(rect);
      return;
    }
    if (loadStatus !== 'loaded') {
      return;
    }

    // 矩形区域是否发生了变更
    const lastRect = imgState.rect;
    const rectChanged =
      lastRect && (rect.width !== lastRect.width || rect.height !== lastRect.height);

    // 得利于 innerPool 一个组件的实例是无法在一次 resize 的检测结束，再就进入下一次检测的
    // 所以这里是不会出现并行两次的情况的
    if (intersect && rectChanged) {
      await loadImg(rect);
    }
    // 不是检测区域内，放到滚动检测，进行滚动检测
    else if (rectChanged) {
      innerPool.scrollCheckFns.add(scrollCheckFn);
    }
  }

  function loadImgDirectly() {
    if (imgRef.current) {
      loadImg(innerPool.getRect(imgRef.current));
    }
  }

  async function checkLoadImg() {
    await waitPoolReady();
    // await utilsWait.time(10000);
    // 关闭了 lazy 则变更就加载
    const innerLazy = innerOpts.lazy || poolOpts.lazy;

    if (innerLazy === 'off') {
      // 中间有几次会触发 unMount
      loadImgDirectly();
      return;
    }
    const { rect, intersect } = rectIntersect();
    if (intersect) {
      loadImg(rect);
      return;
    }
    innerPool.scrollCheckFns.add(scrollCheckFn);
    innerPool.resizeCheckFns.add(resizeCheckFn);
  }

  useEffect(() => {
    if (imgState.loadStatus === 'none') {
      checkLoadImg();
    }
    if (innerResize === 'on') {
      innerPool.resizeCheckFns.add(resizeCheckFn);
    }
    return removeCheckFns;
  });

  return {
    imgPool: innerPool,
    imgState,
    setImgState,
    loadImg,
    scrollCheckFn,
    resizeCheckFn,
    checkLoadImg,
    waitPoolReady,
  };
}
