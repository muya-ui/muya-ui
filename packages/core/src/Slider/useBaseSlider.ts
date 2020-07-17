import { useContext, useEffect, useMemo, useRef, useState } from 'react';

import { useEventCallback, useMountedRef, useThrottle } from '@muya-ui/utils';

import ImgPoolContext from '../Img/ImgPoolContext';
import { IBaseSliderProps } from './innerTypes';
import { findClosest, formatValue, offsetCss, validNum } from './utils';

type IMouseEvent = Pick<React.MouseEvent<HTMLDivElement>, 'clientX' | 'clientY'>;
type IMovingType = 'none' | 'start' | 'end';

interface IPrivate extends IMouseEvent {
  trackSize: number;
  moveBaseOffset: number;
  movingType: IMovingType;
  mouseUpTime: number;
  /**
   * start 小于 end
   */
  startLTEnd: boolean;
}

interface IState {
  startTooltipOpen: boolean;
  endTooltipOpen: boolean;
  movingType: IMovingType;
}

export function useActiveFn<T>(fn: (event: T) => void, beforeFn: () => boolean) {
  return useEventCallback((event: T) => {
    if (beforeFn()) {
      return;
    }
    fn(event);
  });
}

export default function useBaseSlider(props: IBaseSliderProps, bodyEl = window.document.body) {
  const {
    min = 0,
    max = 100,
    step,
    vertical = false,
    hideStart,
    tooltipVisible,
    marks,
    marksOnly,
    value,
    defaultValue,
    snapDistance = 1,
    fractionDigits = 2,
    onChange,
    onAfterChange,
    mousemoveThrottleDelay = 50,

    styles,
    disabled,
    tooltipPlacement,
    markLabelDisabled,
    tipFormatter,
    ...otherProps
  } = props;
  const self = useRef<IPrivate>({
    clientX: 0,
    clientY: 0,
    trackSize: 0,
    moveBaseOffset: 0,
    movingType: 'none',
    startLTEnd: true,
    mouseUpTime: 0,
  });
  const defaultValueFromProps: [number, number] = useMemo(() => {
    if (defaultValue) {
      const innerStart = defaultValue[0];
      const innerEnd = defaultValue[1] !== undefined ? defaultValue[1] : innerStart;
      return innerStart <= innerEnd ? [innerStart, innerEnd] : [innerEnd, innerStart];
    }
    return [min, min];
  }, [defaultValue, min]);
  const valueFromProps: [number, number] = useMemo(() => {
    if (value) {
      const [innerStart = min, innerEnd = min] = value;
      return [validNum(innerStart, max, min), validNum(innerEnd, max, min)];
    }
    return defaultValueFromProps;
  }, [defaultValueFromProps, max, min, value]);

  const numRange = max - min;
  const [start, setStart] = useState(valueFromProps[0]);
  const [end, setEnd] = useState(valueFromProps[1]);
  const [state, setState] = useState<IState>({
    startTooltipOpen: false,
    endTooltipOpen: false,
    movingType: 'none',
  });
  let finalStart = start;
  let finalEnd = end;
  if ('value' in props) {
    finalStart = self.current.startLTEnd ? valueFromProps[0] : valueFromProps[1];
    finalEnd = self.current.startLTEnd ? valueFromProps[1] : valueFromProps[0];
  }

  const mounted = useMountedRef();
  // step 和 marks 不能同时存在
  const innerMarks = step && step > 0 ? undefined : marks;
  const innerMarksOnly = !!(marksOnly && innerMarks);
  const markNums = useMemo(() => {
    return innerMarks ? Object.keys(innerMarks).map(n => Number(n)) : [];
  }, [innerMarks]);
  const updateValue = (
    newStart: number | false,
    newEnd: number | false,
    mouseEnd: boolean = false,
  ) => {
    const startChange = newStart !== false && newStart !== finalStart;
    const endChange = newEnd !== false && newEnd !== finalEnd;
    const valueChange = startChange || endChange;
    if (!valueChange && !mouseEnd) {
      return;
    }
    if (!valueChange && mouseEnd && !onAfterChange) {
      return;
    }
    if (!valueChange && mouseEnd && onAfterChange) {
      const nValue: [number, number] = self.current.startLTEnd
        ? [finalStart, finalEnd]
        : [finalEnd, finalStart];
      onAfterChange(nValue);
      return;
    }
    let innerStart = finalStart;
    let innerEnd = finalEnd;
    if (newStart !== false) {
      innerStart = newStart;
      setStart(newStart);
    }
    if (newEnd !== false) {
      innerEnd = newEnd;
      setEnd(newEnd);
    }
    const startLTEnd = !!(innerStart <= innerEnd);
    self.current.startLTEnd = startLTEnd;
    const newValue: [number, number] = startLTEnd ? [innerStart, innerEnd] : [innerEnd, innerStart];
    if (onChange) {
      onChange(newValue);
    }
    if (mouseEnd && onAfterChange) {
      onAfterChange(newValue);
    }
  };
  // updateValueByOffset 中的 offset 是指相对 min 的偏移值
  const updateValueByOffset = useEventCallback(
    (inputNum: number, type?: IMovingType, mouseEnd: boolean = false) => {
      /* istanbul ignore if */
      if (!mounted.current) {
        return;
      }

      let newValue = inputNum;
      if (newValue < min) {
        newValue = min;
      } else if (newValue > max) {
        newValue = max;
      }

      const mType = type || state.movingType;
      if (markNums.length) {
        newValue = findClosest(newValue, markNums, snapDistance, innerMarksOnly);
      }
      if (step && step > 0) {
        newValue = Math.floor((newValue - min) / step) * step + min;
      }
      newValue = formatValue(newValue, fractionDigits);

      if (mType === 'start') {
        updateValue(newValue, false, mouseEnd);
        return;
      }
      if (mType === 'end' || hideStart) {
        updateValue(false, newValue, mouseEnd);
        return;
      }
      const startDiff = Math.abs(finalStart - newValue);
      const endDiff = Math.abs(finalEnd - newValue);
      if (startDiff < endDiff) {
        updateValue(newValue, false, mouseEnd);
      } else {
        updateValue(false, newValue, mouseEnd);
      }
    },
  );
  const markPropsMap = useMemo(() => {
    const map: Record<number, React.HTMLAttributes<HTMLDivElement>> = {};
    markNums.forEach(num => {
      map[num] = {
        onClick: () => {
          updateValueByOffset(num);
        },
        style: offsetCss(vertical, num, numRange, min),
      };
    });
    return map;
  }, [markNums, vertical, numRange, min, updateValueByOffset]);

  const handleMoveInner = useEventCallback((e: IMouseEvent, mouseEnd: boolean = false) => {
    const offset = vertical ? e.clientY - self.current.clientY : e.clientX - self.current.clientX;

    const newOffset = self.current.moveBaseOffset + (offset / self.current.trackSize) * numRange;
    updateValueByOffset(newOffset, self.current.movingType, mouseEnd);
  });
  const handleMove = useThrottle(handleMoveInner, mousemoveThrottleDelay);
  const checkIfDisabled = () => {
    return disabled || self.current.trackSize <= 0;
  };
  const handleStartMove = (e: IMouseEvent) => {
    self.current.clientX = e.clientX;
    self.current.clientY = e.clientY;
    bodyEl.addEventListener('mousemove', handleMove);
    const endFn = (e: IMouseEvent) => {
      bodyEl.removeEventListener('mousemove', handleMove);
      bodyEl.removeEventListener('mouseup', endFn);
      bodyEl.removeEventListener('mouseleave', endFn);
      handleMoveInner(e, true);
      self.current.movingType = 'none';
      self.current.mouseUpTime = Date.now();
      setState({
        startTooltipOpen: false,
        endTooltipOpen: false,
        movingType: 'none',
      });
    };
    bodyEl.addEventListener('mouseup', endFn);
    bodyEl.addEventListener('mouseleave', endFn);
  };
  const handleStartMoveStartCircle = useActiveFn((e: IMouseEvent) => {
    self.current.moveBaseOffset = finalStart;
    self.current.movingType = 'start';
    setState(prev => ({
      ...prev,
      movingType: 'start',
    }));
    handleStartMove(e);
  }, checkIfDisabled);
  const handleStartMoveEndCircle = useActiveFn((e: IMouseEvent) => {
    self.current.moveBaseOffset = finalEnd;
    self.current.movingType = 'end';
    setState(prev => ({
      ...prev,
      movingType: 'end',
    }));
    handleStartMove(e);
  }, checkIfDisabled);
  const trackRef = useRef<HTMLDivElement>(null);
  const updateTrackSize = async () => {
    if (trackRef.current) {
      const { width, height } = trackRef.current.getBoundingClientRect();
      self.current.trackSize = vertical ? height : width;
    }
  };
  const imgPool = useContext(ImgPoolContext);
  useEffect(() => {
    updateTrackSize();
    imgPool.resizeCheckFns.add(updateTrackSize);
    return () => {
      imgPool.resizeCheckFns.delete(updateTrackSize);
    };
  });

  const handleTrackClick = useActiveFn((e: IMouseEvent) => {
    // 由于事件冒泡，为了消除拖动的影响，加了 100ms 的判断
    // 如果有更好的做法，可以改掉
    if (!trackRef.current || marksOnly || Date.now() - self.current.mouseUpTime < 100) {
      return;
    }

    const { left, top, width, height } = trackRef.current.getBoundingClientRect();
    const offset = vertical ? e.clientY - top : e.clientX - left;
    const size = vertical ? height : width;

    const newOffset = min + (offset / size) * numRange;
    updateValueByOffset(newOffset);
  }, checkIfDisabled);
  // hover 到 start 的点上
  const handleEnterStart = useEventCallback(() => {
    if (tooltipVisible) {
      setState(prev => ({
        ...prev,
        startTooltipOpen: true,
      }));
    }
  });
  // 离开 start 的点
  const handleLeaveStart = useEventCallback(() => {
    if (self.current.movingType !== 'start') {
      setState(prev => ({
        ...prev,
        startTooltipOpen: false,
      }));
    }
  });
  const handleEnterEnd = useEventCallback(() => {
    if (tooltipVisible) {
      setState(prev => ({
        ...prev,
        endTooltipOpen: true,
      }));
    }
  });
  const handleLeaveEnd = useEventCallback(() => {
    if (self.current.movingType !== 'end') {
      setState(prev => ({
        ...prev,
        endTooltipOpen: false,
      }));
    }
  });

  const startCircleStyle = useMemo(() => {
    if (hideStart) {
      return;
    }
    return offsetCss(vertical, finalStart, numRange, min);
  }, [finalStart, hideStart, min, numRange, vertical]);
  const endCircleStyle = useMemo(() => {
    return offsetCss(vertical, finalEnd, numRange, min);
  }, [finalEnd, min, numRange, vertical]);
  const rangeStyle = useMemo(() => {
    const rangeStart = Math.min(finalStart, finalEnd);
    const rangeEnd = Math.max(finalStart, finalEnd);
    return offsetCss(vertical, rangeStart, numRange, min, rangeEnd - rangeStart);
  }, [finalEnd, finalStart, min, numRange, vertical]);

  return {
    ...state,
    handleStartMoveStartCircle,
    handleStartMoveEndCircle,
    handleEnterStart,
    handleLeaveStart,
    handleEnterEnd,
    handleLeaveEnd,
    handleTrackClick,
    finalMarks: innerMarks,
    innerMarksOnly,
    markNums,
    markPropsMap,
    startCircleStyle,
    endCircleStyle,
    rangeStyle,
    start: finalStart,
    end: finalEnd,
    trackRef,
    numRange,

    // 透传
    hideStart,
    vertical,
    tooltipVisible,

    otherProps,
    styles,
    disabled,
    tooltipPlacement,
    markLabelDisabled,
    tipFormatter,

    // for test
    handleStartMove,

    updateValueByOffset,
    updateTrackSize,
    self,
  };
}
