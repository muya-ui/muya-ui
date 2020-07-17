# tsdoc 使用

仓库中的 API 文档是通过 `@qunhe/muya-tsdoc` 自动生成的，有一些自定义的 tag 。

> 注意：默认只会从 `packages/**/*/types.ts` 中查找类型

## `@default` 属性的默认值

## `@styles` 标注自定义类名的意义

默认如果不指定具体类型的名字，会按照顺序找

```ts
/**
 * @styles startCircle 第一个滑块
 * @styles endCircle 第2个滑块
 * @styles markPoint 刻度在轨道上的点
 * @styles markPointInclude 刻度在轨道上的点，同时被区间包含
 * @styles marksRow 刻度的行
 * @styles markLabel 刻度的Label
 * @styles track 轨道
 * @styles range 激活区间
 */
export type ISliderStyleKeys =
  | 'startCircle'
  | 'endCircle'
  | 'markPoint'
  | 'markPointInclude'
  | 'marksRow'
  | 'markLabel'
  | 'track'
  | 'range';
```

## `@include` 和 `@ignore`

`@qunhe/muya-tsdoc` 默认自动忽略了 `/BaseProps/` 和 `/PureProps/` ，如果要手动包含或者忽略，则使 `@include` 和 `@ignore` ，比如：

```ts
/**
 * 动画组件的通用 Props
 * @include
 */
export interface IAnimationBaseProps extends Omit<TransitionProps, 'timeout'>, IAnimationBaseHooks {
  /** 包裹的节点 */
  children: IReactElementWithRef;
  /**
   * 动画时间
   * @default 'theme.transiton.spec.duration.normal'
   **/
  timeout?: number;
  /** 创建样式的函数 */
  makeStyles?(state: TransitionStatus, props: IAnimationBaseParams): CSSProperties;
}
/**
 * @ignore
 */
export type IButtonNode = HTMLButtonElement | HTMLAnchorElement;
```

## `@typeText`

有一些类型比较复杂，比如函数、React 节点，当前工具会自动做一些处理，直接使用声明的文本当成类型

比如：

```ts
export interface IDropdownProps {
  /** 菜单 */
  overlay: React.ReactElement<IMenuProps> | IOverlayFunc;
  /** 点击菜单 */
  onOverlayClick?: (selectInfo: IMenuSelectInfo) => void;
}
```

这两种都会直接用 `React.ReactElement<IMenuProps> | IOverlayFunc` 和 `(selectInfo: IMenuSelectInfo) => void`;

如果你直接使用：

```ts
export interface IDropdownProps {
  /**
   * @typeText 1234
   */
  overlay: React.ReactElement<IMenuProps> | IOverlayFunc;
}
```

那么，类型会使用 1234

如果你想强制使用推导出来的类型：

```ts
export interface IDropdownProps {
  /**
   * @typeText use-type
   */
  overlay: React.ReactElement<IMenuProps> | IOverlayFunc;
}
```

那么，类型会把所有都解释出来
