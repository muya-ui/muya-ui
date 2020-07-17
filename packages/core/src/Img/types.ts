import { IImgSuffix, IRectIntersectRect } from '@muya-ui/utils';

import { EventEmitter } from 'events';

import { ICustomStyleBaseProps, Omit } from '../types';

/**
 * @styles loading 加载中
 * @styles error 错误
 * @styles blank 图片为空
 * @styles loaded 加载完成
 */
export type IImgStyleKeys = 'loading' | 'error' | 'blank' | 'loaded';

export interface IImgOption {
  /**
   * 图片是否需要等待加载完成，再显示
   * @default 'on'
   */
  wait?: 'on' | 'off';
  /**
   * 图片是否适配窗口的变化自适应尺寸
   * @default 'off'
   */
  resize?: 'on' | 'off';
  /**
   * 图片是否懒加载
   * @default 'on'
   */
  lazy?: 'on' | 'off';
  /**
   * 自动处理图片后缀，也可以通过传一个正则的字符串，来保留一些原有的后缀
   * @default 'auto'
   */
  clean?: 'auto' | 'off' | string;
  /**
   * OSS 类型，可以是阿里云，或者金山云
   * @default 'auto'
   */
  oss?: 'auto' | 'ali' | 'kss';
  /**
   * 是否自动增加图片处理后缀
   * @default 'on'
   */
  suffix?: 'on' | 'off';
}

export interface IPoolCheckEvent {
  /**
   * 事件类型
   */
  type: 'resize' | 'scroll';
}

export type IImgNode = HTMLDivElement | HTMLSpanElement | HTMLImageElement;

export interface IImgPoolSettings {
  /**
   * 全局图片处理设置
   */
  options: IImgOption;
  /**
   * 全局图片后缀默认设置
   */
  suffixs: IImgSuffix;
  /**
   * 节点是 img 的时候的默认占位图
   */
  defaultImg?: string;
  defaultImgStyle?: React.CSSProperties;
  /**
   * 并行检查并发数限制，默认是 6
   */
  concurrent: number;

  /**
   * 节流时间
   */
  throttleTime: number;

  /**
   * 设置图片检测区域
   * @default
   * {
   *   top: -0.3,
   *   bottom: 0.3,
   *   left: -0.5,
   *   right: 0.5,
   * }
   */
  checkRegion: IRectIntersectRect;
  /**
   * 最大监听数量，见 (method) internal.EventEmitter.setMaxListeners
   * @default 30
   */
  maxListeners?: number;

  /**
   * 全局处理图片后缀
   * @param src 图片原始地址
   * @param suffixs 最终的图片后缀设置
   * @param options 图片处理，这里只有 `clean`\`oss`\ `suffix`
   */
  getImgSrc(src: string, suffixs: IImgSuffix, options: IImgOption): string;
}

export type IImgCheckFn = () => Promise<any>;

export interface IImgPoolIntersectResult {
  rect: ClientRect;
  intersect: boolean;
}
export interface IImgPool extends EventEmitter {
  readonly poolStatus: 'none' | 'ready';
  readonly name: string;
  readonly settings: IImgPoolSettings;
  scrollCheckFns: Set<IImgCheckFn>;
  resizeCheckFns: Set<IImgCheckFn>;
  /**
   * 设置图片池
   * @param settings 图片池的设置
   */
  setup(settings?: Partial<IImgPoolSettings>): Promise<void>;
  /**
   * 销毁图片池
   */
  destroy(): void;
  /**
   * 重置图片池
   * @param settings 图片池设置
   */
  reset(settings?: Partial<IImgPoolSettings>): Promise<void>;
  /**
   * 限流检测
   * @param e 检测事件
   */
  throttleCheck(e: IPoolCheckEvent): Promise<void>;
  /**
   * 执行一次检测
   * @param e 图片池事件
   */
  check(e: IPoolCheckEvent): Promise<void>;
  /**
   * 等待图片池初始化以后再执行
   */
  waitReady(): Promise<any>;
  rectIntersect(el: HTMLElement): IImgPoolIntersectResult;
  getSuffixs(suffixs: IImgSuffix, rect: ClientRect): IImgSuffix;
  /**
   * 利用云图片处理规则来获取图片地址
   * @param src 图片地址
   * @param suffixs 后缀设置
   * @param options 图片处理控制
   */
  getImgSrc(src: string, suffixs: IImgSuffix, options: IImgOption): string;
  getRect(el: HTMLElement): ClientRect;
}

export type IImgAspectRatioType = '1:1' | '4:3' | '3:2' | '16:9' | '3:4';

export interface IImgPureProps
  extends Omit<IImgSuffix, 'width' | 'height'>,
    IImgOption,
    ICustomStyleBaseProps<IImgStyleKeys> {
  /**
   * OSS 图片地址
   */
  src?: string;
  /**
   * 长宽比
   */
  aspectRatio?: IImgAspectRatioType;
  /**
   * 节点类型，可以是 'img' | 'span' | 'div'
   */
  component?: 'img' | 'span' | 'div';
  /**
   * 图片加载完成
   */
  onLoaded?: (e: IImgEvent) => void;
  /**
   * 图片加载失败
   */
  onError?: (e: IImgEvent) => void;
  /**
   * 默认占位图，只在错误和加载状态生效
   */
  defaultImg?: string;
  /**
   * 默认图的样式，注意只有 defaultImg 存在，这个样式才生效
   */
  defaultImgStyle?: React.CSSProperties;
  /**
   * 图片后缀的宽度
   */
  suffixWidth?: IImgSuffix['width'];
  /**
   * 图片后缀的高度
   */
  suffixHeight?: IImgSuffix['height'];

  /**
   * 图片样式的宽度
   */
  width?: string | number;
  /**
   * 图片样式的高度
   */
  height?: string | number;
  /**
   * 加载状态显示的类型
   */
  loadingType?: 'skeleton' | 'spin' | 'default-img';
  /**
   * 延时加载图片
   */
  loadingDelay?: number;
}

export type IImgLoadStatus = 'none' | 'reload' | 'blank' | 'error' | 'loaded';
export interface IImgEvent {
  /**
   * OSS 图片地址
   */
  imgSrc: string;
  /** 图片原始地址 */
  originSrc: string;
  /** 图片加载状态 */
  loadStatus: IImgLoadStatus;
  /** 图片节点的 ClientRect */
  rect?: ClientRect;
  /** 图片的 Image 实例 */
  imgInstance?: HTMLImageElement;
}

export interface IImgPoolProviderProps {
  settings?: Partial<IImgPoolSettings>;
  poolName?: string;
  children?: React.ReactNode;
}
export interface IImgContainerPureProps {
  settings?: Partial<IImgPoolSettings>;
  poolName?: string;
}

export type IImgContainerProps = IImgContainerPureProps & React.HTMLAttributes<HTMLDivElement>;

type OmitPropsDefault = 'onError' | 'onLoaded' | 'width' | 'height';

export type IImgDivProps = IImgPureProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, OmitPropsDefault>;

export type IImgSpanProps = IImgPureProps &
  Omit<React.HTMLAttributes<HTMLSpanElement>, OmitPropsDefault>;

export type IImgImgProps = IImgPureProps &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, OmitPropsDefault>;

export type IImgProps = IImgDivProps | IImgSpanProps | IImgImgProps;
