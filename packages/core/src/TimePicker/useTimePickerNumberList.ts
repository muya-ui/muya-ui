import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import scrollIntoView from '../utils/scrollIntoView';
import useTheme from '../utils/useTheme';
import { ITimePickerNumberListProps } from './innerTypes';

export default function useTimePickerNumberList(props: ITimePickerNumberListProps) {
  const {
    children,
    label,
    max = 59,
    min = 0,
    step = 1,
    rowNum = 6,
    selected: propSelected,
    onChange,
    disableNum,
    hideDisabledNum,
    defaultScrollBehavior = 'auto',
    styles,
    ...otherProps
  } = props;
  const theme = useTheme();
  const innerStep = step >= 1 ? step : 1;
  const innerDefaultSelected = min - 1;
  const [selected, setSelected] = useState(innerDefaultSelected);
  let finalSelected = selected;
  if (propSelected !== undefined) {
    finalSelected = propSelected;
  }

  const updateSelected = useCallback(
    (num: number) => {
      setSelected(num);
      onChange && onChange(num);
    },
    [onChange],
  );

  const selectedRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollBehavior = useRef<'auto' | 'smooth'>(defaultScrollBehavior);
  const items = useMemo(() => {
    let nums: number[] = [];
    let start = min;
    while (start <= max) {
      nums.push(start);
      start += innerStep;
    }
    if (hideDisabledNum && disableNum) {
      nums = nums.filter(num => !disableNum(num));
    }
    return nums.map(num => {
      const isSelected = num === finalSelected;
      const itemRef = isSelected ? selectedRef : undefined;
      let disabled = false;
      if (!hideDisabledNum && disableNum) {
        disabled = disableNum(num);
      }
      return {
        num,
        isSelected,
        itemRef,
        disabled,
        handleClick: () => {
          if (isSelected || disabled) {
            return;
          }
          scrollBehavior.current = 'smooth';
          updateSelected(num);
        },
      };
    });
  }, [disableNum, finalSelected, hideDisabledNum, innerStep, max, min, updateSelected]);
  useEffect(() => {
    if (finalSelected > innerDefaultSelected && selectedRef.current && scrollContainerRef.current) {
      scrollIntoView(selectedRef.current, {
        parentNode: scrollContainerRef.current,
        behavior: scrollBehavior.current,
        time: theme.transition.spec.duration.normal,
        align: {
          top: 0,
        },
      });
    }
  }, [finalSelected, innerDefaultSelected, min, selected, theme.transition.spec.duration.normal]);

  return {
    rowNum,
    selectedRef,
    scrollContainerRef,
    otherProps,
    items,
    finalSelected,
  };
}
