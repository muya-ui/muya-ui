import React, { useState } from 'react';

import { SelectIcon } from '@muya-ui/theme-light';
import { Button, IRadioProps, useRadio } from '@muya-ui/core';

const CustomRadio = (props: IRadioProps) => {
  const { checkedState, handleClick } = useRadio(props, 'checked' in props);
  return (
    <div style={{ marginRight: '10px', opacity: props.disabled ? 0.3 : 1 }}>
      <Button
        shape="circle"
        onClick={handleClick}
        disabled={props.disabled}
        style={{ backgroundColor: checkedState ? '#1a7af8' : 'white' }}
      >
        {checkedState ? <SelectIcon color="white" /> : null}
      </Button>
      {props.children}
    </div>
  );
};

export default function SizeDemo() {
  const [clicked, setClicked] = useState(true);
  return (
    <div style={{ display: 'flex' }}>
      <CustomRadio />
      <CustomRadio defaultChecked />
      <CustomRadio checked={clicked} onClick={() => setClicked(!clicked)} />
      <CustomRadio defaultChecked disabled />
    </div>
  );
}

export const meta = {
  title: '自定义单个元素 Radio',
  desc: '使用 useRadio 在任意元素上实现单选',
};
