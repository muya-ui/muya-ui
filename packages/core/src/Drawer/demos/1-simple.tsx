import React, { ChangeEvent, useState } from 'react';

import { Button, Dialog, Drawer, ISlideAnimationDirection, Row, Typography } from '@muya-ui/core';

const { Text } = Typography;

export default function Simple() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState('30');
  const [height, setHeight] = useState('40');
  const [direction, setDirection] = useState<ISlideAnimationDirection>('left');
  const handleClose = () => setOpen(false);
  const handleWidthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  };
  const handleHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };
  return (
    <div>
      <Drawer
        width={`${width}%`}
        height={`${height}%`}
        direction={direction}
        open={open}
        onClose={handleClose}
      >
        <Dialog.Title closeButtonSize="xl" onClose={handleClose}>
          漂亮的标题
        </Dialog.Title>
      </Drawer>
      <Row>
        <Button
          onClick={() => {
            setDirection('up');
            setOpen(true);
          }}
        >
          up
        </Button>
        <Button
          onClick={() => {
            setDirection('down');
            setOpen(true);
          }}
        >
          down
        </Button>
        <Button
          onClick={() => {
            setDirection('left');
            setOpen(true);
          }}
        >
          left
        </Button>
        <Button
          onClick={() => {
            setDirection('right');
            setOpen(true);
          }}
        >
          right
        </Button>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Text>容器宽度: {width}%</Text>
        <input value={width} onChange={handleWidthChange} type="range" min="0" max="100" />
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Text>容器高度: {height}%</Text>
        <input value={height} onChange={handleHeightChange} type="range" min="0" max="100" />
      </Row>
    </div>
  );
}

export const meta = {
  title: '基本用法',
  desc: '抽屉可以从四个方向出现，容器的宽高可以自定义',
};
