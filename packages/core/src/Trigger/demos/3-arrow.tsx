import React from 'react';

import { Button, ITriggerArrowStyle, Trigger } from '@muya-ui/core';

export default function Offset() {
  const color = 'rgba(0,0,0,0.7)';
  const popup = (
    <div
      style={{
        width: '176px',
        // height: '100px',
        padding: '16px',
        borderRadius: '4px',
        background: color,
        color: '#fff',
        boxShadow: 'rgba(56, 60, 66, 0.08) 0px 0px 12px 0px',
      }}
    >
      Dude, What&apos;s your problem, ?
    </div>
  );
  const arrowStyle: ITriggerArrowStyle = {
    color: color,
    width: 20,
    height: 10,
  };
  return (
    <>
      <Trigger popup={popup} arrowStyle={arrowStyle} triggerActions={['hover']}>
        <Button type="primary">Hover Me</Button>
      </Trigger>
    </>
  );
}

export const meta = {
  title: '自定义箭头样式',
  desc:
    '设置`arrowStyle`的`width`和`height`来控制箭头的大小，设置`arrowStyle`的`color`来控制箭头的颜色\n\n通常修改了箭头颜色后，`popup`内容的颜色也相应修改，否则会出现箭头与内容颜色不一致的情况',
};
