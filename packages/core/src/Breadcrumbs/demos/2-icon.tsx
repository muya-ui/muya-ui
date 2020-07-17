import React from 'react';

import { MoreIcon } from '@muya-ui/theme-light';
import { Breadcrumbs, InlineButton } from '@muya-ui/core';

export default function StatusDemo() {
  return (
    <>
      <Breadcrumbs fontWeight="lighter">
        <InlineButton type="secondary" href="../">
          返回上级
        </InlineButton>
        <InlineButton type="secondary" href="../../">
          home
        </InlineButton>
        <InlineButton type="secondary" href="../">
          <MoreIcon />
          更多
        </InlineButton>
        <InlineButton type="normal">current</InlineButton>
      </Breadcrumbs>
    </>
  );
}

export const meta = {
  title: '带图标',
  desc: '图标与文字结合',
};
