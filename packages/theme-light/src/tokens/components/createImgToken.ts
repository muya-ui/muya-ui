import { IImgToken, IThemeWithoutComponents } from '../../interfaces';

export default function createImgToken(args: IThemeWithoutComponents): IImgToken {
  return {
    errorImg:
      '//qhstaticssl.kujiale.com/newt/23/image/png/1565749312620/129F060E504FDCDAEE29088AB181D326.png',
    errorBgRepeat: 'repeat',
    errorBgSize: '100px 100px',
  };
}
