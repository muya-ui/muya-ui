import React from 'react';

import { CloseIcon, SelectIcon } from '@muya-ui/theme-light';
import { Row, Switch } from '@muya-ui/core';

export default function CustomChildrenDemo() {
  return (
    <>
      <Row>
        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
      </Row>
      <Row>
        <Switch checkedChildren="1" unCheckedChildren="0" />
      </Row>
      <Row>
        <Switch
          checkedChildren={<SelectIcon style={{ width: 8, height: 8, verticalAlign: 'middle' }} />}
          unCheckedChildren={<CloseIcon style={{ width: 8, height: 8, verticalAlign: 'middle' }} />}
          defaultChecked
        />
      </Row>
    </>
  );
}

export const meta = {
  title: '自定义子节点',
  desc: '带有文字和图标。',
};
