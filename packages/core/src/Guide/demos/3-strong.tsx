import React, { useState } from 'react';

import { Button, Guide, IGuideStep, Switch } from '@muya-ui/core';

export default function Demo() {
  const [show, setShow] = useState(false);
  const tourConfig: IGuideStep[] = [
    {
      selector: '.step1',
      position: 'right',
      content: '这是第一个新功能',
      subTitle: '这是副标题',
    },
    {
      selector: '.step2',
      position: 'bottom',
      content: '这是第二个新功能',
    },
    {
      selector: '#step3',
      position: 'left',
      content: '这是第三个新功能',
    },
  ];
  return (
    <>
      <Switch onChange={value => setShow(value)} checked={show} style={{ marginBottom: 30 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button className="step1">功能 1</Button>
        <Button className="step2">功能 2</Button>
        <Button id="step3">功能 3</Button>
      </div>
      {show ? <Guide steps={tourConfig} rounded={4} onRequestClose={() => setShow(false)} /> : null}
    </>
  );
}

export const meta = {
  title: '强提示多步',
  desc: '强提示多步用法',
};
