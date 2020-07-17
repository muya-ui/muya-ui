import React from 'react';
import { Typography, InlineButton, Tag, Button, Card, CardWrapper } from '@muya-ui/core';
import styled from 'styled-components';

const TagSpan = styled.span`
  background: #ff2b00;
  color: white;
  font-size: 12px;
  padding: 0 3px;
  margin-right: 4px;
  position: relative;
  top: -1px;
`;
const LeftTag = styled.span`
  position: absolute;
  color: white;
  display: inline-block;
  line-height: 24px;
  width: 56px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-bottom-right-radius: 10px;
  z-index: 10;
`;

const CommonContent = () => (
  <>
    <Card.Content>
      <Typography.Title level={3} style={{ marginBottom: '4px' }}>
        <TagSpan>新</TagSpan>标题文案
      </Typography.Title>
      <Typography.Text>
        这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定
      </Typography.Text>
      <div style={{ marginTop: 17 }}>
        <Tag>标签一</Tag>
        <Tag>标签二</Tag>
      </div>
    </Card.Content>
    <Card.Actions>
      <InlineButton type="primary">操作 1</InlineButton>
      <InlineButton type="primary">操作 2</InlineButton>
      <InlineButton type="primary" style={{ marginLeft: 'auto' }}>
        操作 3
      </InlineButton>
    </Card.Actions>
  </>
);

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <CardWrapper style={{ width: 300, marginRight: '20px' }} shadowed={false} bordered>
        <LeftTag>标签一</LeftTag>
        <Card.Header
          height={220}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <CommonContent />
      </CardWrapper>
      <CardWrapper style={{ width: 300, marginRight: '20px' }}>
        <LeftTag>标签一</LeftTag>
        <Card.Header
          height={220}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <CommonContent />
      </CardWrapper>
      <CardWrapper style={{ width: 300 }} shadowed={false} hoverShadowed={false}>
        <Card.Header
          height={220}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <Card.Content padding="8px 0 12px">
          <Typography.Title level={3} style={{ marginBottom: '4px' }}>
            <TagSpan>新</TagSpan>标题文案
          </Typography.Title>
          <Typography.Text>
            这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定
          </Typography.Text>
        </Card.Content>
        <Card.Actions padding="0 0 5px" bordered={false}>
          <Button plain type="primary">
            操作 1
          </Button>
          <Button plain type="strong">
            操作 2
          </Button>
        </Card.Actions>
      </CardWrapper>
    </div>
  );
}

export const meta = {
  title: 'Card 基础用法',
  desc: 'Card 样式可分为：线框型、投影型、无框型',
};
