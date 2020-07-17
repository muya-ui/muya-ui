import { ISpinToken, IThemeWithoutComponents } from '../../interfaces';

export default function createSpinToken({
  opacity,
  typography,
  spacing,
}: IThemeWithoutComponents): ISpinToken {
  const {
    spec: { fontSize },
  } = typography;
  const {
    pattern: { textIcon },
  } = spacing;
  return {
    maskOpacity: opacity.spec.s1,
    icon: {
      fontSize: {
        s: fontSize.s3,
        m: fontSize.s6,
        l: fontSize.s7,
        xl: fontSize.s7,
      },
      padding: {
        s: `${textIcon.s1}px ${textIcon.s6}px;`,
        m: `${textIcon.s3}px ${textIcon.s6}px;`,
        l: `${textIcon.s6}px ${textIcon.s7}px;`,
        xl: `${textIcon.s6}px ${textIcon.s7}px;`,
      },
    },
    desc: {
      fontSize: {
        s: fontSize.s1,
        m: fontSize.s2,
        l: fontSize.s3,
        xl: fontSize.s4,
      },
      paddingRight: {
        s: textIcon.s6,
        m: textIcon.s6,
        l: textIcon.s7,
        xl: textIcon.s7,
      },
    },
  };
}
