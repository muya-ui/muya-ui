import { ErrorList, FieldErrorList, Rules } from 'async-validator';

import { FormHTMLAttributes, HTMLAttributes } from 'react';

import { ICustomStyleBaseProps, ISizeSpecBaseProps } from '../types';

export type ILabelPosition = 'left' | 'top' | 'right';

/**
 * FormItem style keys
 * @styles inputWrapper 包裹children(输入控件)的容器
 * @styles label 标签节点
 * @styles innerLabel 标签文本节点
 * @styles requiredWrapper 字段校验规则设置为required时，包裹红色*的节点
 * @styles error 错误提示最外层容器
 * @styles errorParagraph 错误提示段落节点
 */
export type IFormItemStyleKeys =
  | 'inputWrapper'
  | 'label'
  | 'innerLabel'
  | 'requiredWrapper'
  | 'error'
  | 'errorParagraph';

export type IFormTouched<Values> = {
  [K in keyof Values]?: boolean;
};

export interface IFormInstantEditingRenderProps extends ISizeSpecBaseProps {
  /**
   * 当前控件的value
   *
   * @type {*}
   * @memberof IFormInstantEditingRenderProps
   */
  value: any;
  /**
   * 控件节点
   *
   * @type {React.ReactNode}
   * @memberof IFormInstantEditingRenderProps
   */
  inputNode: React.ReactNode;
  /**
   * 是否处于校验中
   *
   * @type {boolean}
   * @memberof IFormInstantEditingRenderProps
   */
  validating: boolean;
  /**
   * 是否处于编辑状态
   *
   * @type {boolean}
   * @memberof IFormInstantEditingRenderProps
   */
  isEditing: boolean;
  /**
   * 取消即时编辑
   *
   * @memberof IFormInstantEditingRenderProps
   */
  cancel: () => void;
  /**
   * 编辑完后提交数据到表单
   *
   * @memberof IFormInstantEditingRenderProps
   */
  confirm: () => void;
  /**
   * 进入即时编辑
   *
   * @memberof IFormInstantEditingRenderProps
   */
  edit: () => void;
  /**
   * 外部传入的`instantEditing.renderContent`渲染内容函数
   *
   * @memberof IFormInstantEditingConfig
   */
  renderContent: (value: any) => React.ReactNode;
  /**
   * 外部传入的`instantEditing.layout`
   * @default 'horizontal'
   * @type {('vertical' | 'horizontal')}
   * @memberof IFormInstantEditingConfig
   */
  layout: 'vertical' | 'horizontal';
}

export interface IFormInstantEditingConfig {
  /**
   * 自定义整个即时编辑功能的渲染
   *
   * @memberof IFormInstantEditingConfig
   */
  render?: (props: IFormInstantEditingRenderProps) => React.ReactNode;
  /**
   * 非编辑状态的渲染逻辑，默认使用排版组件Paragraph渲染
   *
   * @memberof IFormInstantEditingConfig
   */
  renderContent?: (value: any) => React.ReactNode;
  /**
   * 即时编辑布局
   * @default 'horizontal'
   * @type {('vertical' | 'horizontal')}
   * @memberof IFormInstantEditingConfig
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 默认点击页面其他区域，会退出编辑状态，此属性可以禁用该行为
   *
   * @default false
   * @type {boolean}
   * @memberof IFormInstantEditingConfig
   */
  disableClickAway?: boolean;
}

/**
 * Form表单内部state结构
 *
 * @export
 * @interface IFormState
 * @template Values
 */
export interface IFormState<Values> {
  /**
   * 表单数据
   *
   * @type {Values}
   * @memberof IFormState
   */
  values: Values;
  /**
   *  表单错误数据
   *
   * @type {FieldErrorList<Values>}
   * @memberof IFormState
   */
  errors: FieldErrorList;
  /**
   *
   * 用户触及表单项的记录
   *
   * @type {IFormTouched<Values>}
   * @memberof IFormState
   */
  touched: IFormTouched<Values>;
  /**
   *
   * 是否处于提交中
   *
   * @type {boolean}
   * @memberof IFormState
   */
  isSubmitting: boolean;
  /**
   *  是否处于校验中
   *
   * @type {boolean}
   * @memberof IFormState
   */
  isValidating: boolean;
  /**
   * 当前表单状态
   *
   * @type {*}
   * @memberof IFormState
   */
  status?: any;
  /**
   * 总共提交次数
   *
   * @type {number}
   * @memberof IFormState
   */
  submitCount: number;
}

