import React from 'react';
import styled from 'styled-components';

import { PicIcon, SearchIcon, SentIcon } from '@muya-ui/theme-light';
import { Input } from '@muya-ui/core';

const StyledDiv = styled.div`
  margin-bottom: 8px;
`;

export default function NodeDemo() {
  return (
    <>
      <StyledDiv>
        <Input placeholder="前缀，单个文字节点" prefixNode="￥" />
      </StyledDiv>
      <StyledDiv>
        <Input placeholder="前缀，单个React节点 " prefixNode={<SearchIcon />} />
      </StyledDiv>
      <StyledDiv>
        <Input placeholder="前缀，多个节点混合 " prefixNode={['$', <PicIcon key="pic" />]} />
      </StyledDiv>
      <StyledDiv>
        <Input placeholder="后缀，单个文字节点" suffixNode="元" />
      </StyledDiv>
      <StyledDiv>
        <Input placeholder="后缀，单个React节点 " suffixNode={<SearchIcon />} />
      </StyledDiv>
      <StyledDiv>
        <Input
          placeholder="后缀，多个节点混合并组合自定义功能 "
          width="80%"
          prefixNode={['$', <PicIcon key="pic" />]}
          suffixNode={[<SearchIcon key="search" />, <SentIcon key="sent" />, '张']}
          allowClear
          limit={10}
        />
      </StyledDiv>
    </>
  );
}

export const meta = {
  title: '自定义前缀/后缀',
  desc:
    '设置 `prefixNode`、`suffixNode`，可传入 `ReactNode` 类型\n\n文字节点会有固定的颜色，`ReactElement` 会有类似按钮的样式',
};
