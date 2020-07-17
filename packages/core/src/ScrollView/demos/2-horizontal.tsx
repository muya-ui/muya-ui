import React from 'react';
import { ScrollView } from '@muya-ui/core';

export default function HorizontalDemo() {
  return (
    <ScrollView scrollX>
      <div style={{ width: 1000, height: 100, background: '#00a0e9' }}></div>
      <div style={{ width: 1000, height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
      <div style={{ width: 1000, height: 100, background: '#00a0e9' }}></div>
      <div style={{ width: 1000, height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
    </ScrollView>
  );
}

export const meta = {
  title: '横向滚动',
  desc: '可以通过 `scrollX` 开启横向滚动。',
};
