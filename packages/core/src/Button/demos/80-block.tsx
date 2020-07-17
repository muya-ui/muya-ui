import React from 'react';

import { Button, ButtonGroup, MaskButton } from '@muya-ui/core';

export default function BlockDemo() {
  return (
    <div>
      <div className="doc-button-row">
        <Button type="primary" block>
          primary button
        </Button>
      </div>
      <div className="doc-button-row">
        <MaskButton block>mask button</MaskButton>
      </div>
      <div className="doc-button-row">
        <ButtonGroup block type="primary">
          <Button>xl</Button>
          <Button>l</Button>
          <Button>m</Button>
          <Button>s</Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export const meta = {
  title: '占满容器',
  desc: '占满容器',
};
