import { FoldIcon, UnfoldIcon } from '@muya-ui/theme-light';
import { useEventCallback } from '@muya-ui/utils';

import { filter, uniq } from 'lodash';

import React, { CSSProperties, useMemo, useState, useCallback, Key } from 'react';

import Checkbox, { ICheckboxProps } from '../Checkbox';
import EllipsisContent from '../EllipsisContent';
import Result from '../Result';
import Space from '../Space';
import Spin, { ISpinProps } from '../Spin';
import useLocale from '../Locale/useLocale';
import addPx from '../utils/addPx';
import forkHandler from '../utils/forkHandler';
import useTheme from '../utils/useTheme';

import FilterPopoverCard from './FilterPopoverCard';
import {
  StyledEmptyTr,
  StyledHeader,
  StyledHeaderContent,
  StyledHeaderIconWrapper,
  StyledSortBottomArrow,
  StyledSortUpArrow,
  StyledTable,
  StyledTableWrapper,
  StyledExpandedTr,
  StyledExpandButton,
} from './styled';
import {
  ITableBodyCellProps,
  ITableBodyRowProps,
  ITableCellProps,
  ITableColumn,
  ITableFilterColumn,
  ITableProps,
  ITableSortOrder,
  ITableState,
  TableFilterValue,
} from './types';

