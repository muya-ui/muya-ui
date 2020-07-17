import React from 'react';
import { Typography } from '@muya-ui/core';

const about =
  '酷家乐是一家面向未来的大家居全案设计平台及生态解决方案提供商，致力于为数字化升级提供一站式的解决方案。平台以设计为入口，链接大家居行业生态，为家居企业提供设计、营销、生产、管理、供应链等场景的解决方案和服务，助力全行业实现“所见即所得”的愿景。';

export default function ParagraphDemo() {
  return (
    <div>
      <Typography.Paragraph>{about}</Typography.Paragraph>
      <Typography.Paragraph ellipsis={{ rows: 2 }} title={about}>
        {about}
      </Typography.Paragraph>
    </div>
  );
}

export const meta = {
  title: '段落展示',
  desc: '在段落过长时，可以设置ellipsis属性',
};
