import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useAfterEffect, useLockScroll, useThrottle, wait } from '@muya-ui/utils';
import { useTheme } from '../utils/useTheme';

import forkHandler from '../utils/forkHandler';
import { IImgCropperProps } from './types';
import { cropImg, getImgStyle, getNewTranslate } from './utils';

interface IState {
  src: string;
  status: 'none' | 'loaded';
  img?: HTMLImageElement;
}

export default function useImgCropper(
  props: IImgCropperProps,
  maskRef: RefObject<HTMLDivElement>,
  imgRef: RefObject<HTMLDivElement>,
) {
  const {
    components: {
      ImgCropper: { defaultSize },
    },
  } = useTheme();
  const {
    size = defaultSize,
    defaultScale,
    src = '',
    wheelScaleStep = 0.01,
    scaleStep = 0.1,
    disableWheel,
    scaleMax = 4,
    scaleMin = 1,
    backDelay = 200,
  } = props;
  const innerWheelScaleStep = wheelScaleStep < 0 || wheelScaleStep > 1 ? 0.1 : wheelScaleStep;
  const finalScaleMin = scaleMin < 1 ? 1 : scaleMin;
  const finalScaleMax = scaleMax < 1 ? 1 : scaleMax;

  const [stateScale, setScale] = useState(defaultScale || finalScaleMin);
  const finalScale = Math.max(stateScale, 0.01);
  const [finalTranslate, setTranslate] = useState<[number, number]>([0, 0]);
  const [finalRotate, setRotate] = useState(0);
  const [state, setState] = useState<IState>({
    src: src,
    status: 'none',
  });
  const [moving, setMoving] = useState(false);
  const [enter, setEnter] = useState(false);

  if (src !== state.src) {
    setState({
      src,
      status: 'none',
    });
    setScale(finalScaleMin);
    setTranslate([0, 0]);
    setRotate(0);
  }

  const imgStyle = useMemo(() => {
    const innerImgStyle = getImgStyle(size, finalRotate, state.img);
    if (state.src) {
      innerImgStyle.backgroundImage = `url(${state.src})`;
    }
    innerImgStyle.transform = [
      `translate(${finalTranslate[0]}px, ${finalTranslate[1]}px)`,
      `rotate(${finalRotate}deg)`,
      `scale(${finalScale})`,
      'translateZ(0)',
    ].join(' ');
    return innerImgStyle;
  }, [finalRotate, finalScale, finalTranslate, size, state.img, state.src]);

  // 滚轮停止 或者 鼠标结束时，校验位置是否正确的
  // 不用包 memo 永远 debounce 使用了， 用了 useAfterEffect
  const backToRightTransform = () => {
    if (moving) {
      return;
    }
    if (finalScale < finalScaleMin) {
      setScale(finalScaleMin);
      setTranslate([0, 0]);
      return;
    }

    if (finalScale > finalScaleMax) {
      setScale(finalScaleMax);
      return;
    }
    /* istanbul ignore if */
    if (!(maskRef.current && imgRef.current)) {
      return;
    }

    const newTranslate = getNewTranslate(
      maskRef.current.getBoundingClientRect(),
      imgRef.current.getBoundingClientRect(),
      finalTranslate,
    );
    if (newTranslate) {
      setTranslate(newTranslate);
    }
  };

  const getImg = (radio: number = 1) => {
    /* istanbul ignore if */
    if (!(maskRef.current && imgRef.current && state.img)) {
      return null;
    }
    const maskRect = maskRef.current.getBoundingClientRect();
    const imgRect = imgRef.current.getBoundingClientRect();
    return cropImg(state.img, imgRect, maskRect, finalRotate, radio);
  };

  const beforeFn = useCallback(() => state.status === 'loaded', [state.status]);

  const tmp = useRef({
    originX: 0,
    originY: 0,
    lastX: 0,
    lastY: 0,
  });
  const moveStart = useCallback(
    <T extends { clientX: number; clientY: number }>(e: T) => {
      setMoving(true);
      tmp.current.originX = e.clientX;
      tmp.current.originY = e.clientY;
      tmp.current.lastX = finalTranslate[0];
      tmp.current.lastY = finalTranslate[1];
    },
    [finalTranslate],
  );
  const moveEnd = useCallback(() => {
    setMoving(false);
    setEnter(false);
  }, []);
  const move = useCallback(
    <T extends { clientX: number; clientY: number }>(e: T) => {
      if (!moving) {
        return;
      }
      const { lastX, lastY, originX, originY } = tmp.current;
      const x = lastX + (e.clientX - originX);
      const y = lastY + (e.clientY - originY);

      setTranslate([x, y]);
    },
    [moving],
  );

  const zoom = useCallback(
    <T extends { deltaY: number }>(e: T) => {
      if (disableWheel || !enter) {
        return;
      }
      const diff = e.deltaY;
      if (diff < 0.1 && diff > -0.1) {
        return;
      }
      const diffScale = e.deltaY * innerWheelScaleStep;
      const newScale = finalScale + diffScale;
      setScale(newScale);
    },
    [disableWheel, enter, finalScale, innerWheelScaleStep],
  );
  const zoomFn = useThrottle(zoom, 50);
  const rotateImg = useCallback(() => {
    setRotate(finalRotate - 90);
  }, [finalRotate]);

  const handleMouseDown = useMemo(() => forkHandler(moveStart, undefined, beforeFn), [
    beforeFn,
    moveStart,
  ]);
  const handleMouseUp = useMemo(() => forkHandler(moveEnd, undefined, beforeFn), [
    beforeFn,
    moveEnd,
  ]);
  const handleMouseMove = useMemo(() => forkHandler(move, undefined, beforeFn), [beforeFn, move]);
  const handleWheel = useMemo(() => forkHandler(zoomFn, undefined, beforeFn), [beforeFn, zoomFn]);
  const handleMouseEnter = useCallback(() => {
    setEnter(true);
  }, []);
  const handleSliderChange = setScale;
  const handleZoom = useCallback(() => {
    setScale(finalScale + scaleStep);
  }, [finalScale, scaleStep]);
  const handleZoomOut = useCallback(() => {
    setScale(finalScale - scaleStep);
  }, [finalScale, scaleStep]);
  useAfterEffect(backToRightTransform, backDelay);
  useLockScroll(enter && !disableWheel);

  useEffect(() => {
    if (state.src && state.status === 'none') {
      wait.imgLoaded(state.src, 'Anonymous').then(img => {
        setState(prev => ({
          ...prev,
          status: 'loaded',
          img,
        }));
      });
    }
  }, [state.src, state.status]);
  return {
    moving,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseMove,
    handleWheel,
    handleSliderChange,
    handleZoom,
    handleZoomOut,
    rotateImg,
    imgStyle,
    finalTranslate,
    finalScale,
    finalScaleMin,
    finalScaleMax,
    finalRotate,
    imgSrc: state.src,
    getImg,
    backToRightTransform,
    moveStart,
    moveEnd,
    move,
    zoom,
    enter,
  };
}
