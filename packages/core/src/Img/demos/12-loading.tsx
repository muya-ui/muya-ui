import React from 'react';
import styled from 'styled-components';

import { Button, ButtonGroup, Img } from '@muya-ui/core';

const exampleImgSrc =
  'https://qhyxpicoss.kujiale.com/r/2019/09/14/L3D206S20ENDIBRWWVAUI5NFSLUF3P3X6888_2560x1440.jpg';

const Box = styled.div`
  & .img {
    width: 240px;
    height: 240px;
  }

  & .my-loading {
    background-size: 100px 100px;
    background-repeat: repeat;
  }
`;

const styles = {
  loading: 'my-loading',
};

export default function SkeletonDemo() {
  const [loadingType, setLoadingType] = React.useState<'skeleton' | 'spin' | 'default-img'>(
    'skeleton',
  );
  return (
    <Box>
      <ButtonGroup style={{ marginBottom: 10 }}>
        <Button plain={loadingType !== 'skeleton'} onClick={() => setLoadingType('skeleton')}>
          骨架屏加载
        </Button>
        <Button plain={loadingType !== 'spin'} onClick={() => setLoadingType('spin')}>
          Spin加载
        </Button>
        <Button plain={loadingType !== 'default-img'} onClick={() => setLoadingType('default-img')}>
          默认图
        </Button>
      </ButtonGroup>
      <Img
        key={loadingType}
        // defaultImg="//qhstaticssl.kujiale.com/newt/23/image/gif/1584095099192/E3CFDD4676FBD72DE110E91D7B2525E2.gif"
        className="img"
        loadingType={loadingType}
        loadingDelay={40000}
        src={exampleImgSrc}
        styles={styles}
      />
    </Box>
  );
}

export const meta = {
  title: '设置加载状态',
  desc: '设置加载状态',
};
