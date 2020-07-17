import React from 'react';
import styled from 'styled-components';

import { Img, Typography } from '@muya-ui/core';

const Container = styled.div`
  display: flex;

  .basic-img {
    margin-right: 10px;
  }
`;

export default function BasicDemo() {
  return (
    <Container>
      <div>
        <Typography.Title level={5}>阿里云的图片</Typography.Title>
        <Img
          width={200}
          height={150}
          className="basic-img"
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
      </div>
      <div>
        <Typography.Title level={5}>金山云的图片</Typography.Title>
        <Img
          width={200}
          height={150}
          className="basic-img"
          src="//kss.ksyun.com/qhyxpic/2018/03/07/ori_SP6ILLWO7DXVCZTGLQM6YMY8.jpg@base@tag=imgScale&h=200"
        />
      </div>
    </Container>
  );
}

export const meta = {
  title: '基础使用方法',
  desc: `
你只需要通过：

1. 设置样式，这里以 styled-components 为例，你也可以正常使用 scss 等方案来设置样式
2. 传入 \`src\`
`,
};
