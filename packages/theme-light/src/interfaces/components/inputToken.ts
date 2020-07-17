import { ISvgProps } from '../../components/SvgIcon';
import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

interface LimitPosition {
  right: number;
  bottom: number;
}

type StatusIconType = 'success' | 'error';

export interface IIpnutToken {
  inputPadding: Record<IComponentSizeSpec, number>;
  inputAddonNodeMargin: Record<IComponentSizeSpec, number>;
  inputWidth: Record<IComponentSizeSpec, number>;
  rangeInputWidth: Record<IComponentSizeSpec, number>;
  inputHeight: Record<IComponentSizeSpec, number>;
  textareaWidth: Record<IComponentSizeSpec, number>;
  textareaHeight: Record<IComponentSizeSpec, number>;
  textareaPadding: Record<IComponentSizeSpec, number[]>;
  autosizeTextareaPadding: Record<IComponentSizeSpec, number[]>;
  textareaLimitMarginBottom: Record<IComponentSizeSpec, number>;
  textareaLimitPosition: Record<IComponentSizeSpec, LimitPosition>;
  fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  borderRadius: Record<IComponentSizeSpec, string>;
  borderColor: {
    normal: string;
    hover: string;
    focused: string;
  };
  clearIcon?: React.FunctionComponent<ISvgProps>;
  selectionBackground: string;
  color: string;
  bgColor: string;
  focusShadow: string;
  errorFocusShadow: string;
  statusIcon?: Record<StatusIconType, React.FunctionComponent<ISvgProps>>;
  inputTag: {
    margin: string;
    outerPadding: number;
  };
  tagsInput: {
    wrapperPadding: string;
    contentPaddingRight: Record<IComponentSizeSpec, number>;
  };
}
