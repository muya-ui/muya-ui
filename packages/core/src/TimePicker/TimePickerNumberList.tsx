import { padStart } from 'lodash';
import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import { scrollBarStyle } from '../ScrollView/styled';
import memoForwardRef from '../utils/memoForwardRef';
import mergeStyleItem from '../utils/mergeStyleItem';
import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import { ITimePickerNumberListProps } from './innerTypes';
import useTimePickerNumberList from './useTimePickerNumberList';

interface IStyledItemProps {
  $selected?: boolean;
  $disabled?: boolean;
}
interface IStyledRootProps {
  /** 时间显示的数量 */
  $number: number;
}

const StyledRow = styled.div``;
const StyledLabel = styled.div``;
const StyledItem = styled.div<IStyledItemProps>`
  ${({ theme, $disabled, $selected = false }) => {
    const token = theme.components.TimePicker;
    let itemCss;
    if ($disabled) {
      itemCss = css`
        color: ${token.itemColor.disabled};
        cursor: not-allowed;
      `;
    } else if ($selected) {
      itemCss = css`
        background-color: ${token.itemBg.selected};
        color: ${token.itemColor.selected};
        border-radius: ${theme.size.spec.borderRadius.s1};
      `;
    } else {
      itemCss = css`
        color: ${token.itemColor.normal};
        cursor: pointer;
        border-radius: ${theme.size.spec.borderRadius.s1};

        &:hover {
          background-color: ${token.itemBg.hover};
        }
        &:active {
          background-color: ${token.itemBg.hover};
        }
      `;
    }

    return css`
      height: ${token.itemHeight}px;
      width: ${token.itemWidth}px;
      line-height: ${token.itemHeight}px;
      ${itemCss}
    `;
  }}
`;
const StyledScrollContainer = styled.div``;

const BaseNode = styled.div<IStyledRootProps>`
  ${({ theme, $number }) => {
    const token = theme.components.TimePicker;
    const { pattern } = theme.colors;
    const scrollHeight = token.rowHeight * $number;
    const scrollPaddingBottom = token.rowHeight * ($number - 1);
    return css`
      text-align: center;
      user-select: none;
      flex: 1;
      font-size: ${theme.typography.spec.fontSize.s1}px;

      ${StyledLabel} {
        height: ${token.rowHeight}px;
        line-height: ${token.rowHeight}px;
        color: ${pattern.text.secondary};
      }

      ${StyledRow} {
        height: ${token.rowHeight}px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      ${StyledScrollContainer} {
        height: ${scrollHeight}px;
        overflow-y: auto;
        padding: 0 4px ${scrollPaddingBottom}px;
        ${scrollBarStyle({ theme })}
      }
    `;
  }}
`;

const defaultStyles = {
  colItem: '',
  colLabel: '',
  colItemBlock: '',
  colItemSelected: '',
  colItemDisabled: '',
};
const TimePickerNumberList = memoForwardRef<HTMLDivElement, ITimePickerNumberListProps>(
  (props, ref) => {
    const theme = useTheme();
    const { otherProps, items, scrollContainerRef, rowNum } = useTimePickerNumberList(props);
    const pickStyles = useMemo(() => {
      if (!props.styles) {
        return;
      }
      const { colLabel, colItem, colItemBlock, colItemSelected, colItemDisabled } = props.styles;
      return {
        colLabel,
        colItem,
        colItemBlock,
        colItemSelected,
        colItemDisabled,
      };
    }, [props.styles]);
    const innerStyles = useStyles('time-picker', defaultStyles, pickStyles);
    const nodes = useMemo(() => {
      return items.map(item => {
        const itemText = padStart(item.num.toString(), 2, '0');
        let innerStyleItem = innerStyles.colItemBlock;
        if (item.isSelected) {
          innerStyleItem = mergeStyleItem(innerStyles.colItemBlock, innerStyles.colItemSelected);
        } else if (item.disabled) {
          innerStyleItem = mergeStyleItem(innerStyles.colItemBlock, innerStyles.colItemDisabled);
        }
        return (
          <StyledRow {...innerStyles.colItem} key={item.num} ref={item.itemRef}>
            <StyledItem
              {...innerStyleItem}
              theme={theme}
              $selected={item.isSelected}
              $disabled={item.disabled}
              onClick={item.handleClick}
            >
              {itemText}
            </StyledItem>
          </StyledRow>
        );
      });
    }, [
      innerStyles.colItem,
      innerStyles.colItemBlock,
      innerStyles.colItemDisabled,
      innerStyles.colItemSelected,
      items,
      theme,
    ]);
    return (
      <BaseNode ref={ref} theme={theme} $number={rowNum} {...otherProps}>
        <StyledLabel {...innerStyles.colLabel}>{props.label}</StyledLabel>
        <StyledScrollContainer ref={scrollContainerRef}>{nodes}</StyledScrollContainer>
      </BaseNode>
    );
  },
);

export default TimePickerNumberList;
