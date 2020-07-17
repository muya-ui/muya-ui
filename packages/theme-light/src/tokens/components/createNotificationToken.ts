import { INotificationToken, IThemeWithoutComponents } from '../../interfaces';

export default function createNotificationToken({
  typography,
  shadows,
  transition,
  size,
  colors,
}: IThemeWithoutComponents): INotificationToken {
  const { fontSize, lineHeight } = typography.spec;
  return {
    containerCenterTop: 96,
    containerTop: 24,
    containerBottom: 8,
    toast: {
      itemMarginBottom: 16,
      minHeight: 60,
      contentStyle: {
        minWidth: 294,
        maxWidth: 488,
        padding: '12px 12px 12px 0',
        fontSize: fontSize.s1,
        lineHeight: lineHeight.s1,
      },
      /**
       * 除内容外的额外高度，用于预测最大高度
       */
      extraPadding: 36,
      lineMaxChar: 30,
      iconStyle: {
        size: 16,
        padding: '11px 8px 0 12px',
        width: 36,
      },
      shadow: shadows.spec.s1.normal,
      easing: transition.spec.easing.sharp,

      // 已有默认值，如果要设置，可以自己改
      queueSetting: {
        interval: 3000,
        timeout: 300,
        max: 3,
      },
    },
    notification: {
      titleLevel: 5,
      itemMarginBottom: 16,
      titleMarginBottom: 2,
      borderRadius: size.spec.borderRadius.s2,
      width: 388,
      minHeight: 96,
      lineMaxChar: 20,
      contentStyle: {
        lineHeight: lineHeight.s1,
        plainPadding: '18px 42px 20px 20px',
        iconPadding: '18px 42px 20px 38px',
      },
      iconStyle: {
        size: 14,
        top: 20,
        left: 16,
      },
      closeStyle: {
        size: 16,
        top: 20,
        right: 20,
      },
      // 已有默认值，如果要设置，可以自己改
      queueSetting: {
        interval: 4000,
        timeout: 300,
        max: 1000,
      },
      shadow: shadows.spec.s1.normal,
      easing: transition.spec.easing.sharp,
    },

    iconBgColor: {
      info: '',
      error: colors.spec.light,
      success: colors.spec.light,
      warning: colors.spec.light,
      loading: '',
    },
  };
}
