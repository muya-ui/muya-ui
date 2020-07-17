import React from 'react';
import { AddIcon, MoreIcon, CloseIcon } from '@muya-ui/theme-light';
import styled from 'styled-components';
import {
  InlineButton,
  Tag,
  Typography,
  Card,
  CardWrapper,
  CheckBoxCard,
  Button,
} from '@muya-ui/core';

const CoverActions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: column;

  & button {
    z-index: 10;
    color: white;
    display: block;
    margin-left: 0 !important;
    margin-top: 10px;
    width: 100px;
  }
`;

const TagSpan = styled.span`
  background: #ff2b00;
  color: white;
  font-size: 12px;
  padding: 0 3px;
  margin-right: 4px;
  position: relative;
  top: -1px;
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

const CloseWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 16px;
  height: 16px;
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 10px;
  }
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
const BottomActions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 190px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  & > svg {
    color: white;
  }
`;

export default function Demo() {
  const [entered, setEntered] = React.useState([false, false, false, false]);
  const setState = (index: number, state: boolean) => {
    entered[index] = state;
    setEntered([...entered]);
  };
  const [checked, setCheckedState] = React.useState([false, false]);
  const setCheckState = (index: number, state: boolean) => {
    checked[index] = state;
    setCheckedState([...checked]);
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'start' }}>
        <CardWrapper
          style={{ width: 300, marginRight: '20px' }}
          shadowed={false}
          onMouseEnter={() => setState(0, true)}
          onMouseLeave={() => setState(0, false)}
        >
          <LeftTag>标签一</LeftTag>
          {entered[0] ? (
            <>
              <CloseWrapper onClick={() => alert('点击关闭')}>
                <CloseIcon />
              </CloseWrapper>
              <BottomActions>
                <AddIcon />
                <MoreIcon />
              </BottomActions>
            </>
          ) : null}
          <Card.Header
            height={220}
            src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
          />
        </CardWrapper>
        <CheckBoxCard
          style={{ width: 300, marginRight: '20px' }}
          shadowed={false}
          showCheckbox={entered[1] || checked[0]}
          checked={checked[0]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckState(0, e.target.checked)}
          onMouseEnter={() => setState(1, true)}
          onMouseLeave={() => setState(1, false)}
        >
          <LeftTag>标签一</LeftTag>
          {entered[1] ? (
            <CoverActions>
              <div>
                <Button type="primary">进入详情</Button>
              </div>
              <div>
                <Button>去设计</Button>
              </div>
            </CoverActions>
          ) : null}
          <Card.Header
            height={220}
            src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
          />
        </CheckBoxCard>
      </div>
      <div style={{ display: 'flex', alignItems: 'start', marginTop: 20 }}>
        <CardWrapper
          style={{ width: 300, marginRight: '20px' }}
          onMouseEnter={() => setState(2, true)}
          onMouseLeave={() => setState(2, false)}
        >
          {entered[2] ? (
            <CloseWrapper onClick={() => alert('点击关闭')}>
              <CloseIcon />
            </CloseWrapper>
          ) : null}
          <CommonContent />
        </CardWrapper>
        <CheckBoxCard
          style={{ width: 300, marginRight: '20px' }}
          shadowed={false}
          showCheckbox={entered[3] || checked[1]}
          checked={checked[1]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCheckState(1, e.target.checked)}
          onMouseEnter={() => setState(3, true)}
          onMouseLeave={() => setState(3, false)}
        >
          <CommonContent />
        </CheckBoxCard>
      </div>
    </>
  );
}

export const meta = {
  title: 'Card 其他类型',
  desc: 'Card 还可以存在：纯图型、纯文型',
};
