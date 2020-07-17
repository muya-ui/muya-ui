import React from 'react';
import styled from 'styled-components';

import { useTheme } from '@muya-ui/core';
import { ColorItem, Col, range, IColorItemProps } from './styled';
import { IColorsSpec } from '@muya-ui/theme-light';
import { upperFirst } from 'lodash';

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

const SpecDesc = styled.p<{ $color?: string }>`
  font-size: 12px;
  color: #b5bbc9;
  line-height: 16px;
  margin: 0;
  ${props => props.$color && `color: ${props.$color}`};
`;

const basicColorKeys: Array<keyof IColorsSpec> = ['brand', 'danger', 'warning', 'safe'];

export default function DerivativeColorSpecDemo() {
  const { colors } = useTheme();
  const colorItems = basicColorKeys
    .map(key => {
      const items = [];
      for (const index of range(1, 4)) {
        const colorKey = `${key}${index}` as keyof IColorsSpec;
        items.push({
          tokenKey: `theme.colors.spec.${colorKey}`,
          color: colors.spec[colorKey],
          title: colorKey,
        });
      }
      for (const index of range(4, 1, -1)) {
        const colorKey = `light${upperFirst(key)}${index}` as keyof IColorsSpec;
        items.push({
          tokenKey: `theme.colors.spec.${colorKey}`,
          color: colors.spec[colorKey],
          title: colorKey,
          textColor: colors.spec[key],
        });
      }
      return items as IColorItemProps[];
    })
    .map(items => items.map(item => <ColorItem key={item.tokenKey} colorText={false} {...item} />));
  return (
    <>
      <Row>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>
            深色系列主要应用在对应功能的按钮和操作，进度和确认，状态
          </SpecTitle>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>
            浅色系列通常用品牌表达、结果、背景、标签、按钮，根据对应标签选择响应效果
          </SpecTitle>
        </Col>
      </Row>
      <Row>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>Click 色</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>S+5 B-5</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>基准色</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>Normal</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>纯色 Hover</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>S-10 B+5</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>文字 Hover</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>S-20 B+5</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>浅色按钮 Click</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>Opacity 16%</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>浅色按钮 Hover</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>Opacity 12%</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>浅色按钮 Normal</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>Opacity 8%</SpecDesc>
        </Col>
        <Col $background={colors.spec.neutral9.normal}>
          <SpecTitle $color={colors.pattern.text.text}>线框按钮 Hover</SpecTitle>
          <SpecDesc $color={colors.pattern.text.placeholder}>Opacity 4%</SpecDesc>
        </Col>
      </Row>
      <Row>{colorItems[0]}</Row>
      <Row>{colorItems[1]}</Row>
      <Row>{colorItems[2]}</Row>
      <Row>{colorItems[3]}</Row>
    </>
  );
}
