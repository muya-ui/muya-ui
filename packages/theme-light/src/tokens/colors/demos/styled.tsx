import { parseToRgb, rgbToColorString } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

import { toast } from '@muya-ui/core';

export interface IColorItemProps {
  tokenKey: string;
  color: string;
  title: string;
  shadow?: boolean;
  textInverse?: boolean;
  colorText?: boolean;
  textColor?: string;
  transformColor?: string;
}

function toColor(color: string) {
  return rgbToColorString(parseToRgb(color));
}

export const Col = styled.div<{
  $background: string;
  $shadow?: boolean;
  $textInverse?: boolean;
  $textColor?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  height: 120px;
  padding: 30px;
  cursor: pointer;
  ${props => css`
    background: ${props.$background};
    ${props.$shadow && `box-shadow: ${props.theme.shadows.spec.s2.normal}`};
    ${props.$textInverse
      ? `color: ${props.theme.colors.pattern.text.inverse}`
      : `color: ${props.theme.colors.pattern.text.text}`};
    ${props.$textColor && `color: ${props.$textColor}`}
  `}
`;

export const SpecTitle = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  margin: 0;
  word-break: break-all;
`;

export const SpecText = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin: 0;
  word-break: break-all;
`;

export function ColorItem(props: IColorItemProps) {
  const {
    tokenKey,
    color,
    title,
    shadow = false,
    textInverse = true,
    colorText = true,
    textColor,
    transformColor,
  } = props;
  return (
    <CopyToClipboard text={tokenKey} onCopy={() => toast.success('tokenKey 已复制')}>
      <Col $background={color} $shadow={shadow} $textInverse={textInverse} $textColor={textColor}>
        <SpecTitle>{title}</SpecTitle>
        {colorText && <SpecText>{transformColor ? transformColor : toColor(color)}</SpecText>}
      </Col>
    </CopyToClipboard>
  );
}

export function* range(beg: number, end: number, step = 1) {
  if (step > 0) {
    for (let i = beg; i <= end; i += step) yield i;
  } else {
    for (let i = beg; i >= end; i += step) yield i;
  }
}

const Row = styled.div`
  display: flex;
  flex-direction: row;

  ${Col} {
    height: auto;
    justify-content: center;
    text-align: center;
    &:not(:last-child) {
      margin-right: 2px;
    }
  }
`;

export interface IPatternDemoProps {
  patternItems: IColorItemProps[];
}

export function PatternDemo(props: IPatternDemoProps) {
  const { patternItems } = props;
  const colorItems = patternItems.map(item => <ColorItem key={item.tokenKey} {...item} />);
  return <Row>{colorItems}</Row>;
}
