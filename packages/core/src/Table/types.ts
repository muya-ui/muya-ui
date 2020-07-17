import React, { Key, CSSProperties, HTMLAttributes, RefAttributes } from 'react';
import { ISpinProps } from '../Spin';
import { IPopoverCardProps } from '../PopoverCard';
import { ISizeSpecBaseProps, Omit } from '../types';
import { ICheckboxProps } from '../Checkbox';

export type ITableRowProps = HTMLAttributes<HTMLTableRowElement> &
  RefAttributes<HTMLTableRowElement> &
  Record<string, any>;
export type ITableCellProps = HTMLAttributes<HTMLTableCellElement> &
  RefAttributes<HTMLTableCellElement> &
  Record<string, any>;

export interface ITableExpandableConfig<D> {
  /**
   * 默认展开所有行
   *
   * @type {boolean}
   * @memberof ITableExpandableConfig
   */
  defaultExpandAllRows?: boolean;
  /**
   * 默认展开的rowKeys
   *
   * @type {React.Key[]}
   * @memberof ITableExpandableConfig
   */
  defaultExpandedRowKeys?: React.Key[];
  /**
   * 展开的rowKeys，受控模式使用
   *
   * @type {React.Key[]}
   * @memberof ITableExpandableConfig
   */
  expandedRowKeys?: React.Key[];
  /**
   * 展开行数据变化时触发该事件
   *
   * @memberof ITableExpandableConfig
   */
  onExpandedRowsChange?: (expandedRowKeys: React.Key[]) => void;
  /**
   * 任意行展开/收起时触发该事件
   *
   * @memberof ITableExpandableConfig
   */
  onExpand?: (expanded: boolean, record: D) => void;
  /**
   * 展开列的渲染逻辑
   *
   * @memberof ITableExpandableConfig
   */
  expandedRowRender?: (record: D, rowIndex: number, expanded: boolean) => React.ReactNode;
  /**
   * 控制列是否可以展开的逻辑
   *
   * @memberof ITableExpandableConfig
   */
  rowExpandable?: (record: D) => boolean;
  /**
   * 缩进宽度
   * @default 16
   * @type {number}
   * @memberof ITableExpandableConfig
   */
  indentSize?: number;
  /**
   * 指定树形结构的列名
   *
   * @default 'children'
   * @type {string}
   * @memberof ITableExpandableConfig
   */
  childrenColumnName?: string;
}

export interface ITableBodyRowProps<D> {
  /**
   * 当前行序号
   *
   * @type {number}
   * @memberof ITableBodyRowProps
   */
  rowIndex: number;
  /**
   * 当前行对应的key
   *
   * @type {*}
   * @memberof ITableBodyRowProps
   */
  rowKey: any;
  /**
   * 当前行对应的数据
   *
   * @type {D}
   * @memberof ITableBodyRowProps
   */
  data: D;
  /**
   * 传给tr元素的props
   *
   * @type {(ITableRowProps)}
   * @memberof ITableBodyRowProps
   */
  rowProps?: ITableRowProps;
  /**
   * 子节点
   *
   * @type {React.ReactNode}
   * @memberof ITableBodyRowProps
   */
  children?: React.ReactNode;
}

export interface ITableBodyCellProps<D> extends ITableBodyRowProps<D> {
  /**
   * 当前单元格对应的列序号
   *
   * @type {number}
   * @memberof ITableBodyCellProps
   */
  columnIndex: number;
  /**
   * 单元格所在列对应的key
   *
   * @type {*}
   * @memberof ITableBodyCellProps
   */
  columnKey: any;
  /**
   * 单元格所处的column数据
   *
   * @type {ITableColumn<D>}
   * @memberof ITableBodyCellProps
   */
  column: ITableColumn<D>;
  /**
   * 传给td的props
   *
   * @type {(ITableCellProps)}
   * @memberof ITableBodyCellProps
   */
  cellProps?: ITableCellProps;
}

export interface ITableComponents<D> {
  BodyRow?: React.ComponentType<ITableBodyRowProps<D>>;
  BodyCell?: React.ComponentType<ITableBodyCellProps<D>>;
  HeaderCell?: React.ComponentType<HTMLAttributes<HTMLTableHeaderCellElement>>;
}

export type TableFilterValue = string | number;

