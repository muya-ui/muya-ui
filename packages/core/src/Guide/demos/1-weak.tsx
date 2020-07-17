import React from 'react';
import styled from 'styled-components';

import { InformIcon } from '@muya-ui/theme-light';
import { Badge, Button, Col, PopoverCard, Row, Typography, useTheme } from '@muya-ui/core';

export const StyledIcon = styled(InformIcon)`
  margin-right: 8px;
  color: #1a7af8;
`;

export default function Demo() {
  const theme = useTheme();
  const [badgeOn, setBadgeOn] = React.useState(['新', 'New']);
  const [showCard, setShowCard] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowCard(false);
    }, 10000);
  }, []);

  return (
    <>
      <Row gutter={30} style={{ marginTop: 30 }}>
        <Col>
          <Badge value={badgeOn[0]}>
            <Button
              onClick={() => {
                const value = [...badgeOn];
                value[0] = '';
                setBadgeOn(value);
              }}
            >
              新功能
            </Button>
          </Badge>
        </Col>
        <Col>
          <Badge value={badgeOn[1]}>
            <Button
              onClick={() => {
                const value = [...badgeOn];
                value[1] = '';
                setBadgeOn(value);
              }}
            >
              新功能
            </Button>
          </Badge>
        </Col>
      </Row>
      <Row style={{ marginTop: 30 }}>
        <PopoverCard
          open={showCard}
          placement="right"
          content={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <StyledIcon />
              <Typography.Title
                style={{ marginBottom: 0 }}
                level={theme.components.Guide.titleLevel}
              >
                这是一个新功能
              </Typography.Title>
            </div>
          }
          style={{
            padding: '10px 16px',
          }}
        >
          <Button>新功能</Button>
        </PopoverCard>
      </Row>
    </>
  );
}

export const meta = {
  title: '弱提示',
  desc: '弱提示使用方式。',
};
