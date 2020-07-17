import React from 'react';

import { Breadcrumbs, InlineButton } from '@muya-ui/core';

export default function StatusDemo() {
  return (
    <div>
      <Breadcrumbs
        separators={[
          '|',
          '>',
          '|',
          <span
            key="nn"
            style={{
              display: 'inline-flex',
              width: 16,
              justifyContent: 'center',
            }}
          >
            -
          </span>,
        ]}
        fontWeight="lighter"
      >
        <InlineButton type="secondary">特殊</InlineButton>
        <InlineButton type="secondary">特殊</InlineButton>
        <InlineButton type="secondary">特殊</InlineButton>
        <InlineButton type="secondary">特殊</InlineButton>
        <InlineButton type="secondary">特殊</InlineButton>
        <InlineButton type="secondary">特殊</InlineButton>
        <InlineButton type="secondary">特殊</InlineButton>
      </Breadcrumbs>
    </div>
  );
}

export const meta = {
  title: '自定义节点',
  desc: '自定义节点',
};
