import React from 'react';
import { Steps, Step } from '@muya-ui/core';

export default function Simple() {
  return (
    <>
      <Steps current={1}>
        <Step title="已完成" description="这里是描述部分"></Step>
        <Step title="处理中" description="这里是描述部分"></Step>
        <Step title="等待处理" description="这里是描述部分"></Step>
      </Steps>
    </>
  );
}

export const meta = {
  title: '基本用法',
  desc: '简单的步骤条',
};
