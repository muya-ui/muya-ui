import React, { HTMLAttributes } from 'react';

import {
  DropEvent,
  DropzoneInputProps,
  DropzoneOptions,
  DropzoneRootProps,
  DropzoneState,
} from 'react-dropzone';

import { ICustomStyleBaseProps, ISizeSpecBaseProps, Omit } from '../types';

export type IUploadFileStatus = 'error' | 'success' | 'uploading';

export type IUploadResultType = 'card' | 'picture' | 'picture-card';

/**
 * @styles iconWrapper icon容器
 * @styles titleWrapper 标题容器
 * @styles subtitleWrapper 子标题容器
 */
export type IUploadCardStyleKeys = 'iconWrapper' | 'titleWrapper' | 'subtitleWrapper';

/**
 * @styles imgWrapper 图片容器
 * @styles img 图片
 * @styles contentWrapper 内容容器
 * @styles fileNameWrapper 文件名容器
 * @styles link 链接
 * @styles errorWrapper 错误的容器
 * @styles errorText 错误文字
 * @styles retryButton 重试按钮
 * @styles iconWrapper icon容器
 * @styles closeIcon 关闭icon
 * @styles progress 进度条
 * @styles cancelButton 取消按钮
 * @styles spin 加载
 * @styles fileIcon 文件图标
 */
export type IUploadResultStyleKeys =
  | 'imgWrapper'
  | 'img'
  | 'contentWrapper'
  | 'fileNameWrapper'
  | 'link'
  | 'errorWrapper'
  | 'errorText'
  | 'retryButton'
  | 'iconWrapper'
  | 'closeIcon'
  | 'progress'
  | 'cancelButton'
  | 'spin'
  | 'fileIcon';

export interface IUploadRef {
  open: IUploadState['open'];
}
export interface IUploadFile {
  /**
   * 唯一id
   *
   * @type {string}
   * @memberof IUploadFile
   */
  uid: string;
  /**
   * 文件的上传状态
   *
   * @type {IUploadFileStatus}
   * @memberof IUploadFile
   */
  status: IUploadFileStatus;
  /**
   * 原始文件数据
   *
   * @type {File}
   * @memberof IUploadFile
   */
  originFile?: File;
  /**
   * 文件名
   *
   * @type {string}
   * @memberof IUploadFile
   */
  filename?: string;
  /**
   * 上传进度百分比
   *
   * @type {number}
   * @memberof IUploadFile
   */
  percent?: number;
  /**
   * 上传后的结果，由Upload中request函数的逻辑决定
   *
   * @type {*}
   * @memberof IUploadFile
   */
  body?: any;
  /**
   * 上传错误的数据，由Upload中request函数的逻辑决定
   *
   * @type {*}
   * @memberof IUploadFile
   */
  error?: any;
  /**
   * 当前已经加载完毕的数据
   *
   * @type {number}
   * @memberof IUploadFile
   */
  loaded?: number;
  /**
   * 上传的总数据
   *
   * @type {number}
   * @memberof IUploadFile
   */
  total?: number;
  /**
   * 取消上传的方法
   *
   * @memberof IUploadFile
   */
  abort?: () => void;
}

// request
export interface IUploadRequestOption {
  /**
   * 需要上传的原始文件
   *
   * @type {File}
   * @memberof IUploadRequestOption
   */
  file: File;
  /**
   * 处理上传进度事件
   *
   * @memberof IUploadRequestOption
   */
  onProgress: (e: ProgressEvent) => void;
  /**
   * 处理上传失败事件
   *
   * @memberof IUploadRequestOption
   */
  onError: (e: any) => void;
  /**
   * 处理上传成功事件
   *
   * @memberof IUploadRequestOption
   */
  onSuccess: (body: any) => void;
}

export interface IUploadRequestResponse {
  /**
   * 取消当前请求的方法
   *
   * @memberof UploadRequest
   */
  abort: () => void;
  [key: string]: any;
}

export type IUploadRequest = (option: IUploadRequestOption) => IUploadRequestResponse;

