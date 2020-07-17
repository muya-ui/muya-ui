import React from 'react';
import styled from 'styled-components';

import { ImgImg } from '@muya-ui/core';

const IconImg = styled(ImgImg)`
  height: 20px;
  margin-right: 5px;
`;

export default function IconDemo() {
  return (
    <div>
      <IconImg
        suffixWidth="auto"
        suffixHeight={20}
        src="//qhyxpicoss.kujiale.com/2018/09/14/LONFEBQKAEJOUFFUAAAAADI8_48x48.png"
      />
      <IconImg
        suffixWidth="auto"
        suffixHeight={20}
        src="//qhstaticssl.kujiale.com/newt/image/gif/1539574485880/78681EDEFEBE38F1E5FAF0627CC95557.gif"
      />
      <IconImg
        suffixWidth="auto"
        suffixHeight={20}
        src="//qhstaticssl.kujiale.com/as/e3258bf440cf7676db7d0b467302dc0f/vip-active.png"
      />
      <IconImg
        suffixWidth="auto"
        suffixHeight={20}
        src="//qhstaticssl.kujiale.com/newt/23/image/png/1541669728350/7D3BBDB63411AADE83513B2F28055772.png"
      />
      {/* 注意 svg 请把 suffix="off" 加上，svg 不支持后缀设置 */}
      <IconImg
        src="//qhstaticssl.kujiale.com/newt/13/image/svgxml/1555312763379/F761D37CD651AF2FB25D5EC564DB05EF.svg"
        suffix="off"
      />
    </div>
  );
}

export const meta = {
  title: '用作图标',
  desc:
    '图片还可以作为图标使用。\n\n注意 svg 图标请把 props suffix="off" 加上，因为 svg 不支持后缀设置',
};
