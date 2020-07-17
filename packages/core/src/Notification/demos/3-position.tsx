import React from 'react';

import { Button, INotificationSetting, notification } from '@muya-ui/core';

export default function PositionDemo() {
  const changePosition = (position: INotificationSetting['position']) => {
    return () => {
      notification.config({ position });
      notification.success({
        title: '更改位置通知',
        content: '更改位置通知',
      });
    };
  };
  return (
    <>
      <div className="doc-button-container">
        <Button onClick={changePosition('top-left')}>top-left</Button>
        <Button onClick={changePosition('top-right')}>top-right</Button>
        <Button onClick={changePosition('bottom-left')}>bottom-left</Button>
        <Button onClick={changePosition('bottom-right')}>bottom-right</Button>
      </div>
    </>
  );
}

export const meta = {
  title: '更改出现位置',
  desc: `更改出现位置，可以支持'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
};