// hooks
export interface IUploadOptions extends DropzoneOptions {
  /**
   * 当前上传的文件数据，受控模式下使用
   *
   * @type {IUploadFile[]}
   * @memberof IUploadOptions
   */
  uploadFiles?: IUploadFile[];
  /**
   * 上传文件状态发生变化时的事件，受控模式下使用
   *
   * @memberof IUploadOptions
   */
  onChange?: (uploadFiles: IUploadFile[]) => void;
  /**
   * 1. 上传每个文件前都会执行，返回false可以阻止上传
   * 2. 返回IUploadFile对象会使用该对象来做上传，支持返回Promise
   * 3. `beforeUpload`的触发次数等于文件数量
   *
   * @memberof IUploadOptions
   */
  beforeUpload?: (file: IUploadFile) => boolean | IUploadFile | PromiseLike<boolean | IUploadFile>;
  /**
   * 1. 用户选择完文件后，上传所有文件之前会触发此事件，返回false阻止上传
   * 2. 每次选择文件完毕后，该事件只会发生一次，早于`beforeUpload`触发
   * 3. 使用返回的`files`来作为源文件上传
   *
   * @memberof IUploadOptions
   */
  beforeUploadAll?: (selectedFiles: File[], currentUploadFiles: IUploadFile[]) => File[] | boolean;
  /**
   * 自定义上传函数
   *
   * @memberof IUploadOptions
   */
  request: (option: IUploadRequestOption) => IUploadRequestResponse;
  /**
   * 多文件上传时并发数量
   *
   * @type {number}
   * @memberof IUploadOptions
   * @default 10
   */
  limit?: number;
  /**
   * 接收文件的类型
   *
   * @type {(string | string[])}
   * @memberof IUploadOptions
   */
  accept?: string | string[];
  /**
   * 文件最小大小限制，单位为byte
   *
   * @type {number}
   * @memberof IUploadOptions
   */
  minSize?: number;
  /**
   * 文件最大大小限制，单位为byte
   *
   * @type {number}
   * @memberof IUploadOptions
   */
  maxSize?: number;
  /**
   * 禁止在document上放置文件
   *
   * @type {boolean}
   * @memberof IUploadOptions
   */
  preventDropOnDocument?: boolean;
  /**
   * 禁用点击打开file dialog
   *
   * @type {boolean}
   * @memberof IUploadOptions
   */
  noClick?: boolean;
  /**
   * 禁用键盘打开file dialog
   *
   * @type {boolean}
   * @memberof IUploadOptions
   */
  noKeyboard?: boolean;
  /**
   * 禁用拖拽
   *
   * @type {boolean}
   * @memberof IUploadOptions
   */
  noDrag?: boolean;
  /**
   * 禁用拖拽事件的冒泡
   *
   * @type {boolean}
   * @memberof IUploadOptions
   */
  noDragEventsBubbling?: boolean;
  /**
   * 禁用整体上传行为
   *
   * @type {boolean}
   * @memberof IUploadOptions
   */
  disabled?: boolean;
  /**
   * drop事件的回调
   *
   * @template T
   * @param {T[]} acceptedFiles
   * @param {T[]} rejectedFiles
   * @param {DropEvent} event
   * @memberof IUploadOptions
   */
  onDrop?<T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent): void;
  /**
   * 文件符合要求时，触发该事件
   *
   * @template T
   * @param {T[]} files
   * @param {DropEvent} event
   * @memberof IUploadOptions
   */
  onDropAccepted?<T extends File>(files: T[], event: DropEvent): void;
  /**
   * 文件不符合要求时，触发该事件
   *
   * @template T
   * @param {T[]} files
   * @param {DropEvent} event
   * @memberof IUploadOptions
   */
  onDropRejected?<T extends File>(files: T[], event: DropEvent): void;
  /**
   * 从事件对象中获取原始文件
   *
   * @param {DropEvent} event
   * @returns {(Promise<Array<File | DataTransferItem>>)}
   * @memberof IUploadOptions
   */
  getFilesFromEvent?(event: DropEvent): Promise<Array<File | DataTransferItem>>;
  /**
   * 用户关闭file dialog的事件
   *
   * @memberof IUploadOptions
   */
  onFileDialogCancel?(): void;
}

