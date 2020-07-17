import { HTMLAttributes } from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps } from '../types';

export type IPaginationNode = HTMLUListElement;
/**
 * Pagination style keys
 * @styles wrapper 容器
 * @styles input 简洁型页码输入框
 * @styles numberItem 非简洁型数字及箭头 Item
 * @styles simpleNumberItem 简洁型数字 Item
 * @styles simpleArrow 简洁型箭头
 * @styles jumpText 跳至 / 页文字
 */
export type IPaginationStyleKeys =
  | 'wrapper'
  | 'input'
  | 'numberItem'
  | 'simpleNumberItem'
  | 'simpleArrow'
  | 'jumpText';
/**
 * Base Props
 */
export interface IPaginationPureProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IPaginationStyleKeys> {
  /**
   * 默认当前第几页
   * @default 1
   */
  defaultCurrent?: number;
  /**
   * 当前第几页, 受控
   */
  current?: number;
  /**
   * 总记录数
   * @default 0
   */
  totalRecords?: number;
  /**
   * 当前页码改变事件
   */
  onChange?: (page: number) => void;
  /**
   * 是否展示跳页输入框
   * @default false
   */
  showQuickJumper?: boolean;
  /**
   * 简洁型
   * @default false
   */
  simple?: boolean;
  /**
   * 选中页两侧展示几项
   * @default 2
   */
  midSideWidth?: number;
  /**
   * 是否是深色背景
   * @default false
   */
  isDarkBackground?: boolean;
  /**
   * 每页数量
   */
  pageSize?: number;
  /**
   * 每页数量
   * @default 10
   */
  defaultPageSize?: number;
  /**
   * 是否展示 `pageSize` 切换器
   * @default false
   */
  showPageSizeChanger?: boolean;
  /**
   * 可以切换的 `pageSize` 列表
   * @default [10, 20, 50, 100]
   */
  pageSizeOptions?: number[];
  /**
   * 当 `pageSize` 变化时触发
   */
  onPageSizeChange?: (pageSize: number) => void;
}

export type IPaginationProps = IPaginationPureProps &
  Omit<HTMLAttributes<HTMLUListElement>, 'onChange'>;
