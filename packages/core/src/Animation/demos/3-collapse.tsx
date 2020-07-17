import React, { useState } from 'react';

import { Animation, Button, Row } from '@muya-ui/core';

export default function CollapseDemo() {
  const [open, setOpen] = useState(true);
  const CollapseRef = React.useRef(null);
  const imgRef = React.useRef(null);
  return (
    <>
      <Row>
        <Animation.Collapse in={open} ref={CollapseRef}>
          <img
            ref={imgRef}
            src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
            style={{
              width: '50%',
            }}
          />
        </Animation.Collapse>
      </Row>
      <Row>
        <Button
          onClick={() => {
            setOpen(!open);
            console.log(CollapseRef.current, imgRef.current);
          }}
        >
          切换 Collapse 状态
        </Button>
      </Row>
    </>
  );
}

export const meta = {
  title: 'Collapse 折叠',
  desc: '垂直方向从顶部折叠子元素。',
};
