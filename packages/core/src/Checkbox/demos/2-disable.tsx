import React from 'react';

import { Checkbox } from '@muya-ui/core';

export default function DisableDemo() {
  return (
    <div>
      <div>
        <Checkbox checked disabled />
      </div>
      <div>
        <Checkbox disabled />
      </div>
    </div>
  );
}

export const meta = {
  title: '不可用',
  desc: 'checkbox不可用',
};
