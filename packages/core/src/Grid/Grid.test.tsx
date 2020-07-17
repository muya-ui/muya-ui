import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import { Col, Row } from '@muya-ui/core';

describe('Grid', () => {
  test('Grid Snapshot', () => {
    const offset = renderer
      .create(
        <Row>
          <Col span={8}>col</Col>
          <Col span={8} offset={8}>
            col-8 col-offset-8
          </Col>
        </Row>,
      )
      .toJSON();
    expect(offset).toMatchSnapshot();
    const pushAndPull = renderer
      .create(
        <Row>
          <Col span={18} push={6}>
            col-18 col-push-6
          </Col>
          <Col span={6} pull={18}>
            col-6 col-pull-18
          </Col>
        </Row>,
      )
      .toJSON();
    expect(pushAndPull).toMatchSnapshot();
    const order = renderer
      .create(
        <Row>
          <Col className="col" span={6} order={4}>
            1 col-order-4
          </Col>
          <Col className="col" span={6} order={3}>
            2 col-order-3
          </Col>
          <Col className="col" span={6} order={2}>
            3 col-order-2
          </Col>
          <Col className="col" span={6} order={1}>
            4 col-order-1
          </Col>
        </Row>,
      )
      .toJSON();
    expect(order).toMatchSnapshot();
    const views = Array(20).fill(0);
    const equalNum = renderer
      .create(
        <Row equalNum={{ md: 4, lg: 5 }} gutter={{ xs: 10, lg: 20 }}>
          {views.map((i, index) => (
            <Col key={index} className="col">
              Col-{index}
            </Col>
          ))}
        </Row>,
      )
      .toJSON();
    expect(equalNum).toMatchSnapshot();
  });
  test('Grid Responsive', () => {
    mount(
      <Row gutter={{ xs: 10, lg: 20 }}>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          Col
        </Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          Col
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}>
          Col
        </Col>
      </Row>,
    );
  });
});
