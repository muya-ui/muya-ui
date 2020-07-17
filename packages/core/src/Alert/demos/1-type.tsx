import React from 'react';

import { Alert, Typography } from '@muya-ui/core';

export default function TypeDemo() {
  return (
    <div className="doc-alert-container">
      <div className="item">
        <Typography.Title className="title" level={5}>
          失败（Error）
        </Typography.Title>
        <div className="alert">
          <Alert type="error" appear={false}>
            这是一条 error 提示文案
          </Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          成功（Success)
        </Typography.Title>
        <div className="alert">
          <Alert type="success">这是一条 success 提示文案</Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          提示（Info）
        </Typography.Title>
        <div className="alert">
          <Alert type="info">这是一条 info 提示文案</Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          警告（Warning）
        </Typography.Title>
        <div className="alert">
          <Alert type="warning" childrenAsTitle>
            <Typography.Text>
              为响应广大客户延长体验诉求，数据驾驶舱 Beta
              版将继续限时免费，详细收费策略会在后期提前通知。
            </Typography.Text>
          </Alert>
        </div>
      </div>
    </div>
  );
}

export const meta = {
  title: '种类',
  desc: '有4种基础类型，用于表达不同的信息',
};
