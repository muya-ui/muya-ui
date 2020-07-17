import React from 'react';

import { SearchIcon } from '@muya-ui/theme-light';
import { Option, Select, Typography } from '@muya-ui/core';

export default function PrefixNodeDemo() {
  return (
    <Select
      showSearch
      prefixNode={<Typography.Text>下划线</Typography.Text>}
      suffixNode={<SearchIcon />}
    >
      <Option value="one">One</Option>
      <Option value="two">Two</Option>
      <Option value="three">Three</Option>
    </Select>
  );
}

export const meta = {
  title: '前后缀节点',
  desc:
    '单选模式下可以通过 `prefixNode`、`suffixNode` 设置 `Input` 的前后缀节点。展开图标默认会加到 `suffixNode` 最后，可以通过 `hideExpandIcon` 隐藏。',
};
