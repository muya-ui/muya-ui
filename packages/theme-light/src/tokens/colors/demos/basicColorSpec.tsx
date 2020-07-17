import React from 'react';
import styled from 'styled-components';

import { useTheme } from '@muya-ui/core';
import { ColorItem } from './styled';

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function BasicColorSpecDemo() {
  const { colors } = useTheme();
  const colorItems = [
    {
      tokenKey: 'theme.colors.spec.brand',
      color: colors.spec.brand,
      title: 'Brand 品牌主色',
    },
    {
      tokenKey: 'theme.colors.spec.danger',
      color: colors.spec.danger,
      title: 'Danger 警告色',
    },
    {
      tokenKey: 'theme.colors.spec.warning',
      color: colors.spec.warning,
      title: 'Warning 警示色',
    },
    {
      tokenKey: 'theme.colors.spec.safe',
      color: colors.spec.safe,
      title: 'Safe 安全色',
    },
  ].map(item => <ColorItem key={item.tokenKey} {...item} />);
  const colorItems1 = [
    {
      tokenKey: 'theme.colors.spec.dark',
      color: colors.spec.dark,
      title: 'Dark 深色',
      shadow: true,
    },
    {
      tokenKey: 'theme.colors.spec.light',
      color: colors.spec.light,
      title: 'Light 浅色',
      shadow: true,
      textInverse: false,
    },
  ].map(item => <ColorItem key={item.tokenKey} {...item} />);
  return (
    <>
      <Row>{colorItems}</Row>
      <Row>{colorItems1}</Row>
    </>
  );
}