export default function Table<D>(props: ITableProps<D>) {
  const locale = useLocale();
  const theme = useTheme();

  const {
    onChange,
    onDataSourceChange,
    onRow,
    onCell,
    onHeaderRow,
    onHeaderCell,

    bordered = false,
    stripe = false,
    columns: columnsProp,
    dataSource,
    rowKey = 'key',
    size = 'l',
    loading = false,
    emptyText,
    defaultSortDirections = ['ascend', 'descend'] as ITableSortOrder[],
    defaultTableState,
    ellipsis: ellipsisProp = false,
    tableLayout: tableLayoutProp,
    rowSelection,
    components = {},
    expandable = {},
    onScroll,
    ...other
  } = props;

  const {
    components: { Table: token },
  } = theme;
  const {
    upArrowIcon: UpArrowIconToken = UnfoldIcon,
    bottomArrowIcon: BottomArrowIconToken = FoldIcon,
  } = token;

  // columns
  const leftFixedColumns = useMemo(() => columnsProp.filter(c => c.fixed === 'left'), [
    columnsProp,
  ]);
  const rightFixedColumns = useMemo(() => columnsProp.filter(c => c.fixed === 'right'), [
    columnsProp,
  ]);
  const normalColumns = useMemo(() => columnsProp.filter(c => !c.fixed), [columnsProp]);
  const columns = useMemo(() => [...leftFixedColumns, ...normalColumns, ...rightFixedColumns], [
    leftFixedColumns,
    normalColumns,
    rightFixedColumns,
  ]);

  // utils
  const getRowKey = useCallback(
    (d: D, rIndex: number) =>
      typeof rowKey === 'function' ? rowKey(d, rIndex) : (d as any)[rowKey],
    [rowKey],
  );

  // state
  const [showLeftColumnsShadow, setShowLeftColumnsShadow] = useState(false);
  const [showRightColumnsShadow, setShowRightColumnsShadow] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [tableState, setTableState] = useState<ITableState>({
    sortOrder: undefined,
    sortColumnKey: '',
    filterColumnKey: '',
    filterColumnList: [],
    ...defaultTableState,
  });
  const [filterColumnListState, setFilterColumnListState] = useState<ITableFilterColumn[]>([]);

  // loading config
  const spinProps: Partial<ISpinProps> = useMemo(
    () => ({
      container,
      desc: locale['Table.loadingText'],
      ...(typeof loading === 'boolean' ? { spinning: loading } : loading),
    }),
    [container, loading, locale],
  );

  // generate DataSource
  const finalDataSource = useMemo(() => {
    let newDataSource = [...dataSource];
    const { sortColumnKey, sortOrder, filterColumnList } = tableState;
    const currentColumn = columns.filter(c => c.key && c.key === sortColumnKey)[0];

    if (filterColumnList.length) {
      filterColumnList.forEach(filterColumn => {
        const column = columns.filter(c => c.key === filterColumn.key)[0];
        if (!column) return;
        const { onFilter } = column;
        if (!onFilter) return;
        if (!filterColumn.selectedFilterValues.length) return;
        // 执行到这里，onFilter and selectedFilterValues肯定有值
        // 同一列存在多个筛选条件，满足其中任意一个条件即展示
        // 筛选完毕，将筛选结果赋值给dataSource，继续筛选下一列的数据
        newDataSource = newDataSource.filter(d =>
          filterColumn.selectedFilterValues.some(v => onFilter(v, d)),
        );
      });
    }

    if (currentColumn && currentColumn.sorter && sortOrder && sortColumnKey) {
      const { sorter } = currentColumn;
      newDataSource = newDataSource.sort((a, b) => {
        const result = sorter(a, b, sortOrder);
        if (result !== 0) {
          return sortOrder === 'descend' ? -result : result;
        }
        return 0;
      });
    }

    onDataSourceChange && onDataSourceChange(newDataSource);

    return newDataSource;
  }, [columns, dataSource, onDataSourceChange, tableState]);

  // expandable config
  const {
    expandedRowKeys,
    defaultExpandedRowKeys = [],
    defaultExpandAllRows = false,
    onExpandedRowsChange,
    expandedRowRender,
    onExpand,
    rowExpandable,
    indentSize = 16,
    childrenColumnName = 'children',
  } = expandable;
  const getExpandableRowKeys = (dataSource: D[]): any[] => {
    return dataSource
      .reduce<any[]>((acc, d, rIndex) => {
        const key = rowExpandable && !rowExpandable(d) ? '' : getRowKey(d, rIndex);
        const rowChildren = (d as any)[childrenColumnName];
        const rowHasChildren = rowChildren && Array.isArray(rowChildren);
        if (expandedRowRender) {
          return acc.concat([key]);
        }
        if (rowHasChildren) {
          return acc.concat([key]).concat(getExpandableRowKeys(rowChildren));
        }
        return acc;
      }, [])
      .filter(k => !!k);
  };
  const allExpandableRowKeys = getExpandableRowKeys(finalDataSource);
  const isExpandableControlled = 'expandedRowKeys' in expandable;
  const [expandedRowKeysState, setExpandedRowKeysState] = useState<Key[]>(
    defaultExpandAllRows ? allExpandableRowKeys : defaultExpandedRowKeys,
  );
  const finalExpandedRowKeys =
    isExpandableControlled && expandedRowKeys ? expandedRowKeys : expandedRowKeysState;
  const handleExpandRow = useCallback(
    (record: D, rIndex: number) => {
      const rowKey = getRowKey(record, rIndex);
      const isExpanded = finalExpandedRowKeys.includes(rowKey);
      const nextExpanded = !isExpanded;
      onExpand && onExpand(nextExpanded, record);

      let newRowKeys = [...finalExpandedRowKeys];
      if (nextExpanded) {
        // 展开
        newRowKeys = uniq([...newRowKeys, rowKey]);
      } else {
        // 收起
        newRowKeys = newRowKeys.filter(k => k !== rowKey);
      }

      setExpandedRowKeysState(newRowKeys);

      onExpandedRowsChange && onExpandedRowsChange(newRowKeys);
    },
    [finalExpandedRowKeys, getRowKey, onExpand, onExpandedRowsChange],
  );

  // generate Table rowSelection
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const isControlledRowSelection = rowSelection && 'selectedRowKeys' in rowSelection;
  const finalSelectedRowKeys =
    isControlledRowSelection && rowSelection && rowSelection.selectedRowKeys
      ? rowSelection.selectedRowKeys
      : selectedRowKeys;
  if (rowSelection) {
    const isDisabledCheckbox = (d: D) => {
      const disabled = rowSelection.getCheckboxProps
        ? rowSelection.getCheckboxProps(d).disabled
        : false;
      return disabled;
    };

    const getSelectedRows = (dataSource: D[], selectedRowKeys: any[]): D[] => {
      return dataSource.reduce<D[]>((prev, r, rIndex) => {
        const rowChildren = (r as any)[childrenColumnName];
        const rowHasChildren = rowChildren && Array.isArray(rowChildren);
        if (selectedRowKeys.includes(getRowKey(r, rIndex))) {
          prev.push(r);
        }
        if (rowHasChildren) {
          return prev.concat(getSelectedRows(rowChildren, selectedRowKeys));
        }
        return prev;
      }, []);
    };

    const getAllRowKeys = (dataSource: D[]): any[] => {
      return dataSource
        .reduce<any[]>((prev, r, rIndex) => {
          const key = getRowKey(r, rIndex);
          const rowChildren = (r as any)[childrenColumnName];
          const rowHasChildren = rowChildren && Array.isArray(rowChildren);
          // 选中/取消所有可用的checkbox，需要过滤disabled checkbox
          if (!isDisabledCheckbox(r)) {
            prev.push(key);
          }
          if (rowHasChildren) {
            return prev.concat(getAllRowKeys(rowChildren));
          }
          return prev;
        }, [])
        .filter(k => !!k);
    };

    const handleCheckboxChange = (selected: boolean, rowKey: React.Key, row: D) => {
      const newSelectedRowKeys = selected
        ? uniq([...finalSelectedRowKeys, rowKey])
        : filter(finalSelectedRowKeys, k => k !== rowKey);
      setSelectedRowKeys(newSelectedRowKeys);

      const selectedRows = getSelectedRows(finalDataSource, newSelectedRowKeys);
      rowSelection.onChange && rowSelection.onChange(newSelectedRowKeys, selectedRows);
      rowSelection.onSelect && rowSelection.onSelect(selected, row);
    };

    const handleAllCheckboxChange = (selected: boolean) => {
      const targetRowKeys = getAllRowKeys(finalDataSource);
      const newSelectedRowKeys = selected
        ? uniq([...finalSelectedRowKeys, ...targetRowKeys])
        : filter(finalSelectedRowKeys, k => !targetRowKeys.includes(k));
      setSelectedRowKeys(newSelectedRowKeys);

      const selectedRows = getSelectedRows(finalDataSource, newSelectedRowKeys);
      rowSelection.onChange && rowSelection.onChange(newSelectedRowKeys, selectedRows);
      rowSelection.onSelectAll && rowSelection.onSelectAll(selected, selectedRows);
    };

    /**
     * 这两个状态的判断，都需要忽略掉disabled checkbox的值
     * 1. allChecked 所有Checkbox是否均选中
     * 2. allIndeterminate 是否展示全选Checkbox的indeterminate状态
     */
    const availableData = finalDataSource.filter(r => !isDisabledCheckbox(r));
    const allChecked = availableData.length
      ? availableData.every((r, rIndex) => finalSelectedRowKeys.includes(getRowKey(r, rIndex)))
      : false;
    const allIndeterminate =
      !allChecked &&
      availableData.some((r, rIndex) => finalSelectedRowKeys.includes(getRowKey(r, rIndex)));

    // 注入 selection-column
    const defaultSelectionColumnTitle = (
      <Checkbox
        onChange={e => handleAllCheckboxChange(e.target.checked)}
        checked={allChecked}
        indeterminate={allIndeterminate}
      />
    );
    const defaultSelectionColumnWidth = 60;
    const selectionColumn: ITableColumn<any> = {
      key: 'selection-column',
      width: rowSelection.columnWidth || defaultSelectionColumnWidth,
      title: rowSelection.columnTitle || defaultSelectionColumnTitle,
      render: (data, _cIndex, rIndex) => {
        const finalRowKey = getRowKey(data, rIndex);
        const checkboxProps: ICheckboxProps = rowSelection.getCheckboxProps
          ? rowSelection.getCheckboxProps(data)
          : {};
        return (
          <Checkbox
            onChange={e => handleCheckboxChange(e.target.checked, finalRowKey, data)}
            checked={finalSelectedRowKeys.includes(finalRowKey)}
            {...checkboxProps}
          />
        );
      },
    };
    if (leftFixedColumns.length) {
      selectionColumn.fixed = 'left';
    }
    if (columns[0] && columns[0].key === 'selection-column') {
      columns[0] = selectionColumn;
    } else {
      columns.unshift(selectionColumn);
    }
  }

  // tableLayout
  const tableLayoutByColumns = useMemo(
    () =>
      columns.some(c => 'width' in c || ('ellipsis' in c ? c.ellipsis : ellipsisProp))
        ? 'fixed'
        : 'auto',
    [columns, ellipsisProp],
  );
  const tableLayout = useMemo(() => tableLayoutProp || tableLayoutByColumns, [
    tableLayoutByColumns,
    tableLayoutProp,
  ]);

  // callbacks
  const handleSort = useEventCallback((column: ITableColumn<D>) => {
    if (!column.sorter) return;
    setTableState(prevState => {
      const { sortDirections = defaultSortDirections } = column;
      const { sortOrder, sortColumnKey } = prevState;
      let newSortOrder: ITableSortOrder | undefined;

      // 切换新的列时，直接使用sortDirection的第一个值来初始化
      if (column.key === sortColumnKey && sortOrder !== undefined) {
        // 按照sortDirections的内容依次切换排序状态
        const methodIndex = sortDirections.indexOf(sortOrder) + 1;
        newSortOrder =
          methodIndex === sortDirections.length ? undefined : sortDirections[methodIndex];
      } else {
        newSortOrder = sortDirections[0];
      }

      const newTableState = {
        ...prevState,
        sortOrder: newSortOrder,
        sortColumnKey: newSortOrder ? column.key : '',
      };

      onChange && onChange(newTableState);

      return newTableState;
    });
  }, []);

  const setFilterValues = useCallback(
    (
      column: ITableColumn<any>,
      updater: (currentFilterColumn: ITableFilterColumn) => Partial<ITableFilterColumn>,
      cb?: (newFilterColumnsList: ITableFilterColumn[]) => void,
    ) => {
      const columnKey = column.key;
      setFilterColumnListState(prev => {
        let newFilterColumnsList = [...prev];

        // 新建数据
        if (!newFilterColumnsList.filter(f => f.key === columnKey).length) {
          newFilterColumnsList.push({
            key: columnKey,
            selectedFilterValues: [],
            filterValues: column.filters ? column.filters.map(f => f.value) : [],
          });
        }

        newFilterColumnsList = newFilterColumnsList.map(c => {
          if (c.key === columnKey) {
            return {
              ...c,
              ...updater(c),
            };
          }
          return c;
        });

        cb && cb(newFilterColumnsList);

        return newFilterColumnsList;
      });
    },
    [],
  );

  const syncFilterColumnsList = useCallback(
    (outerFilterColumnList?: ITableFilterColumn[]) => {
      setTableState(prev => {
        const newTableState = {
          ...prev,
          filterColumnList: outerFilterColumnList || filterColumnListState,
        };

        onChange && onChange(newTableState);

        return newTableState;
      });
    },
    [filterColumnListState, onChange],
  );

  const setFilterColumnKey = useCallback(
    (c: ITableColumn<any>) => {
      setTableState(prev => {
        const filterColumnKeyChanged = prev.filterColumnKey !== c.key;
        if (filterColumnKeyChanged) {
          const newTableState = { ...prev, filterColumnKey: c.key };

          onChange && onChange(newTableState);

          return newTableState;
        }
        return prev;
      });
    },
    [onChange],
  );

  const handleFixedColumnShadow = useCallback((node: HTMLDivElement) => {
    const { scrollLeft, clientWidth, scrollWidth } = node;
    if (scrollLeft <= 0) {
      setShowLeftColumnsShadow(false);
    } else {
      setShowLeftColumnsShadow(true);
    }

    if (scrollWidth > clientWidth) {
      if (scrollLeft + clientWidth === scrollWidth) {
        setShowRightColumnsShadow(false);
      } else {
        setShowRightColumnsShadow(true);
      }
    }
  }, []);

  const handleTableWrapperScroll = useMemo(
    () =>
      forkHandler(e => {
        handleFixedColumnShadow(e.target as any);
      }, onScroll),
    [handleFixedColumnShadow, onScroll],
  );

  const handleTableWrapperRef = useCallback(
    (e: HTMLDivElement | null) => {
      if (!e || e === container) return; // 减少不必要的状态更新
      setContainer(e);
    },
    [container],
  );

  // Render headers
  const headers = useMemo(() => {
    const { HeaderCell } = components;
    const headerRowProps = onHeaderRow && onHeaderRow();
    const thList = columns.map((c, cIndex) => {
      const {
        sortDirections = defaultSortDirections,
        renderFilterContent,
        sorter,
        filters = [],
        key,
        title,
      } = c;
      const hasSorter = !!sorter;
      const hasFilter = (!!filters && !!filters.length) || !!renderFilterContent;
      const hasAction = hasSorter || hasFilter;
      const isSortColumn = key === tableState.sortColumnKey;
      const filterColumn = filterColumnListState.filter(fc => fc.key === c.key)[0];
      const outerHeaderCellProps = onHeaderCell ? onHeaderCell(c, cIndex) : {};
      const headerCellProps: ITableCellProps = {
        ...outerHeaderCellProps,
        style: {
          width: addPx(c.width),
          ...outerHeaderCellProps.style,
        },
      };

      if (HeaderCell) {
        return (
          <HeaderCell key={key} {...headerCellProps}>
            {title}
          </HeaderCell>
        );
      }

      // 无操作，直接返回th元素
      if (!hasAction) {
        return (
          <th key={key} {...headerCellProps}>
            {title}
          </th>
        );
      }

      // 有排序 or 筛选的情况
      const selectedFilterValues = filterColumn ? filterColumn.selectedFilterValues : [];
      const setSelectedFilterValues = (
        filterValues: TableFilterValue[],
        cb?: (newFilterColumnsList: ITableFilterColumn[]) => void,
      ) => {
        setFilterValues(c, () => ({ selectedFilterValues: filterValues }), cb);
      };

      const sortIcons = (
        <>
          {sortDirections.includes('ascend') && (
            <StyledSortUpArrow>{<UpArrowIconToken />}</StyledSortUpArrow>
          )}
          {sortDirections.includes('descend') && (
            <StyledSortBottomArrow>{<BottomArrowIconToken />}</StyledSortBottomArrow>
          )}
        </>
      );

      const filterPopoverCard = (
        <FilterPopoverCard
          column={c}
          activeColumnKey={tableState.filterColumnKey}
          selectedFilterValues={selectedFilterValues}
          setSelectedFilterValues={setSelectedFilterValues}
          setFilterColumnKey={setFilterColumnKey}
          syncFilterColumnsList={syncFilterColumnsList}
        />
      );

      /* mvp阶段固定只有一级表头 */
      return (
        <StyledHeader
          key={key}
          theme={theme}
          $sortOrder={tableState.sortOrder}
          $isSortColumn={isSortColumn}
          style={{ width: addPx(c.width) }}
          {...headerCellProps}
        >
          <StyledHeaderContent onClick={() => handleSort(c)}>
            {title}
            <StyledHeaderIconWrapper>
              {/* 排序图标优先放在内容区域内 */}
              {hasSorter ? sortIcons : filterPopoverCard}
            </StyledHeaderIconWrapper>
          </StyledHeaderContent>
          {/* 排序图标存在的情况下，筛选按钮放在后面 */}
          {hasSorter && hasFilter ? filterPopoverCard : null}
        </StyledHeader>
      );
    });
    return <tr {...headerRowProps}>{thList}</tr>;
  }, [
    components,
    columns,
    defaultSortDirections,
    tableState.sortColumnKey,
    tableState.filterColumnKey,
    tableState.sortOrder,
    filterColumnListState,
    theme,
    onHeaderRow,
    onHeaderCell,
    setFilterColumnKey,
    syncFilterColumnsList,
    setFilterValues,
    handleSort,
  ]);

  const rows = useMemo(() => {
    // 空状态
    if (!finalDataSource.length) {
      let emptyResult = emptyText;
      if (!emptyText) {
        emptyResult = <Result subTitle={locale['Table.emptyText']} type="emptySmall" />;
      } else if (typeof emptyText === 'string') {
        emptyResult = <Result subTitle={emptyText} type="emptySmall" />;
      }

      return (
        <StyledEmptyTr>
          <td colSpan={columns.length} style={{ textAlign: 'center' }}>
            {emptyResult}
          </td>
        </StyledEmptyTr>
      );
    }
    const renderRows = (dataSource: D[], indent = 0) => {
      return dataSource.map((d, rIndex) => {
        const rowProps = onRow && onRow(d, rIndex);
        const bodyRowKey = getRowKey(d, rIndex);
        const { BodyRow, BodyCell } = components;
        const bodyRowProps: ITableBodyRowProps<D> = {
          rowKey: bodyRowKey,
          rowIndex: rIndex,
          data: d,
          rowProps,
        };
        const currentRowExpanded = finalExpandedRowKeys.includes(bodyRowKey); // 当前行展开状态
        const currentRowExpandable = allExpandableRowKeys.includes(bodyRowKey); // 当前行是否可展开
        const rowChildren = (d as any)[childrenColumnName];
        const cells = columns.map((c, cIndex) => {
          const {
            render,
            dataIndex,
            key,
            width,
            ellipsis = ellipsisProp,
            ellipsisTooltip = true,
          } = c;
          const cellStyle: CSSProperties = { width: addPx(width) };
          const outerCellProps = onCell ? onCell(d, rIndex, c, cIndex) : {};
          const cellProps: ITableCellProps = {
            ...outerCellProps,
            style: {
              ...cellStyle,
              ...outerCellProps.style,
            },
          };
          const bodyCellProps: ITableBodyCellProps<D> = {
            ...bodyRowProps,
            columnKey: key,
            columnIndex: cIndex,
            column: c,
            cellProps,
          };
          const text = dataIndex ? d[dataIndex] : '';
          const rawContent = render ? render(d, cIndex, rIndex) : text;
          const ellipsisContent = (
            <EllipsisContent enableTooltip={ellipsisTooltip}>{rawContent}</EllipsisContent>
          );
          let cellContent = ellipsis ? ellipsisContent : rawContent;
          if (
            cIndex === (rowSelection ? 1 : 0) && // 第一列
            !!allExpandableRowKeys.length // 存在可展开的行
          ) {
            cellContent = (
              <>
                {indent ? (
                  <div style={{ width: indent, height: 1, display: 'inline-block' }} />
                ) : null}
                <Space spacing="s6">
                  <StyledExpandButton
                    type="normal"
                    size={size}
                    plain
                    $expanded={currentRowExpanded}
                    $expandable={currentRowExpandable}
                    onClick={() => handleExpandRow(d, rIndex)}
                  />
                  {cellContent}
                </Space>
              </>
            );
          }
          if (BodyCell) {
            return (
              <BodyCell key={key} {...bodyCellProps}>
                {cellContent}
              </BodyCell>
            );
          }
          return (
            <td key={key} {...cellProps}>
              {cellContent}
            </td>
          );
        });
        let expandedRowNode = null;
        if (rowChildren && currentRowExpanded && currentRowExpandable) {
          expandedRowNode = renderRows(rowChildren, indent + indentSize);
        }
        if (expandedRowRender && currentRowExpandable) {
          expandedRowNode = (
            <StyledExpandedTr $expanded={currentRowExpanded}>
              <td colSpan={columns.length}>{expandedRowRender(d, rIndex, currentRowExpanded)}</td>
            </StyledExpandedTr>
          );
        }
        if (BodyRow) {
          return (
            <React.Fragment key={bodyRowKey}>
              <BodyRow {...bodyRowProps}>{cells}</BodyRow>
              {expandedRowNode}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={bodyRowKey}>
            <tr {...rowProps}>{cells}</tr>
            {expandedRowNode}
          </React.Fragment>
        );
      });
    };
    return renderRows(finalDataSource);
  }, [
    finalDataSource,
    emptyText,
    columns,
    locale,
    onRow,
    getRowKey,
    components,
    finalExpandedRowKeys,
    allExpandableRowKeys,
    childrenColumnName,
    expandedRowRender,
    ellipsisProp,
    onCell,
    rowSelection,
    size,
    handleExpandRow,
    indentSize,
  ]);

  const footer = useMemo(() => {
    // 有数据并且Column定义了footer的情况下，渲染表尾
    if (columns.some(c => c.footer) && finalDataSource.length) {
      return (
        <tfoot>
          <tr>
            {columns.map(c => (
              <td key={c.key} style={{ width: addPx(c.width) }}>
                {c.footer}
              </td>
            ))}
          </tr>
        </tfoot>
      );
    }
    return null;
  }, [columns, finalDataSource.length]);

  const table = useMemo(
    () => (
      <StyledTable
        theme={theme}
        bordered={bordered}
        stripe={stripe}
        size={size}
        tableLayout={tableLayout}
        $columns={columns}
      >
        <thead>{headers}</thead>
        <tbody>{rows}</tbody>
        {footer}
      </StyledTable>
    ),
    [bordered, columns, footer, headers, rows, size, stripe, tableLayout, theme],
  );

  const spinNode = useMemo(() => container && <Spin {...spinProps} />, [container, spinProps]);

  return (
    <StyledTableWrapper
      $showLeftColumnsShadow={showLeftColumnsShadow}
      $showRightColumnsShadow={showRightColumnsShadow}
      $columns={columns}
      theme={theme}
      bordered={bordered}
      onScroll={handleTableWrapperScroll}
      ref={handleTableWrapperRef}
      {...other}
    >
      {table}
      {spinNode}
    </StyledTableWrapper>
  );
}
