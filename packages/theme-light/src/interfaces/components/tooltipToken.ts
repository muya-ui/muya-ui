import { IComponentSizeSpec, IFontSizeSpec } from '../specs';

export interface ITooltipToken {
  bgColor: string;
  boxShadow?: string;
  color: string;
  padding: Record<IComponentSizeSpec, number[]>;
  arrowSize: Record<IComponentSizeSpec, { width: number; height: number }>;
  fontLevel: Record<IComponentSizeSpec, IFontSizeSpec>;
  maxWidth: number;
  borderRadius: string;
}
