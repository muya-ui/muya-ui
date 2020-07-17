import React, { useState } from 'react';

import { Animation, Button, ButtonGroup, Row } from '@muya-ui/core';

export default function SlideDemo() {
  const [direction, setDirection] = useState('up');
  const [open, setOpen] = useState(true);
  const slideRef = React.useRef(null);
  const imgRef = React.useRef(null);
  return (
    <>
      <Row>
        <Animation.Slide in={open} direction={direction} ref={slideRef}>
          <img
            ref={imgRef}
            src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
            style={{
              width: '50%',
            }}
          />
        </Animation.Slide>
      </Row>
      <Row>
        <ButtonGroup>
          <Button plain={direction !== 'up'} onClick={() => setDirection('up')}>
            up
          </Button>
          <Button plain={direction !== 'down'} onClick={() => setDirection('down')}>
            down
          </Button>
          <Button plain={direction !== 'left'} onClick={() => setDirection('left')}>
            left
          </Button>
          <Button plain={direction !== 'right'} onClick={() => setDirection('right')}>
            right
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Button
          onClick={() => {
            setOpen(!open);
            console.log(slideRef.current, imgRef.current);
          }}
        >
          切换 Slide 状态
        </Button>
      </Row>
    </>
  );
}

export const meta = {
  title: 'Slide 滑动',
  desc: '滑动进场',
};
