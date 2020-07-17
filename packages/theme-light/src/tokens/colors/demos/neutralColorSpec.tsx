import React from 'react';
import styled from 'styled-components';

import { useTheme } from '@muya-ui/core';
import { ColorItem, range, IColorItemProps, Col } from './styled';
import { IColorsSpec, IStatusColor } from '@muya-ui/theme-light';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;

  ${Col} {
    justify-content: center;
    height: 64px;
    text-align: center;
    padding: 0;
    &:not(:last-child) {
      margin-right: 2px;
    }
  }
`;

const SpecTitle = styled.p<{ $color?: string }>`
  font-size: 16px;
  line-height: 22px;
  color: #666;
  margin: 0;
  ${props => props.$color && `color: ${props.$color}`};
`;

const neutralKey = 'neutral';

export default function NeutralColorSpecDemo() {
  const { colors } = useTheme();
  const items: IColorItemProps[] = [];
  const statusItems: IColorItemProps[] = [];
  for (const index of range(1, 10)) {
    const colorKey = `${neutralKey}${index}` as keyof IColorsSpec;
    items.push({
      tokenKey: `theme.colors.spec.${colorKey}`,
      color: (colors.spec[colorKey] as IStatusColor).normal,
      title: colorKey,
      textInverse: index < 7,
    });
  }
  for (const index of range(1, 10)) {
    const colorKey = `${neutralKey}${index}` as keyof IColorsSpec;
    statusItems.push({
      tokenKey: `theme.colors.spec.${colorKey}.hover`,
      color: (colors.spec[colorKey] as IStatusColor).hover,
      title: 'hover',
      textInverse: index < 7,
    });
    statusItems.push({
      tokenKey: `theme.colors.spec.${colorKey}.click`,
      color: (colors.spec[colorKey] as IStatusColor).click,
      title: 'click',
      textInverse: index < 7,
    });
  }
  return (
    <>
      <Row>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>深色中性色</SpecTitle>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>中间中性色</SpecTitle>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>浅色中性色</SpecTitle>
        </Col>
      </Row>
      <Row>
        {items.map(item => (
          <ColorItem key={item.tokenKey} colorText={false} {...item} />
        ))}
      </Row>
      <Row>
        {statusItems.map(item => (
          <ColorItem key={item.tokenKey} colorText={false} {...item} />
        ))}
      </Row>
    </>
  );
}
