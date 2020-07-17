import { ICalendarToken, IThemeWithoutComponents } from '../../interfaces';
import { colorUtils } from '../../utils';

export default function createCalendarToken({
  spacing,
  colors,
  size,
  typography,
  opacity,
}: IThemeWithoutComponents): ICalendarToken {
  const { spec: colorsSpec, pattern: colorsPattern } = colors;
  const { spec: spacingSpec } = spacing;
  return {
    defaultWidth: 240,
    pagerArrowTipDelay: 2000,
    pagerButton: {
      margin: '0 12px',
    },
    head: {
      height: 36,
      defaultDecadeTitleLevel: 6,
    },
    footer: {
      height: 36,
      optionMargin: '0 4px',
    },
    panel: {
      containerMonthPadding: '12px 0 8px 0',
      containerOtherPadding: '24px 0 0 0',
      monthPadding: '0 8px',
      otherMargin: '0 -12px',
      monthItemMarginBottom: 4,
      otherItemMarginBottom: 24,
    },
    headButton: {
      padding: '0 2px',
    },
    item: {
      height: 24,
      gutterInMonth: spacingSpec.s2,
      gutterOther: spacingSpec.s8,
      fontSize: typography.spec.fontSize.s1,
      borderRadius: size.spec.borderRadius.s1,
      background: {
        normal: colorsSpec.light,
        hover: colorUtils.transparentize(opacity.spec.s8, colors.spec.neutral3.normal),
        range: colorUtils.transparentize(opacity.spec.s9, colorsSpec.brand),
        rangeClick: colorUtils.transparentize(opacity.spec.s8, colorsSpec.brand),
        click: colorsSpec.lightBrand4,
        selected: colorsSpec.brand,
        selectedClick: colorsSpec.brand1,
      },
      color: {
        normal: colorsPattern.text.title,
        disabled: colorsPattern.text.disabled,
        outside: colorsPattern.text.secondary,
        current: colorsPattern.text.highlight,
        selected: colorsPattern.text.inverse,
      },
    },
    dateTimeCalendar: {
      footerHeight: 40,
      timeHeadMarginBottom: 4,
    },
  };
}
