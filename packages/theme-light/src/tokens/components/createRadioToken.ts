import { IRadioToken, IThemeWithoutComponents } from '../../interfaces';

export default function createRadioToken({ colors }: IThemeWithoutComponents): IRadioToken {
  const { spec: colorsSpec } = colors;

  // s 和 m 表现一致
  return {
    marginRightInGroup: 8,
    fontLevel: {
      xl: 's3',
      l: 's2',
      m: 's1',
      s: 's1',
    },
    iconSize: {
      xl: 20,
      l: 18,
      m: 16,
      s: 16,
    },
    checkedCenterBg: colors.pattern.background.higher,
    checkedCenterSize: {
      xl: 8,
      l: 6,
      m: 4,
      s: 4,
    },
    iconColor: {
      hover: colors.spec.light,
      click: colors.spec.light,
      unChecked: colors.spec.light,
      checked: colorsSpec.brand,
      checkedHover: colors.spec.brand3,
      checkedClick: colors.spec.brand1,
    },
    borderColor: {
      hover: colors.spec.brand,
      click: colors.spec.brand1,
      unChecked: colors.spec.neutral5.normal,
      checked: colorsSpec.brand,
      checkedHover: colors.spec.brand3,
      checkedClick: colors.spec.brand1,
    },
  };
}
