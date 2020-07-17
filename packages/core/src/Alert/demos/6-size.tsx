import React from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Alert, Button, ButtonGroup, Typography } from '@muya-ui/core';

export default function TypeDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <div className="doc-alert-container">
      <ButtonGroup style={{ marginBottom: 10 }} plain={true}>
        <Button selected={size === 'xl'} onClick={() => setSize('xl')}>
          xl
        </Button>
        <Button selected={size === 'l'} onClick={() => setSize('l')}>
          l
        </Button>
        <Button selected={size === 'm'} onClick={() => setSize('m')}>
          m
        </Button>
        <Button selected={size === 's'} onClick={() => setSize('s')}>
          s
        </Button>
      </ButtonGroup>
      <div className="item">
        <Typography.Title className="title" level={5}>
          失败（Error）
        </Typography.Title>
        <div className="alert">
          <Alert size={size} type="error">
            这是一条 error 提示文案
          </Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          成功（Success)
        </Typography.Title>
        <div className="alert">
          <Alert size={size} type="success">
            这是一条 success 提示文案
          </Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          提示（Info）
        </Typography.Title>
        <div className="alert">
          <Alert size={size} type="info">
            这是一条 info 提示文案
          </Alert>
        </div>
      </div>
      <div className="item">
        <Typography.Title className="title" level={5}>
          警告（Warning）
        </Typography.Title>
        <div className="alert">
          <Alert size={size} type="warning">
            这是一条 warning 提示文案
          </Alert>
        </div>
      </div>
    </div>
  );
}

export const meta = {
  title: 'Alert 尺寸',
  desc: 'Alert 尺寸，可以是 xl 、l 、m 、s 。',
};
