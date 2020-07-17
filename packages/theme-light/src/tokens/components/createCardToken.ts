import { ICardToken, IThemeWithoutComponents } from '../../interfaces';

export default function createCalendarToken({
  spacing,
  colors,
  shadows,
}: IThemeWithoutComponents): ICardToken {
  return {
    borderRadius: 4,
    boxShadow: {
      normal: shadows.spec.s2.normal,
      hover: shadows.spec.s2.hover,
    },
    defaultMetaTitleLevel: 4,
    border: `1px solid ${colors.pattern.border.normal}`,
    extra: {
      topPadding: spacing.spec.s5,
      rightPadding: spacing.spec.s5,
    },
    checkbox: {
      topPadding: spacing.spec.s3,
      rightPadding: spacing.spec.s3,
      checkedBorder: `1px solid ${colors.spec.brand1}`,
      normalBorder: `1px solid transparent`,
    },
    content: {
      padding: '16px 20px',
    },
    actions: {
      padding: '16px 20px',
      topBorder: `1px solid ${colors.pattern.border.normal}`,
    },
    skeleton: {
      height: '180px',
      width: '100%',
    },
  };
}