export interface IUploadAction {
  /**
   * 操作当前文件列表的action类型
   *
   * @type {('update' | 'create' | 'delete')}
   * @memberof IUploadAction
   */
  type: 'update' | 'create' | 'delete';
  /**
   * 新的UploadFile数据
   *
   * @type {IUploadFile}
   * @memberof IUploadAction
   */
  data: IUploadFile;
}

export interface IUploadState extends DropzoneState {
  /**
   * 已经上传的文件列表
   *
   * @type {IUploadFile[]}
   * @memberof IUploadState
   */
  uploadFiles: IUploadFile[];
  /**
   * 操作UploadFiles的数据
   *
   * @type {React.Dispatch<IUploadAction>}
   * @memberof IUploadState
   */
  dispatchUploadAction: React.Dispatch<IUploadAction>;
  /**
   * 获取UploadResult组件的props
   *
   * @memberof IUploadState
   */
  getResultProps: (props: Omit<IUploadResultProps, 'theme'>) => Omit<IUploadResultProps, 'theme'>;
  /**
   * 是否处于聚焦状态
   *
   * @type {boolean}
   * @memberof IUploadState
   */
  isFocused: boolean;
  /**
   * 是否处于拖拽激活态
   *
   * @type {boolean}
   * @memberof IUploadState
   */
  isDragActive: boolean;
  /**
   * 所有文件都符合要求
   *
   * @type {boolean}
   * @memberof IUploadState
   */
  isDragAccept: boolean;
  /**
   * 当前是否有不满足要求的文件
   *
   * @type {boolean}
   * @memberof IUploadState
   */
  isDragReject: boolean;
  /**
   * file dialog是否打开
   *
   * @type {boolean}
   * @memberof IUploadState
   */
  isFileDialogActive: boolean;
  /**
   * 当前拖拽的文件列表
   *
   * @type {File[]}
   * @memberof IUploadState
   */
  draggedFiles: File[];
  /**
   * 已接受的文件列表
   *
   * @type {File[]}
   * @memberof IUploadState
   */
  acceptedFiles: File[];
  /**
   * 已拒绝的文件列表
   *
   * @type {File[]}
   * @memberof IUploadState
   */
  rejectedFiles: File[];
  /**
   * 获取root元素的ref
   *
   * @type {React.RefObject<HTMLElement>}
   * @memberof IUploadState
   */
  rootRef: React.RefObject<HTMLElement>;
  /**
   * 获取input元素的ref
   *
   * @type {React.RefObject<HTMLInputElement>}
   * @memberof IUploadState
   */
  inputRef: React.RefObject<HTMLInputElement>;
  /**
   * 获取root元素的props，将props挂载到触发器上
   *
   * @param {DropzoneRootProps} [props]
   * @returns {DropzoneRootProps}
   * @memberof IUploadState
   */
  getRootProps(props?: DropzoneRootProps): DropzoneRootProps;
  /**
   * 获取input元素的props，将props挂载到input元素上
   *
   * @param {DropzoneInputProps} [props]
   * @returns {DropzoneInputProps}
   * @memberof IUploadState
   */
  getInputProps(props?: DropzoneInputProps): DropzoneInputProps;
  /**
   * 手动触发上传
   *
   * @param {File[]} [files]
   * @memberof IUploadState
   */
  manualUpload(files: File[]): Promise<any>;
}

// Upload Component
export interface IUploadProps extends IUploadOptions {
  /**
   * Upload组件的子元素，接收一个函数
   *
   * @param {IUploadState} state
   * @returns {JSX.Element}
   * @memberof IUploadProps
   */
  children?(state: IUploadState): JSX.Element;
  /**
   * Upload render函数，功能同children，但是优先级大于children
   *
   * @param {IUploadState} state
   * @returns {JSX.Element}
   * @memberof IUploadProps
   */
  render?(state: IUploadState): JSX.Element;
}

