import React from 'react';
import { Trigger, Button } from '@muya-ui/core';

export default function Offset() {
  const popup = (
    <div
      style={{
        width: '176px',
        // height: '100px',
        padding: '16px',
        borderRadius: '4px',
        background: '#fff',
        boxShadow: 'rgba(56, 60, 66, 0.08) 0px 0px 12px 0px',
      }}
    >
      Dude, What&apos;s your problem, ?
    </div>
  );
  return (
    <>
      <Trigger popup={popup} triggerActions={['hover']} offset={30}>
        <Button type="primary">Hover Me</Button>
      </Trigger>
    </>
  );
}

export const meta = {
  title: 'offset',
  desc: 'offset代表弹出容器与目标元素的距离，容器区域包含箭头的大小',
};
