import { IThemeWithoutComponents, ITimePickerToken } from '../../interfaces';

export default function createTimePickerToken({
  colors,
}: IThemeWithoutComponents): ITimePickerToken {
  const { spec: colorsSpec } = colors;
  return {
    width: 180,
    panelPadding: '4px 0',
    rowHeight: 32,
    itemHeight: 28,
    itemWidth: 28,
    itemBg: {
      hover: colorsSpec.neutral10.normal,
      clicked: colorsSpec.neutral10.normal,
      selected: colorsSpec.lightBrand1,
    },
    itemColor: {
      normal: colorsSpec.neutral2.normal,
      selected: colorsSpec.brand,
      disabled: colorsSpec.neutral6.normal,
    },
  };
}
