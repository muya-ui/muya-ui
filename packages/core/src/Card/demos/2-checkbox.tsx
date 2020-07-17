import React from 'react';
import styled from 'styled-components';

import { ITypographyTitleLevel } from '@muya-ui/theme-light';
import { Button, InlineButton, Tag, Typography, useTheme } from '@muya-ui/core';

import Card, { CheckBoxCard } from '../index';

const TagSpan = styled.span`
  background: #ff2b00;
  color: white;
  font-size: 12px;
  padding: 0 3px;
  margin-right: 4px;
  position: relative;
  top: -1px;
`;

export interface ICommonContentProps {
  titleLevel: ITypographyTitleLevel;
}

const CommonContent = (props: ICommonContentProps) => (
  <>
    <Card.Content>
      <Typography.Title level={props.titleLevel} style={{ marginBottom: '4px' }}>
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

const Cover = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 100px;
`;

export default function Demo() {
  const theme = useTheme();
  const titleLevel = theme.themeName === 'muya-theme-coohom' ? 5 : 4;
  const [checked, setCheckedState] = React.useState([false, false]);
  const setState = (index: number, state: boolean) => {
    checked[index] = state;
    setCheckedState([...checked]);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <CheckBoxCard
        style={{ width: 300, marginRight: 20 }}
        checked={checked[0]}
        size="l"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(0, e.target.checked)}
      >
        <Cover />
        <Card.Header
          height={220}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <CommonContent titleLevel={titleLevel} />
      </CheckBoxCard>
      <CheckBoxCard
        style={{ width: 300, padding: 8 }}
        checked={checked[1]}
        shadowed={false}
        hoverShadowed={false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setState(1, e.target.checked)}
        styles={{ checkBoxWrapper: { top: 14, right: 14 } }}
      >
        <Card.Header
          height={220}
          src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        />
        <Card.Content padding="8px 0 12px">
          <Typography.Title level={titleLevel} style={{ marginBottom: '4px' }}>
            标题文案
          </Typography.Title>
          <Typography.Text>
            这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定
          </Typography.Text>
        </Card.Content>
        <Card.Actions padding={0} bordered={false}>
          <Button plain type="primary">
            操作 1
          </Button>
          <Button plain type="strong">
            操作 2
          </Button>
        </Card.Actions>
      </CheckBoxCard>
    </div>
  );
}

export const meta = {
  title: 'CheckCard 基础用法',
  desc: 'CheckCard 基础用法',
};
