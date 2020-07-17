import React from 'react';
import styled from 'styled-components';

import { Button, notification } from '@muya-ui/core';

const StyledRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

export default function CustomDemo() {
  const onSuccess = () => {
    const id = notification.success({
      title: <>标题也是节点</>,
      content: (
        <>
          <div>消息内容</div>
          <StyledRow>
            <Button
              type="primary"
              size="s"
              onClick={() => {
                notification.close(id);
              }}
            >
              关闭
            </Button>
          </StyledRow>
        </>
      ),
      // fixed: true,
      onClose: () => {
        console.log('notification closed');
      },
    });
  };
  // let time = Date.now();
  return (
    <div className="doc-button-container">
      <Button onClick={onSuccess}>增加通知</Button>
    </div>
  );
}

export const meta = {
  title: '自定义节点',
  desc: '自定义节点',
};
