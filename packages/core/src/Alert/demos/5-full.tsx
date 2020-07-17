import React from 'react';

import { Alert } from '@muya-ui/core';

export default function ActionDemo() {
  return (
    <div className="doc-alert-container">
      <Alert
        type="info"
        showClose
        styles={{
          container: {
            width: 960,
          },
        }}
      >
        通过填写个人信息可以让用户更方便地找到你。
      </Alert>
    </div>
  );
}

export const meta = {
  title: '占满整行，并设置内容的宽度',
  desc: '占满整行，并设置内容的宽度',
};
