import React from 'react';
import { Guide, Switch, Button, IGuideStep } from '@muya-ui/core';

export default function Demo() {
  const [show, setShow] = React.useState(false);
  const tourConfig: IGuideStep[] = [
    {
      selector: '.step4',
      position: 'right',
      content: '这是第一个新功能',
    },
  ];
  return (
    <>
      <Switch onChange={value => setShow(value)} checked={show} style={{ marginBottom: 30 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button className="step4">功能 1</Button>
      </div>
      {show ? (
        <Guide
          rounded={2}
          steps={tourConfig}
          showSkip={false}
          onRequestClose={() => setShow(false)}
        />
      ) : null}
    </>
  );
}

export const meta = {
  title: '强提示单步',
  desc: '强提示单步用法',
};
