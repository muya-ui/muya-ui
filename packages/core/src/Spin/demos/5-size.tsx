import React from 'react';
import { Spin, toast } from '@muya-ui/core';

export default function Size() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
        }}
      >
        <Spin
          desc="size: s..."
          size="s"
          onCancel={() => toast.success('你点击了取消')}
          cancelText="取消"
        />
        <Spin
          desc="size: m..."
          size="m"
          onCancel={() => toast.success('你点击了取消')}
          cancelText="取消"
        />
        <Spin
          desc="size: l..."
          size="l"
          onCancel={() => toast.success('你点击了取消')}
          cancelText="取消"
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginTop: '20px',
          flexFlow: 'column nowrap',
          justifyContent: 'space-between',
        }}
      >
        <Spin
          direction="row"
          desc="size: s..."
          size="s"
          onCancel={() => toast.success('你点击了取消')}
          cancelText="取消"
        />
        <Spin
          direction="row"
          desc="size: m..."
          size="m"
          onCancel={() => toast.success('你点击了取消')}
          cancelText="取消"
        />
        <Spin
          direction="row"
          desc="size: l..."
          size="l"
          onCancel={() => toast.success('你点击了取消')}
          cancelText="取消"
        />
      </div>
    </>
  );
}

export const meta = {
  title: '标准尺寸',
  desc:
    '如果设置了`desc`或者`cancelText`，此时图标不会使用外部的fontSize，而是会使用标准的视觉尺寸`s`、`m`、`l`、`xl`',
};
