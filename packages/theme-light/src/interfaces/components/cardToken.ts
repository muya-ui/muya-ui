import { ITypographyTitleLevel } from './typographyToken';

export interface ICardToken {
  borderRadius: number;
  border: string;
  boxShadow: {
    normal: string;
    hover: string;
  };
  defaultMetaTitleLevel: ITypographyTitleLevel;
  extra: {
    topPadding: number;
    rightPadding: number;
  };
  checkbox: {
    topPadding: number;
    rightPadding: number;
    checkedBorder: string;
    normalBorder: string;
  };
  content: {
    padding: string;
  };
  actions: {
    padding: string;
    topBorder: string;
  };
  skeleton: {
    height: string;
    width: string;
  };
}
