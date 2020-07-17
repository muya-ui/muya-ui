import React from 'react';

import { AddIcon, ListIcon } from '@muya-ui/theme-light';
import { Tab, Tabs } from '@muya-ui/core';

export default function TabDemo() {
  return (
    <div>
      <Tabs className="tabs">
        <Tab className="custom-tab" href="https://www.kujiale.com" target="_blank">
          Link
        </Tab>
        <Tab className="custom-tab" disabled>
          Disabled
        </Tab>
        <Tab className="custom-tab" suffixNode={<AddIcon />}>
          Icon
        </Tab>
        <Tab className="custom-tab" suffixNode={<ListIcon />}>
          Icon
        </Tab>
      </Tabs>
    </div>
  );
}

export const meta = {
  title: 'Tab的使用',
  desc: 'Tab可以使用 Button 的大部分属性，具体可以文档下方的 API 文档',
};
