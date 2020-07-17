import React from 'react';

import { Button, notification } from '@muya-ui/core';

export default function BasicDemo() {
  const onSuccess = () => {
    notification.success({
      title: '成功提示',
      content: '成功提示的内容',
    });
  };
  const onWarning = () => {
    notification.warning({
      title: '警告的提示',
      content: '警告提示的内容',
    });
  };
  const onInfo = () => {
    notification.info({
      title: '普通提示',
      content: '普通提示的内容',
    });
  };
  const onError = () => {
    notification.error({
      title: '错误提示',
      content: '错误提示的内容',
    });
  };
  const onLoading = () => {
    notification.loading({
      title: '加载提示',
      content: '加载提示的内容',
    });
  };
  const onAdd = () => {
    notification.add({
      title: '无Icon提示',
      content: '无Icon提示的内容',
    });
  };
  // let time = Date.now();
  return (
    <div className="doc-button-container">
      <Button type="primary" onClick={onSuccess}>
        success
      </Button>
      <Button type="normal" plain={false} onClick={onInfo}>
        info
      </Button>
      <Button type="danger" onClick={onError}>
        error
      </Button>
      <Button type="warning" onClick={onWarning}>
        warning
      </Button>
      <Button type="secondary" onClick={onLoading}>
        loading
      </Button>
      <Button type="weak" onClick={onAdd}>
        none
      </Button>
    </div>
  );
}

export const meta = {
  title: 'Notification基础用法',
  desc: 'Notification基础用法',
};