export interface ITableRowSelection<D> {
  /**
   * 受控模式使用，设置当前已选中的row keys
   *
   * @type {React.Key[]}
   * @memberof ITableRowSelection
   */
  selectedRowKeys?: React.Key[];
  /**
   * 选择列的宽度
   *
   * @default 60
   * @type {(string | number)}
   * @memberof ITableRowSelection
   */
  columnWidth?: string | number;
  /**
   * 选择列的表头，默认为全选/取消全选的Checkbox
   *
   * @type {(React.ReactNode)}
   * @memberof ITableRowSelection
   */
  columnTitle?: React.ReactNode;
  /**
   * 选中的row keys发生变化时的回调函数
   *
   * @memberof ITableRowSelection
   */
  onChange?: (selectedRowKeys: React.Key[], selectedRows: D[]) => void;
  /**
   * 设置Checkbox的属性
   *
   * @memberof ITableRowSelection
   */
  getCheckboxProps?: (data: D) => ICheckboxProps;
  /**
   * Checkbox 选中/取消时的回调
   *
   * @memberof ITableRowSelection
   */
  onSelect?: (selected: boolean, selectedRow: D) => void;
  /**
   * 全选/取消全选时的回调
   *
   * @memberof ITableRowSelection
   */
  onSelectAll?: (selected: boolean, selectedRows: D[]) => void;
}

export interface ITableFilterColumn {
  /**
   * 唯一key值
   *
   * @type {React.Key}
   * @memberof ITableFilterColumn
   */
  key: React.Key;
  /**
   * 筛选项的数据
   *
   * @type {TableFilterValue[]}
   * @memberof ITableFilterColumn
   */
  filterValues: TableFilterValue[];
  /**
   * 已选中的筛选项数据
   *
   * @type {TableFilterValue[]}
   * @memberof ITableFilterColumn
   */
  selectedFilterValues: TableFilterValue[];
}

/**
 *
 * table column 结构
 *
 * @export
 * @interface ITableColumn
 * @template D
 */
export interface ITableColumn<D> {
  /**
   * 当前列的表头内容
   *
   * @type {React.ReactNode}
   * @memberof ITableColumn
   */
  title?: React.ReactNode;
  /**
   * 当前列的表尾内容
   *
   * @type {React.ReactNode}
   * @memberof ITableColumn
   */
  footer?: React.ReactNode;
  /**
   * 每一列所对应的key
   *
   * @type {Key}
   * @memberof ITableColumn
   */
  key: Key;
  /**
   * 表格内容默认为: dataSource[index][dataIndex]
   *
   * @type {keyof D}
   * @memberof ITableColumn
   */
  dataIndex?: keyof D;
  /**
   * 自定义表格内容渲染逻辑
   *
   * @argument data 当前单元格的数据
   * @argument columnIndex 当前单元格所在列的index
   * @argument rowIndex 当前单元格所在行的index
   * @memberof ITableColumn
   */
  render?: (data: D, columnIndex: number, rowIndex: number) => React.ReactNode;
  /**
   * 开启table排序功能，并指定排序函数
   *
   * @memberof ITableColumn
   */
  sorter?: (a: D, b: D, sortOrder?: ITableSortOrder) => number;
  /**
   * 设置筛选功能
   *
   * @type {Array<{
   *     text: React.ReactNode;
   *     value: TableFilterValue;
   *   }>}
   * @memberof ITableColumn
   */
  filters?: Array<{
    text: React.ReactNode;
    value: TableFilterValue;
  }>;
  /**
   * 自定义筛选逻辑
   *
   * @memberof ITableColumn
   */
  onFilter?: (value: TableFilterValue, record: D) => boolean;
  /**
   * 筛选面板展开/收起时的事件
   *
   * @memberof ITableColumn
   */
  onFilterVisibleChange?: (visible: boolean) => void;
  /**
   * 筛选面板展开动画完成事件
   *
   * @memberof ITableColumn
   */
  onFilterEntered?: () => void;
  /**
   * 筛选面板收起动画完成事件
   *
   * @memberof ITableColumn
   */
  onFilterExited?: () => void;
  /**
   * 自定义筛选面板内容的渲染
   *
   * @memberof IFilterPopoverCardProps
   */
  renderFilterContent?: (props: IRenderFilterContentProps) => React.ReactNode;
  /**
   * 自定义筛选面板行动区域的渲染
   *
   * @memberof IFilterPopoverCardProps
   */
  renderFilterActions?: (props: IRenderFilterContentProps) => React.ReactNode;
  /**
   * 自定义筛选按钮
   *
   * @type {React.ReactNode}
   * @memberof ITableColumn
   */
  filterIcon?: React.ReactNode;
  /**
   * 手动控制筛选面板展开状态
   *
   * @type {boolean}
   * @memberof ITableColumn
   */
  filterVisible?: boolean;
  /**
   * 是否多选
   *
   * @default true
   * @type {boolean}
   * @memberof ITableColumn
   */
  filterMultiple?: boolean;
  /**
   * 是否高亮内部筛选图标
   * @default false
   * @type {boolean}
   * @memberof ITableColumn
   */
  filterIconHighlight?: boolean;
  /**
   * 支持的排序方式，取值为 'ascend' 'descend'
   *
   * @type {ITableSortOrder[]}
   * @memberof ITableColumn
   */
  sortDirections?: ITableSortOrder[];
  /**
   * 列定宽
   *
   * @type {number}
   * @memberof ITableColumn
   */
  width?: number | string;
  /**
   * 超过宽度将自动省略，暂不支持和排序筛选一起使用。
   * 设置为 true 时，表格布局将变成 tableLayout="fixed"。
   *
   * @default false
   * @type {boolean}
   * @memberof ITableColumn
   */
  ellipsis?: boolean;
  /**
   * ellipsis情况下，是否使用Tooltip展示详细内容
   *
   * @default true
   * @type {boolean}
   * @memberof ITableColumn
   */
  ellipsisTooltip?: boolean;
  /**
   * 固定当前列，可配置固定的方向
   *
   * @type {('left' | 'right')}
   * @memberof ITableColumn
   */
  fixed?: 'left' | 'right';
  // children?: ITableColumn<D>[]; // 多级表头，表头分组 mvp不做
  // fixed?: boolean | ('left' | 'right'); // 固定列 mvp不做
}

