import { ICollapseToken, IThemeWithoutComponents } from '../../interfaces';

export default function createAlertToken({
  spacing,
  colors,
  opacity,
}: IThemeWithoutComponents): ICollapseToken {
  const { spec: spacingSpec } = spacing;
  const { spec: colorsSpec } = colors;
  const { spec: opacitySpec } = opacity;
  return {
    disableOpacity: opacitySpec.s4,
    background: colorsSpec.neutral9,
    headerPadding: `${spacingSpec.s6}px ${spacingSpec.s10}px`,
    panelMarginBottom: spacingSpec.s2,
    contentPadding: `${spacingSpec.s7}px ${spacingSpec.s10}px`,
  };
}
