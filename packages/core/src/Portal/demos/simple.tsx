import React from 'react';

import { Portal } from '@muya-ui/core';

export default function SimpleDemo() {
  const [show, setShow] = React.useState(false);
  const containerRef = React.useRef(null);
  return (
    <div>
      <button onClick={() => setShow(true)}>渲染Portal</button>
      <div
        style={{
          color: 'red',
        }}
        ref={containerRef}
        id="container"
      ></div>
      {show && (
        <Portal container={containerRef.current}>
          <p>我在这里，我渲染到了外层的div中</p>
        </Portal>
      )}
    </div>
  );
}

export const meta = {
  title: '`Portal` 简单使用',
  desc:
    '`Portal` 的 `children` 只能为一个 React Element。如果未指定 `container` 属性，默认会使用`document.body`作为container',
};
