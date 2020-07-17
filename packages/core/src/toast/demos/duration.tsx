import React from 'react';

import { Button, toast } from '@muya-ui/core';

export default function DurationDemo() {
  const id = React.useRef(0);
  const onClick = () => {
    id.current = toast.success({
      content: (
        <div>
          成功提示<span style={{ color: 'red' }}>11</span>
        </div>
      ),
      enableContentWrapper: true,
      interval: 10 * 1000,
      onClose: () => {
        console.log(`toast[${id}] closed`);
      },
    });
  };

  const onClose = () => {
    toast.close(id.current);
  };

  return (
    <div className="doc-button-container">
      <Button type="primary" onClick={onClick}>
        自定义时间
      </Button>
      <Button onClick={onClose}>close</Button>
    </div>
  );
}

export const meta = {
  title: '单独设置时长',
  desc: '单独设置时长，设置为10秒',
  order: 1,
};
