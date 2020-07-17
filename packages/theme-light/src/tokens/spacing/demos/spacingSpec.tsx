import React from 'react';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTheme, toast } from '@muya-ui/core';
import { ISpacingSpec } from '@muya-ui/theme-light';
import { isInteger } from 'lodash';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fafbfc;
  height: 64px;
  padding: 0 20px;
  margin: 12px 0;
`;

const Col = styled.div`
  font-size: 14px;
  color: #383c42;
  line-height: 24px;
  font-weight: 600;
  &:last-child {
    color: #aeb7c2;
  }
`;

const Spec = styled.span`
  margin-left: 24px;
  margin-right: 24px;
  padding: 6px;
  background: transparent;
  cursor: pointer;
`;

export default function SpacingSpec() {
  const { spacing } = useTheme();
  const data: Array<Array<number>> = [[], [], [], []];
  Object.keys(spacing.spec).forEach(key => {
    const value = spacing.spec[key as ISpacingSpec];
    if (!isInteger(value)) return;
    if (value < 10) {
      data[0].push(value);
    } else if (value < 32) {
      data[1].push(value);
    } else if (value < 80) {
      data[2].push(value);
    } else {
      data[3].push(value);
    }
  });
  return (
    <>
      <Row>
        <Col>10 以下的间距</Col>
        <Col>
          {data[0].map((v, i) => (
            <CopyToClipboard
              key={v}
              text={`theme.typography.spec.spacing.s${i + 1}`}
              onCopy={() => toast.success('tokenKey 已复制')}
            >
              <Spec>{v}</Spec>
            </CopyToClipboard>
          ))}
        </Col>
        <Col>以 2 为基准单位</Col>
      </Row>
      <Row>
        <Col>10-32 范围的间距</Col>
        <Col>
          {data[1].map((v, i) => (
            <CopyToClipboard
              key={v}
              text={`theme.typography.spec.spacing.s${data[0].length + i + 1}`}
              onCopy={() => toast.success('tokenKey 已复制')}
            >
              <Spec key={v}>{v}</Spec>
            </CopyToClipboard>
          ))}
        </Col>
        <Col>以 4 为基准单位</Col>
      </Row>
      <Row>
        <Col>32-80 范围的间距</Col>
        <Col>
          {data[2].map((v, i) => (
            <CopyToClipboard
              key={v}
              text={`theme.typography.spec.spacing.s${data[0].length + data[1].length + i + 1}`}
              onCopy={() => toast.success('tokenKey 已复制')}
            >
              <Spec key={v}>{v}</Spec>
            </CopyToClipboard>
          ))}
        </Col>
        <Col>以 8 为基准单位</Col>
      </Row>
      <Row>
        <Col>80 以上的间距</Col>
        <Col>
          {data[3].map((v, i) => (
            <CopyToClipboard
              key={v}
              text={`theme.typography.spec.spacing.s${data[0].length +
                data[1].length +
                data[2].length +
                i +
                1}`}
              onCopy={() => toast.success('tokenKey 已复制')}
            >
              <Spec key={v}>{v}</Spec>
            </CopyToClipboard>
          ))}
        </Col>
        <Col>以 16 为基准单位</Col>
      </Row>
    </>
  );
}
