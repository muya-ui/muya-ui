import React from 'react';
import { Tooltip, Button, InlineButton } from '@muya-ui/core';

export default function Style() {
  return (
    <>
      <Tooltip
        title={
          <div>
            窗外的麻雀，在电线杆上多嘴{' '}
            <InlineButton type="danger" target="_blank" href="https://www.kujiale.com">
              Jay Chou
            </InlineButton>
          </div>
        }
        triggerActions={['hover']}
        style={{
          backgroundColor: 'deepskyblue',
        }}
        arrowStyle={{
          color: 'deepskyblue',
        }}
      >
        <Button type="primary">Hover Me</Button>
      </Tooltip>
    </>
  );
}

export const meta = {
  title: '自定义内容、样式',
  desc:
    '1. 给title传入React节点即可实现内容自定义\n\n2. 传入的 `style`、`className` 属性会挂载到Tooltip容器上，可以实现自定义样式\n\n3. 通过传入 `arrowStyle` 可以自定义箭头样式，`arrowStyle`类型同`Trigger`',
};
