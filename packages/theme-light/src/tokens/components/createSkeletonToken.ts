import { ISkeletonToken, IThemeWithoutComponents } from '../../interfaces';

export default function createSkeletonToken({ colors }: IThemeWithoutComponents): ISkeletonToken {
  return {
    backgroundColor: colors.spec.neutral9.normal,
    activeBackgroundColor: colors.spec.neutral7.normal,
    card: {
      titleHeight: 12,
      titleWidth: '60%',
      descHeight: 12,
      descWidth: '40%',
    },
    paragraph: {
      titleMarginBottom: 4,
      titleWidth: 120,
      height: 12,
      marginTop: 20,
    },
    tree: {
      squareMarginRight: 8,
      squareSize: 16,
      contentHeight: 12,
      treeNodeMarginTop: 24,
    },
    navigation: {
      squareSize: 16,
      contentHeight: 12,
      squareMarginRight: 8,
      navigationNodeMarginTop: 24,
      navigationHeadMarginBottom: 8,
      navigationHeadScale: 0.7,
      navigationNodeScaleList: [0.6, 1, 0.7, 0.9],
    },
  };
}
