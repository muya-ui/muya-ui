import React from 'react';
import { ScrollView } from '@muya-ui/core';

export default function BasicDemo() {
  return (
    <ScrollView height={400}>
      <div style={{ height: 100, background: '#00a0e9' }}></div>
      <div style={{ height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
      <div style={{ height: 100, background: '#00a0e9' }}></div>
      <div style={{ height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
      <div style={{ height: 100, background: '#00a0e9' }}></div>
      <div style={{ height: 100, background: 'rgba(0, 160, 233, 0.7)' }}></div>
    </ScrollView>
  );
}

export const meta = {
  title: '基本使用',
  desc: '默认为纵向滚动，滚动条尺寸级别为 m',
};