export type ITableSortOrder = 'descend' | 'ascend';

export interface ITableState {
  /**
   * 当前处于排序状态的Column
   *
   * @type {React.Key}
   * @memberof ITableState
   */
  sortColumnKey: React.Key;
  /**
   * 当前处于筛选状态的Column
   *
   * @type {React.Key}
   * @memberof ITableState
   */
  filterColumnKey: React.Key;
  /**
   * 当前排序的类型
   *
   * @type {ITableSortOrder}
   * @memberof ITableState
   */
  sortOrder?: ITableSortOrder;
  /**
   * 当前列筛选的数据
   *
   * @type {Array<ITableFilterColumnState>}
   * @memberof ITableState
   */
  filterColumnList: Array<ITableFilterColumn>;
}

/**
 *
 * Table组件参数
 *
 * @export
 * @interface ITableProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @template D dataSource中子项的类型
 *
 */
export interface ITableProps<D>
  extends ISizeSpecBaseProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 表格数据源
   *
   * @type {D[]}
   * @memberof ITableProps
   */
  dataSource: D[];
  /**
   * 表格列配置
   *
   * @type {ITableColumn<D>[]}
   * @memberof ITableProps
   */
  columns: ITableColumn<D>[];
  /**
   * 使用带边框的表格
   *
   * @type {boolean}
   * @memberof ITableProps
   * @default false
   */
  bordered?: boolean;
  /**
   * 使用斑马条纹的表格
   *
   * @type {boolean}
   * @memberof ITableProps
   * @default false
   */
  stripe?: boolean;
  /**
   * 空状态时提示文字
   *
   * @type {React.ReactNode}
   * @memberof ITableProps
   */
  emptyText?: React.ReactNode;
  /**
   * 渲染row时的key，默认取dataSource中子项的key
   *
   * @default 'key'
   * @memberof ITableProps
   */
  rowKey?: keyof D | ((data: D, index: number) => string);
  /**
   * 表格加载状态
   *
   * @type {(boolean | ISpinProps)}
   * @memberof ITableProps
   * @default false
   */
  loading?: boolean | Partial<ISpinProps>;
  /**
   * 固定表头
   *
   * @type {boolean}
   * @memberof ITableProps
   */
  fixedHeader?: boolean;
  /**
   * 固定表尾
   *
   * @type {boolean}
   * @memberof ITableProps
   */
  fixedFooter?: boolean;
  /**
   * 默认排序规则
   *
   * @type {ITableSortOrder[]}
   * @memberof ITableProps
   * @default ['ascend', 'descend']
   */
  defaultSortDirections?: ITableSortOrder[];
  /**
   * 设置默认的tableState
   *
   * @type {ITableState}
   * @memberof ITableProps
   */
  defaultTableState?: Partial<ITableState>;
  /**
   * Table内部状态发生变化时的回调函数
   *
   * @memberof ITableProps
   */
  onChange?: (state: ITableState) => void;
  /**
   * Table数据源发生变化时的回调函数
   *
   * @memberof ITableProps
   */
  onDataSourceChange?: (currentDataSource: D[]) => void;
  /**
   * 1. 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局
   * 2. 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
   *
   * @type {('auto' | 'fixed')}
   * @memberof ITableProps
   */
  tableLayout?: 'auto' | 'fixed';
  /**
   * 设置table columns默认的ellipsis属性
   *
   * @default false
   * @type {boolean}
   * @memberof ITableProps
   */
  ellipsis?: boolean;
  /**
   * 自定义style
   *
   * @type {CSSProperties}
   * @memberof ITableProps
   */
  style?: CSSProperties;
  /**
   * 自定义类名
   *
   * @type {string}
   * @memberof ITableProps
   */
  className?: string;
  /**
   * 表格是否可以选择
   *
   * @type {ITableRowSelection<D>}
   * @memberof ITableProps
   */
  rowSelection?: ITableRowSelection<D>;
  /**
   * 自定义表格行的属性
   *
   * @memberof ITableProps
   */
  onRow?: (data: D, rowIndex: number) => ITableRowProps;
  /**
   * 自定义单元格的属性
   *
   * @memberof ITableProps
   */
  onCell?: (
    data: D,
    rowIndex: number,
    column: ITableColumn<D>,
    columnIndex: number,
  ) => ITableCellProps;
  /**
   * 自定义表头行的属性
   *
   * @memberof ITableProps
   */
  onHeaderRow?: () => ITableRowProps;
  /**
   * 自定义表头单元格的属性
   *
   * @memberof ITableProps
   */
  onHeaderCell?: (column: ITableColumn<D>, columnIndex: number) => ITableCellProps;
  /**
   * 覆盖默认的 table 元素
   *
   * @default {}
   * @type {ITableComponents}
   * @memberof ITableProps
   */
  components?: ITableComponents<D>;
  /**
   * 展开功能的配置
   *
   * @type {ITableExpandableConfig<D>}
   * @memberof ITableProps
   * @default {}
   */
  expandable?: ITableExpandableConfig<D>;
}

