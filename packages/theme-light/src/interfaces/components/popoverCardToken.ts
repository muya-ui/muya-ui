import { ITextColor } from '../../interfaces';
import { ITypographyTitleLevel } from './typographyToken';

export interface IPopoverCardToken {
  card: {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: string;
  };
  title: {
    marginBottom: number;
    level: ITypographyTitleLevel;
  };
  text: {
    type: keyof ITextColor;
  };
  actions: {
    marginTop: number;
    marginLeft: number;
  };
}
