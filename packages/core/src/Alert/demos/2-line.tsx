import React, { useState } from 'react';

import { Alert, Typography } from '@muya-ui/core';

export default function LineDemo() {
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);
  const [visible3, setVisible3] = useState(true);
  return (
    <div className="doc-alert-container">
      <div className="item">
        <Typography.Title className="title" level={5}>
          单行
        </Typography.Title>
        <div className="alert">
          <Alert
            type="info"
            showClose
            visible={visible1}
            onClose={() => {
              setVisible1(false);
            }}
          >
            这是一条 info 提示文案
          </Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          多行
        </Typography.Title>
        <div className="alert">
          <Alert
            type="info"
            showClose
            visible={visible2}
            onClose={() => {
              setVisible2(false);
            }}
          >
            这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info
            提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info
            提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info
            提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info
            提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info
            提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info
            提示文案这是一条 info 提示文案这是一条 info 提示文案
          </Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          多行带标题
        </Typography.Title>
        <div className="alert">
          <Alert
            type="info"
            title="信息文字"
            description="这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案这是一条 info 提示文案"
            showClose
            visible={visible3}
            onClose={() => {
              setVisible3(false);
            }}
          ></Alert>
        </div>
      </div>
    </div>
  );
}

export const meta = {
  title: '关闭按钮',
  desc: '当用户点击关闭按钮时，可以关闭全局警告',
};
