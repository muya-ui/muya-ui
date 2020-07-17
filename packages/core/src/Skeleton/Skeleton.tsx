import React from 'react';

import useStyles from '../utils/useStyles';
import useTheme from '../utils/useTheme';
import {
  StyledBlock,
  StyledCardContent,
  StyledCardDesc,
  StyledCardTitle,
  StyledCardWrapper,
  StyledNavigationHead,
  StyledNavigationNode,
  StyledNavigationSquare,
  StyledNavigationWrapper,
  StyledParagraph,
  StyledParagraphTitle,
  StyledParagraphWrapper,
  StyledTreeChild,
  StyledTreeContent,
  StyledTreeHead,
  StyledTreeSquare,
  StyledTreeWrapper,
} from './styled';
import { ISkeletonProps } from './types';

const defaultStyles = {
  cardContent: '',
  cardTitle: '',
  cardDesc: '',
  paragraphTitle: '',
  paragraph: '',
  treeHead: '',
  treeSquare: '',
  treeContent: '',
  treeChild: '',
  navigationHead: '',
  navigationSquare: '',
  navigationNode: '',
};

export default React.memo(function Skeleton(props: ISkeletonProps) {
  const theme = useTheme();
  const {
    loading = true,
    active = true,
    type = 'block',
    children,
    rows = 6,
    styles,
    ...other
  } = props;
  const innerStyles = useStyles('skeleton', defaultStyles, styles);

  const rowArray = [...Array(rows)];

  if (!loading) {
    return <>{children}</>;
  }

  if (type === 'card') {
    return (
      <StyledCardWrapper {...other}>
        <StyledCardContent {...innerStyles.cardContent} active={active} theme={theme} />
        <StyledCardTitle {...innerStyles.cardTitle} active={active} theme={theme} />
        <StyledCardDesc {...innerStyles.cardDesc} active={active} theme={theme} />
      </StyledCardWrapper>
    );
  }

  if (type === 'paragraph') {
    return (
      <StyledParagraphWrapper {...other}>
        <StyledParagraphTitle {...innerStyles.paragraphTitle} theme={theme} active={active} />
        {rowArray.map((_v, index) => (
          <StyledParagraph {...innerStyles.paragraph} key={index} theme={theme} active={active} />
        ))}
      </StyledParagraphWrapper>
    );
  }

  if (type === 'tree') {
    return (
      <StyledTreeWrapper theme={theme} {...other}>
        <StyledTreeHead {...innerStyles.treeHead} theme={theme}>
          <StyledTreeSquare {...innerStyles.treeSquare} theme={theme} active={active} />
          <StyledTreeContent {...innerStyles.treeContent} theme={theme} active={active} />
        </StyledTreeHead>
        {rowArray.map((_v, index) => (
          <StyledTreeChild {...innerStyles.treeChild} key={index} theme={theme}>
            <StyledTreeSquare {...innerStyles.treeSquare} theme={theme} active={active} />
            <StyledTreeContent {...innerStyles.treeContent} theme={theme} active={active} />
          </StyledTreeChild>
        ))}
      </StyledTreeWrapper>
    );
  }

  if (type === 'navigation') {
    return (
      <StyledNavigationWrapper {...other} theme={theme}>
        <StyledNavigationHead {...innerStyles.navigationHead} theme={theme}>
          <StyledNavigationSquare {...innerStyles.navigationSquare} theme={theme} active={active} />
          <StyledNavigationNode {...innerStyles.navigationNode} theme={theme} active={active} />
        </StyledNavigationHead>
        {rowArray.map((_v, index) => (
          <StyledNavigationNode
            {...innerStyles.navigationNode}
            key={index}
            theme={theme}
            active={active}
          />
        ))}
      </StyledNavigationWrapper>
    );
  }

  return <StyledBlock theme={theme} active={active} {...other} />;
});
