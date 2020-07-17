const hexRegex = /^#[a-fA-F0-9]{6}$/;
const reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;

interface IRGBColor {
  red: number;
  green: number;
  blue: number;
  alpha?: number;
}

function parseToRgb(color: string): IRGBColor {
  if (color.match(hexRegex)) {
    return {
      red: parseInt(`${color[1]}${color[2]}`, 16),
      green: parseInt(`${color[3]}${color[4]}`, 16),
      blue: parseInt(`${color[5]}${color[6]}`, 16),
    };
  }

  if (color.match(reducedHexRegex)) {
    return {
      red: parseInt(`${color[1]}${color[1]}`, 16),
      green: parseInt(`${color[2]}${color[2]}`, 16),
      blue: parseInt(`${color[3]}${color[3]}`, 16),
    };
  }

  const rgbMatched = rgbRegex.exec(color);
  if (rgbMatched) {
    return {
      red: parseInt(`${rgbMatched[1]}`, 10),
      green: parseInt(`${rgbMatched[2]}`, 10),
      blue: parseInt(`${rgbMatched[3]}`, 10),
    };
  }

  const rgbaMatched = rgbaRegex.exec(color);
  if (rgbaMatched) {
    return {
      red: parseInt(`${rgbaMatched[1]}`, 10),
      green: parseInt(`${rgbaMatched[2]}`, 10),
      blue: parseInt(`${rgbaMatched[3]}`, 10),
      alpha: parseFloat(rgbaMatched[4]),
    };
  }

  throw new Error(`${color} is not a color string.`);
}

function transparentize(inputAlpha: number, color: string): string {
  const parsedColor = parseToRgb(color);
  const alpha: number = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;
  const colorWithAlpha = {
    ...parsedColor,
    alpha: alpha * inputAlpha,
  };
  return `rgba(${colorWithAlpha.red},${colorWithAlpha.green},${colorWithAlpha.blue},${colorWithAlpha.alpha})`;
}

export default {
  parseToRgb,
  transparentize,
};
