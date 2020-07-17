import React from 'react';
import { Result } from '@muya-ui/core';
import { TimeIcon } from '@muya-ui/theme-light';

export default function IconDemo() {
  return (
    <>
      <Result
        title="提示"
        subTitle="提示文案"
        icon="//qhstaticssl.kujiale.com/newt/23/image/png/1565749312620/129F060E504FDCDAEE29088AB181D326.png"
        iconSize={50}
      />
      <div style={{ marginTop: '30px' }}>
        <Result title="提示" subTitle="提示文案" icon={<TimeIcon fontSize={50} />} />
      </div>
    </>
  );
}

export const meta = {
  title: 'Icon',
  desc: '可自定义 Icon，传入 ReactNode 或者图片链接',
};
