import React from 'react';
import styled from 'styled-components';

import { ImgImg, withTheme } from '@muya-ui/core';

const Box = styled.div`
  max-width: 920px;
`;

const LazyDesignImg = styled(ImgImg)`
  width: 90%;
`;

const LazyDesign = withTheme(LazyDesignImg);

export function LazyDemo() {
  return (
    <Box>
      <LazyDesign
        resizeMode="lfit"
        suffixWidth={900}
        suffixHeight="auto"
        src="//qhstaticssl.kujiale.com/newt/23/image/jpeg/1563378029340/A09E4F2B4177E524C1E9F7CD8CE39B3F.jpg"
      />
    </Box>
  );
}
