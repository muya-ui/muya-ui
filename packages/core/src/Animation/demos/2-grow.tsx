import React, { useState } from 'react';

import { Animation, Button, Row } from '@muya-ui/core';

export default function FadeDemo() {
  const [open, setOpen] = useState(true);
  const growRef = React.useRef(null);
  const imgRef = React.useRef(null);
  return (
    <>
      <Row>
        <Animation.Grow in={open} ref={growRef}>
          <img
            ref={imgRef}
            src="https://qhstaticssl.kujiale.com/newt/29/image/png/1564467685432/EB6BD3A294454A98A65AF964C7666D94.png"
            style={{
              width: '50%',
            }}
          />
        </Animation.Grow>
      </Row>
      <Row>
        <Button
          onClick={() => {
            setOpen(!open);
            console.log(growRef.current, imgRef.current);
          }}
        >
          切换 Grow 状态
        </Button>
      </Row>
    </>
  );
}

export const meta = {
  title: 'Grow 扩展',
  desc: `从子元素的中心向外扩展，同时从透明淡入至不透明。

第二个示例演示如何更改 \`transform-origin\` 属性，以及有条件地用 \`timeout\` 属性来改变元素进入的速度。
  `,
};
