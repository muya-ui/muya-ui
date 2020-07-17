import React from 'react';

import { Button, IToastType, toast } from '@muya-ui/core';

const msgMap = {
  success: '保存成功',
  error: '保存失败',
  warning: '提示文案',
  info: '普通提示',
  loading: '加载中...',
};
export default function BasicDemo() {
  const onClick = (type: IToastType) => {
    return () => {
      toast[type](msgMap[type]);
    };
  };
  return (
    <div className="doc-button-container">
      <Button type="primary" onClick={onClick('success')}>
        success
      </Button>
      <Button type="secondary" onClick={onClick('info')}>
        info
      </Button>
      <Button type="danger" onClick={onClick('error')}>
        error
      </Button>
      <Button type="warning" onClick={onClick('warning')}>
        warning
      </Button>
      <Button type="normal" onClick={onClick('loading')}>
        loading
      </Button>
    </div>
  );
}

export const meta = {
  title: 'Toast基础用法',
  desc: 'Toast基础用法',
  order: 0,
};
