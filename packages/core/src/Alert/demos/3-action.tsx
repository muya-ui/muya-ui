import React from 'react';
import styled from 'styled-components';

import { Alert, Button, InlineButton, Link, Typography } from '@muya-ui/core';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledMain = styled.div`
  flex: 1;
`;
const StyledAction = styled.div`
  padding-left: 20px;
`;

export default function ActionDemo() {
  return (
    <div className="doc-alert-container">
      <div className="item">
        <Typography.Title className="title" level={5}>
          单个行动点
        </Typography.Title>
        <div className="alert-wp">
          <div className="alert">
            <Alert type="error" showIcon={false}>
              <Typography.Text>
                这是一条提示文案这是一条提示文案链接
                <Link
                  href="/"
                  size="s"
                  style={{
                    margin: '0 5px',
                    textDecoration: 'none',
                    color: '#1a7af8',
                  }}
                >
                  链接按钮
                </Link>
                这是一条提示文案
              </Typography.Text>
            </Alert>
          </div>
          <div className="alert">
            <Alert type="success" showIcon={false}>
              <StyledContainer>
                <StyledMain>
                  <Typography.Text>
                    这是一条提示文案这是一条提示文案这是一条提示文案
                  </Typography.Text>
                </StyledMain>
                <StyledAction>
                  <InlineButton size="s" type="primary">
                    操作按钮
                  </InlineButton>
                </StyledAction>
              </StyledContainer>
            </Alert>
          </div>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          两个行动点
        </Typography.Title>
        <div className="alert-wp">
          <div className="alert">
            <Alert type="warning">
              <StyledContainer>
                <StyledMain>
                  <Typography.Text>
                    这是一条提示文案这是一条提示文案这是一条提示文案
                  </Typography.Text>
                </StyledMain>
                <StyledAction>
                  <InlineButton size="s" type="primary">
                    操作按钮
                  </InlineButton>
                </StyledAction>
                <StyledAction>
                  <InlineButton size="s" type="primary">
                    操作按钮
                  </InlineButton>
                </StyledAction>
              </StyledContainer>
            </Alert>
          </div>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          三个行动点
        </Typography.Title>
        <div className="alert-wp">
          <div className="alert">
            <Alert type="warning">
              <StyledContainer>
                <StyledMain>
                  <Typography.Text>
                    这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案这是一条提示文案
                  </Typography.Text>
                </StyledMain>
                <StyledAction>
                  <InlineButton size="s" type="primary">
                    操作按钮
                  </InlineButton>
                </StyledAction>
                <StyledAction>
                  <InlineButton size="s" type="primary">
                    操作按钮
                  </InlineButton>
                </StyledAction>
                <StyledAction>
                  <Button size="s">操作按钮</Button>
                </StyledAction>
              </StyledContainer>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

export const meta = {
  title: '按钮行动点',
  desc:
    '全局提示可以配备三个以内的行动点以满足使用场景（文字链按钮可以配置在文案中间）。为了更好地对齐，建议：`s` 和 `m` 的 `Alert` 内嵌文案中的 `Button` 或 `Link` 为尺寸 `s`，`l` 和 `xl` 的 `Alert` 内嵌文案中的 `Button` 或 `Link` 为尺寸 `m`。',
};