export interface IFilterPopoverCardProps
  extends Omit<IPopoverCardProps, 'children'>,
    ISizeSpecBaseProps {
  /**
   * 筛选面板所在列对应的column数据
   *
   * @type {ITableColumn<any>}
   * @memberof IFilterPopoverCardProps
   */
  column: ITableColumn<any>;
  /**
   * 当前所激活的column.key
   *
   * @type {React.Key}
   * @memberof IFilterPopoverCardProps
   */
  activeColumnKey?: React.Key;
  /**
   * 当前选中的数据，多选/单选组会使用该数据渲染
   *
   * @type {TableFilterValue[]}
   * @memberof IFilterPopoverCardProps
   */
  selectedFilterValues: TableFilterValue[];
  /**
   * 设置内部`selectedFilterValues`的数据
   *
   * @memberof IFilterPopoverCardProps
   */
  setSelectedFilterValues: (
    filterValues: TableFilterValue[],
    cb?: (newFilterColumnsList: ITableFilterColumn[]) => void,
  ) => void;
  /**
   * 设置当前激活筛选项的column.key
   *
   * @memberof IFilterPopoverCardProps
   */
  setFilterColumnKey: (column: ITableColumn<any>) => void;
  /**
   * 将selectedFilterValues同步到tableState.filterColumnList中，调用后会触发一次`Table.onChange`事件
   *
   * @memberof IFilterPopoverCardProps
   */
  syncFilterColumnsList: (outerFilterColumnList?: ITableFilterColumn[]) => void;
}

export interface IRenderFilterContentProps
  extends Pick<
    IFilterPopoverCardProps,
    | 'syncFilterColumnsList'
    | 'setFilterColumnKey'
    | 'setSelectedFilterValues'
    | 'selectedFilterValues'
  > {
  /**
   * 确认方法，建议确定时手动调用
   *
   * @memberof IRenderFilterContentProps
   */
  confirm: () => void;
  /**
   * 重置方法，建议重置时手动调用
   *
   * @memberof IRenderFilterContentProps
   */
  reset: () => void;
}
