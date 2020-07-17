import { ITableToken, IThemeWithoutComponents } from '../../interfaces';
import colorUtils from '../../utils/color';

export default function createTableTonek({
  typography,
  colors,
  opacity,
  zIndex,
  size,
}: IThemeWithoutComponents): ITableToken {
  return {
    arrowSize: 9,
    fixedZIndex: zIndex.spec.s1,
    color: colors.pattern.text.text,
    borderRadius: size.spec.borderRadius.s2,
    headOrFooterHoverBackground: colors.spec.neutral7.normal,
    headOrFooterBackground: colors.spec.neutral9.normal,
    headOrFooterFontWeight: typography.spec.fontWeight.semibold,
    headOrFooterColor: colors.pattern.text.text,
    tableBackground: colors.pattern.background.block,
    trBackground: {
      stripe: colors.spec.neutral10.normal,
      normal: colors.pattern.background.global,
      hover: colorUtils.transparentize(opacity.spec.s3, colors.spec.lightBrand2),
    },
    leftFixedColumnBoxShadow: '6px 0 6px 0px rgba(102,102,102,0.12)',
    rightFixedColumnBoxShadow: '-6px 0 6px 0px rgba(102,102,102,0.12)',
    sizeData: {
      s: {
        fontLevel: 's1',
        headerPaddingLevels: ['s4', 's6'],
        cellPaddingLevels: ['s5', 's6'],
      },
      m: {
        fontLevel: 's1',
        headerPaddingLevels: ['s4', 's6'],
        cellPaddingLevels: ['s5', 's6'],
      },
      l: {
        fontLevel: 's2',
        headerPaddingLevels: ['s5', 's7'],
        cellPaddingLevels: ['s6', 's7'],
      },
      xl: {
        fontLevel: 's2',
        headerPaddingLevels: ['s5', 's7'],
        cellPaddingLevels: ['s6', 's7'],
      },
    },
    filterData: {
      s: {
        buttonSize: 's',
      },
      m: {
        buttonSize: 's',
      },
      l: {
        buttonSize: 'm',
      },
      xl: {
        buttonSize: 'm',
      },
    },
  };
}
