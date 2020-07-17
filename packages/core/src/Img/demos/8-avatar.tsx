import React from 'react';
import styled from 'styled-components';

import { Img } from '@muya-ui/core';

const exampleImgSrc =
  '//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212';

const Avatar = styled(Img)`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export default function ElementDemo() {
  return (
    <>
      <Avatar src={exampleImgSrc} />
    </>
  );
}

export const meta = {
  title: '用作头像',
  desc: '用作头像',
};
