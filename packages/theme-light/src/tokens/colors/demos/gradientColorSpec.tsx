import React from 'react';
import styled from 'styled-components';
import { ColorItem } from './styled';
import { useTheme } from '@muya-ui/core';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function GradientColorSpecDemo() {
  const { colors } = useTheme();
  const colorItems = [
    {
      tokenKey: 'theme.colors.spec.gradient.normal',
      color: colors.spec.gradient.normal,
      title: '品牌渐变色',
      transformColor: '#33ADFF - #1A7AF8',
    },
    {
      tokenKey: 'theme.colors.spec.gradient.hover',
      color: colors.spec.gradient.hover,
      title: '品牌渐变色 Hover',
      transformColor: '#60BFFF - #589EFA',
    },
    {
      tokenKey: 'theme.colors.spec.gradient.click',
      color: colors.spec.gradient.click,
      title: '品牌渐变色 Click',
      transformColor: '#31A6F5 - #1876EE',
    },
  ].map(item => <ColorItem key={item.tokenKey} textInverse {...item} />);
  return <Row>{colorItems}</Row>;
}
