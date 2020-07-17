import React from 'react';
import styled from 'styled-components';

import { IComponentSizeSpec } from '@muya-ui/theme-light';
import { Button, ButtonGroup, Col, PagerButton, Row } from '@muya-ui/core';

const Container = styled.div`
  .carousel {
    height: 180px;
    background: #00a0e9;
    position: relative;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    transition: all 0.3s;
  }

  .arrow-left {
    left: 0;
  }

  .arrow-right {
    right: 0;
  }

  .arrow-circle-left {
    left: 10px;
  }

  .arrow-circle-right {
    right: 10px;
  }

  .arrow-vertical {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    transition: all 0.3s;
  }

  .arrow-top {
    top: 0;
  }

  .arrow-bottom {
    bottom: 0;
  }

  .arrow-vertical-outer {
    position: absolute;
    left: 50%;
    transition: all 0.3s;

    &.arrow-top {
      transform: translate(-50%, -100%);
    }

    &.arrow-bottom {
      transform: translate(-50%, 100%);
    }
  }
`;

export default function PagerButtonDemo() {
  const [size, setSize] = React.useState<IComponentSizeSpec>('m');
  return (
    <Container>
      <div style={{ marginBottom: 12 }}>
        <ButtonGroup>
          <Button plain={size !== 'xl'} onClick={() => setSize('xl')}>
            xl
          </Button>
          <Button plain={size !== 'l'} onClick={() => setSize('l')}>
            l
          </Button>
          <Button plain={size !== 'm'} onClick={() => setSize('m')}>
            m
          </Button>
          <Button plain={size !== 's'} onClick={() => setSize('s')}>
            s
          </Button>
        </ButtonGroup>
      </div>
      <Row gutter={10}>
        <Col span={4}>
          <div className="carousel">
            <PagerButton size={size} className="arrow arrow-left" arrow="left" />
            <PagerButton size={size} className="arrow arrow-right" arrow="right" />
          </div>
        </Col>
        <Col span={4}>
          <div className="carousel">
            <PagerButton
              size={size}
              className="arrow arrow-circle-left"
              arrow="left"
              shape="circle"
            />
            <PagerButton
              size={size}
              className="arrow arrow-circle-right"
              arrow="right"
              shape="circle"
            />
          </div>
        </Col>
        <Col span={4}>
          <div className="carousel">
            <PagerButton size={size} className="arrow arrow-left" arrow="left" transparent />
            <PagerButton size={size} className="arrow arrow-right" arrow="right" transparent />
          </div>
        </Col>
        <Col span={4}>
          <div className="carousel">
            <PagerButton size={size} className="arrow-vertical arrow-top" arrow="top" />
            <PagerButton size={size} className="arrow-vertical arrow-bottom" arrow="bottom" />
          </div>
        </Col>
        <Col span={4}>
          <div className="carousel">
            <PagerButton
              size={size}
              className="arrow-vertical-outer arrow-top"
              arrow="top"
              side="bottom"
            />
            <PagerButton
              size={size}
              className="arrow-vertical-outer arrow-bottom"
              arrow="bottom"
              side="top"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export const meta = {
  title: 'PagerButton',
  desc: 'PagerButton 只是示意翻页按钮',
};
