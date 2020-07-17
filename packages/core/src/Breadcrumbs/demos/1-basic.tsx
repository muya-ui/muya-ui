import React from 'react';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Breadcrumbs, Button, ButtonGroup, InlineButton } from '@muya-ui/core';

export default function StatusDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <>
      <ButtonGroup style={{ marginBottom: 10 }}>
        <Button plain={size !== 'xl'} onClick={() => setSize('xl')}>
          xl
        </Button>
        <Button plain={size !== 'l'} onClick={() => setSize('l')}>
          l
        </Button>
        <Button plain={size !== 'm'} onClick={() => setSize('m')}>
          m
        </Button>
        <Button plain={size !== 's'} onClick={() => setSize('s')}>
          s
        </Button>
      </ButtonGroup>
      <Breadcrumbs
        size={size}
        headItem={{
          label: '返回上级',
          url: '../',
        }}
        items={[{ label: 'home', url: '../../' }, { label: 'current', url: '.' }]}
      />
      <Breadcrumbs
        size={size}
        separators={['|', '>']}
        items={[
          { label: '返回上级', url: '../' },
          { label: 'home', url: '../../' },
          { label: 'current', url: '.' },
        ]}
      />
      <Breadcrumbs size={size} fontWeight="lighter" separators={['|', '>']}>
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
  title: '基础用法',
  desc: '基础用法，文档中的三种写法，导航跳转效果是相同的',
};