/**
 * 操作Form内部state的工具函数集合
 *
 * @export
 * @interface IFormHelpers
 * @template Values
 */
export interface IFormHelpers<Values> {
  /**
   * 注册校验规则，默认在FormItem挂载之后注册其自带的规则
   *
   * @memberof IFormHelpers
   */
  registerFieldRules: (field: string, rule: Rules[string]) => void;
  /**
   * 注销某个field的校验规则
   *
   * @memberof IFormHelpers
   */
  unregisterFieldRules: (field: string) => void;
  /**
   * 注册表单项的props数据
   *
   * @memberof IFormHelpers
   */
  registerFieldProps: (field: string, props: IFormItemProps<Values>) => void;
  /**
   * 注销某个表单项的props数据
   *
   * @memberof IFormHelpers
   */
  unregisterFieldProps: (field: string) => void;
  /**
   * 设置表单状态
   *
   * @param {*} [status]
   * @memberof IFormHelpers
   */
  setStatus(status?: any): void;
  /**
   * 设置表单整体的错误数据
   *
   * @param {FieldErrorList} errors
   * @memberof IFormHelpers
   */
  setErrors(errors: FieldErrorList): void;
  /**
   * 设置表单是否处于提交中
   *
   * @param {boolean} isSubmitting
   * @memberof IFormHelpers
   */
  setSubmitting(isSubmitting: boolean): void;
  /**
   * 设置表单整体touched
   *
   * @param {IFormTouched<Values>} touched
   * @memberof IFormHelpers
   */
  setTouched(touched: IFormTouched<Values>): void;
  /**
   * 设置表单整体values
   *
   * @param {Values} values
   * @memberof IFormHelpers
   */
  setValues(values: Values, shouldValidate?: boolean): void;
  /**
   * 设置单个field的value
   *
   * @param {(keyof Values & string)} field
   * @param {*} value
   * @param {boolean} [shouldValidate]
   * @memberof IFormHelpers
   */
  setFieldValue(field: keyof Values & string, value: any, shouldValidate?: boolean): void;
  /**
   * 设置单个field的error
   *
   * @param {(keyof Values & string)} field
   * @param {ErrorList} value
   * @memberof IFormHelpers
   */
  setFieldError(field: keyof Values & string, value?: ErrorList): void;
  /**
   * 设置单个field的touched状态
   *
   * @param {(keyof Values & string)} field
   * @param {boolean} [isTouched]
   * @param {boolean} [shouldValidate]
   * @memberof IFormHelpers
   */
  setFieldTouched(
    field: keyof Values & string,
    isTouched?: boolean,
    shouldValidate?: boolean,
  ): void;
  /**
   * 使用已注册的规则，校验整个表单
   *
   * @param {Values} [values]
   * @returns {Promise<void>}
   * @memberof IFormHelpers
   */
  validateForm(values?: Values): Promise<void>;
  /**
   * 根据表单项对应的规则，校验此表单项
   *
   * @param {string} [field]
   * @returns {Promise<void>}
   * @memberof IFormHelpers
   */
  validateField(field?: string, outerValue?: any): Promise<void>;
  /**
   * 重置整个表单数据
   *
   * @param {Partial<IFormState<Values>>} [nextState]
   * @memberof IFormHelpers
   */
  resetForm(nextState?: Partial<IFormState<Values>>): void;
}

