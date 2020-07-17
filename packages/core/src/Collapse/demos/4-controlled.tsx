import React, { useState, Key, useCallback } from 'react';

import { Collapse, CollapsePanel, Typography } from '@muya-ui/core';

export default function ControlledDemo() {
  const [activeKeys, setActiveKeys] = useState<Key[]>(['2']);
  const handleChange = useCallback((keys: Key[]) => {
    setActiveKeys(keys);
  }, []);

  console.log('activeKeys', activeKeys);
  const text =
    '酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。';
  return (
    <Collapse activeKeys={activeKeys} onChange={handleChange}>
      <CollapsePanel header="标题1" key="1">
        <Typography.Paragraph>{text}</Typography.Paragraph>
      </CollapsePanel>
      <CollapsePanel header="标题2" key="2">
        <Typography.Paragraph>{text}</Typography.Paragraph>
      </CollapsePanel>
      <CollapsePanel header="标题3" key="3" disabled>
        <Typography.Paragraph>{text}</Typography.Paragraph>
      </CollapsePanel>
    </Collapse>
  );
}

export const meta = {
  title: '受控使用',
  desc: '通过`activeKeys`和`onChange`来做受控',
};
