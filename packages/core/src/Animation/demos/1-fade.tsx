import React, { useState } from 'react';

import { Animation, Button, Row } from '@muya-ui/core';

export default function FadeDemo() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Row>
        <Animation.Fade in={open}>
          <img
            src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
            style={{
              width: '50%',
            }}
          />
        </Animation.Fade>
      </Row>
      <Row>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
        >
          切换 Fade 状态
        </Button>
      </Row>
    </>
  );
}

export const meta = {
  title: 'Fade 淡入淡出',
  desc: '从透明淡入至不透明。',
};