export interface IFormHandlers {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleReset: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IFormProps<Values = any> extends ISizeSpecBaseProps {
  /**
   * 是否使用行内表单
   *
   * @type {boolean}
   * @memberof IFormProps
   */
  inline?: boolean;
  /**
   * 默认values
   *
   * @type {Values}
   * @memberof IFormProps
   * @default {}
   */
  defaultValues?: Values;
  /**
   * 默认错误数据
   *
   * @type {FieldErrorList}
   * @memberof IFormProps
   * @default {}
   */
  defaultErrors?: FieldErrorList;
  /**
   * 默认touched数据
   *
   * @type {IFormTouched<Values>}
   * @memberof IFormProps
   * @default {}
   */
  defaultTouched?: IFormTouched<Values>;
  /**
   * 表单默认status
   *
   * @type {*}
   * @memberof IFormProps
   */
  defaultStatus?: any;
  /**
   * 统一设置Form内部FormItem的validateOnChange，优先级高
   *
   * @type {boolean}
   * @memberof IFormProps
   * @default true
   */
  validateOnChange?: boolean;
  /**
   * 统一设置Form内部FormItem的validateOnBlur，优先级高
   *
   * @type {boolean}
   * @memberof IFormProps
   * @default true
   */
  validateOnBlur?: boolean;
  /**
   * Form子元素
   *
   * @memberof IFormProps
   */
  children?: ((props: IFormBag<Values>) => React.ReactNode) | React.ReactNode;
  /**
   * 重置事件
   *
   * @memberof IFormProps
   */
  onReset?: (values: Values, helpers: IFormHelpers<Values>) => void;
  /**
   * 提交事件
   *
   * @memberof IFormProps
   */
  onSubmit?: (values: Values, helpers: IFormHelpers<Values>) => void;
  /**
   * form元素内联样式
   *
   * @type {React.CSSProperties}
   * @memberof IFormProps
   */
  style?: React.CSSProperties;
  /**
   * form元素className
   *
   * @type {string}
   * @memberof IFormProps
   */
  className?: string;
  /**
   * form自动填充功能
   *
   * @type {string}
   * @default 'off'
   * @memberof IFormProps
   */
  autoComplete?: string;
  /**
   * 统一设置Form内部FormItem的label的位置
   *
   * @type {ILabelPosition}
   * @memberof IFormProps
   */
  labelPosition?: ILabelPosition;
  /**
   * 设置此属性使内部requiredTip对齐
   *
   * @type {boolean}
   * @default false
   * @memberof IFormItemPureProps
   */
  requiredTipAlignLeft?: boolean;
  /**
   * 统一设置Form内部FormItem的label宽度
   *
   * @type {(number | string)}
   * @memberof IFormProps
   */
  labelWidth?: number | string;
  /**
   * 设置内部form元素的props
   *
   * @type {FormHTMLAttributes<HTMLFormElement>}
   * @memberof IFormProps
   */
  formProps?: FormHTMLAttributes<HTMLFormElement>;
  /**
   * 设置Form内部的values，受控模式使用
   *
   * @type {Values}
   * @memberof IFormProps
   */
  values?: Values;
  /**
   * Form内部values变化时的回调，受控模式使用
   *
   * @memberof IFormProps
   */
  onChange?: (
    values: Values,
    helpers: IFormHelpers<Values>,
    changedField?: string,
    changedValue?: any,
  ) => void;
  /**
   * 是否展示Input类型控件的反馈图标
   *
   * @type {boolean}
   * @default false
   * @memberof IFormProps
   */
  hasFeedback?: boolean;
  /**
   * 获取内部FormBag（数据 & helpers），数据结构同function child时的参数
   *
   * @type {React.Ref<IFormBag<Values>>}
   * @memberof IFormProps
   */
  formBagRef?: React.Ref<IFormBag<Values>>;
  /**
   * Form嵌套时内部Form会统一使用最外层的数据，对内部Form设置该属性可以禁用此feature，使其拥有独立的数据
   *
   * @type {boolean}
   * @memberof IFormProps
   */
  independent?: boolean;
  /**
   * 隐藏所有FormItem下方的错误信息节点
   *
   * @type {boolean}
   * @default false
   * @memberof IFormProps
   */
  noError?: boolean;
  /**
   * 设置表单内部所有表单项即时编辑功能
   *
   * @type {(boolean | IFormInstantEditingConfig)}
   * @memberof IFormItemPureProps
   */
  instantEditing?: boolean | IFormInstantEditingConfig;
  /**
   * 设置内部所有行内表单项的间距
   *
   * @default 48
   * @type {number}
   * @memberof IFormProps
   */
  inlineSpacing?: number;
  // /**
  //  * 1. Form卸载时，默认会保留用户输入的数据，使用此参数可以在卸载时清除当前Form数据
  //  * 2. 注意，Form嵌套使用的情况，只有最外层的Form卸载才会重置context的数据
  //  *
  //  * @type {boolean}
  //  * @memberof IFormProps
  //  */
  // resetOnUnmount?: boolean;
}

export interface IFormItemPureProps<Values> extends ICustomStyleBaseProps<IFormItemStyleKeys> {
  /**
   * 表单name，非常关键！每一个name对应values的一个key
   *
   * @type {(keyof Values & string)}
   * @memberof IFormItemPureProps
   */
  name?: keyof Values & string;
  /**
   * FormItem标签
   *
   * @type {React.ReactNode}
   * @memberof IFormItemPureProps
   */
  label?: React.ReactNode;
  /**
   * 标签位置
   *
   * @type {ILabelPosition}
   * @default 'right'
   * @memberof IFormItemPureProps
   */
  labelPosition?: ILabelPosition;
  /**
   * 标签宽度
   *
   * @type {(number | string)}
   * @default 80
   * @memberof IFormItemPureProps
   */
  labelWidth?: number | string;
  /**
   * 校验规则校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator)
   *
   * @type {Rules[string]}
   * @memberof IFormItemPureProps
   */
  rule?: Rules[string];
  /**
   *
   * 子节点的值的属性，如 Checkbox 的是 'checked'
   * @type {string}
   * @default 'value'
   * @memberof IFormItemPureProps
   */
  valuePropName?: string;
  /**
   * 收集子节点的值的时机
   *  @default 'onChange'
   * @type {string}
   * @memberof IFormItemPureProps
   */
  trigger?: string;
  /**
   *
   * 可以把 onChange 的参数转化为控件的值
   *
   * @memberof IFormItemPureProps
   */
  getValueFromEvent?: (...args: any[]) => any;
  /**
   * 收集数据之前，处理数据
   *
   * @memberof IFormItemPureProps
   */
  normalize?: (value: any, prev: any) => any;
  /**
   * 表单项数据变化时，是否校验表单项
   *
   * @type {boolean}
   * @memberof IFormItemPureProps
   * @default true
   */
  validateOnChange?: boolean;
  /**
   * 表单项失去焦点时，是否校验表单项
   *
   * @type {boolean}
   * @memberof IFormItemPureProps
   * @default true
   */
  validateOnBlur?: boolean;
  /**
   * 表单项子元素
   *
   * @type {*}
   * @memberof IFormItemPureProps
   */
  children: any;
  /**
   * 是否使用行内FormItem
   *
   * @type {boolean}
   * @memberof IFormItemPureProps
   * @default false
   */
  inline?: boolean;
  /**
   * 隐藏字段必填提示
   *
   * @type {boolean}
   * @memberof IFormItemPureProps
   * @default false
   */
  hideRequiredTip?: boolean;
  /**
   * 当某一规则校验不通过时，是否停止剩下的规则的校验
   *
   * @default false
   * @type {boolean}
   * @memberof IFormItemPureProps
   */
  validateFirst?: boolean;
  /**
   * 隐藏FormItem下方的错误信息节点
   *
   * @type {boolean}
   * @default false
   * @memberof IFormProps
   */
  noError?: boolean;
  /**
   * 设置当前表单项即时编辑功能
   *
   * @type {(boolean | IFormInstantEditingConfig)}
   * @memberof IFormItemPureProps
   */
  instantEditing?: boolean | IFormInstantEditingConfig;
  /**
   * 单独设置行内表单项的间距
   *
   * @default 48
   * @type {number}
   * @memberof IFormProps
   */
  inlineSpacing?: number;
}

export type IFormItemProps<Values> = IFormItemPureProps<Values> & HTMLAttributes<HTMLDivElement>;

// useForm 返回的函数/数据集合
export type IFormBag<Values> = IFormState<Values> &
  IFormHelpers<Values> &
  IFormHandlers &
  IFormProps<Values>;