// UploadList
export interface IUploadResultBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IUploadResultStyleKeys> {
  /**
   * 上传结果的类型
   *
   * @type {IUploadResultType}
   * @memberof IUploadResultProps
   * @default 'picture-card'
   */
  type?: IUploadResultType;
  /**
   * 自定义文件的预览图的逻辑
   *
   * @memberof IUploadResultProps
   */
  previewFile?: () => string | PromiseLike<string>;
  /**
   * Upload组件默认会对图片文件制作一张预览图，此属性可以禁用该行为
   *
   * @default false
   * @type {boolean}
   * @memberof IUploadResultBaseProps
   */
  disableDefaultThumbnail?: boolean;
  /**
   * 自定义移除文件时的回调，默认会移除该文件
   *
   * @memberof IUploadResultProps
   */
  onRemove?: () => void;
  /**
   * 上传失败后的重试行为
   *
   * @memberof IUploadResultProps
   */
  onRetry?: () => void;
  /**
   * 需要展示结果的文件
   *
   * @type {IUploadFile}
   * @memberof IUploadResultProps
   */
  file: IUploadFile;
  /**
   * 需要展示的文件名,默认使用file.originFile.name
   *
   * @type {string}
   * @memberof IUploadResultProps
   */
  filename?: string;
  /**
   * 自定义关闭按钮
   *
   * @type {React.ReactNode}
   * @memberof IUploadResultProps
   */
  closeIcon?: React.ReactNode;
  /**
   * 定义跳转链接，若url存在则可跳转
   *
   * @type {string}
   * @memberof IUploadResultProps
   */
  url?: string;
}

export type IUploadResultProps = IUploadResultBaseProps & HTMLAttributes<HTMLDivElement>;

// UploadCard
export interface IUploadCardBaseProps
  extends ISizeSpecBaseProps,
    ICustomStyleBaseProps<IUploadCardStyleKeys> {
  /**
   * 卡片禁用状态
   * @default false
   * @type {boolean}
   * @memberof IUploadCardProps
   */
  disabled?: boolean;
  /**
   * 拖拽激活状态
   * @default false
   * @type {boolean}
   * @memberof IUploadCardProps
   */
  isDragActive?: boolean;
  /**
   * 卡片宽度
   *
   * @type {number}
   * @memberof IUploadCardProps
   */
  width?: number | string;
  /**
   * 卡片高度
   *
   * @type {number}
   * @memberof IUploadCardProps
   */
  height?: number | string;
  /**
   * 图标
   *
   * @type {React.ReactNode}
   * @memberof IUploadCardProps
   */
  icon?: React.ReactNode;
  /**
   * 卡片标题
   *
   * @type {React.ReactNode}
   * @memberof IUploadCardProps
   */
  title?: React.ReactNode;
  /**
   * 卡片副标题
   *
   * @type {React.ReactNode}
   * @memberof IUploadCardProps
   */
  subtitle?: React.ReactNode;
  /**
   * 自定义卡片内容
   *
   * @type {React.ReactNode}
   * @memberof IUploadCardProps
   */
  children?: React.ReactNode;
}

export interface IUploadPostFileProps extends IUploadRequestOption {
  /**
   * 请求路径
   *
   * @type {string}
   * @memberof IUploadPostFileProps
   */
  action: string;
  /**
   * 自定义FormData中的文件名
   *
   * @type {string}
   * @memberof IUploadPostFileProps
   */
  filename?: string;
  /**
   * 额外携带的数据
   *
   * @type {{ [prop: string]: any }}
   * @memberof IUploadPostFileProps
   */
  data?: { [prop: string]: any };
  /**
   * 设置ajax请求的withCredentials
   *
   * @type {boolean}
   * @memberof IUploadPostFileProps
   */
  withCredentials?: boolean;
  /**
   * 自定义请求头
   *
   * @memberof IUploadPostFileProps
   */
  headers?: {
    [key: string]: string;
  };
}

export type IUploadCardProps = IUploadCardBaseProps & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
