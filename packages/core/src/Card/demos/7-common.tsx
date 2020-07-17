import React from 'react';
import { InlineButton, CommonCard } from '@muya-ui/core';

export default function Demo() {
  return (
    <div>
      <CommonCard
        style={{ width: 300 }}
        imgHeight={220}
        src="//qhyxpicoss.kujiale.com/2019/03/26/LSMM56IKAQBZMRC3AAAAADQ8_3840x2160.jpg@!212"
        title="标题文案"
        text="这是一段描述文案，可以解释内容，描述内容，允许换行，可视情况而定"
        actions={
          <>
            <InlineButton type="primary">操作 1</InlineButton>
            <InlineButton type="primary">操作 2</InlineButton>
            <InlineButton type="primary" style={{ marginLeft: 'auto' }}>
              操作 3
            </InlineButton>
          </>
        }
      />
    </div>
  );
}

export const meta = {
  title: 'CommonCard 用法',
  desc: '使用 CommonCard 语法糖快速完成 Card 的实现',
};
