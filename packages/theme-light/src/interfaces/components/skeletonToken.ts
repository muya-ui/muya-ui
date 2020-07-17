export interface ISkeletonToken {
  backgroundColor: string;
  activeBackgroundColor: string;
  card: {
    titleHeight: number;
    titleWidth: string;
    descHeight: number;
    descWidth: string;
  };
  paragraph: {
    titleWidth: number;
    titleMarginBottom: number;
    height: number;
    marginTop: number;
  };
  tree: {
    squareSize: number;
    squareMarginRight: number;
    contentHeight: number;
    treeNodeMarginTop: number;
  };
  navigation: {
    squareSize: number;
    contentHeight: number;
    squareMarginRight: number;
    navigationNodeMarginTop: number;
    navigationHeadMarginBottom: number;
    navigationHeadScale: number;
    navigationNodeScaleList: number[];
  };
}
