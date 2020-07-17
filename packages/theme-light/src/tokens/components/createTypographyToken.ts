import { ITypographyToken } from '../../interfaces';

export default function createTypographyToken(): ITypographyToken {
  return {
    defaultFontLevel: 's1',
    defaultTextType: 'text',
    defaultTitleType: 'title',
    titleFontLevelMap: {
      h1: 's6',
      h2: 's5',
      h3: 's4',
      h4: 's3',
      h5: 's2',
      h6: 's1',
    },
    titleMarginTop: '0',
    titleMarginBottom: '0',
  };
}
