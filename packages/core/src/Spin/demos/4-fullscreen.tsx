import React, { useState } from 'react';
import { Spin, Button } from '@muya-ui/core';

export default function Direction() {
  const [spinning, setSpinning] = useState(false);
  const [spinning1, setSpinning1] = useState(false);
  return (
    <>
      <Button onClick={() => setSpinning(true)} type="primary" style={{ margin: '8px' }}>
        全屏加载
      </Button>
      <Button onClick={() => setSpinning1(true)} type="primary" style={{ margin: '8px' }}>
        区域加载
      </Button>
      <Spin
        spinning={spinning}
        fullscreen
        desc="全屏加载中..."
        cancelText="取消"
        onCancel={() => setSpinning(false)}
      />
      <Spin
        cancelText="取消"
        spinning={spinning1}
        onCancel={() => {
          setSpinning1(false);
        }}
        desc="区域加载中..."
      >
        <div style={{ width: '300px', height: '150px', background: 'gray' }} />
      </Spin>
    </>
  );
}

export const meta = {
  title: '区域/全屏加载',
  desc:
    '1. 将`fullscreen`置位`true`开启全屏加载 \n\n 2. 将目标区域通过`children`传给`Spin`组件，即可实现区域加载，注意目标节点的`position`样式\n\n 3. 手动设置`container`也可以实现区域加载，`container`是一个dom节点，参考Dialog.Base`',
};
