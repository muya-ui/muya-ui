import React from 'react';

import { Row, Tag, Typography } from '@muya-ui/core';

export default function SizeDemo() {
  return (
    <>
      <Row>
        <Typography.Title level={5}>胶囊型：</Typography.Title>
      </Row>
      <Row>
        <Tag size="s">Size s</Tag>
        <Tag>Size m</Tag>
        <Tag size="l">Size l</Tag>
        <Tag size="xl">Size xl</Tag>
      </Row>
      <Row>
        <Typography.Title level={5}>胶囊型可关闭：</Typography.Title>
      </Row>
      <Row>
        <Tag size="s" closable>
          Size s
        </Tag>
        <Tag closable>Size m</Tag>
        <Tag size="l" closable>
          Size l
        </Tag>
        <Tag size="xl" closable>
          Size xl
        </Tag>
      </Row>
      <Row>
        <Typography.Title level={5}>圆角型：</Typography.Title>
      </Row>
      <Row>
        <Tag size="s" shape="rect">
          Size s
        </Tag>
        <Tag shape="rect">Size m</Tag>
        <Tag size="l" shape="rect">
          Size l
        </Tag>
        <Tag size="xl" shape="rect">
          Size xl
        </Tag>
      </Row>
      <Row>
        <Typography.Title level={5}>圆角型可关闭：</Typography.Title>
      </Row>
      <Row>
        <Tag size="s" shape="rect" closable>
          Size s
        </Tag>
        <Tag shape="rect" closable>
          Size m
        </Tag>
        <Tag size="l" shape="rect" closable>
          Size l
        </Tag>
        <Tag size="xl" shape="rect" closable>
          Size xl
        </Tag>
      </Row>
    </>
  );
}

export const meta = {
  title: '尺寸',
  desc: '标签尺寸，可以是 xl 、l 、m 、s 。',
};
