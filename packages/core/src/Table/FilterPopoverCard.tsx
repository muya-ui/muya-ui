import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { FilterIcon } from '@muya-ui/theme-light';
import PopoverCard from '../PopoverCard';
import { CheckboxGroup, ICheckboxGroupValue } from '../Checkbox';
import { RadioGroup, IRadioGroupValue } from '../Radio';
import useLocale from '../Locale/useLocale';
import Button from '../Button';
import useTheme from '../utils/useTheme';
import { TableFilterValue, IFilterPopoverCardProps } from './types';
import { StyledFilter, StyledFilterItem, StyledFilterWrapper } from './styled';

export default React.memo(
  forwardRef<HTMLDivElement, IFilterPopoverCardProps>((props, ref) => {
    const {
      column,
      activeColumnKey,
      size = 'l',
      selectedFilterValues,
      onVisibleChange,
      onClickAway,
      setSelectedFilterValues,
      setFilterColumnKey,
      syncFilterColumnsList,
      ...other
    } = props;
    const locale = useLocale();
    const theme = useTheme();
    const {
      components: { Table: token },
    } = theme;
    const { filterIcon: FilterIconToken = FilterIcon, filterData } = token;
    const {
      filterMultiple = true,
      filters,
      filterIconHighlight = false,
      filterVisible,
      renderFilterActions,
      renderFilterContent,
      onFilterVisibleChange,
      onFilterEntered,
      onFilterExited,
    } = column;
    const hasSorter = !!column.sorter;
    const { buttonSize } = filterData[size];

    const [open, setOpen] = useState(false);
    const isControlled = 'filterVisible' in column;
    const isCurrentColumn = column.key === activeColumnKey;
    const finalOpen = useMemo(() => {
      if (!isCurrentColumn) {
        return false;
      }
      if (isControlled) {
        return filterVisible;
      }
      return open;
    }, [filterVisible, isControlled, isCurrentColumn, open]); // 只有当前列激活时，才同步

    const handleVisibleChange = useCallback(
      (v: boolean) => {
        setOpen(v);
        if (onVisibleChange) {
          onVisibleChange(v);
        }
        if (onFilterVisibleChange) {
          onFilterVisibleChange(v);
        }
      },
      [onFilterVisibleChange, onVisibleChange],
    );

    const handleConfirm = useCallback(() => {
      syncFilterColumnsList();
      setOpen(false);
      onFilterVisibleChange && onFilterVisibleChange(false);
    }, [onFilterVisibleChange, syncFilterColumnsList]);

    const handleReset = useCallback(() => {
      setSelectedFilterValues([], newFilterColumnsList =>
        syncFilterColumnsList(newFilterColumnsList),
      );
      setOpen(false);
      onFilterVisibleChange && onFilterVisibleChange(false);
    }, [onFilterVisibleChange, setSelectedFilterValues, syncFilterColumnsList]);

    // 点击其他区域关闭，相当于点击保存
    const handleClickAway = useCallback(
      (e: React.MouseEvent) => {
        if (finalOpen) {
          syncFilterColumnsList();
        }
        onClickAway && onClickAway(e);
      },
      [finalOpen, onClickAway, syncFilterColumnsList],
    );

    const handleFilterChange = useCallback(
      (value: ICheckboxGroupValue[] | IRadioGroupValue) => {
        if (Array.isArray(value)) {
          setSelectedFilterValues(value as TableFilterValue[]);
        } else {
          setSelectedFilterValues([value] as TableFilterValue[]);
        }
      },
      [setSelectedFilterValues],
    );

    const handleFilterIconClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setFilterColumnKey(column);
      },
      [column, setFilterColumnKey],
    );

    const handleEntered = useCallback(() => {
      if (onFilterEntered) {
        onFilterEntered();
      }
    }, [onFilterEntered]);

    const handleExited = useCallback(() => {
      if (onFilterExited) {
        onFilterExited();
      }
    }, [onFilterExited]);

    const transitionProps = useMemo(
      () => ({
        onEntered: handleEntered,
        onExited: handleExited,
      }),
      [handleEntered, handleExited],
    );

    const highlightStyle = useMemo(() => {
      if (selectedFilterValues.length || filterIconHighlight) {
        return {
          color: theme.colors.spec.brand,
        };
      }
    }, [filterIconHighlight, selectedFilterValues.length, theme.colors.spec.brand]);

    const filterIcon = useMemo(() => {
      if (hasSorter) {
        return (
          <StyledFilterWrapper onClick={handleFilterIconClick}>
            <StyledFilter style={highlightStyle}>
              {column.filterIcon || <FilterIconToken />}
            </StyledFilter>
          </StyledFilterWrapper>
        );
      }
      return (
        <StyledFilter style={highlightStyle} onClick={handleFilterIconClick}>
          {column.filterIcon || <FilterIconToken />}
        </StyledFilter>
      );
    }, [column.filterIcon, handleFilterIconClick, hasSorter, highlightStyle]);

    const filterActions = useMemo(() => {
      if (renderFilterActions) {
        return renderFilterActions({
          confirm: handleConfirm,
          reset: handleReset,
          selectedFilterValues,
          setSelectedFilterValues,
          syncFilterColumnsList,
          setFilterColumnKey,
        });
      }

      return (
        <>
          <Button size={buttonSize} plain onClick={handleReset} key="reset">
            {locale['Table.filterResetText']}
          </Button>
          <Button size={buttonSize} onClick={handleConfirm} key="confirm" type="primary">
            {locale['Table.filterConfirmText']}
          </Button>
        </>
      );
    }, [
      buttonSize,
      handleConfirm,
      handleReset,
      locale,
      renderFilterActions,
      selectedFilterValues,
      setFilterColumnKey,
      setSelectedFilterValues,
      syncFilterColumnsList,
    ]);

    const filterContent = useMemo(() => {
      if (renderFilterContent) {
        return renderFilterContent({
          confirm: handleConfirm,
          reset: handleReset,
          selectedFilterValues,
          setSelectedFilterValues,
          syncFilterColumnsList,
          setFilterColumnKey,
        });
      }
      if (!filters) return null;
      if (!filters.length) return null;

      const options = filters.map(f => ({ value: f.value, label: f.text }));
      if (filterMultiple) {
        return (
          <CheckboxGroup
            size={buttonSize}
            options={options}
            value={selectedFilterValues}
            onChange={handleFilterChange}
            renderCheckbox={(node, option) => (
              <StyledFilterItem theme={theme} key={option.value as any}>
                {node}
              </StyledFilterItem>
            )}
          />
        );
      }
      return (
        <RadioGroup
          size={buttonSize}
          options={options}
          value={selectedFilterValues[0]}
          onChange={handleFilterChange}
          renderRadio={(node, option) => (
            <StyledFilterItem theme={theme} key={option.value as any}>
              {node}
            </StyledFilterItem>
          )}
        />
      );
    }, [
      buttonSize,
      filterMultiple,
      filters,
      selectedFilterValues,
      theme,
      handleConfirm,
      handleFilterChange,
      handleReset,
      renderFilterContent,
      setFilterColumnKey,
      setSelectedFilterValues,
      syncFilterColumnsList,
    ]);

    return (
      <PopoverCard
        placement="bottom"
        triggerAction="click"
        {...other}
        transitionProps={transitionProps}
        onVisibleChange={handleVisibleChange}
        onClickAway={handleClickAway}
        content={filterContent}
        actions={filterActions}
        open={finalOpen}
        ref={ref}
      >
        {filterIcon}
      </PopoverCard>
    );
  }),
);
