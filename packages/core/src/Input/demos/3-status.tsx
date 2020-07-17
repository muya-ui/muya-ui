import React, { useState } from 'react';

import { Button, IInputProps, Input } from '@muya-ui/core';

export default function StatusDemo() {
  const [status, setStatus] = useState<IInputProps['status']>('success');
  const [hasFeedback, setHasFeedback] = useState(true);
  return (
    <>
      <Input placeholder="带有反馈提示的输入框" status={status} hasFeedback={hasFeedback} />
      <p>
        <Button style={{ marginRight: '8px' }} type="primary" onClick={() => setStatus('success')}>
          成功反馈
        </Button>
        <Button style={{ marginRight: '8px' }} type="danger" onClick={() => setStatus('error')}>
          失败反馈
        </Button>
        <Button style={{ marginRight: '8px' }} onClick={() => setStatus('loading')}>
          加载中反馈
        </Button>
      </p>
      <p>
        <Button onClick={() => setHasFeedback(s => !s)}>是否展示反馈图标(hasFeedback)</Button>
      </p>
    </>
  );
}

export const meta = {
  title: '反馈提示',
  desc:
    '校验反馈提示有三种状态`status`：error、succes、loading，可以通过`hasFeedback`控制是否展示反馈图标',
};
