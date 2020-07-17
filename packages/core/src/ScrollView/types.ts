import { ISizeSpecBaseProps, ICustomStyleBaseProps } from '../types';

/**
 * ScrollView style keys
 *
 * @styles content 内容节点
 */
export type IScrollViewStyleKeys = 'content';

export interface IScrollViewBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IScrollViewStyleKeys> {
  /**
   * 横向滚动
   */
  scrollX?: boolean;
  /**
   * 纵向滚动
   * @default true
   */
  scrollY?: boolean;
  /**
   * 容器宽度
   */
  width?: string | number;
  /**
   * 容器高度
   */
  height?: string | number;
  /**
   * 获取内部content滚动容器的ref
   *
   * @type {React.Ref<HTMLDivElement>}
   * @memberof IScrollViewBaseProps
   */
  contentRef?: React.Ref<HTMLDivElement>;
}

export type IScrollViewProps = IScrollViewBaseProps & React.HTMLAttributes<HTMLDivElement>;
