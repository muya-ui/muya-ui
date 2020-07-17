import React from 'react';

import { Breadcrumbs, InlineButton } from '@muya-ui/core';

export default function StatusDemo() {
  return (
    <>
      <Breadcrumbs separators={['|', '>']} fontWeight="lighter">
        <InlineButton type="secondary" href="../">
          返回上级
        </InlineButton>
        <InlineButton type="secondary" href="../../">
          home
        </InlineButton>
        <InlineButton type="normal">current</InlineButton>
      </Breadcrumbs>
    </>
  );
}

export const meta = {
  title: '分隔符',
  desc: '修改 separators 属性来变更分隔符',
};
