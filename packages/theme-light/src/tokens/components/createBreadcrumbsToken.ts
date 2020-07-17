import { IBreadcrumbsToken, IThemeWithoutComponents } from '../../interfaces';

export default function createBreadcrumbsToken({
  colors,
}: IThemeWithoutComponents): IBreadcrumbsToken {
  return {
    separatorColor: colors.spec.neutral6.normal,
    separatorSize: {
      xl: 8,
      l: 8,
      m: 8,
      s: 6,
    },
    separatorHeadWidth: 25,
    separatorWidth: 20,
  };
}
