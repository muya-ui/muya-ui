import { IFeatureSpec } from './specs';

export interface IStatusColor {
  normal: string;
  hover: string;
  click: string;
}

export interface IColorsSpec {
  brand: string;
  danger: string;
  warning: string;
  safe: string;
  dark: string;
  light: string;

  brand1: string;
  brand2: string;
  brand3: string;
  brand4: string;
  lightBrand1: string;
  lightBrand2: string;
  lightBrand3: string;
  lightBrand4: string;

  danger1: string;
  danger2: string;
  danger3: string;
  danger4: string;
  lightDanger1: string;
  lightDanger2: string;
  lightDanger3: string;
  lightDanger4: string;

  safe1: string;
  safe2: string;
  safe3: string;
  safe4: string;
  lightSafe1: string;
  lightSafe2: string;
  lightSafe3: string;
  lightSafe4: string;

  warning1: string;
  warning2: string;
  warning3: string;
  warning4: string;
  lightWarning1: string;
  lightWarning2: string;
  lightWarning3: string;
  lightWarning4: string;

  neutral1: IStatusColor;
  neutral2: IStatusColor;
  neutral3: IStatusColor;
  neutral4: IStatusColor;
  neutral5: IStatusColor;
  neutral6: IStatusColor;
  neutral7: IStatusColor;
  neutral8: IStatusColor;
  neutral9: IStatusColor;
  neutral10: IStatusColor;

  gradient: IStatusColor;
}

export interface ITextColor {
  title: string;
  text: string;
  assistant: string;
  secondary: string;
  darktip: string;
  placeholder: string;
  disabled: string;
  highlight: string;
  highlightHover: string;
  highlightClick: string;
  inverse: string;
}

export interface IIconColor {
  normal: string;
  hover: string;
  click: string;
  inverse: string;
}

export type IFeatureColor = Record<IFeatureSpec, string>;

export interface IBackgroundColor {
  higher: string;
  block: string;
  selectedBlock: string;
  global: string;
  disabled: string;
  divider: string;
  mask: string;
  // TODO: 0.5.0 移除
  scrollBar: string;
  scrollBarHover: string;
}

export interface IBorderColor {
  normal: string;
  hover: string;
  error: string;
}

export interface IColors {
  spec: IColorsSpec;
  pattern: {
    text: ITextColor;
    icon: IIconColor;
    feature: IFeatureColor;
    background: IBackgroundColor;
    border: IBorderColor;
  };
}
