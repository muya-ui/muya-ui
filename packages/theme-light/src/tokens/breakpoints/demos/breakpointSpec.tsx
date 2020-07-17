import React from 'react';
import { Table, useTheme } from '@muya-ui/core';

export default function BreakpointSpecDemo() {
  const { breakpoints } = useTheme();
  const data = [
    {
      key: 'xs',
      tokenKey: 'theme.breakpoints.spec.breakpointsMap.xs',
      value: `>${breakpoints.spec.breakpointsMap.xs} 且 <=${breakpoints.spec.breakpointsMap.sm}`,
    },
    {
      key: 'sm',
      tokenKey: 'theme.breakpoints.spec.breakpointsMap.sm',
      value: `>${breakpoints.spec.breakpointsMap.sm} 且 <=${breakpoints.spec.breakpointsMap.md}`,
    },
    {
      key: 'md',
      tokenKey: 'theme.breakpoints.spec.breakpointsMap.md',
      value: `>${breakpoints.spec.breakpointsMap.md} 且 <=${breakpoints.spec.breakpointsMap.lg}`,
    },
    {
      key: 'lg',
      tokenKey: 'theme.breakpoints.spec.breakpointsMap.lg',
      value: `>${breakpoints.spec.breakpointsMap.lg} 且 <=${breakpoints.spec.breakpointsMap.xl}`,
    },
    {
      key: 'xl',
      tokenKey: 'theme.breakpoints.spec.breakpointsMap.xl',
      value: `>${breakpoints.spec.breakpointsMap.xl}`,
    },
  ];
  return (
    <Table
      dataSource={data}
      columns={[
        {
          title: 'key',
          dataIndex: 'key',
          key: 'key',
          width: 200,
        },
        {
          title: 'tokenKey',
          dataIndex: 'tokenKey',
          key: 'tokenKey',
          width: 400,
        },
        {
          title: '响应范围',
          dataIndex: 'value',
          key: 'value',
        },
      ]}
    ></Table>
  );
}
