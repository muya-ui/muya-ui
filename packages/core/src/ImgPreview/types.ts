import { IImgPureProps } from '../Img/types';
import { ICustomStyleBaseProps } from '../types';

export type IImgPreviewMode = 'single' | 'multiple';

export interface IImgPreviewPageButtonProps {
  hasPrev: boolean;
  hasNext: boolean;
  toPrevImg: () => void;
  toNextImg: () => void;
}

export interface IImgPreviewPaginationProps {
  imgIndex: number;
  toImgIndex: (imgIndex: number) => void;
}

/**
 * ImgPreview style keys
 * @styles wrapper 最外层节点
 * @styles closeIconWrapper CloseIcon 包裹容器
 * @styles imgLayer ImgLayer 大图层
 * @styles imgWrapper Img 外部容器，overflow 不滚动，用于绑定 renderInImgContainer
 * @styles imgContainer Img 内部容器，overflow 滚动
 * @styles img Img 节点
 * @styles paginationWrapper 分页器容器
 * @styles paginationButton 分页器翻页按钮
 * @styles paginationImg 分页器小图节点
 */
export type IImgPreviewStyleKeys =
  | 'wrapper'
  | 'closeIconWrapper'
  | 'imgLayer'
  | 'imgWrapper'
  | 'imgContainer'
  | 'img'
  | 'paginationWrapper'
  | 'paginationButton'
  | 'paginationImg';

export interface IImgPreviewBaseProps
  extends Omit<IImgPureProps, 'src' | 'styles'>,
    ICustomStyleBaseProps<IImgPreviewStyleKeys> {
  /**
   * 图片预览的模式：单图预览和多图预览
   * @default 'single'
   */
  mode?: IImgPreviewMode;
  /**
   * 大图预览打开状态
   */
  open: boolean;
  /**
   * 图片数组
   */
  src: string | string[];
  /**
   * 多图预览下默认打开的图片的下标
   * @default 0
   */
  defaultIndex?: number;
  /**
   * 是否禁用点击蒙层触发onClose的行为
   * @default false
   */
  disableMaskClick?: boolean;
  /**
   * 隐藏图片 actions 面板
   * @default false
   */
  hideActions?: boolean;
  /**
   * 放大的 icon
   */
  zoomInIcon?: React.ReactNode;
  /**
   * 缩小的 icon
   */
  zoomOutIcon?: React.ReactNode;
  /**
   * 恢复原始缩放的 icon
   */
  resetZoomIcon?: React.ReactNode;
  /**
   * 点击放大的倍数
   * @default 1.25
   */
  scaleStep?: number;
  /**
   * 多选模式下隐藏分页器
   * @default false
   */
  hidePagination?: boolean;
  /**
   * 当图片是异步的时候外部受控 loading 状态
   */
  loading?: boolean;
  /**
   * 图片超出时默认会使用滚动条，将此参数设为 `true` 那么会对图片进行缩放
   * @default false
   */
  overflowResize?: boolean;
  /** 用于快速覆盖轮播的小图的宽度 */
  paginationImgWidth?: number;
  /**
   * 键盘、点击蒙层关闭弹窗时，触发onClose回调
   */
  onClose?: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * 组件退出动画结束触发
   */
  onExited?: () => void;
  /**
   * 自定义 Img 节点上渲染的内容，该容器会随着 Img 的缩放而改变
   */
  renderInImgNode?: (imgSrc: string) => React.ReactNode;
  /**
   * 自定义 Img 容器内渲染的内容，该容器不会随着 Img 的缩放而改变
   */
  renderInImgContainer?: (imgSrc: string) => React.ReactNode;
  /**
   * 自定义翻页的节点
   */
  renderCustomPageButton?: (props: IImgPreviewPageButtonProps) => React.ReactNode;
  /**
   * 自定义翻页的节点
   */
  renderCustomPagination?: (props: IImgPreviewPaginationProps) => React.ReactElement;
}

export type IImgPreviewProps = IImgPreviewBaseProps & React.HTMLAttributes<HTMLDivElement>;
