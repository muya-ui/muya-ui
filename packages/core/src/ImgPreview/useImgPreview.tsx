import { RefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { shallowEqualObjects } from 'shallow-equal';
import warning from 'warning';

import { useEventCallback, useMedia } from '@muya-ui/utils';
import { breakpointsUtils, ITheme } from '@muya-ui/theme-light';

import ImgPoolContext from '../Img/ImgPoolContext';
import { IImgEvent, IImgLoadStatus } from '../Img/types';
import useLocale from '../Locale/useLocale';
import { useSwipe } from '../Swipe';
import toast from '../toast';
import addPx from '../utils/addPx';
import { IImgDomSize, IImgDragState, ImgResizeTrigger } from './innerTypes';
import { IImgPreviewProps } from './types';
import { getContainerSize, getValidDefaultIndex } from './utils';

export default function useImgPreview(
  props: IImgPreviewProps,
  theme: ITheme,
  imgScrollWrapperRef: RefObject<HTMLDivElement>,
  imgWrapperRef: RefObject<HTMLDivElement>,
  imgRef: RefObject<HTMLDivElement>,
) {
  const {
    src,
    mode,
    defaultIndex,
    hidePagination,
    overflowResize,
    disableMaskClick,
    scaleStep,
    onClick,
    onClose,
    onExited,
  } = props;
  const {
    breakpoints: {
      spec: { breakpointsMap },
    },
    components: {
      ImgPreview: {
        responsiveWidth: responsiveWidthToken,
        imgWrapper: imgWrapperToken,
        imgPagination: imgPaginationToken,
      },
    },
  } = theme;
  const imgPool = useContext(ImgPoolContext);
  const {
    'ImgPreview.noForwardText': noForwardText,
    'ImgPreview.noBackwardsText': noBackwardsText,
    'ImgPreview.loadingText': loadingText,
    'ImgPreview.loadErrorText': loadErrorText,
    'ImgPreview.zoomInText': zoomInText,
    'ImgPreview.zoomOutText': zoomOutText,
    'ImgPreview.resetZoom': resetZoomText,
  } = useLocale();
  /**
   * 分页器
   */
  const showPagination = mode === 'multiple' && !hidePagination;
  const {
    stepIndex,
    onPrev: toPrevStep,
    onNext: toNextStep,
    hasPrev: hasPrevStep,
    hasNext: hasNextStep,
    onGoTo,
    onStepsChange,
    getItemStep,
  } = useSwipe();

  /**
   * 图片的整体属性
   * imgs: 图片数组
   * imgCount: 图片总数
   */
  const imgs = useMemo(() => (Array.isArray(src) ? src : [src]), [src]);
  const imgCount = imgs.length;

  /**
   * 当前图片的属性
   * imgIndex: 下标
   * originImgRef: 原始的显示尺寸
   * currentImgSrc: 图片地址
   * imgSize: 图片尺寸
   * scale: 图片缩放比
   * imgOverflow: 图片是否超出容器
   * loadState: 图片加载状态
   * dragState: 图片拖拽状态
   */
  const isDefaultIndexControlled = 'defaultIndex' in props;
  const [defaultIndexState, setDefaultIndexState] = useState(
    getValidDefaultIndex(defaultIndex || 0, imgCount),
  );
  const [imgIndex, setImgIndex] = useState(defaultIndexState);
  const currentImgSrc = useMemo(() => {
    if (mode === 'single') {
      if (Array.isArray(src)) {
        return src[0];
      } else {
        return src;
      }
    } else {
      if (Array.isArray(src)) {
        return src[imgIndex];
      } else {
        warning(false, '[ImgPreview]: prop src must be array when mode === multiple');
        return src;
      }
    }
  }, [imgIndex, mode, src]);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const originImgRef = useRef({ width: 0, height: 0 });
  const [scale, setScale] = useState<number>(1);
  const [imgOverflow, setImgOverflow] = useState(false);
  const [loadState, setLoadState] = useState<IImgLoadStatus>('none');
  const imgLoading = loadState !== 'error' && loadState !== 'loaded';
  const imgLoadError = loadState === 'error';
  const imgLoaded = loadState === 'loaded';
  const showPaginationButton = hasPrevStep || hasNextStep;
  const hasPrevImg = imgIndex !== 0;
  const hasNextImg = imgIndex !== imgCount - 1;
  const [dragState, setDragState] = useState<IImgDragState>({
    down: false,
    move: false,
  });
  /**
   * 图片容器的属性
   * containerSize: 图片容器的尺寸
   * occupyHeight: 当前图片外内容在高度上占据的尺寸，用于计算图片容器尺寸和 overflow 状态
   * imgWrapperWidth（响应式规宽度）: 1440 以下，图片宽度固定为 900；1440 以上：图片宽度固定位 1138
   */
  const responsiveMap = useMemo(() => {
    return [
      breakpointsUtils.down(
        {
          breakpointsMap,
        },
        'sm',
      ),
      breakpointsUtils.up(
        {
          breakpointsMap,
        },
        'md',
      ),
    ].map(item => item.replace('@media ', ''));
  }, [breakpointsMap]);
  const imgWrapperWidth = useMedia(responsiveMap, responsiveWidthToken, responsiveWidthToken[0]);
  const [occupyHeight, setOccupyHeight] = useState(
    showPagination
      ? imgWrapperToken.marginTop + imgPaginationToken.height
      : imgWrapperToken.marginTop,
  );
  const [containerSize, setContainerSize] = useState(
    getContainerSize(imgWrapperWidth, occupyHeight),
  );
  /**
   * 滚动的容器：
   * 1. 在不显示图片分页器的情况下，容器为整个屏幕
   * 2. 在显示图片分页器的情况下，容器为一个固定盒子
   */
  const scrollNode = !showPagination ? imgScrollWrapperRef.current! : imgWrapperRef.current!;

  // 图片点击阻止冒泡
  const handleImgClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  const toImgIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < imgCount && index !== imgIndex) {
        setImgIndex(index);
        onGoTo(getItemStep(index));
      }
      if (index < 0) {
        toast.warning(noForwardText);
      }
      if (index >= imgCount) {
        toast.warning(noBackwardsText);
      }
    },
    [getItemStep, imgCount, imgIndex, noBackwardsText, noForwardText, onGoTo],
  );

  /**
   * 图片加载和加载失败事件
   */
  const handleImgLoaded = useEventCallback((e?: IImgEvent) => {
    if (e && e.imgInstance) {
      const {
        imgInstance: { naturalWidth, naturalHeight },
      } = e;
      // 多倍图进行缩放
      const imgScale = Math.max(naturalWidth / imgWrapperWidth, 1);
      originImgRef.current = {
        width: naturalWidth / imgScale,
        height: naturalHeight / imgScale,
      };
      resizeImg(originImgRef.current, containerSize, 1, ImgResizeTrigger.Loaded);
    }
    setLoadState('loaded');
  }, []);

  const handleImgError = useCallback(() => {
    /**
     * 如果是因为数据越界导致的加载失败
     * 1. imgs 数组为空，那么显示加载失败
     * 2. imgs 数组不为空，那么跳转到有效的最后一页
     */
    if (imgIndex >= imgCount && imgCount > 0) {
      toImgIndex(imgCount - 1);
    } else {
      setLoadState('error');
    }
  }, [imgCount, imgIndex, toImgIndex]);

  /**
   * 图片 overflow 支持拖拽滚动查看
   */
  const handleImgMouseDown = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgOverflow || dragState.down || dragState.move) return;
    setDragState({
      x: e.clientX,
      y: e.clientY,
      top: scrollNode.scrollTop,
      left: scrollNode.scrollLeft,
      down: true,
      move: false,
    });
  }, []);

  const handleImgMouseMove = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (dragState.down) {
      const x = dragState.x! - e.clientX;
      const y = dragState.y! - e.clientY;
      scrollNode.scrollLeft = dragState.left! + x;
      scrollNode.scrollTop = dragState.top! + y;
      setDragState({
        ...dragState,
        move: true,
      });
    }
  }, []);

  const handleImgMouseUp = useCallback(() => {
    setDragState({
      down: false,
      move: false,
    });
  }, []);

  /**
   * 图片切换
   */
  const resetWhenChangeImg = useCallback(() => {
    setLoadState('none');
    setImgSize({ width: 0, height: 0 });
    setScale(1);
  }, []);

  const toPrevImg = useCallback(() => {
    if (imgIndex === 0) {
      toast.warning(noForwardText);
    } else {
      toImgIndex(imgIndex - 1);
    }
  }, [imgIndex, noForwardText, toImgIndex]);

  const toNextImg = useCallback(() => {
    if (imgIndex >= imgCount - 1) {
      toast.warning(noBackwardsText);
    } else {
      toImgIndex(imgIndex + 1);
    }
  }, [imgCount, imgIndex, noBackwardsText, toImgIndex]);

  /**
   * 关闭动画结束
   */
  const handleExited = useEventCallback(() => {
    if (imgIndex === defaultIndexState) {
      resizeImg(originImgRef.current, containerSize, 1, ImgResizeTrigger.Exited);
    } else {
      toImgIndex(defaultIndexState);
    }
    if (onExited) {
      onExited();
    }
  }, []);

  /**
   * 放大、缩小、恢复三个操作
   */
  const handleZoomIn = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const newImgSize = {
      width: imgSize.width * scaleStep!,
      height: imgSize.height * scaleStep!,
    };
    const zoomInScale = scale * scaleStep!;
    resizeImg(newImgSize, containerSize, zoomInScale, ImgResizeTrigger.Zoom);
  }, []);

  const handleZoomOut = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const zoomOutScale = scale / scaleStep!;
    if (zoomOutScale > 0.1) {
      const newImgSize = {
        width: imgSize.width / scaleStep!,
        height: imgSize.height / scaleStep!,
      };
      resizeImg(newImgSize, containerSize, zoomOutScale, ImgResizeTrigger.Zoom);
    }
  }, []);

  const handleResetZoom = useEventCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const newImgSize = {
      width: imgSize.width / scale,
      height: imgSize.height / scale,
    };
    resizeImg(newImgSize, containerSize, 1, ImgResizeTrigger.Zoom);
  }, []);

  /**
   * close
   * 点击关闭按钮或 Mask 可关闭
   */
  const handleMaskClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disableMaskClick && onClose) {
        onClose(e);
      }
    },
    [disableMaskClick, onClose],
  );

  const handleCloseIconClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClose) {
        onClose(e);
      }
    },
    [onClose],
  );

  const updateOccupyHeight = useCallback(
    (paginationHeight: number) => {
      let newHeight;
      if (showPagination) {
        newHeight = imgWrapperToken.marginTop + paginationHeight;
      } else {
        newHeight = imgWrapperToken.marginTop;
      }
      if (newHeight !== occupyHeight) {
        setOccupyHeight(newHeight);
        setContainerSize(getContainerSize(imgWrapperWidth, newHeight));
      }
    },
    [imgWrapperToken.marginTop, imgWrapperWidth, occupyHeight, showPagination],
  );

  /**
   * 检查图片是否超出容器
   * @param size 容器尺寸
   */
  const checkImgOverflow = useCallback(() => {
    if (imgRef.current) {
      const containerSize = getContainerSize(imgWrapperWidth, occupyHeight);
      const { width, height } = imgRef.current.style;
      return (
        containerSize.height < parseInt(height || '0', 10) ||
        containerSize.width < parseInt(width || '0', 10)
      );
    }
    return false;
  }, [imgRef, imgWrapperWidth, occupyHeight]);

  /**
   * 设置图片节点的尺寸，并检测图片是否 overflow
   */
  const resizeImg = useCallback(
    (
      imgSizeArg: IImgDomSize,
      containerSizeArg: IImgDomSize = containerSize,
      scaleArg: number = scale,
      trigger: ImgResizeTrigger = ImgResizeTrigger.Resize,
    ) => {
      let newImgSize = imgSizeArg;
      if (imgRef.current) {
        if (overflowResize && scaleArg === 1 && containerSizeArg.height < newImgSize.height) {
          const newImgScale = containerSizeArg.height / newImgSize.height;
          newImgSize = {
            width: newImgSize.width * newImgScale,
            height: newImgSize.height * newImgScale,
          };
          if (trigger === ImgResizeTrigger.Loaded) {
            originImgRef.current = newImgSize;
          }
        }
        if (!shallowEqualObjects(imgSize, newImgSize)) {
          imgRef.current.style.width = addPx(newImgSize.width);
          imgRef.current.style.height = addPx(newImgSize.height);
          setImgSize(newImgSize);
        }
        if (scaleArg !== scale) {
          setScale(scaleArg);
        }
        setImgOverflow(checkImgOverflow());
      }
    },
    [checkImgOverflow, containerSize, imgRef, imgSize, overflowResize, scale],
  );

  /**
   * resize 时更新图片尺寸（仅 scale 为 1 时需要）
   * 1. 有多余尺寸那么设为原始尺寸
   * 2. 无多余尺寸那么进行缩放
   **/
  const resizeCheck = async () => {
    if (imgRef.current) {
      const newContainerSize = getContainerSize(imgWrapperWidth, occupyHeight);
      if (!shallowEqualObjects(newContainerSize, containerSize)) {
        if (scale === 1) {
          resizeImg(originImgRef.current, newContainerSize);
        }
        setContainerSize(newContainerSize);
      }
    }
  };

  useEffect(() => {
    imgPool.resizeCheckFns.add(resizeCheck);
    return () => {
      imgPool.resizeCheckFns.delete(resizeCheck);
    };
  });

  useEffect(() => {
    const newIndex = getValidDefaultIndex(defaultIndex || 0, imgCount);
    if (isDefaultIndexControlled && defaultIndexState !== newIndex) {
      setDefaultIndexState(newIndex);
      toImgIndex(newIndex);
    }
  }, [defaultIndex, defaultIndexState, imgCount, isDefaultIndexControlled, toImgIndex]);

  useEffect(() => {
    resetWhenChangeImg();
  }, [currentImgSrc, resetWhenChangeImg]);

  return {
    imgUrl: currentImgSrc,
    imgs,
    imgCount,
    imgIndex,
    onStepsChange,
    imgLoading,
    imgLoadError,
    imgLoaded,
    imgOverflow,
    scale,
    loadingText,
    loadErrorText,
    zoomInText,
    zoomOutText,
    resetZoomText,
    hasPrevImg,
    hasNextImg,
    hasPrevStep,
    hasNextStep,
    showPaginationButton,
    stepIndex,
    containerSize,
    updateOccupyHeight,
    showPagination,
    handleImgClick,
    handleImgLoaded,
    handleImgError,
    handleImgMouseDown,
    handleImgMouseMove,
    handleImgMouseUp,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleExited,
    toImgIndex,
    toPrevImg,
    toNextImg,
    toPrevStep,
    toNextStep,
    handleMaskClick,
    handleCloseIconClick,
  };
}
