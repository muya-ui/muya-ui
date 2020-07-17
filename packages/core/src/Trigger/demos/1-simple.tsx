import React from 'react';

import { Button, Input, Trigger } from '@muya-ui/core';
import { InformationIcon } from '@muya-ui/theme-light';

export default function Simple() {
  const popup = (
    <div
      style={{
        width: '176px',
        // height: '100px',
        padding: '16px',
        borderRadius: '2px',
        background: 'gray',
        boxShadow: 'rgba(56, 60, 66, 0.08) 0px 0px 12px 0px',
      }}
    >
      Dude, What&apos;s your problem, ?
    </div>
  );

  const arrowStyle = {
    color: 'gray',
  };
  return (
    <>
      <Trigger
        arrowStyle={arrowStyle}
        popup={popup}
        triggerActions={['hover']}
        placement="bottom-end"
      >
        <Button style={{ marginRight: '20px' }} type="primary">
          Hover Me
        </Button>
      </Trigger>
      <Trigger arrowStyle={arrowStyle} popup={popup} triggerActions={['click']}>
        <Button style={{ marginRight: '20px' }}>Click Me</Button>
      </Trigger>
      <Trigger arrowStyle={arrowStyle} popup={popup} triggerActions={['click']}>
        <Input placeholder="focus me please!" style={{ marginRight: '20px' }}></Input>
      </Trigger>
      <Trigger popup={popup} placement="top-end" arrowStyle={arrowStyle}>
        <InformationIcon />
      </Trigger>
    </>
  );
}

export const meta = {
  title: '三种触发方式hover、click、focus',
  desc:
    '1. 弹出内容均由外部传入，定制性很高。支持Esc键关闭、支持点击页面空白区域关闭，两种行为均可禁用\n\n 2. 支持`arrowPointAtCenter`属性，箭头指向目标元素中心',
};
