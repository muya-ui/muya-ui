import { IColorsSpec } from '../../interfaces';
import spec from './spec';

export function createColorsPattern(argSpec: IColorsSpec) {
  const background = {
    higher: argSpec.light,
    block: argSpec.light,
    selectedBlock: argSpec.light,
    global: argSpec.light,
    disabled: argSpec.neutral10.normal,
    divider: argSpec.neutral7.normal,
    mask: argSpec.dark,
    // TODO: 0.5.0 移除
    scrollBar: argSpec.neutral7.normal,
    scrollBarHover: argSpec.neutral7.hover,
  };

  const border = {
    normal: argSpec.neutral7.normal,
    hover: argSpec.neutral7.hover,
    error: argSpec.danger,
  };

  const text = {
    title: argSpec.neutral1.normal,
    text: argSpec.neutral2.normal,
    assistant: argSpec.neutral3.normal,
    secondary: argSpec.neutral4.normal,
    darktip: argSpec.neutral5.normal,
    placeholder: argSpec.neutral5.normal,
    disabled: argSpec.neutral6.normal,
    highlight: argSpec.brand2,
    highlightHover: argSpec.brand3,
    highlightClick: argSpec.brand1,
    inverse: argSpec.light,
  };

  const icon = {
    normal: argSpec.neutral5.normal,
    hover: argSpec.neutral5.hover,
    click: argSpec.neutral5.click,
    inverse: argSpec.light,
  };

  const feature = {
    info: argSpec.brand,
    loading: argSpec.brand,
    error: argSpec.danger,
    success: argSpec.safe,
    warning: argSpec.warning,
  };

  return { background, border, icon, text, feature };
}

export default createColorsPattern(spec);
