import { IDialogToken, IThemeWithoutComponents } from '../../interfaces';
import { colorUtils } from '../../utils';

export default function createDialogToken({
  shadows,
  size,
  opacity,
  colors,
}: IThemeWithoutComponents): IDialogToken {
  return {
    shadow: shadows.spec.s1.normal,
    maskBgColor: colorUtils.transparentize(opacity.pattern.mask, colors.spec.dark),
    containerBorderRadius: size.spec.borderRadius.s2,
    top: 40,
    size: {
      s: {
        width: 404,
        height: 152,
      },
      m: {
        width: 404,
        height: 192,
      },
      l: {
        width: 480,
        height: 360,
      },
      xl: {
        width: 480,
        height: 360,
      },
    },
    fullWidth: {
      widthPrecent: 70,
      marginTopAndBottom: 32,
    },
    alertCloseIconTop: {
      s: '33px',
      m: '36px',
      l: '36px',
      xl: '36px',
    },
    actions: {
      paddingForAlert: '20px 24px 24px 24px',
      fullWidthPadding: '14px 28px 14px 28px',
      complexPadding: '14px 24px 14px 24px',
      childrenSpacing: 8,
    },
    title: {
      paddingHorizontal: 24,
      paddingVertical: 18,
      fullWidthPadding: '28px 28px 18px 28px',
      defaultTitleLevel: 4,
      borderBottom: 'none',
      closeIconRight: 10,
      closeIconTop: 10,
    },
    content: {
      padding: '20px',
      paddingHorizontal: '24px',
      fullWidthPaddingHorizontal: '28px',
      paddingWithType: '24px 24px 20px 50px',
      typeIconBgColor: {
        error: colors.spec.light,
        warning: colors.spec.light,
        success: colors.spec.light,
        info: '',
      },
      iconMarginLeft: 9,
      iconMarginTop: -1,
      titleMarginBottom: 8,
      defaultTitleLevel: 3,
      borderColor: colorUtils.transparentize(0.7, colors.spec.neutral7.normal),
    },
  };
}
