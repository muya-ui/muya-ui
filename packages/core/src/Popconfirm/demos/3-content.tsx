import React from 'react';

import { Button, Popconfirm, Typography } from '@muya-ui/core';

export default function Content() {
  return (
    <>
      <Popconfirm
        title="确认兑换吗？"
        confirmText="确定"
        cancelText="取消"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="primary">只有标题</Button>
      </Popconfirm>
      <Popconfirm
        content={<Typography.Paragraph>记录第一次遇见的你 Jay Chou</Typography.Paragraph>}
        confirmText="我知道了"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="primary">自定义内容</Button>
      </Popconfirm>
      <Popconfirm
        title="确认兑换吗？"
        content="兑换将消耗您的积分兑换将消耗您的积分兑换将消耗您的积分。"
        confirmText="确定"
        cancelText="取消"
        triggerActions={['click']}
        placement="bottom-end"
      >
        <Button type="primary">标题+普通文案内容</Button>
      </Popconfirm>
    </>
  );
}

export const meta = {
  title: '配置内容',
  desc:
    '1. `title`控制标题\n\n2. `content`控制中间区域内容\n\n3. ·`actions`可以自定义行动区域内容，可覆盖默认的确认/取消按钮',
};
