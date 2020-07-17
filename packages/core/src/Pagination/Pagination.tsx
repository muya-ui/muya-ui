import React from 'react';

import useLocale from '../Locale/useLocale';
import Select, { Option } from '../Select';
import memoForwardRef from '../utils/memoForwardRef';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import PaginationPagerButton from './PaginationPagerButton';
import PaginationPagerEllipsis from './PaginationPagerEllipsis';
import {
  PaginationInput,
  StyledPageNumber,
  StyledPaginationJump,
  StyledPaginationJumpText,
  StyledPaginationText,
  StyledPaginationWrap,
  StyledSimpleActivePage,
  StyledSimplePageNum,
  StyledSimplePageSplit,
  StyledSimplePageText,
} from './styled';
import { IPaginationNode, IPaginationProps } from './types';
import usePagination from './usePagination';

const defaultStyles = {
  wrapper: '',
  input: '',
  numberItem: '',
  simpleNumberItem: '',
  simpleArrow: '',
  jumpText: '',
};

const Pagination = memoForwardRef<IPaginationNode, IPaginationProps>((props, ref) => {
  const locale = useLocale();
  const theme = useTheme();

  const { inputWidth, simpleSizeMap, pageSizeChangerWidth } = theme.components.Pagination;

  const {
    finalCurrent,
    simpleQuickJumperValue,
    quickJumperValue,
    pageAmount,
    visiblePieces,
    prevIsDisabled,
    nextIsDisabled,
    finalPageSize,

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

    // 传回来的，做了默认值的处理
    restProps,
    size,
    showQuickJumper,
    showPageSizeChanger,
    pageSizeOptions,
    isDarkBackground,
    simple,
    styles,
  } = usePagination(props);
  const innerStyles = useStyles('pagination', defaultStyles, styles);
  const simpleNode = React.useMemo(() => {
    if (!simple) {
      return;
    }
    let currentPageNode;
    if (showQuickJumper) {
      currentPageNode = (
        <PaginationInput
          theme={theme}
          width={inputWidth[simpleSizeMap[size]]}
          size={simpleSizeMap[size]}
          value={simpleQuickJumperValue}
          onChange={handleSimpleQuickJumperInputChange}
          onPressEnter={handleQuickJumperInputPressEnter}
          onBlur={handleSimpleQuickJumperInputBlur}
          onFocus={handleSimpleQuickJumperInputFocus}
          {...innerStyles.input}
        />
      );
    } else {
      currentPageNode = (
        <StyledSimpleActivePage theme={theme}>{finalCurrent}</StyledSimpleActivePage>
      );
    }
    return (
      <StyledSimplePageNum size={size} theme={theme} {...innerStyles.simpleNumberItem}>
        {currentPageNode}
        <StyledSimplePageSplit>/</StyledSimplePageSplit>
        <StyledSimplePageText>{pageAmount}</StyledSimplePageText>
      </StyledSimplePageNum>
    );
  }, [
    finalCurrent,
    handleQuickJumperInputPressEnter,
    handleSimpleQuickJumperInputBlur,
    handleSimpleQuickJumperInputChange,
    handleSimpleQuickJumperInputFocus,
    innerStyles.input,
    innerStyles.simpleNumberItem,
    inputWidth,
    pageAmount,
    showQuickJumper,
    simple,
    simpleQuickJumperValue,
    simpleSizeMap,
    size,
    theme,
  ]);

  const normalNode = React.useMemo(() => {
    if (simple) {
      return;
    }
    return visiblePieces.map((visiblePiece, index) => {
      const key = `${visiblePiece.type}-${index}`;

      if (visiblePiece.type === 'ellipsis') {
        return (
          <PaginationPagerEllipsis
            onClick={visiblePiece.onClick}
            size={size}
            isDarkBackground={isDarkBackground}
            {...innerStyles.numberItem}
            type={visiblePiece.goto!}
            key={key}
          />
        );
      }

      return (
        <StyledPageNumber
          key={key}
          onClick={visiblePiece.onClick}
          isActive={visiblePiece.pageNumber === finalCurrent}
          theme={theme}
          size={size}
          isDarkBackground={isDarkBackground}
          {...innerStyles.numberItem}
        >
          <StyledPaginationText>{visiblePiece.pageNumber}</StyledPaginationText>
        </StyledPageNumber>
      );
    });
  }, [finalCurrent, innerStyles.numberItem, isDarkBackground, simple, size, theme, visiblePieces]);

  const pagerStyleItem = simple ? innerStyles.simpleArrow : innerStyles.numberItem;
  const basePagerProps = {
    simple,
    size,
    isDarkBackground,
    ...pagerStyleItem,
  };

  const normalQuickJumperNode = React.useMemo(() => {
    if (simple || !showQuickJumper) {
      return;
    }
    return (
      <StyledPaginationJump theme={theme} size={size}>
        <StyledPaginationJumpText theme={theme} size={size} {...innerStyles.jumpText}>
          {locale['Pagination.jumpTo']}
        </StyledPaginationJumpText>
        <PaginationInput
          theme={theme}
          width={inputWidth[size]}
          size={size}
          value={quickJumperValue}
          onChange={handleQuickJumperInputChange}
          onPressEnter={handleQuickJumperInputPressEnter}
          onBlur={handleQuickJumperInputBlur}
          {...innerStyles.input}
        />
        <StyledPaginationJumpText theme={theme} size={size} {...innerStyles.jumpText}>
          {locale['Pagination.page']}
        </StyledPaginationJumpText>
      </StyledPaginationJump>
    );
  }, [
    handleQuickJumperInputBlur,
    handleQuickJumperInputChange,
    handleQuickJumperInputPressEnter,
    innerStyles.input,
    innerStyles.jumpText,
    inputWidth,
    locale,
    quickJumperValue,
    showQuickJumper,
    simple,
    size,
    theme,
  ]);

  const pageSizeNode = React.useMemo(() => {
    if (simple || !showPageSizeChanger) {
      return;
    }
    return (
      <StyledPaginationJump theme={theme} size={size}>
        <Select
          value={finalPageSize}
          width={pageSizeChangerWidth}
          size={size}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map(item => (
            <Option
              value={item}
              key={item.toString()}
            >{`${item} ${locale['Pagination.pageSizeChangerSuffix']}`}</Option>
          ))}
        </Select>
      </StyledPaginationJump>
    );
  }, [
    finalPageSize,
    handlePageSizeChange,
    locale,
    pageSizeChangerWidth,
    pageSizeOptions,
    showPageSizeChanger,
    simple,
    size,
    theme,
  ]);

  return (
    <StyledPaginationWrap ref={ref} theme={theme} {...innerStyles.wrapper} {...restProps}>
      <PaginationPagerButton
        onClick={handlePrev}
        type="prev"
        disabled={prevIsDisabled}
        {...basePagerProps}
      />
      {simpleNode}
      {normalNode}
      <PaginationPagerButton
        onClick={handleNext}
        type="next"
        disabled={nextIsDisabled}
        {...basePagerProps}
      />
      {pageSizeNode}
      {normalQuickJumperNode}
    </StyledPaginationWrap>
  );
});

export default Pagination;
