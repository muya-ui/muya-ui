import React from 'react';

import { Button, notification } from '@muya-ui/core';

export default function FixedDemo() {
  const onSuccess = () => {
    notification.success({
      title: '固定显示，只能手动关闭',
      content: '固定显示，只能手动关闭',
      fixed: true,
    });
  };
  // let time = Date.now();
  return (
    <div className="doc-button-container">
      <Button onClick={onSuccess}>固定显示，只能手动关闭</Button>
    </div>
  );
}

export const meta = {
  title: '固定显示',
  desc: '固定显示',
};
