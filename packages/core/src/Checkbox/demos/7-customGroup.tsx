import React, { useState } from 'react';
import {
  useCheckbox,
  useCheckboxGroup,
  ICheckboxGroupProps,
  ICheckboxGroupValue,
  ICheckboxProps,
} from '@muya-ui/core';

const CustomCheckBox = (props: ICheckboxProps) => {
  const { checkedState, handleClick } = useCheckbox(props, 'checked' in props);
  return (
    <span
      style={{
        padding: '5px 15px',
        borderRadius: '15px',
        backgroundColor: checkedState ? '#1a7af8' : 'rgb(248, 248, 248)',
        color: checkedState ? 'white' : 'inherit',
        marginRight: '10px',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {props.children}
    </span>
  );
};

const CustomCheckBoxGroup = (props: ICheckboxGroupProps) => {
  const { opts, valueState, handleClick, restProps } = useCheckboxGroup(props);
  return (
    <div {...restProps} style={{ display: 'flex', marginBottom: '10px' }}>
      {opts.map(option => {
        const { label, value, disabled } = option;
        return (
          <CustomCheckBox
            key={String(value)}
            value={value}
            disabled={disabled}
            checked={valueState.indexOf(value) > -1}
            onClick={handleClick.bind(null, option)}
          >
            {label}
          </CustomCheckBox>
        );
      })}
    </div>
  );
};

export default function GroupDemo() {
  const plainOptions: string[] = ['全部', '审核中', '已通过'];
  const [value, setValue] = useState<ICheckboxGroupValue[]>([plainOptions[1]]);
  const onChange = (checkedValue: ICheckboxGroupValue[]) => {
    console.log('checked: ', checkedValue);
    setValue(checkedValue);
  };
  return (
    <div>
      <CustomCheckBoxGroup options={plainOptions} />
      <CustomCheckBoxGroup defaultValue={[plainOptions[0]]} options={plainOptions} />
      <CustomCheckBoxGroup value={value} options={plainOptions} onChange={onChange} />
    </div>
  );
}

export const meta = {
  title: '自定义 Checkbox 组',
  desc: '方便的从数组生成自定义 Checkbox 组',
};
