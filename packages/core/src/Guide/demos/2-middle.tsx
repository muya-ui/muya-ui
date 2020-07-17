import React from 'react';
import styled from 'styled-components';

import { CloseIcon, InformIcon } from '@muya-ui/theme-light';
import { Button, PopoverCard, Row, Typography, useTheme } from '@muya-ui/core';

const StyledIcon = styled(InformIcon)`
  margin-right: 8px;
  color: #1a7af8;
`;

const StyledCloseIcon = styled(CloseIcon)`
  color: #ccc;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row-reverse;
`;

export default function Demo() {
  const theme = useTheme();
  const [showCard, setShowCard] = React.useState(true);
  const [showCard1, setShowCard1] = React.useState(true);
  const [showCard2, setShowCard2] = React.useState(true);

  return (
    <>
      <Row style={{ marginBottom: 50 }}>
        <PopoverCard
          open={showCard}
          placement="right"
          content={
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StyledIcon />
                <Typography.Title
                  style={{ marginBottom: 0 }}
                  level={theme.components.Guide.titleLevel}
                >
                  这是一个新功能
                </Typography.Title>
              </div>
              <ButtonWrapper>
                <Button type="primary" onClick={() => setShowCard(false)}>
                  我知道了
                </Button>
              </ButtonWrapper>
            </>
          }
          style={{
            padding: '10px 16px',
            width: 200,
          }}
        >
          <Button onClick={() => setShowCard(false)}>新功能</Button>
        </PopoverCard>
      </Row>
      <Row style={{ marginBottom: 50 }}>
        <PopoverCard
          open={showCard1}
          placement="right"
          content={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <StyledIcon />
                <Typography.Title
                  style={{ marginBottom: 0 }}
                  level={theme.components.Guide.titleLevel}
                >
                  这是一个新功能
                </Typography.Title>
              </div>
              <StyledCloseIcon onClick={() => setShowCard1(false)} />
            </div>
          }
          style={{
            padding: '10px 16px',
            width: 200,
          }}
        >
          <Button onClick={() => setShowCard1(false)}>新功能</Button>
        </PopoverCard>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <PopoverCard
          open={showCard2}
          placement="right"
          content={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledIcon />
              <Typography.Title
                style={{ marginBottom: 0 }}
                level={theme.components.Guide.titleLevel}
              >
                点击查看更多功能
              </Typography.Title>
            </div>
          }
          style={{
            padding: '10px 16px',
          }}
        >
          <Button onClick={() => setShowCard2(false)}>新功能</Button>
        </PopoverCard>
      </Row>
    </>
  );
}

export const meta = {
  title: '中度提示',
  desc: '中度提示使用方式。',
};
