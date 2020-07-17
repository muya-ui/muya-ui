import React from 'react';

import { AddIcon, CloseIcon } from '@muya-ui/theme-light';
import { IconButton, InlineButton, Typography } from '@muya-ui/core';

export default function InlineButtonDemo() {
  return (
    <div>
      <div className="doc-button-container">
        <InlineButton type="primary">primary</InlineButton>
        <InlineButton type="strong">strong</InlineButton>
        <InlineButton>normal</InlineButton>
        <InlineButton type="secondary">secondary</InlineButton>
        <InlineButton type="weak">weak</InlineButton>
        <InlineButton type="danger">danger</InlineButton>
        <InlineButton type="success">success</InlineButton>
        <InlineButton type="warning">warning</InlineButton>
      </div>

      <div>
        <Typography.Text>通常文字按钮会使用：</Typography.Text>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </div>
      <div>
        <Typography.Text>如果需要更弱化则使用：</Typography.Text>
        <InlineButton type="weak" weakLevel={2}>
          <AddIcon />
        </InlineButton>
      </div>
    </div>
  );
}

export const meta = {
  title: 'InlineButton',
  desc: '一般用于文字链接，或者按钮',
};
