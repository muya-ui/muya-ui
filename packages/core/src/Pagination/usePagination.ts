import { useCallback, useMemo, useState } from 'react';

import { ISelectValueType } from '../Select/types';
import { IPaginationProps } from './types';
import { calculatePage, computeVisiblePieces, getValidPageValue } from './utils';

// 快速前进步数
const FAST_STEP_SIZE = 5;
// 至少展示 1-5 五个
const MIN_NUMBER_WIDTH = 5;

type IMuyaInputNode = HTMLInputElement | HTMLTextAreaElement;

const defaultPageSizeOptions = [10, 20, 50, 100];

export default function usePagination(props: IPaginationProps) {
  const currentIsControlled = 'current' in props;
  const pageSizeIsControlled = 'pageSize' in props;
  const {
    size = 'm',
    defaultCurrent = 1,
    current = -1,
    totalRecords = 0,
    midSideWidth = 2,
    showQuickJumper = false,
    isDarkBackground = false,
    simple = false,
    onChange,
    styles,

    pageSize = -1,
    defaultPageSize = 10,
    showPageSizeChanger = false,
    pageSizeOptions,
    onPageSizeChange,

    ...restProps
  } = props;
  let currentFromProps = current > 0 ? current : defaultCurrent;
  const pageSizeFromProps = pageSize > 0 ? pageSize : defaultPageSize;
  const [statePageSize, setStatePageSize] = useState(pageSizeFromProps);
  const finalPageSize = pageSizeIsControlled ? pageSizeFromProps : statePageSize;

  const pageAmount = calculatePage(totalRecords, finalPageSize); // 总页数
  const memoPageSizeOptions = useMemo(() => {
    if (pageSizeOptions && pageSizeOptions.length) {
      return pageSizeOptions;
    }
    return defaultPageSizeOptions;
  }, [pageSizeOptions]);
  currentFromProps = getValidPageValue(currentFromProps, pageAmount);

  const [stateCurrent, setStateCurrent] = useState(currentFromProps);
  const finalCurrent = currentIsControlled ? currentFromProps : stateCurrent;

  const isFirst = finalCurrent === 1;
  const isLast = finalCurrent === pageAmount;
  const hasPrevious = pageAmount > 1 && finalCurrent > 1;
  const hasNext = finalCurrent < pageAmount;
  const prevIsDisabled = finalCurrent === 1;
  const nextIsDisabled = finalCurrent === pageAmount;
  const finalCurrentStr = String(finalCurrent);

  // 快捷跳转的 input 的值
  const [quickJumperValue, setQuickJumperInputValue] = useState('');

  // 快捷跳转的 input 的值
  const [simpleQuickJumperValue, setSimpleQuickJumperInputValue] = useState(finalCurrentStr);
  const [simpleQuickJumperFocus, setSimpleQuickJumperFocus] = useState(false);
  const finalSimpleQuickJumperValue = simpleQuickJumperFocus
    ? simpleQuickJumperValue
    : finalCurrentStr;

  const updateCurrent = useCallback(
    (pageNumber: number) => {
      const newPageNum = getValidPageValue(pageNumber, pageAmount);
      if (pageNumber === finalCurrent) return;
      setStateCurrent(newPageNum);
      if (simple) {
        setSimpleQuickJumperInputValue(String(newPageNum));
      }

      if (onChange) {
        onChange(newPageNum);
      }
    },
    [finalCurrent, onChange, pageAmount, simple],
  );
  const handlePageSizeChange = useCallback(
    (newPageSize: ISelectValueType) => {
      setStatePageSize(newPageSize as number);
      if (onPageSizeChange) {
        onPageSizeChange(newPageSize as number);
      }
    },
    [onPageSizeChange],
  );

  const handlePrev = useCallback(() => {
    updateCurrent(finalCurrent - 1);
  }, [finalCurrent, updateCurrent]);

  const handleNext = useCallback(() => {
    updateCurrent(finalCurrent + 1);
  }, [finalCurrent, updateCurrent]);

  const handleQuickJumperInputPressEnter = useCallback((e: React.KeyboardEvent<IMuyaInputNode>) => {
    const target = e.target as IMuyaInputNode;
    target.blur();
  }, []);

  const handleQuickJumperInputBlur = useCallback(() => {
    // 空不进行任何处理
    if (quickJumperValue === '') {
      return;
    }
    const pageNumber = parseInt(quickJumperValue, 10);

    if (!isNaN(pageNumber)) {
      updateCurrent(pageNumber);
    }
    setQuickJumperInputValue('');
  }, [quickJumperValue, updateCurrent]);

  const handleQuickJumperInputChange = useCallback((e: React.ChangeEvent<IMuyaInputNode>) => {
    setQuickJumperInputValue(e.target.value);
  }, []);

  const handleSimpleQuickJumperInputChange = useCallback((e: React.ChangeEvent<IMuyaInputNode>) => {
    setSimpleQuickJumperInputValue(e.target.value);
  }, []);

  const handleSimpleQuickJumperInputFocus = useCallback(
    (e: React.FocusEvent<IMuyaInputNode>) => {
      setSimpleQuickJumperInputValue(finalCurrentStr);
      setSimpleQuickJumperFocus(true);
    },
    [finalCurrentStr],
  );

  const handleSimpleQuickJumperInputBlur = useCallback(() => {
    const pageNumber = parseInt(simpleQuickJumperValue, 10);
    setSimpleQuickJumperFocus(false);
    if (isNaN(pageNumber)) {
      setSimpleQuickJumperInputValue(finalCurrentStr);
      // 这里 return 可以少操作一下 current ， focus 还会设置值
      // 不 return 也没事
      return;
    }
    updateCurrent(pageNumber);
  }, [finalCurrentStr, simpleQuickJumperValue, updateCurrent]);

  const visiblePieces = useMemo(
    () =>
      computeVisiblePieces(finalCurrent, pageAmount, midSideWidth, MIN_NUMBER_WIDTH).map(item => {
        let itemOnClick;
        if (item.type === 'ellipsis' && item.goto === 'next') {
          itemOnClick = () => updateCurrent(finalCurrent + FAST_STEP_SIZE);
        } else if (item.type === 'ellipsis') {
          itemOnClick = () => updateCurrent(finalCurrent - FAST_STEP_SIZE);
        } else {
          itemOnClick = () => updateCurrent(item.pageNumber!);
        }
        return {
          ...item,
          onClick: itemOnClick,
        };
      }),
    [finalCurrent, updateCurrent, midSideWidth, pageAmount],
  );

  return {
    finalCurrent,
    simpleQuickJumperValue: finalSimpleQuickJumperValue,
    quickJumperValue,
    finalPageSize,

    pageAmount,
    showPageSizeChanger,
    isFirst,
    isLast,
    hasPrevious,
    hasNext,
    visiblePieces,
    prevIsDisabled,
    nextIsDisabled,
    updateCurrent,

    // 事件处理
    handleQuickJumperInputPressEnter,
    handleQuickJumperInputBlur,
    handleQuickJumperInputChange,

    handleSimpleQuickJumperInputBlur,
    handleSimpleQuickJumperInputChange,
    handleSimpleQuickJumperInputFocus,

    handlePrev,
    handleNext,
    handlePageSizeChange,

    // 传回去，渲染用
    restProps,
    size,
    showQuickJumper,
    isDarkBackground,
    pageSizeOptions: memoPageSizeOptions,
    simple,
    styles,
  };
}
