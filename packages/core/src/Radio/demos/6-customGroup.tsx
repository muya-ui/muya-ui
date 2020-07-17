import React, { useState } from 'react';

import { SelectIcon } from '@muya-ui/theme-light';
import {
  Button,
  IRadioGroupOption,
  IRadioGroupProps,
  IRadioGroupValue,
  IRadioProps,
  useRadio,
  useRadioGroup,
} from '@muya-ui/core';

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
      <span style={{ marginLeft: '6px' }}>{props.children}</span>
    </div>
  );
};

const CustomRadioGroup = (props: IRadioGroupProps) => {
  const { opts, valueState, handleClick, restProps } = useRadioGroup(props);
  return (
    <div {...restProps} style={{ display: 'flex' }}>
      {opts.map(option => {
        const { label, value, disabled } = option;
        return (
          <CustomRadio
            key={String(value)}
            value={value}
            disabled={disabled}
            checked={valueState === value}
            onClick={handleClick.bind(null, option)}
          >
            {label}
          </CustomRadio>
        );
      })}
    </div>
  );
};

export default function SizeDemo() {
  const options: IRadioGroupOption[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Orange', value: 3 },
  ];
  const disabledOptions: IRadioGroupOption[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2, disabled: true },
    { label: 'Orange', value: 3, disabled: true },
  ];
  const [value, setValue] = useState(options[1].value);
  const onChange = (checkedValue: IRadioGroupValue) => {
    console.log('radio checked: ', checkedValue);
    setValue(checkedValue);
  };
  return (
    <>
      <div className="doc-radio-group-item">
        <CustomRadioGroup defaultValue={1} options={options} />
      </div>
      <div className="doc-radio-group-item">
        <CustomRadioGroup value={value} options={options} onChange={onChange} />
      </div>
      <div className="doc-radio-group-item">
        <CustomRadioGroup defaultValue={3} options={disabledOptions} />
      </div>
    </>
  );
}

export const meta = {
  title: '自定义 Radio Group',
  desc: '使用 useRadioGroup 在任意元素上实现单选',
};
