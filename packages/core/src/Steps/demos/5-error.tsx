import React from 'react';
import { Steps, Step } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <Steps current={1} status="error">
        <Step title="已完成" description="这里是描述部分"></Step>
        <Step title="出错了" description="这里是描述部分"></Step>
        <Step title="等待处理" description="这里是描述部分"></Step>
      </Steps>
    </>
  );
}

export const meta = {
  title: '步骤错误',
  desc: '使用`Steps`的`status` 属性来指定当前步骤的状态。',
};
